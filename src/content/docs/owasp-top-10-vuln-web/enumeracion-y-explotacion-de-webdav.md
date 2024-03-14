---
title: Enumeración y explotación de WebDav
---
**WebDAV** (**Web Distributed Authoring and Versioning**) es una extensión del protocolo HTTP que permite a los usuarios **acceder** y **manipular** **archivos** en un servidor web a través de una conexión segura.

![que es webdav](../anexos/webdav/que-es-webdav.png)

## Qué es WEBDAV?
Cuando hablamos de enumerar un servidor WebDAV, a lo que nos referimos es al proceso de recopilar información sobre los recursos disponibles en el servidor WebDAV. Los atacantes pueden utilizar herramientas de enumeración de WebDAV para buscar recursos protegidos en el servidor, como archivos de configuración, contraseñas y otros datos confidenciales. Los atacantes pueden utilizar la información recopilada durante la enumeración para planificar ataques más sofisticados contra el servidor.

A continuación, se proporciona el enlace al proyecto de Github el cual estaremos usando en esta clase para desplegar un entorno vulnerable con el que poder practicar:

-   **WebDav**: [https://hub.docker.com/r/bytemark/webdav](https://hub.docker.com/r/bytemark/webdav)

## Ejemplo de vulnerar un WEBDAV

Descargue la imagen de Docker realizada por "bytemark/webdav".

```bash
docker pull bytemark/webdav
```

![pull webdav](../anexos/webdav/pull-webdav.png)
Verificamos si la imagen fue descargada correctamente:

![image webdav](../anexos/webdav/image-webdav.png)
Clean Docker images, containers, volumes and networks on the .bashrc or .zshrc:

```bash
cleanDocker () {
	docker rm $(docker ps -a -q) --force 2> /dev/null
	docker rmi $(docker images -q) 2> /dev/null
	docker network rm $(docker network ls -q) 2> /dev/null
	docker volume rm $(docker volume ls -q) 2> /dev/null
}
```
Ya con esto estamos preparados para desplegar el contenedor de Docker.

```bash
docker run --restart always -v /srv/dav:/var/lib/dav 
-e AUTH_TYPE=Digest -e USERNAME=admin -e PASSWORD=richard
--publish 80:80 -d bytemark/webdav
```

![webdav container](../anexos/webdav/webdav-container.png)
Vamos a utilizar **WhatWeb** para detectar tecnologías que corren por detrás de la pagina web así como el gestor de contenidos, etc.
Asimismo, esta fase inicial de reconocimiento implica el intentar identificar las **extensiones de archivo** permitidas en el servidor. Una vez detectadas las extensiones de archivo permitidas, los atacantes pueden aprovecharse de esto para cargar y ejecutar archivos que contengan código malicioso. Si los archivos maliciosos se cargan y ejecutan con éxito en el servidor web, los atacantes pueden obtener acceso no autorizado al servidor y comprometer la seguridad del sistema.

![whatweb webdav](../anexos/webdav/whatweb-webdav.png)

Una de las herramientas que vemos en esta clase es **Davtest**. La herramienta Davtest es una herramienta de línea de comandos que se utiliza para realizar pruebas de penetración en servidores WebDAV. Davtest puede utilizarse para enumerar recursos protegidos en un servidor WebDAV, así como para probar la configuración de seguridad del servidor. Davtest también puede utilizarse para probar la autenticación y la autorización del servidor, y para detectar vulnerabilidades conocidas.

```bash
cat /usr/share/wordlists/rockyou.txt | while read password; do response=$(davtest -url http://127.0.0.1 -auth admin:$password 2>&1 | grep -i succeed); if [ $response ]; then echo "[+] La contraseña correcta es $password"; break; fi; done
```
![davtest webdav](../anexos/webdav/davtest-webdav.png)

Otra de las herramientas que vemos en esta clase es **Cadaver**. Cadaver es otra herramienta de línea de comandos que se utiliza para interactuar con servidores WebDAV. Cadaver permite a los usuarios navegar por los recursos del servidor, cargar y descargar archivos, y ejecutar comandos en el servidor. Cadaver también puede utilizarse para realizar pruebas de penetración en servidores WebDAV, como la enumeración de recursos protegidos y la explotación de vulnerabilidades conocidas.
Creamos un archivo.txt en el mismo directorio donde entraremos con Cadaver:

![cat txt webdav](../anexos/webdav/cat-txt-webdav.png)
Entramos con las credenciales recopiladas anteriormente:

![cadaver webdav](../anexos/webdav/cadaver-webdav.png)
Una vez dentro podemos crear directorios y transferir archivos con put:

![mkdir webdav](../anexos/webdav/mkdir-webdav.png)
![put webdav](../anexos/webdav/put-webdav.png)
Entramos a la URL con las credenciales para verificar si el archivo .txt se subió correctamente:

![validation webdav](../anexos/webdav/validation-webdav.png)
SUCESSFUL!

![comprometido webdav](../anexos/webdav/comprometido-webdav.png)

Para *prevenir la enumeración y explotación de WebDAV*, es importante que los administradores de sistemas implementen medidas de seguridad adecuadas en el servidor. Esto puede incluir la limitación de los recursos disponibles en el servidor y la utilización de autenticación y autorización fuertes. Además, es importante que los usuarios protejan sus contraseñas y eviten el uso de contraseñas débiles o fáciles de adivinar.