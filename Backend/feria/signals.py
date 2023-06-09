from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password
from .models import Client
from django.urls import reverse
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail 
from decouple import config # Importar la función config desde decouple para leer variables de entorno

@receiver(pre_save, sender=Client) #señal para el guardado de un usuario
def encrypt_password(sender, instance, **kwargs):
    if instance.password and not instance.password.startswith('pbkdf2_'): # Verificar si la contraseña no está encriptada
        instance.password = make_password(instance.password) # Encriptar la contraseña

@receiver(reset_password_token_created)  #señal para el reseteo de contraseña
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs): #obtiene el token
    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    send_mail( #envia el mail
        # title:
        "Password Reset for {title}".format(title="Restablecer Contraseña"),#un titulo
        # message:
        email_plaintext_message,
        # from:
        config('EMAIL_HOST_USER'), #obtiene el mail desde el archivo .env
        # to:
        [reset_password_token.user.email]
    )

