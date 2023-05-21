from rest_framework import routers
from .api import *

routers = routers.DefaultRouter()

routers.register('api/articles', ArticleViewSet, 'articles')
routers.register('api/categories', CategoryViewSet, 'categories')
routers.register('api/reviews', ReviewViewSet, 'reviews')
#routers.register('api/clients', ClientViewSet, 'clients')
routers.register('api/cart', CartViewSet, 'cart')
routers.register('api/cartdetails', CartDetailsViewSet, 'cartdetails')


urlpatterns = routers.urls
