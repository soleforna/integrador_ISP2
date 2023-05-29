"""
URL configuration for drf_feriaonline project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from allauth.socialaccount.views import signup
from feria.views import GoogleLogin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('feria.urls')),
    path('api/auth/register/', RegisterView.as_view(), name="rest_register"),
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),
    path('api/auth/user/', UserDetailsView.as_view(), name="rest_user_details"),
    path('api/auth/signup/', signup, name="socialaccount_signup"),
    path('api/auth/google/', GoogleLogin.as_view(), name="google_login")
    #path('accounts', include('allauth.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
