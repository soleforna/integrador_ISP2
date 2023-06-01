"""
Django settings for drf_feriaonline project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1+@!lq-l#bx5bd4_(l&plno(9w^e908&y62p1)1*w$qc!wf#q4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#add CORS
ALLOWED_HOSTS = ['*'] # add 'localhost' for CORS
CORS_ORIGIN_ALLOW_ALL = False # If this is used then `CORS_ORIGIN_WHITELIST` will not have any effect
CORS_ORIGIN_WHITELIST = ('http://localhost:4200',) 

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
        'feria', #add App_name
        'rest_framework', #add REST
        'rest_framework.authtoken', #add Token Authentication
        'corsheaders',  #add CORS
        'allauth', #add allauth
        'allauth.account', #add allauth
        'allauth.socialaccount', #add allauth
        'allauth.socialaccount.providers.google', #add allauth
        'dj_rest_auth',
        'dj_rest_auth.registration',
        'django_rest_passwordreset',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
        'corsheaders.middleware.CorsMiddleware',  #add CORS
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'drf_feriaonline.urls'

#add MEDIA
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') 
MEDIA_URL = '/media/' 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'drf_feriaonline.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# SQLite
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': BASE_DIR / 'db.sqlite3',
#    }
#}

# PostgreSQL
#DATABASES = {
#    'default': {
#    'ENGINE': 'django.db.backends.postgresql',
#    'NAME': 'dbferia',
#		'HOST': 'localhost',
#		'USER': 'postgres',
#		'PASSWORD': 'root',   
#    }
#}

# MySQL
DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.mysql',	
    'NAME': 'dbferia',
        'USER': 'root',
        'PASSWORD':'root',
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {'init_command': "SET sql_mode = 'STRICT_TRANS_TABLES'"}
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'es'

TIME_ZONE = 'America/Argentina/Buenos_Aires'

USE_I18N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField' #add BigAutoField

#para que no agregue la barra al final de la url
APPEND_SLASH = False 

#add REST
REST_FRAMEWORK = { 
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ]
}

#add allauth
SOCIALACCOUNT_PROVIDERS = { 
    "google": {
        "APP": {
            "client_id": "",  # replace whit your client_id
            "secret": "",        # replace whit your secret
            "key": "",                               # leave empty
        },
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
        "VERIFIED_EMAIL": True,
    },
}

#LOGIN_REDIRECT_URL ='https://localhost:4200/producto'

# SOCIALACCOUNT_PROVIDERS = {
#     'google': {
#         'SCOPE': [
#             'profile',
#             'email',
#         ],
#         'AUTH_PARAMS': {
#             'access_type': 'online',
#         },
#         'OAUTH_PKCE_ENABLED': True,
#     }
# }

#django all auth settings
AUTHENTICATION_BACKENDS = {  
    #Needed to login username in Django admin, regardless of 'allauth'
    'django.contrib.auth.backends.ModelBackend',
    # allauth specific authentication methods, such as login by e-mail 
    'allauth.account.auth_backends.AuthenticationBackend',
}

from decouple import config # esto sirve para que acepte lo de la variable de entorno

# todo esto esta configutado en un .env "variable de entorno"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST =  config('EMAIL_HOST')  # Dirección del servidor SMTP
EMAIL_PORT =  config('EMAIL_PORT')  # Puerto del servidor SMTP
EMAIL_USE_TLS =  True  # Utiliza TLS para una conexión segura
EMAIL_HOST_USER =  config('EMAIL_HOST_USER')  # Nombre de usuario del servidor SMTP (si es necesario)
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')  # Contraseña del servidor SMTP (si es necesario)
EMAIL_USE_SSL = False
#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

SITE_ID = 1 # Le decimos a django que utilice el primer sitio como predeterminado

ACCOUNT_EMAIL_VERIFICATION = "none" # Le decimos a django que no envie un mail de verificacion
ACCOUNT_AUTHENTICATION_METHOD = "email" # Le decimos a django que el metodo de autenticacion sera el email
ACCOUNT_EMAIL_REQUIRED = True   # Le decimos a django que el email es requerido
SOCIALACCOUNT_PROVIDERS = {'google': {'SCOPE': ['profile', 'email']}}   # Le decimos a django que queremos obtener el email y el perfil de google
