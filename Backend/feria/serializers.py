from rest_framework.serializers import ModelSerializer
from .models import *

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('created_at', )

class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('created_at', )
    
class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('created_at',)

class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
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
