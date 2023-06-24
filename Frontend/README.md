
### FrontEnd:

Para ejecutar la app de angular debemos entrar a la carpeta ng_feria y luego:

```
ng serve -o
```
Luego...

```
npm install
```
y finalmente: 

```
npm install -g @angular/cli
```
Luego hacemos ctrl + clic en la dirección que sale por consola para ver que está corriendo angular

Para instalar bootstrap el comando a ejecutar sería el siguiente:
```
npm install bootstrap
```
Si todo funcionó correctamente, deberías ver la carpeta bootstrap en el directorio node_modules y, en el archivo package.json la entrada "bootstrap" en el tag “dependencies”



Para evitar que surjan errores por cuestiones horarias debemos intalar la siguiente biblioteca

```
npm install moment-timezone
```

Para integrar los elementos necesarios para que funcione la pasarela de pago con el servicio Paypal debemos ingresar los siguientes comandos: 
```
ng add @ng-bootstrap/ng-bootstrap
npm i ngx-paypal
npm i ngx-spinner

```

