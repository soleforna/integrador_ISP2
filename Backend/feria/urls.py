
from django.urls import include, path
from rest_framework import routers
from .api import *

routers = routers.DefaultRouter()

routers.register('api/articles', ArticleViewSet, 'articles')
routers.register('api/categories', CategoryViewSet, 'categories')
routers.register('api/reviews', ReviewViewSet, 'reviews')
routers.register('api/clients', ClientViewSet, 'clients')
routers.register('api/cart', CartViewSet, basename='cart')
routers.register('api/cartdetails', CartDetailsViewSet, 'cartdetails')
routers.register('api/coments', ComentViewSet, 'coments')


urlpatterns = [
    path('', include(routers.urls)),
    path('api/cart/<int:pk>/remove_product/', CartViewSet.as_view({'post': 'remove_product'}), name='cart-remove-product'),
]
