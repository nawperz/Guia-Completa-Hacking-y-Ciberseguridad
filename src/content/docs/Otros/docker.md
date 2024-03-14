---
title: Tutorial Docker
---
### Port Forwarding en Docker y uso de monturas

El port forwarding, también conocido como reenvío de puertos, nos permite redirigir el tráfico de red desde un puerto específico en el host a un puerto específico en el contenedor. Esto nos permitirá acceder a los servicios que se ejecutan dentro del contenedor desde el exterior.

Para utilizar el port forwarding, se utiliza la opción “-p” o “–publish” en el comando “docker run“. Esta opción se utiliza para especificar la redirección de puertos y se puede utilizar de varias maneras. Por ejemplo, si se desea redirigir el puerto 80 del host al puerto 8080 del contenedor, se puede utilizar la siguiente sintaxis:

```` go
docker run -p 80:8080 mi_imagen
````


Esto redirigirá cualquier tráfico entrante en el puerto 80 del host al puerto 8080 del contenedor. Si se desea especificar un protocolo diferente al protocolo TCP predeterminado, se puede utilizar la opción “-p” con un formato diferente. Por ejemplo, si se desea redirigir el puerto 53 del host al puerto 53 del contenedor utilizando el protocolo UDP, se puede utilizar la siguiente sintaxis:

 ```go
docker run -p 53:53/udp mi_imagen
```

Las monturas, por otro lado, nos permiten compartir un directorio o archivo entre el sistema host y el contenedor. Esto nos permitirá persistir la información entre ejecuciones de contenedores y compartir datos entre diferentes contenedores.

Para utilizar las monturas, se utiliza la opción “-v” o “–volume” en el comando “docker run“. Esta opción se utiliza para especificar la montura y se puede utilizar de varias maneras. Por ejemplo, si se desea montar el directorio “/home/usuario/datos” del host en el directorio “/datos” del contenedor, se puede utilizar la siguiente sintaxis:

```go
docker run -v /home/usuario/datos:/datos mi_imagen
```

Esto montará el directorio “/home/usuario/datos” del host en el directorio “/datos” del contenedor. Si se desea especificar una opción adicional, como la de montar el directorio en modo de solo lectura, se puede utilizar la opción “-v” con un formato diferente. Por ejemplo, si se desea montar el directorio en modo de solo lectura, se puede utilizar la siguiente sintaxis:

```go
docker run -v /home/usuario/datos:/datos:ro mi_imagen
```

En la siguiente clase, veremos cómo desplegar máquinas vulnerables usando Docker-Compose.

Docker Compose es una herramienta de orquestación de contenedores que permite definir y ejecutar aplicaciones multi-contenedor de manera fácil y eficiente. Con Docker Compose, podemos describir los diferentes servicios que componen nuestra aplicación en un archivo YAML y, a continuación, utilizar un solo comando para ejecutar y gestionar todos estos servicios de manera coordinada.

En otras palabras, Docker Compose nos permite definir y configurar múltiples contenedores en un solo archivo YAML, lo que simplifica la gestión y la coordinación de múltiples contenedores en una sola aplicación. Esto es especialmente útil para aplicaciones complejas que requieren la interacción de varios servicios diferentes, ya que Docker Compose permite definir y configurar fácilmente la conexión y la comunicación entre estos servicios.

--------
### Comandos comunes para la gestión de contenedores DOCKER

A continuación, se detallan algunos de los comandos vistos en esta clase:

