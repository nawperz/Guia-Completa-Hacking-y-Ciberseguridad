---
title: Enumeración con NMAP 
---
La fase más importante: Enumerar.
Vamos a ello:

## Escaneo por UDP y TCP

-------

### TCP

``` bash
# Busqueda de puertos activos
sudo nmap -p- --open -sS --min-rate 5000 <IP> -n -Pn -oG AllPorts

# Enumeración de version -> Información adicional
sudo nmap -sCV -p<PORTS> <IP> -oN targeted
```

------

### UDP

``` bash
# Enumeracion de top-ports usando protocolo UDP
sudo nmap -sU --top-ports X --open -T5 -v -n <IP>
# General, con que X sea 100 o 500, vamos de sobra
```

------

## Opciones de escaneo

`-sn` Desactiva el escaneo de puertos.

`-Pn` Desactiva las peticiones de eco ICMP.

`-n` Desactiva la Resolución DNS.

`-PE` Realiza el escaneo ping utilizando ICMP Echo Requests contra el objetivo.

`--packet-trace` Muestra todos los paquetes enviados y recibidos.

`--reason` Muestra la razón de un resultado específico.

`--disable-arp-ping` Desactiva las Solicitudes de Ping ARP.

`--top-ports=X` Escanea los puertos top especificados que han sido definidos como más frecuentes.

`-p-` Escanea todos los puertos.

`-p22-110` Escanea todos los puertos entre 22 y 110.

`-p22,25` Escanea sólo los puertos especificados 22 y 25.

`-F` Escanea los 100 puertos más frecuentes.

`-sS` Realiza un TCP SYN-Scan.

`-sA` Realiza un TCP ACK-Scan.

`-sU` Realiza un escaneo UDP.

`-sV` Analiza las versiones de los servicios descubiertos.

`-sC` Realiza una exploración de scripts con scripts clasificados como "predeterminados".

`--script <script>` Realiza un escaneo de scripts utilizando los scripts especificados.

`-O` Realiza una exploración de detección de SO para determinar el SO del objetivo.

`-A` Realiza exploraciones de detección de SO, detección de servicio y traceroute.

`-D RND:5` Establece el número de señuelos aleatorios que se utilizarán para escanear el objetivo.

`-e` Especifica la interfaz de red que se utiliza para el análisis.

`-S` 10.10.10.200 Especifica la dirección IP de origen para el escaneo.

`-g` Especifica el puerto de origen para el escaneo.

`--dns-server` La resolución DNS se realiza utilizando un servidor de nombres especificado.

--------

## Output

`-oA filename` Almacena los resultados en todos los formatos disponibles.

`-oN filename` Almacena los resultados en formato normal.

`-oG filename` Lo guarda en formato grepeable.

`-oX filename` Almacena los resultados en formato XML.

----

## Opciones de rendimiento

`--max-retries <num>` Establece el número de reintentos para escaneos de puertos específicos.

`--stats-eery=5s` Muestra el estado del escaneo cada 5 segundos.

`-v/-vv/-vvv` Muestra información detallada durante el escaneo.

`--initial-rtt-timeout 50ms` Establece el valor de tiempo especificado como tiempo de espera RTT inicial.

`--max-rtt-timeout 100ms` Establece el valor de tiempo especificado como tiempo máximo de RTT.

`--min-rate 300` Establece el número de paquetes que se enviarán simultáneamente.

`-T <0-5>` Especifica la plantilla de temporización específica.

----


## Host Discovery

``` bash
sudo nmap -sn -oA tnet -iL hosts.lst | grep for | cut -d" " -f5

# Con esto conseguimos la respuesta de aquellas IPS que NO ignoran las ICMP echo requests debido a la configuracion del Firewall

sudo nmap -sn -oA tnet 10.129.2.18 10.129.2.19 10.129.2.20| grep for | cut -d " " -f5

# Escanear varias IPs. Tambien se puede poner rango: 10.129.2.18-20
```

``` bash
sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace 

# Si no usamos el parametro -sn (port scanning) usaremos ICMP echo requests scans por defecto (-PE), por que nos comunicaremos mediante pings y respuestas ARP-ARP reply, por lo que hemos de usar el parametro --packet-trace para confirmar la comunicacion con los puertos. 

# Si no deseamos ver las comunicaciones ARP podemos quitarlas usando el paratmetro
--disable-arp-ping
```

-----

## Host and Port Scanning

Al hacer un escaneo, podemos encontrarnos ante 6 tipos de puertos:

-----


```
open 
# La conexión mediante el escaneo NMAP ha sido exitoso.
closed 
# Al hacer el escaneo nmap recibimos un paquete que nos dice que el puerto esta cerrado.
filtered 
# Nmap no sabe si dicho puerto esta abierto o cerrado, pues la respuesta que recibimos es "confusa".
unfiltered
# Ocurre durante el handshake TCP-ACK y significa que el puerto está accesible pero no sabemos si está abierto o cerrado.
open | filtered 
# Si no recibimos una respuesta al escanear este tipo de puerto, le será asignado este estado por defecto. Puede ser que el firewall esté protegiendo dicho puerto
closed | filtered 
# Mediante el escaneo TCP idle es imposible determinar si el puerto está abierta o cerrado.
```

-----

### Escaneo por rangos


```
# Por defecto los escaneos NMAP SIENDO ROOT se realizan usando SYN scan (-sS), sino se usará TCP scan (-sT). 
# Maneras de definir los puertos a escanear:
-Individualmente: (-p p1,p2,p3..etc)
-Rango (-p puerto_inicio-puerto_fin -> -p 22-445)
-Top ports (--top-ports=x), siendo X el numero de puertos deseados.
-Todos (-p-)
```

-----

## Scripts

``` bash
# Busqueda de directorios y archivos
nmap -n -p<PUERTO> --script http-enum <IP>
    # Pasarle parámetro desde donde empezar a buscar:
        nmap -n -p<PUERTO> --script http-enum --script-args http-enum.basepath=<PATH> <IP>
        # nmap --script http-enum -p80 --script-args http-enum.basepath='/test.html' 10.129.95.174

# Busqueda de información relevante
nmap -n -p<PUERTO> --script http-grep \

# SSH brute force
nmap -n -p22 --script ssh-brute \
    # Para pasarle wordlists como argumentos: 
    --script-args userdb=usernames.txt,passdb=passwords.txt <IP>

#DNS brute forcing
nmap -p<PUERTO> --script dns-brute <DNS>

# Conseguir una copia de la configuración de un CMS mal configurado
nmap -n -p<PUERTO> --script http-config-backup <IP>

# Versiones y posibles vulnerabilidades
nmap -sV -p<PUERTO> --script=vulscan/vulscan <IP>

# Enumerar usuarios en SMB
nmap -n -p139,445 --script=smb-enum-users --script-args=smbusername="test",\ smbpassword="test123" <IP>
    # Se le puede añadir: ,samronly y ,lsaonly al final 

# WordPress enum
nmap -n -p<PUERTO> --script http-wordpress-enum <DNS>

# HeartBleed attack:
nmap -sV -p443 --script=ssl-hearbleed <DNS>

# Banner grab:
nmap -n -p<PUERTO> --script dns-nsid <IP>

# Comprobar si es vulnerable a shellshock:
sudo nmap --script http-shellshock --script-args uri=<URL_ARCHIVO_SH> -p80 <IP>
```