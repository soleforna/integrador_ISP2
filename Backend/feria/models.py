from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MaxValueValidator
from .validators import *

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

class Client(AbstractUser): #modelo de usuario personalizado
    username = None #se establece el username en None
    email = models.EmailField(unique=True) #se establece el email como campo unico
    phone = models.CharField(max_length=15, null=True, blank=True, validators=[phone_valid]) #maximo 15 caracteres y validacion
    address = models.CharField(max_length=100, null=True, blank=True, validators=[address_valid]) #maximo 100 caracteres y validacion
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, validators=[validate_image]) #campo para subir imagenes con validacion
        
    USERNAME_FIELD = 'email' #se establece el email como campo de autenticacion
    REQUIRED_FIELDS = ['first_name', 'last_name'] #se establecen los campos requeridos
    
    objects = CustomUserManager() #se establece el objeto CustomUserManager como objeto de la clase User
    
    groups = models.ManyToManyField( #se establece la relacion de muchos a muchos con la tabla Group
        'auth.Group',
        verbose_name='groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField( #se establece la relacion de muchos a muchos con la tabla Permission
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
    )
    
    class Meta: #metadatos
        verbose_name = 'Cliente' #nombre en singular
        verbose_name_plural = 'Clientes' #nombre en plural
    
    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}" #concatenar el primer nombre y el apellido
    
    def get_short_name(self): 
        return self.first_name

class Category(models.Model): #modelo de categoria
    name = models.CharField(max_length=50, validators=[name_valid]) #maximo 50 caracteres y validacion
    description = models.CharField(max_length=100) #maximo 100 caracteres
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion
    
    class Meta: #metadatos
        verbose_name = 'Categoría' #nombre en singular
        verbose_name_plural = 'Categorías' #nombre en plural

    def __str__(self):
        return self.name

class Review(models.Model): #modelo de review
    client = models.ForeignKey(Client, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Client
    description = models.CharField(max_length=140) #maximo 140 caracteres
    classification = models.IntegerField(validators=[MaxValueValidator(5)], default=1) #solo numeros positivos por defecto 1 y maximo 5
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion
    
    class Meta: #metadatos
        verbose_name = 'Reseña' #nombre en singular
        verbose_name_plural = 'Reseñas' #nombre en plural

    def __str__(self):
        return str(self.id)
    
class Article(models.Model): #modelo de articulo
    name = models.CharField(max_length=50, validators=[name_valid]) #maximo 50 caracteres y validacion
    description = models.CharField(max_length=100) #maximo 100 caracteres
    category = models.ForeignKey(Category, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Category
    price = models.DecimalField(max_digits=10, decimal_places=0) # maximo 10 digitos y 0 decimales
    stock = models.PositiveIntegerField(default=1) #solo numeros positivos por defecto 1
    image = models.ImageField(upload_to='images/', null=True, blank=True, validators=[validate_image]) #campo para subir imagenes con validacion
    review = models.ManyToManyField(Review, blank=True) #relacion de muchos a muchos con la tabla Review (opcional)
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion

    class Meta: #metadatos
        verbose_name = 'Artículo' #nombre en singular
        verbose_name_plural = 'Artículos' #nombre en plural
        
    def __str__(self):
        return self.name

class Coment(models.Model): #modelo de comentario
    client = models.ForeignKey(Client, on_delete=models.CASCADE) #relacion de uno a uno con la tabla Client
    description = models.CharField(max_length=140) #maximo 140 caracteres
    classification = models.IntegerField(validators=[MaxValueValidator(5)], default=1) #solo numeros positivos por defecto 1 y maximo 5
    created_at = models.DateTimeField(auto_now_add=True) #fecha de creacion
    
    class Meta: #metadatos
        verbose_name = 'Comentario' #nombre en singular
        verbose_name_plural = 'Comentarios' #nombre en plural

    def __str__(self):
        return str(self.id)

class Cart(models.Model): #modelo de carrito
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING, null=True, blank=True)
    products = models.ManyToManyField(Article, through='CartDetail') #relacion muchos a muchos con la tabla CartDetail
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
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
        
    def __str__(self):
        return str(self.id)
    
class Newsletter(models.Model): #modelo de newsletter
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta: #metadatos
        verbose_name = 'Lista de suscriptores' #nombre en singular
        verbose_name_plural = 'Lista de suscriptores' #nombre en plural

    def __str__(self):
        return self.email