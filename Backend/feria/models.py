from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class Article(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2) # maximo 10 digitos y 2 decimales
    stock = models.PositiveIntegerField(default=1) #solo numeros positivos por defecto 1
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Client(models.Model):
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Review(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
class Cart(models.Model): #carrito de compras
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING, null=True, blank=True)
    products = models.ManyToManyField(Article, through='CartDetail') #relacion muchos a muchos con la tabla CartDetail
    confirm = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
    
    def set_confirm(self, *args, **kwargs): #metodo para confirmar el pedido
        self.confirm = True
        for i in self.products.all():#recorrer todos los productos del carrito
            if i.item.stock >= i.CartDetail.quantity: #si el stock del producto es mayor o igual a la cantidad solicitada
                i.item.stock -= i.CartDetail.quantity #restar la cantidad solicitada al stock del producto
                i.item.save() #guardar el producto
            else:
                self.confirm = False #si el stock del producto es menor a la cantidad solicitada, no confirmar el pedido
        super().save(*args, **kwargs)

class CartDetail(models.Model): #tabla intermedia entre Cart y Article
    item = models.ForeignKey(Article, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    def __str__(self):
        return str(self.id)
    
    #reescribir el metodo save para que se actualice el precio total del pedido cada vez que se agregue un producto
    def save(self, *args, **kwargs): 
        self.amount = self.item.price * self.quantity
        for i in self.cart.products.all():
            if i.item.stock >= i.quantity:
                super().save(*args, **kwargs)
            else:
                return False


