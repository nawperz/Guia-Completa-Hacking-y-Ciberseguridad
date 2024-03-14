---
title: Cheatsheet Curl en Bash
---
No tiene mucho misterio esto, asi que vamos a ello:

Anotación antes de empezar:


```
➡️ Es que el comando es principal
🔻 Es que se le pueden agregar cosas
```

## OPCIONES COTIADIANAS

```bash
🔻-v # --verbose
➡️ curl --verbose --header "Host: www.test.com:1234" test.me # Usar cabecera específica
➡️ curl -k -v https://test.me # Curl y obtener respuesta (verbose)
🔻-vv # Aún más verboso
🔻-s # --silent: no mostrar medidor de progreso o errores
🔻-S # --show-error: cuando se usa con --silent (-sS), muestra errores pero no el medidor de progreso
🔻-u usuario:contraseña # Autenticación
➡️ curl -u $usuario:$contraseña http://test.me # Curl con credenciales
🔻-o <fichero> # Guardar salida en fichero
🔻-i # --include: Incluir el encabezado HTTP en la salida
🔻-I # --head: sólo cabeceras
➡️ curl -I https:/prueba.me # Enviar una petición
➡️ curl -v -I https://test.me # Envía la petición con verbose
🔻-K # Especifica el archivo de configuración ➡️ Usa `output` para guardarlo donde quieras o como quieras.
🔻-T # Transfiere el archivo especificado a la URL remota
➡️ curl -T <FICHERO> -u usuario:pass <URL>
```

----

## HTTPS / SSL

``` bash
🔻-k # ignora el SSL de https
➡️ curl -k -v --http2 https://test.me # usar curl http2
🔻--cacert # Añadir certificado ssl
🔻--capath # Añadir la ruta donde se encuentra el certificado SSL (opcional)
🔻-E, --cert <cert> # --cert: Archivo cert del cliente
🔻--cert-type # der/pem/eng
```

-----

## REQUESTS:

``` bash
🔻-X GET/POST # Utilizar método específico
➡️ curl -X GET/POST https://test.me
🔻-L # seguir enlace si la página redirige
🔻-F # --form: Datos HTTP POST para multipart/form-data
➡️ curl -v -F key1=value1 -F upload=@localfilename test.me
🔻--noproxy # Curl sin proxy
➡️ curl --noproxy 127.0.0.1 http://test.me
🔻--connect-timeout # Usar timeout. Curl tiene 0 timeout por defecto
➡️ curl --connect-timeout 10 -I -k https://test.me
```

----

## SEND DATA:

``` bash
🔻-d 'datos' # --datos: HTTP post data, URL encoded (eg, status="Hola")
➡️ curl -d "name=username&password=123456" test.me # Semd nombre de usuario y contraseña con la petición
➡️ curl test.me -H "content-type: application/json" -d "{ \"woof\": \"bark\"}" # Enviar datos de tipo jason
🔻--url-encoded # Send url-encoded data
🔻-d @file # --datos vía fichero
🔻-G # --get: enviar -d datos vía get
```

----

## HEADERS

```
🔻-A <str>         # --user-agent
🔻-b name=val      # --cookie
🔻-b FILE          # --cookie
🔻-H "X-Foo: y"    # --header
🔻--compressed     # usar deflate/gzip
```