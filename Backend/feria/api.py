
from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(stock__gt=0) #de esta manera solo se muestran los articulos que tienen stock
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleSerializer
    lookup_field = 'pk' #para que se pueda buscar por id en la url
    
    @action(detail=True, methods=['POST'], permission_classes=[permissions.IsAuthenticated])
    def add_review(self, request, pk=None):
        article = self.get_object()  # Obtener el artículo
        serializer = ReviewSerializer(data=request.data)  # Instanciar el serializador de reseñas

        if serializer.is_valid():
            review = serializer.save(client=request.user)  # Crear la reseña y asociarla al cliente actual
            article.review.add(review)  # Agregar la reseña al artículo
            return Response(serializer.data, status=status.HTTP_201_CREATED) # Responder con la reseña creada
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Responder con los errores del serializador

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ReviewSerializer
    lookup_field = 'pk'

class ComentViewSet(viewsets.ModelViewSet):
    queryset = Coment.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ComentSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CartSerializer
    lookup_field = 'pk' #para que se pueda buscar por id en la url
    
    def remove_product(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product_id')

        if product_id: # Si se envió el id del producto
            cart_details = CartDetail.objects.filter(cart=cart, item_id=product_id) # Buscar el detalle del carrito

            if cart_details.exists(): # Si existe el detalle
                cart.products.remove(*[cd.item for cd in cart_details]) # Remover el producto del carrito
                return Response({'message': 'Producto eliminado del carrito correctamente.'}, status=status.HTTP_200_OK) # Responder con un mensaje
            else: # Si no existe el detalle
                return Response({'error': 'Producto no encontrado en el carrito.'}, status=status.HTTP_404_NOT_FOUND) # Responder con un error
        else: # Si no se envió el id del producto
            return Response({'error': 'El producto es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST) # Responder con un error

class CartDetailsViewSet(viewsets.ModelViewSet):
    queryset = CartDetail.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CartDetailSerializer
    
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'pk' #para que se pueda buscar por id en la url
    
    def get_permissions(self):
        if self.action == 'create':  # Permite crear clientes sin autenticación
            return [permissions.AllowAny()]
        else:  # Requiere autenticación para otras acciones
            return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['GET'])
    def auth(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
