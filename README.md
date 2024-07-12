# PROYECTO PRUEBA NODE-ORACLE

## Tecnologías
Node 20.15.1 <br>
NVM 1.1.11 (opcional)

## Configuración
Agrega de los datos de tu BD Oracle en el siguiente archivo: /src/config/keys.js y guarda

## Run
En la consola ejecuta el comando "npm install" para instalar dependencias node <br>
Después ejecuta el comando "npm run dev", correra un servidor "http://localhost:3001"

## Verifica la BD
En tu BD se deberion haber creado 2 tablas, Usuarios y Session

## Prueba
En postman puedes ejecutar los endpoint
<ul><li>/qualitas-clm/api/user/create</li><li>/qualitas-clm/api/login</li><li>/qualitas-clm/api/user</li></ul>

##### No olvides colocar el token bearer
