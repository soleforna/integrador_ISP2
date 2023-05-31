
from django.urls import include, path
from rest_framework import routers
from .api import *

routers = routers.DefaultRouter()

routers.register('api/articles', ArticleViewSet, 'articles')
routers.register('api/categories', CategoryViewSet, 'categories')
routers.register('api/reviews', ReviewViewSet, 'reviews')
routers.register('api/clients', ClientViewSet, 'clients')
routers.register('api/cart', CartViewSet, 'cart')
routers.register('api/cartdetails', CartDetailsViewSet, 'cartdetails')



urlpatterns = [
        path('', include(routers.urls)),
        path('api/clients/<int:pk>/',ClientViewSet.as_view({'put': 'update'}), name='client-update'),
    ] 
