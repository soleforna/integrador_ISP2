from .models import *
from .serializers import *
from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError as DRFValidationError


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
    
    # Sobreescribir el método create para crear los modelos User y Client
    def create(self, request):
        serializer = ClientSerializer(data=request.data)
        user_serializer = UserSerializer(data=request.data)

        if serializer.is_valid() and user_serializer.is_valid():
            user = user_serializer.save() #guardar el usuario
            user_fields = ['first_name', 'last_name']
            for field in user_fields:
                if field in request.data and request.data[field] != 'null':
                    setattr(user, field, request.data[field])
                    user.save()
            client = serializer.save(user=user) #guardar el cliente
            
            response = {
            'user': user_serializer.data,
            'client': serializer.data
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Sobreescribir el método update para actualizar los modelos User y Client
    def update(self, request, pk=None):
        client = self.get_object()
        user = client.user
        
        # Validar y establecer la nueva contraseña utilizando el validador de contraseña de Django Rest Framework
        if 'password' in request.data:
            new_password = request.data['password']
            if check_password(new_password, user.password): # si la contraseña nueva es igual a la actual
                raise DRFValidationError(detail="La nueva contraseña debe ser diferente a la actual.")
            try:
                validate_password(new_password, user=user)
            except DjangoValidationError as e:
                raise DRFValidationError(detail=e.messages)
            user.set_password(new_password)
            user.save()
            
        # Actualizar los campos del modelo User solo si se envían en la solicitud
        user_fields = ['email', 'username', 'first_name', 'last_name']
        for field in user_fields:
            if field in request.data and request.data[field] != 'null':
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
    

