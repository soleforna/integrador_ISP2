
<h1 align="center">FeriaOnLine</h1>

<p align="center">
 <a href="https://www.ispc.edu.ar/"><img src="https://user-images.githubusercontent.com/85143329/233746625-17802d1b-3bec-4d9a-9f11-644e342da582.png" style="width: 150px"></a>
</p>
<h3 align="center">Instituto Superior Politecnico de Cordoba</h3>
<h3 align="center">Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales</h3>
<h4 align="center">Proyecto Integrador Módulo Programador Web Ciclo Lectivo 2023 Cohorte 2022</h4>

#
<p align="center">
 <a href="https://github.com/soleforna/integrador_ISP2"><img src="https://user-images.githubusercontent.com/85143329/233748267-eec28e52-f959-4fa0-b9b6-f0a497aeb0d2.png" style="width: 150px"></a>
</p>
<h4 align="center">ROCKET TEAM</h4>

* [Maria Soledad Fornasier](https://github.com/soleforna)
* [Marcos Alejandro Barey](https://github.com/Marquitos280419)
* [Ariel Ricardo Mícoli](https://github.com/Ari-07x)
* [Joana Gisela Martinez](https://github.com/JoanaGM44)
* [Leonel Ezequiel Casi](https://github.com/leocas1)
* [Lautaro Palacio](https://github.com/Pala797)
* [Valeriya Lysikova](https://github.com/vlysi)
* [Adrian Edgardo Camus](https://github.com/acamus79)


#

FeriaOnLine es un aplicativo web para un negocio tipo feria americana, será uno plataforma en líneo que permitirá o los clientes comprar productos de manera fácil y seguro desde 10 comodidad de sus hogares. La aplicación contará con una amplia variedad de productos, desde ropa hasta electrodomésticos y juguetes.
Una característica clave de esto aplicación será su pasarela de pago integrado, que permitirá a los clientes realizar transacciones seguras y rápidas utilizando diferentes métodos de pago, como tarjetas de crédito y débito, transferencias bancarias y billeteras electrónicas.

En general, el aplicativo web es para una feria americana para mejorar la experiencia de clientes que desean adquirir artículos de segunda mano, aumentar la eficiencia del negocio y expandir su alcance a través de la venta en línea.

#
### Tecnologias Utilizadas

* Angular
* Python 3.11.3
* Django 
* Django Restframework
* PostgresSQL

#
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
pip install django djangorestframework psycopg2 django-cors-headers
```
Luego de instalar lo anterior nos pedira que instalamos una libreria llamada pillow que sirve para muchos formatos de imagenes en python
```
python -m pip install pillow
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
### FrontEnd:

Para ejecutar la app de angular debemos entrar a la carpeta ng_feria y luego:

```
ng serve -o
```

Luego hacemos ctrl + clic en la dirección que sale por consola para ver que está corriendo angular

Para instalar bootstrap el comando a ejecutar sería el siguiente:
```
npm install bootstrap
```
Si todo funcionó correctamente, deberías ver la carpeta bootstrap en el directorio node_modules y, en el archivo package.json la entrada "bootstrap" en el tag “dependencies”
