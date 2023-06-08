from typing import Iterable, Optional
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, User
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail 
from django.core.validators import MaxValueValidator

# Create your models here.
class CustomUserManager(BaseUserManager): #para que el usuario se pueda loguear con el email
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio") #si no se ingresa un email
        
        email = self.normalize_email(email) #normalizar el email
        user = self.model(email=email, **extra_fields) #crear el usuario
        user.set_password(password) #setear la contraseña
        user.save(using=self._db) #guardar el usuario
        return user #devolver el usuario

    def create_superuser(self, email, password=None, **extra_fields): #crear un superusuario
        extra_fields.setdefault('is_staff', True) #si no se ingresa un valor para is_staff, se establece en True
        extra_fields.setdefault('is_superuser', True) #si no se ingresa un valor para is_superuser, se establece en True
        
        if extra_fields.get('is_staff') is not True: #si is_staff no es True
            raise ValueError('Superuser must have is_staff=True.') #se lanza un error
        if extra_fields.get('is_superuser') is not True: #si is_superuser no es True
            raise ValueError('Superuser must have is_superuser=True.') #se lanza un error

        return self.create_user(email, password, **extra_fields) #se crea el superusuario

class User(AbstractUser): #modelo de usuario personalizado
    username = None #se establece el username en None
    email = models.EmailField(unique=True) #se establece el email como campo unico
    first_name = models.CharField(max_length=100) #maximo 100 caracteres
    last_name = models.CharField(max_length=100) #maximo 100 caracteres
    
    USERNAME_FIELD = 'email' #se establece el email como campo de autenticacion
    REQUIRED_FIELDS = ['first_name', 'last_name'] #se establecen los campos requeridos
    
    objects = CustomUserManager() #se establece el objeto CustomUserManager como objeto de la clase User
    
    groups = models.ManyToManyField( #se establece la relacion de muchos a muchos con la tabla Group
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='feria_users'  # Cambio del related_name
    )
    user_permissions = models.ManyToManyField( #se establece la relacion de muchos a muchos con la tabla Permission
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='feria_users'  # Cambio del related_name
    )
    
    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}" #concatenar el primer nombre y el apellido
    
    def get_short_name(self): 
        return self.first_name

class Category(models.Model): #modelo de categoria
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Article(models.Model): #modelo de articulo
    name = models.CharField(max_length=50) #maximo 50 caracteres
    description = models.CharField(max_length=100) #maximo 100 caracteres
    category = models.ForeignKey(Category, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Category
    price = models.DecimalField(max_digits=10, decimal_places=0) # maximo 10 digitos y 0 decimales
    stock = models.PositiveIntegerField(default=1) #solo numeros positivos por defecto 1
    image = models.ImageField(upload_to='images/', null=True, blank=True) #campo para subir imagenes
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion

    def __str__(self):
        return self.name

class Client(models.Model): #modelo de cliente
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def getEmail(self):
        return f"{self.user.email}"
    
    def save(self, *args, **kwargs):
        # Concatenar el primer nombre y el apellido para establecer el campo name
        self.name = f"{self.user.first_name} {self.user.last_name}"
        # Llamar al método save del modelo padre para guardar los cambios
        super().save(*args, **kwargs)
    
    def __str__(self):
            return self.name

class Review(models.Model): #modelo de review
    article = models.ForeignKey(Article, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Article
    client = models.ForeignKey(Client, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Client
    description = models.CharField(max_length=140) #maximo 140 caracteres
    classification = models.IntegerField(validators=[MaxValueValidator(5)], default=1) #solo numeros positivos por defecto 1 y maximo 5
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion

    def __str__(self):
        return str(self.id)
    
class Coment(models.Model): #modelo de comentario
    client = models.ForeignKey(Client, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Client
    description = models.CharField(max_length=140) #maximo 140 caracteres
    classification = models.IntegerField(validators=[MaxValueValidator(5)], default=1) #solo numeros positivos por defecto 1 y maximo 5
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion

    def __str__(self):
        return str(self.id)

class Cart(models.Model): #modelo de carrito
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING, null=True, blank=True)
    products = models.ManyToManyField(Article, through='CartDetail') #relacion muchos a muchos con la tabla CartDetail
    confirm = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
    
    def set_confirm(self, *args, **kwargs):
        for i in self.products.all():
            if i.item.stock < i.quantity:
                return False
        self.confirm = True
        super().save(*args, **kwargs)

class CartDetail(models.Model): #modelo de detalle de carrito
    item = models.ForeignKey(Article, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    def __str__(self):
        return str(self.id)
    
    #reescribir el metodo save para que se actualice el precio total del pedido cada vez que se agregue un producto
    def save(self, *args, **kwargs): 
        self.amount = self.item.price * self.quantity
        super().save(*args, **kwargs)

@receiver(reset_password_token_created) 
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs): #obtiene el token

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail( #envia el mail
        # title:
        "Password Reset for {title}".format(title="Restablecer Contraseña"),#un titulo
        # message:
        email_plaintext_message,
        # from:
        "feriaonlineispc@gmail.com",
        # to:
        [reset_password_token.user.email]
    )
