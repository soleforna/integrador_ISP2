
### BackEnd:

Para poder ejecutar el stack de backend, es necesario contar con Python instalado, una base de datos PostgresSQL corriendo de nombre `dbferia`

Una manera sencilla de tener una base de datos Postgres es mediante Docker, que una vez instaldo solo sera necesario ejecutar el siguiente comandos

```
docker run -d --name postgres-server -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -e "POSTGRES_PASSWORD=root" postgres
```


Luego de clonar el repositorio sera necesario crear un entorno virtual, por lo que es necesario instalar virtualenv con el siguiente comando

```
pip install virtualenv
```
Le decimos a Python que vamos ausar un entorno virtual y que cree la carpeta “venv“ para contenerlo
```
python -m virtualenv venv
```
Activamos el entorno virtual, en windows ```.\venv\Scripts\activate```, en linux ```./venv/Scripts/activate```

Con el entorno virtual activado, debemos intalar DJANGO y las librerias necesarias para el proyecto
```
pip install django djangorestframework django-cors-headers mysqlclient pillow
```
Hoara podemos habrir una nueva terminal y ejecutar los siguientes comandos para ingresar a la base de datos desde docker
```
docker exec -it mysql-db bash
```
```
mysql -u root -p 
```
Y ahora nos deberia pedir la contraseña



Luego de eso ejecutamos el siguiente comando para hacer las migraciones para crear la estructura de la base de datos
```
py manage.py migrate
```

Ejecutamos el server

```
py manage.py runserver
```
Luego de eso paramos el servidor con ctr + c y ejecutamos el siguiente comando para hacer las migraciones
```
py manage.py migrate
```
Luego de haber hecho las migraciones pasaremos a crear un superusuario con el siguiente comando

```py manage.py createsuperuser```, Nos pedira un usuario un password, la confirmación del password y un correo

Una ves creado el usuario volvemos a activar el servidor, ``` py manage.py runserver```, nos dejara una ip con un puerto por defecto y es  ```http://127.0.0.1:8000/```, la copiamos y pegamos en el navegador

Cuando accedemos a la ip por defecto ```http://127.0.0.1:8000/ ``` veremos que django esta corriendo correctamente

Para acceder al panel de django agregamos  ```/admin ``` a la ip quedaria así,  ```http://127.0.0.1:8000/admin ```, nos logueamos con el usuario y el password recientemente creados

Cuando traemos cambios a nuestro django hay que utilizar el siguiente comando para hacer las migraciones
```
py manage.py makemigrations
```





