---
title: Enumeración de servicios 
---
### Enumeración del servicio SMB

[[SMB]] significa Server Message Block, es un protocolo de comunicación de red utilizado para compartir archivos, impresoras y otros recursos entre dispositivos de red. Es un protocolo propietario de Microsoft que se utiliza en sistemas operativos Windows.

Samba, por otro lado, es una implementación libre y de código abierto del protocolo SMB, que se utiliza principalmente en sistemas operativos basados en Unix y Linux. Samba proporciona una manera de compartir archivos y recursos entre dispositivos de red que ejecutan sistemas operativos diferentes, como Windows y Linux.

Aunque SMB y Samba comparten una funcionalidad similar, existen algunas diferencias notables. SMB es un protocolo propietario de Microsoft, mientras que Samba es un proyecto de software libre y de código abierto. Además, SMB es una implementación más completa y compleja del protocolo, mientras que Samba es una implementación más ligera y limitada.

A continuación, se os comparte el enlace correspondiente al proyecto de Github que utilizamos para desplegar un laboratorio de práctica con el que poder enumerar y explotar el servicio Samba:

Samba Authenticated RCE: https://github.com/vulhub/vulhub/tree/master/samba/CVE-2017-7494
Una de las herramientas que utilizamos para la fase de reconocimiento es ‘smbmap‘. Smbmap es una herramienta de línea de comandos utilizada para enumerar recursos compartidos y permisos en un servidor SMB (Server Message Block) o Samba. Es una herramienta muy útil para la enumeración de redes y para la identificación de posibles vulnerabilidades de seguridad.

Con smbmap, puedes enumerar los recursos compartidos en un servidor SMB y obtener información detallada sobre cada recurso, como los permisos de acceso, los usuarios y grupos autorizados, y los archivos y carpetas compartidos. También puedes utilizar smbmap para identificar recursos compartidos que no requieren autenticación, lo que puede ser un problema de seguridad.

Además, smbmap permite a los administradores de sistemas y a los auditores de seguridad verificar rápidamente la configuración de permisos en los recursos compartidos en un servidor SMB, lo que puede ayudar a identificar posibles vulnerabilidades de seguridad y a tomar medidas para remediarlas.

A continuación, se proporciona una breve descripción de algunos de los parámetros comunes de smbmap:

-H: Este parámetro se utiliza para especificar la dirección IP o el nombre de host del servidor SMB al que se quiere conectarse.
-P: Este parámetro se utiliza para especificar el puerto TCP utilizado para la conexión SMB. El puerto predeterminado para SMB es el 445, pero si el servidor SMB está configurado para utilizar un puerto diferente, este parámetro debe ser utilizado para especificar el puerto correcto.
-u: Este parámetro se utiliza para especificar el nombre de usuario para la conexión SMB.
-p: Este parámetro se utiliza para especificar la contraseña para la conexión SMB.
-d: Este parámetro se utiliza para especificar el dominio al que pertenece el usuario que se está utilizando para la conexión SMB.
-s: Este parámetro se utiliza para especificar el recurso compartido específico que se quiere enumerar. Si no se especifica, smbmap intentará enumerar todos los recursos compartidos en el servidor SMB.
Asimismo, otra de las herramientas que se ven en esta clase es ‘smbclient‘. Smbclient es otra herramienta de línea de comandos utilizada para interactuar con servidores SMB y Samba, pero a diferencia de smbmap que se utiliza principalmente para enumeración, smbclient proporciona una interfaz de línea de comandos para interactuar con los recursos compartidos SMB y Samba, lo que permite la descarga y subida de archivos, la ejecución de comandos remotos, la navegación por el sistema de archivos remoto, entre otras funcionalidades.

En cuanto a los parámetros más comunes de smbclient, algunos de ellos son:

-L: Este parámetro se utiliza para enumerar los recursos compartidos disponibles en el servidor SMB o Samba.
-U: Este parámetro se utiliza para especificar el nombre de usuario y la contraseña utilizados para la autenticación con el servidor SMB o Samba.
-c: Este parámetro se utiliza para especificar un comando que se ejecutará en el servidor SMB o Samba.
Estos son algunos de los parámetros más comunes utilizados en smbclient, aunque hay otros disponibles. La lista completa de parámetros y sus descripciones se pueden encontrar en la documentación oficial de la herramienta.