```go
docker rm $(docker ps -a -q) –force
```
este comando se utiliza para eliminar todos los contenedores en el sistema, incluyendo los contenedores detenidos. La opción “-q” se utiliza para mostrar sólo los identificadores numéricos de los contenedores, y la opción “–force” se utiliza para forzar la eliminación de los contenedores que están en ejecución. Es importante tener en cuenta que la eliminación de todos los contenedores en el sistema puede ser peligrosa, ya que puede borrar accidentalmente contenedores importantes o datos importantes. Por lo tanto, se recomienda tener precaución al utilizar este comando.
docker rm id_contenedor: este comando se utiliza para eliminar un contenedor específico a partir de su identificador. Es importante tener en cuenta que la eliminación de un contenedor eliminará también cualquier cambio que se haya realizado dentro del contenedor, como la instalación de paquetes o la modificación de archivos.
```go
docker rmi $(docker images -q)
```
este comando se utiliza para eliminar todas las imágenes de Docker en el sistema. La opción “-q” se utiliza para mostrar sólo los identificadores numéricos de las imágenes. Es importante tener en cuenta que la eliminación de todas las imágenes de Docker en el sistema puede ser peligrosa, ya que puede borrar accidentalmente imágenes importantes o datos importantes. Por lo tanto, se recomienda tener precaución al utilizar este comando.
docker rmi id_imagen: este comando se utiliza para eliminar una imagen específica a partir de su identificador. Es importante tener en cuenta que la eliminación de una imagen eliminará también cualquier contenedor que se haya creado a partir de esa imagen. Si se desea eliminar una imagen que tiene contenedores en ejecución, se deben detener primero los contenedores y luego eliminar la imagen.
En la siguiente clase, veremos cómo aplicar port fowarding y cómo jugar con monturas. El port forwarding nos permitirá redirigir el tráfico de red desde un puerto específico en el host a un puerto específico en el contenedor, lo que nos permitirá acceder a los servicios que se ejecutan dentro del contenedor desde el exterior.

Las monturas, por otro lado, nos permitirán compartir un directorio o archivo entre el sistema host y el contenedor, lo que nos permitirá persistir la información entre ejecuciones de contenedores y compartir datos entre diferentes contenedores.

------
### Carga de instrucciones en Docker y desplegando nuestro primer contenedor

Ya habiendo construido en la clase anterior nuestra primera imagen, ¡ya estamos preparados para desplegar nuestros contenedores!

El comando “docker run” se utiliza para crear y arrancar un contenedor a partir de una imagen. Algunas de las opciones más comunes para el comando “docker run” son:

“-d” o “–detach“: se utiliza para arrancar el contenedor en segundo plano, en lugar de en primer plano.
“-i” o “–interactive“: se utiliza para permitir la entrada interactiva al contenedor.
“-t” o “–tty“: se utiliza para asignar un seudoterminal al contenedor.
“–name“: se utiliza para asignar un nombre al contenedor.
Para arrancar un contenedor a partir de una imagen, se utiliza el siguiente comando:

``` go
docker run [opciones] nombre_de_la_imagen
```

Por ejemplo, si se desea arrancar un contenedor a partir de la imagen “mi_imagen“, en segundo plano y con un seudoterminal asignado, se puede utilizar la siguiente sintaxis:

```go
docker run -dit mi_imagen
```

Una vez que el contenedor está en ejecución, se puede utilizar el comando “docker ps” para listar los contenedores que están en ejecución en el sistema. Algunas de las opciones más comunes son:

“-a” o “–all“: se utiliza para listar todos los contenedores, incluyendo los contenedores detenidos.
“-q” o “–quiet“: se utiliza para mostrar sólo los identificadores numéricos de los contenedores.
Por ejemplo, si se desea listar todos los contenedores que están en ejecución en el sistema, se puede utilizar la siguiente sintaxis:

```go
docker ps -a -q
```

Para ejecutar comandos en un contenedor que ya está en ejecución, se utiliza el comando “docker exec” con diferentes opciones. Algunas de las opciones más comunes son:

“-i” o “–interactive“: se utiliza para permitir la entrada interactiva al contenedor.
“-t” o “–tty“: se utiliza para asignar un seudoterminal al contenedor.
Por ejemplo, si se desea ejecutar el comando “bash” en el contenedor con el identificador “123456789“, se puede utilizar la siguiente sintaxis:

```go 
docker exec -it 123456789 bash
```
