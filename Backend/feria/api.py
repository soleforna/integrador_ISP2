
from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action,APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

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
    permission_classes = [permissions.AllowAny] #para que se pueda ver sin estar logueado
    serializer_class = ReviewSerializer 
    lookup_field = 'pk' #para que se pueda buscar por id en la url

class ComentViewSet(viewsets.ModelViewSet):
    queryset = Coment.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ComentSerializer
    
    def perform_create(self, serializer):
        client_id = self.request.data.get('client_id')
        try:
            client = Client.objects.get(id=client_id)
            serializer.save(client=client)
        except Client.DoesNotExist:
            raise ValidationError("El cliente especificado no existe.")

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

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        cart = self.get_object()
        client_id = request.data.get('client_id')

        if client_id is not None:
            try:
                cart.client_id = client_id
                cart.set_confirm()

                # Reducción de stock al confirmar el carrito
                if cart.confirm:
                    for cart_detail in cart.cartdetail_set.all():
                        if cart_detail.item.stock < cart_detail.quantity:
                            error_message = f"No hay stock suficiente para el artículo '{cart_detail.item.name}'."
                            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
                        cart_detail.item.stock -= cart_detail.quantity
                        cart_detail.item.save()

                cart.save()
                serializer = self.get_serializer(cart)
                return Response({'message': 'Compra confirmada.', 'cart': serializer.data}, status=status.HTTP_200_OK)
            except Cart.DoesNotExist:
                return Response({'error': 'Carrito no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'client_id es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST)

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
    
class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsletterSerializer
    
class ConfirmedCartsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user  # Obtener el usuario logueado
        
        confirmed_carts = Cart.objects.filter(client=user, confirm=True)  # O Cart.objects.filter(client_id=user.id, confirm=True)
        
        if not confirmed_carts:
            return Response({'error': 'No se encontraron carritos confirmados para el usuario logueado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(confirmed_carts, many=True)
        return Response(serializer.data)