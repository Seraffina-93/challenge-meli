# Challenge Meli

Este proyecto contiene la API para la resolución del challenge planteado por MELI.


## Solución propuesta

El sistema cuenta con 2 endpoints con los siguientes métodos: 

- GET /traceIP/{IP} devuelve los datos requeridos del país al cual pertenece la IP 
- GET /stats devuelve los datos de las estadísticas

Cuando se consultan los datos de un país mediante traceIP, primero se utiliza la API de geolocalización para determinar a qué país pertenece dicha IP, luego se consulta el caché de REDIS para ver si la información ya se encuentra almacenada allí, por último en caso de no estarlo, se consultan las APIs con información de paises y monedas.


### Consideraciones

- Los datos sobre paises se almacenan en cache por 1 hora
- Los datos sobre las estadísticas se almacenan en cache por 1 día


### Recursos externos
* [Geolocalización de IPs](https://ip2country.info/) 
* [Información de paises](https://ip2country.info/) 
* [Información de monedas](https://ip2country.info/) - API key: 1d36ca93d4899bf443eaea7223b4c078


## Ejecución

La solución puede ejecutarse desde Docker o pueden descargarse los archivos para desarrollo y testing local. Si se desea descargar la aplicación, a continuación se muestran los prerequisitos e instrucciones:

### Prerequisitos

- Node JS
- REDIS (puerto 6379)

Para instalar todos los paquetes necesarios y sus dependencias, utilizar npm. En caso de que esto falle, eliminar el paquete package-lock.json y ejecutar este comando nuevamente.

```
npm i
```

Para comprobar que la aplicación está corriendo correctamente, ejecutar el siguiente comando:

```
npm run start
```

Como resultado la aplicación deberá informar por consola en qué puerto está escuchando. En el entorno de desarrollo, este comando inicia la aplicación con nodemon. 

OPCIONAL:
Se puede crear una imagen de docker para el servicio de REDIS y ejecutarlo desde allí
- [REDIS Docker Official Images](https://hub.docker.com/_/redis)

