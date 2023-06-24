### BackEnd:

Luego de clonar el repositorio sera necesario crear un entorno virtual, por lo que es necesario instalar virtualenv con el siguiente comando

```sh
pip install virtualenv

```

Le decimos a Python que vamos a usar un entorno virtual y que cree la carpeta “venv“ para contenerlo

```sh
python -m virtualenv venv

```

Activamos el entorno virtual, en windows `.\venv\Scripts\activate`, en linux `./venv/Scripts/activate`

Con el entorno virtual activado, debemos intalar DJANGO y las librerias necesarias para el proyecto

Pueden instalar todo con el siguiente comando

```sh
pip install -r requirements.txt

```

O también pueden instalarlos de la siguiente forma

```sh
pip install django djangorestframework django-cors-headers mysqlclient pillow django-rest-passwordreset django-allauth python-decouple

```

Para poder ejecutar el stack de backend, ademas de contar con Python instalado, es necesario una base de datos MySQL corriendo de nombre "dbferia". Una manera sencilla de tener una base de datos mySQL es mediante Docker, que una vez instaldo solo sera necesario ejecutar el siguiente comandos

```sh
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql

```

Ahora podemos abrir una nueva terminal y ejecutar los siguientes comandos para ingresar a la base de datos desde docker

```sh
docker exec -it mysql bash

```

```sh
mysql -u root -p 

```

Y ahora nos deberia pedir la contraseña

![image](https://user-images.githubusercontent.com/85143329/234152149-9a2936c8-60d0-4cdf-8436-f37915052e4c.png)

una vez que ingresemos la contraseña accederemos a la base de datos por comando y debemos ver algo similar a esto

![image](https://user-images.githubusercontent.com/85143329/234152449-479781cf-98ca-4f7b-b9ca-abb8be681020.png)

En el bash de MySQL ejecutamos los siguientes comandos

```sql
CREATE DATABASE dbferia;

```

```sh
USE dbferia;

```

Listo tenemos nuestra base de datos creada y seleccionada podemos volver a la terminal en la que tenemos el entorno virtual de Python y ejecutamos el siguiente comando para hacer las migraciones que crean la estructura de la base de datos

```sh
py manage.py migrate

```

![image](https://user-images.githubusercontent.com/85143329/234153185-17f9d91d-dc76-4646-a7af-70005fa67b79.png)

Podemos volver al Bash de MySQL y ejecutar `show tables;` y deberiamos obtener algo similar a lo siguiente que confirman la estructura de la base de datos

![image](https://user-images.githubusercontent.com/85143329/234153380-fbe92bc0-6d77-43dd-a3d7-ebaf7e6cddf6.png)

Nuevamente, en nuestro entorno virtual, vamos a crear un superusuario con el siguiente comando:

```sh
py manage.py createsuperuser
```

Se te pedirá un correo electrónico, nombre, apellido, contraseña y confirmación de la contraseña. Completa la información para crear el superusuario.

Una vez creado el usuario, activamos el servidor con el siguiente comando:
```sh
py manage.py runserver
```

El servidor se iniciará en una dirección IP y un puerto por defecto, como por ejemplo: http://127.0.0.1:8000/. Copia esta dirección y pégala en tu navegador.

Cuando accedas a la dirección por defecto http://127.0.0.1:8000/, verás que Django se está ejecutando correctamente.

Para acceder al panel de administración de Django, agrega /admin a la dirección IP, de la siguiente manera: http://127.0.0.1:8000/admin. Inicia sesión con el usuario y la contraseña del superusuario que creaste recientemente.

Si deseas insertar registros en la base de datos, puedes ejecutar un script que se encuentra en la [documentación del repositorio.](https://github.com/soleforna/integrador_ISP2/blob/main/Document/09%20-%20Script%20-%20Registros.sql) 



