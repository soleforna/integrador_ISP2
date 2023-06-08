from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *

class UserSerializer(ModelSerializer):
    client_avatar = SerializerMethodField()
    class Meta:
        model = User
        fields = ['username','first_name', 'last_name', 'email', 'password','client_avatar']
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

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('created_at', )

class ArticleSerializer(ModelSerializer):
    reviews = SerializerMethodField()
    
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('created_at', )
        
    def get_reviews(self, instance):
        from .serializers import ReviewSerializer  # Importar localmente aquí
        reviews = instance.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
class ReviewSerializer(ModelSerializer):
    client_name = SerializerMethodField() #agregar un campo que no existe en el modelo
    client_avatar = SerializerMethodField() #agregar un campo que no existe en el modelo
    article_name = SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ('id', 'article_name', 'client_name', 'client_avatar', 'description', 'classification', 'created_at')

    def get_client_name(self, obj): #obtener el nombre del cliente
        client = obj.client #obtener el cliente
        if client: #si existe el cliente
            return client.name #devolver el nombre del cliente
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
    
    def get_article_name(self, obj): #obtener el nombre del articulo
        article = obj.article
        if article:
            return article.name
        return None
    
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
            return client.name #devolver el nombre del cliente
        return None #si no existe el cliente, devolver None
    
    def get_client_avatar(self, obj): #obtener el avatar del cliente
        client = obj.client
        if client and client.avatar: # Si existe el cliente y tiene avatar
            request = self.context.get('request')  # Obtener la solicitud actual desde el contexto
            avatar_url = client.avatar.url
            if request is not None:
                return request.build_absolute_uri(avatar_url)
            else:
                return avatar_url
        return None # Si no existe el cliente o no tiene avatar, devolver None
    

class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'phone', 'address', 'avatar']
        read_only_fields = ('created_at',)


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ('created_at', 'confirm')
    
#    def validate(self, data):
#        if data['confirm'] == True:
#            for item in data['products']:
#                article = Article.objects.get(id=item.id)
#                article.stock -= item.quantity
#                article.save()
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
        cartdetail = CartDetail.objects.create(**validated_data)
        cartdetail.save()
        return cartdetail
