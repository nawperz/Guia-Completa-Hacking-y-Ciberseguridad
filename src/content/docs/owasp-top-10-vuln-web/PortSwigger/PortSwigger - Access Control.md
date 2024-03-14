---
title: Access Control | PortSwigger
---

Labs práctictos de la seccion de Access Control de PortSwigger resueltos y explicados:

#### Lab: Unprotected admin functionality


```
# La pagina tiene /robots.txt -> dice que podemos acceder a /administrator-panel -> eliminamos usuario Carlos
```

----

#### Lab: Unprotected admin functionality with unpredictable URL

```
# Mirando el código fuente de la página, podemos ver código de JS que dice que si somos el usuario admin, tenemos acceso al directorio /admin-exxonum, asi que simplmenete accedemos a el y eliminamos al usuario carlos.
```

----
#### Lab: User role controlled by request parameter

```
# Simplemente entramos en la cuenta de wiener, hacemos F5, interceptamos la petición, y con el intercepter encendido cambiamos el parametro Admin=false por true hasta llegar a eliminar al usuario carlos.
```

----

#### Lab: User role can be modified in user profile

```
# para acceder a /admin necesitamos roleid=2, asi que entremos a la cuenta de wiener e intententemos cambiar el email. Interceptamos la petición y la mandamos al repeater. vemos que al mandarla se tramita de la siguiente manera:
{
  "username": "wiener",
  "email": "testeo@testeo.com",
  "apikey": "ImgM8n5w5XSVnfHvix3IX1kw7MJ42izL",
  "roleid": 1
}

# asi que lo copiamos tal cual y cambiamos roleid por 2
```

----

#### Lab: User ID controlled by request parameter

```
# El parámetro /my-account?id=x es cambiable, por lo que cambiamos "wiener" por "carlos"
```

----

#### Lab: User ID controlled by request parameter, with unpredictable user IDs


```
# Navegando entre los posts, podemos ver como hay uno que ha sido creado por el usuario carlos. entramos en el, F5 -> interceptamos peticion y copiamos USER-id, y ya podemos usarlo para logearnos como él.
```

-----

#### Lab: User ID controlled by request parameter with data leakage in redirect

```
# Podemos modificar de nuevo el parametro id= asi que lo mandamos al repeater, lo cambiamos por carlos y enviamos asi obtenemos su API key
```

-----

#### Lab: User ID controlled by request parameter with password disclosure

```
# Entrando en la cuenta de wiener y vamos a "Home" interceptando la peticion con burp. Vemos que podemos cambiar el parametro account-id por administrator y copiamos su contraseña.
```

-----

#### Lab: Insecure direct object references


```
# Investigando el codigo de la pagina fuente, vemos que los trascripts se descargan del directorio /download-transcript + numero del trascript, por ejemplo: /download-transcript/5.txt , no obstante, no empieza por 1.txt, sino por 2.txt, por lo que podemos descargar el archivo 1.txt directamente accediento a dicho directorio: url/download-transcript/1.txt y ya podremos ver la contraseña del usuario Carlos.
```

----

#### Lab: URL-based access control can be circumvented

```
# No podemos acceder al /admin-panel desde nuestro usuario. Por lo tanto, haremos uso del header X-Original-URL, al cual le agregaremos /admin/, de la siguiente manera:
X-Original-URL: /admin/
# Y borramos /admin en el GET del header. De esta manera, conseguiremos acceder a dicho directorio. Una vez dentro, volvemos a interceptar la petición , y cambiamos el GET a ?username=carlos, mientras que el X-Original-URL: /admin/delete
```

----

#### Lab: Method-based access control can be circumvented


```
# Abrimos 2 pestañas nuevas: en una entramos con la cuenta de administrator y en la otra con wiener. 
# Desde la cuenta del administrator, intentamos hacer admin a carlos e interceptamos la petición. La mandamos al repeater. 
# Ahora, desde la cuenta de Wiener, le damos al boton "home" y copiamos su cookie de sesión. 
# Posteriormente, la copiamos y pegamos en la request que hemos hecho con la cuenta administrator para subir los privilegios al usuario carlos. No obstante, la pagina es vulnerable al cambio de HEADER, por lo que haciendo click derecho > Change request method y cambiando username=carlos por username=wiener, convertiremos en administrador a al usuario Wiener.
```

----

#### Lab: Multi-step process with no access control on one step

```
# Intentamos hacer admin al usuario carlos, pero cambiamos la cookie de sesión por la del usuario no privilegiado y el campo username por "wiener"
```

-----

#### Lab: Referer-based access control

```
# Hacemos lo mismo que en el paso anterior
```