Por último, otra de las herramientas que utilizamos al final de la clase para enumerar el servicio Samba es ‘Crackmapexec‘. CrackMapExec (también conocido como CME) es una herramienta de prueba de penetración de línea de comandos que se utiliza para realizar auditorías de seguridad en entornos de Active Directory. CME se basa en las bibliotecas de Python ‘impacket‘ y es compatible con sistemas operativos Windows, Linux y macOS.

CME puede utilizarse para realizar diversas tareas de auditoría en entornos de Active Directory, como enumerar usuarios y grupos, buscar contraseñas débiles, detectar sistemas vulnerables y buscar vectores de ataque. Además, CME también puede utilizarse para ejecutar ataques de diccionario de contraseñas, ataques de Pass-the-Hash y para explotar vulnerabilidades conocidas en sistemas Windows. Asimismo, cuenta con una amplia variedad de módulos y opciones de configuración, lo que la convierte en una herramienta muy flexible para la auditoría de seguridad de entornos de Active Directory. La herramienta permite automatizar muchas de las tareas de auditoría comunes, lo que ahorra tiempo y aumenta la eficiencia del proceso de auditoría.

A continuación, os compartimos el enlace directo a la Wiki para que podáis instalar la herramienta:

CrackMapExec: https://wiki.porchetta.industries/getting-started/installation/installation-on-unix

---------
### Enumeración del servicio SSH

En esta clase, exploraremos el protocolo SSH (Secure Shell) y cómo realizar reconocimiento para recopilar información sobre los sistemas que ejecutan este servicio.

[[SSH]] es un protocolo de administración remota que permite a los usuarios controlar y modificar sus servidores remotos a través de Internet mediante un mecanismo de autenticación seguro. Como una alternativa más segura al protocolo Telnet, que transmite información sin cifrar, SSH utiliza técnicas criptográficas para garantizar que todas las comunicaciones hacia y desde el servidor remoto estén cifradas.

SSH proporciona un mecanismo para autenticar un usuario remoto, transferir entradas desde el cliente al host y retransmitir la salida de vuelta al cliente. Esto es especialmente útil para administrar sistemas remotos de manera segura y eficiente, sin tener que estar físicamente presentes en el sitio.

A continuación, se os proporciona el enlace directo a la web donde copiamos todo el comando de ‘docker’ para desplegar nuestro contenedor:

Docker Hub OpenSSH-Server: https://hub.docker.com/r/linuxserver/openssh-server
Cabe destacar que a través de la versión de SSH, también podemos identificar el codename de la distribución que se está ejecutando en el sistema.

Por ejemplo, si la versión del servidor SSH es “OpenSSH 8.2p1 Ubuntu 4ubuntu0.5“, podemos determinar que el sistema está ejecutando una distribución de Ubuntu. El número de versión “4ubuntu0.5” se refiere a la revisión específica del paquete de SSH en esa distribución de Ubuntu. A partir de esto, podemos identificar el codename de la distribución de Ubuntu, que en este caso sería “Focal” para Ubuntu 20.04.

Todas estas búsquedas las aplicamos sobre el siguiente dominio:

Launchpad: https://launchpad.net/ubuntu

---------
### Enumeracion del servicio FTP


En esta clase, hablaremos sobre el protocolo de transferencia de archivos (FTP) y cómo aplicar reconocimiento sobre este para recopilar información.

[[FTP]] es un protocolo ampliamente utilizado para la transferencia de archivos en redes. La enumeración del servicio FTP implica recopilar información relevante, como la versión del servidor FTP, la configuración de permisos de archivos, los usuarios y las contraseñas (mediante ataques de fuerza bruta o guessing), entre otros.

A continuación, se os proporciona el enlace al primer proyecto que tocamos en esta clase:

Docker-FTP-Server: https://github.com/garethflowers/docker-ftp-server
Una de las herramientas que usamos en esta clase para el primer proyecto que nos descargamos es ‘Hydra‘. Hydra es una herramienta de pruebas de penetración de código abierto que se utiliza para realizar ataques de fuerza bruta contra sistemas y servicios protegidos por contraseña. La herramienta es altamente personalizable y admite una amplia gama de protocolos de red, como HTTP, FTP, SSH, Telnet, SMTP, entre otros.

El siguiente de los proyectos que utilizamos para desplegar el contenedor que permite la autenticación de usuarios invitados para FTP, es el proyecto ‘docker-anon-ftp‘ de ‘metabrainz‘. A continuación, se os proporciona el enlace al proyecto:

Docker-ANON-FTP: https://github.com/metabrainz/docker-anon-ftp