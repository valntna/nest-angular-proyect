# nest-angular-proyect

Desafío práctica developer CoTalker

Aplicación que en base a un archivo csv grafica las sesiones activas de los usuarios con filtros de:
* Companía
* Usuario
* Intervalo Activo
* Rango de Fecha

## Manejo del log de llamadas
Ya que son alrededor de 23 millones de datos se genera una base de datos 'llamadas.db' en SQlite a través  un script de python 'log-to-database.py'
Es un proceso corto y facilita el filtro de los datos.

Los queries a la base de datos se hacen en el backend de la aplicación, más precisamente en /backend/src/datos-sesiones por medio del controlador ```datos-sesiones.controller```
 y el servicio ```session-service```
 
 ## Cómo correr la aplicación
 
 Se tiene tanto angular como nest.js por lo que se debe usar dos comandos en forma paralela:
 ```ng serve``` en la AngularCLI y ```npm run start``` para NestJs.
 
 El servidor del frontend es ```localhost:4200``` y del backend es ```localhost:3000/datos-sesiones```
 
 Un detalle importante es que al conectarse a la base de datos por SQlite3 se debe especificar la dirección completa de dónde se ubica el archivo .db
el ```path``` se señala en la función ```init()``` en el servicio  ```session-service```.

## Uso de la aplicación
Una vez transpilados tanto el backend como el frontend basta con dirigirse a  ```localhost:4200``` en el navegador de tu preferencia y ya se puede ingresar los datos para filtrar
las llamadas y graficar las sesiones activas. Es una aplicación sencilla que tiene 5 campos:
* **Compañía:** Debe ingresarse un número
* **Usuario:** Puede ser el ID de un usuario en particular o se puede pedir ver todos los usuarios ingresando cualquier variación de 'todos' (no es case sensitive)
* **Intervalo Activo:** Se debe ingresar el intervalo en minutos
* **Fecha Inicial:** Inicio del rango que se quiere graficar (*)
* **Fecha Final:** Fin del rango que se quiere graficar (*)
* 
_(*)Deben ingresarse con formato ```YYYY-MM-DD``` para poder obtener el gráfico._

Una vez ingresados los datos se envía el formulario haciendo click en el botón 'Generar'.

Se debe esperar unos segundos para poder ver el resultado.
