from rest_framework import authentication

# clase para autenticar con el token Bearer
class BearerAuthentication(authentication.TokenAuthentication):
    keyword = 'Bearer'
