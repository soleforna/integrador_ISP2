import re, os
from rest_framework.serializers import ValidationError

#Metodo general para validar con expresiones regulares
def validate_field(value, regex, error_message): #recibe el valor, la expresion regular y el mensaje de error
    if not re.fullmatch(regex, value): #si no coincide con la expresion regular
        raise ValidationError(error_message) #se devuelve el mensaje de error

def phone_valid(phone): #validar el telefono
    regex = r'^[0-9]{8,12}$' #expresion regular para validar el telefono (8 a 12 digitos)
    error_message = 'El teléfono debe contener solo dígitos y tener entre 8 y 12 caracteres.' #mensaje de error
    validate_field(str(phone), regex, error_message) #validar el campo

def name_valid(first_name): #validar el nombre
        regex = r'^[a-zA-Z\s]{3,}$' #expresion regular para validar el nombre
        error_msg = 'El nombre debe tener al menos 3 caracteres y solo puede contener letras y espacios.' #mensaje de error
        validate_field(first_name, regex, error_msg) #validar el campo
        
def address_valid(address): #validar la direccion
        regex = r'^[a-zA-Z0-9\s\.,#-]{5,}$' #expresion regular para validar la direccion (5 o mas caracteres)
        error_msg = 'La dirección debe tener al menos 5 caracteres y solo puede contener letras, números, espacios y los caracteres .,#-' #mensaje de error
        validate_field(address, regex, error_msg) #validar el campo

def validate_image(image):
    regex = r'^.*\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$'
    error_msg = 'El archivo no es una imagen válida.'
    validate_field(image.name, regex, error_msg)
