---
title: Information Disclosure | PortSwigger
---
Labs de Information Disclosure de PortSwigger hechos y explicados

#### Laboratorio: Revelación de información en mensajes de error

```
# El parametro productId es manejable. Ponemos cualquier cosa y vemos que nos reporta que la version que se usa es Apache Struts 2 2.3.31
```

#### Laboratorio: Revelación de información en la página de depuración

```
# Dentro del apartado sitemap vemos que la pagina tiene un cgi-bin y dentro hay un archivo .php -> Lo mandamos al repeater y damos submit. Filtramos por "SECRET_KEY" y tenemos el resultado.
```

#### Laboratorio Revelación de código fuente a través de archivos de copia de seguridad

```
# Poniendo /robots.txt en el URL; vemos que nos dice que desactivemos /backup. Entramos y vemos un archivo, dentro del cual podemos encontrar la password a la BBDD
```

#### Laboratorio Evasión de autenticación mediante revelación de información

```
# Usando el método TRACE en lugar de GET en la request HTTP estando logeados y modificando el parametro user de wiener a admin, vemos que nos da cierta información: Solo se puede acceder desde la máquina local, osea 127.0.0.1. Además, se agrega el header x-custom-ip-auth y se le asigna nuestra IP, así que vamos a usar un header para esto:
# Proxy > Options > Match and Replace > Add > Replace: X-Custom-IP-Authorization: 127.0.0.1 
# Volvemos a generar una request estando logeados en la cuenta de peter y vamos a Home y ya seríamos admin.
```

#### Laboratorio Revelación de información en el historial de control de versiones

```
# la pagina tiene el directorio /.git , vamos a descargarlo con wget -r 
# descargamos git cola (En linux con sudo apt install git-cola)
# Iniciamos git-cola y abrimos la carpeta del .git que hemos descargado, vemos que hay 2 archivos: admin.conf y admin_panel.php
# Vemos que un nuevo comit ha cambiado la contraseña del administrador por un entorno de variable 
```