# Data Warehouse
## Tabla de contenido
1. [Informacion General](#información-general)
2. [Requisitos para instalacion](#requisitos-para-instalacion)
3. [Guia de instalacion](#guia-de-instalacion)
4. [Conclusion](#conclusion)

### Informacion General
***
Permite a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

### Requisitos para instalacion
***
* Tener descargado e intalado git. En caso de no tener instalado el programa, puede seguir el siguiente paso a paso:\
https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git
* Tener descargado e intalado node.js. En caso de no tener instalado el programa, puede seguir el siguiente paso a paso:\
https://blog.nubecolectiva.com/que-es-y-como-instalar-node-js/
* Tener descargado e intalado node.js. En caso de no tener instalado el programa, puede seguir el siguiente paso a paso:\
https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html

### Guia de instalacion
***
1. Crear una carpeta en tu directorio local.
2. Desde la terminal o un cmd ubicarse en el directorio creado.
3. Ejecutar el siguiente comando:\
$ git clone https://github.com/maldjhon/data_warehouse.git
4. Ejecutar el siguiente comando para ubicarse en el directorio app:\
$ cd .\Backend\app
5. Luego de finalizar ejecutar el siguiente comando:\
$ npm install
6. Validar que se haya generado el directorio node_modules
7. Ubicar el archivo .env dar clic derecho y abrir con un editor (block de notas, notepad++, etc)
8. Editar los siguientes parámetros teniendo en cuenta los datos de la base de datos creada:\
DB_USER: Usuario de base de datos\
DB_PASS: Contraseña de base de datos\
DB_NAME: sql10424653.
9. Una vez realizado los ajustes al archivo .env, ingresar MySQL
10. Ejecutar el archivo "create_database.sql" en un editor en MySQL. Este archivo se encuentra en el directorio clonado:\
$ \path_directorio_clonado\Backend\app\sql\create_database.sql
12. Una vez ejecutadas todas las sentencias de sql, desde la terminal o cmd ubicado en el directorio ejecutar el comando:\
$ node app.js
13. Luego de ejecutar el comando, validar las siguientes entradas en la consola que confirman la correcta conexión con la base de datos y la aplicación:\
$ Conexión exitosa...\
$ Aplicación Inicializando...
14. En un navegador (Chrome, Edge, Explorer, etc) ingresar la siguiente URL:\
http://localhost:3000/api-docs

### Conclusion
***
> Una vez finalizado los pasos anterior se tendrá funcionando la aplicación y se mostrará la documentación de cada API para su consumo.
