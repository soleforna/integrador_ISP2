
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
routers.register('api/coments', ComentViewSet, 'coments')
routers.register('api/newsletter', NewsletterViewSet, 'newsletter')



urlpatterns = [
        path('', include(routers.urls)),    
    ] 
