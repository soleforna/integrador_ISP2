from .models import *
from .serializers import *
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(stock__gt=0) #de esta manera solo se muestran los articulos que tienen stock
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleSerializer
    lookup_field = 'pk' #para que se pueda buscar por id en la url

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ReviewSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CartSerializer

class CartDetailsViewSet(viewsets.ModelViewSet):
    queryset = CartDetail.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CartDetailSerializer
    
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientSerializer
    lookup_field = 'pk' #para que se pueda buscar por id en la url
    
    def update(self, request, pk=None):
        client = self.get_object()
        user = client.user

        user_fields = ['email', 'username', 'first_name', 'last_name', 'password']
        for field in user_fields:
            if field in request.data and request.data[field] != 'null':
                if field == 'password':
                    if check_password(request.data[field], user.password):
                        raise ValidationError("La contraseña es igual a la actual.")
                    else:
                        user.set_password(request.data[field])
                else:
                    setattr(user, field, request.data[field])

        # Actualizar los campos del modelo Client solo si se envían en la solicitud
        client_fields = ['phone', 'address', 'avatar']
        for field in client_fields:
            if field in request.data and request.data[field] != 'null':
                setattr(client, field, request.data[field])

        # Guardar los cambios en los modelos User y Client
        user.save()
        client.save()

        serializer = ClientSerializer(client, data=request.data, partial=True) #partial=True para que no sea obligatorio enviar todos los campos
        user_serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid() and user_serializer.is_valid(): #si los serializers son validos
            serializer.save() #se guardan los datos
            user_serializer.save()
            response = { #se crea un diccionario con los datos actualizados
                'user': user_serializer.data,
                'client': serializer.data
            }
            return Response(response, status=status.HTTP_200_OK) #se devuelve el el diccionario con un status 200
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

