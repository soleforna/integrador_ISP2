from django.db import models, IntegrityError
from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField
from django.contrib.auth import password_validation
from feria.models import *

class ClientSerializer(ModelSerializer):
    password = CharField(write_only=True, required=False, validators=[password_validation.validate_password])
    class Meta:
        model = Client
        fields = ['id','first_name', 'last_name', 'email', 'address', 'phone', 'password', 'avatar']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def get_client_avatar(self, obj): #obtener el avatar del cliente
        client = obj.client
        if client and client.avatar: # Si existe el cliente y tiene avatar
            request = self.context.get('request')  # Obtener la solicitud actual desde el contexto
            avatar_url = client.avatar.url
            if request is not None:
                return request.build_absolute_uri(avatar_url)  # Construir la URL absoluta utilizando build_absolute_uri()
            else:
                return avatar_url  # Si no se proporciona una solicitud, devolver la URL relativa tal como está
        return None # Si no existe el cliente o no tiene avatar, devolver None

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = 'id','name', 'description',
        read_only_fields = ('created_at',)

class ReviewSerializer(ModelSerializer):
    client_name = SerializerMethodField() #agregar un campo que no existe en el modelo
    client_avatar = SerializerMethodField() #agregar un campo que no existe en el modelo
        
    class Meta:
        model = Review
        fields = ('id', 'client_name', 'client_avatar', 'description', 'classification', 'created_at')
        read_only_fields = ('created_at', )
        depth = 1

    def get_client_name(self, obj): #obtener el nombre del cliente
        client = obj.client #obtener el cliente
        if client: #si existe el cliente
            return client.first_name+' '+client.last_name #devolver el nombre del cliente
        return None #si no existe el cliente, devolver None

    def get_client_avatar(self, obj): #obtener el avatar del cliente
        client = obj.client
        if client and client.avatar: # Si existe el cliente y tiene avatar
            request = self.context.get('request')  # Obtener la solicitud actual desde el contexto
            avatar_url = client.avatar.url
            if request is not None:
                return request.build_absolute_uri(avatar_url)  # Construir la URL absoluta utilizando build_absolute_uri()
            else:
                return avatar_url  # Si no se proporciona una solicitud, devolver la URL relativa tal como está
        return None # Si no existe el cliente o no tiene avatar, devolver None

class ArticleSerializer(ModelSerializer):
    name = models.CharField() 
    description = models.CharField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField()
    created_at = models.DateTimeField()
    category = CategorySerializer()
    review = ReviewSerializer(many=True)

    class Meta:
        model = Article
        fields = ('id', 'name', 'description', 'price', 'stock', 'image', 'created_at', 'category', 'review')
        read_only_fields = ('created_at', )
        depth = 1 #profundidad de la serializacion de los objetos relacionados

class ComentSerializer(ModelSerializer): 
    client_name = SerializerMethodField() #agregar un campo que no existe en el modelo
    client_avatar = SerializerMethodField() #agregar un campo que no existe en el modelo
    
    class Meta:
        model = Coment
        fields = ('id', 'client_name', 'client_avatar', 'description', 'classification', 'created_at')
        read_only_fields = ('created_at', )
    
    def get_client_name(self, obj): #obtener el nombre del cliente
        client = obj.client #obtener el cliente
        if client: #si existe el cliente
            return client.first_name+' '+client.last_name #devolver el nombre del cliente
        return None #si no existe el cliente, devolver None
    
    def get_client_avatar(self, obj): #obtener el avatar del cliente
        client = obj.client
        if client and client.avatar: # Si existe el cliente y tiene avatar
            request = self.context.get('request')  # Obtener la solicitud actual desde el contexto
            avatar_url = client.avatar.url
            if request is not None:
                return request.build_absolute_uri(avatar_url)  # Construir la URL absoluta utilizando build_absolute_uri()
            else:
                return avatar_url  # Si no se proporciona una solicitud, devolver la URL relativa tal como está
        return None # Si no existe el cliente o no tiene avatar, devolver None
    
class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ('created_at', 'confirm')
        depth = 1 #profundidad de la serializacion de los objetos relacionados
    
#    def validate(self, data):
#        if data['confirm'] == True: #si el carrito se confirma
#            for item in data['products']: #recorrer los productos del carrito
#                article = Article.objects.get(id=item.id) #obtener el articulo
#                article.stock -= item.quantity #restar la cantidad del producto al stock
#                article.save() #guardar el articulo
#        return data
    
    def create(self, validated_data):
        cart = Cart.objects.create(**validated_data)
        cart.save()
        return cart

class CartDetailSerializer(ModelSerializer):
    class Meta:
        model = CartDetail
        fields = '__all__'
        read_only_fields = ('amount', )
    
    def create(self, validated_data):
        try:
            cartdetail = CartDetail.objects.create(**validated_data)
            cartdetail.save()
            return cartdetail
        except IntegrityError:
            raise ValidationError("Este artículo ya existe en el carrito.")

class NewsletterSerializer(ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'
        read_only_fields = ('created_at',)
