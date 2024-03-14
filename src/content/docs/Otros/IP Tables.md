---
title: Ip tables
---
Ip tables es una herramienta de firewall en sistemas operativos basados en Linux que permite configurar y controlar las reglas de filtrado de paquetes en una red. Básicamente, te permite decidir qué paquetes de red son permitidos o bloqueados en tu sistema en función de diversos criterios, como direcciones IP, puertos, protocolos, entre otros. También puedes redirigir dichos paquetes.

Es como el portero de la discoteca, decide quien pasa, quien no y quien se lleva un porrazo por listillo.

Ahora bien, vamos a demostrarlo con un pequeño diagrama (lo haré en inglés para los gringos que vayan a traducir este blog):

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1683819133270/fae233b9-8e22-4944-9dfb-99aaa2b54552.png?auto=compress,format&format=webp)

Ha quedado to guapo el esquema.

Bueno, siguiendo con lo nuestro...

Tu te preguntarás: ¿DNAT, SNAT?¿Eso qué es?¿Se come?

Pues dicho en pocas palabras: DNAT redirige el tráfico entrante hacia una ubicación diferente, mientras que SNAT cambia la dirección de origen de los paquetes salientes.

Como te he dibujado en el esquema, hay tres bloques naranjas (reglas de filtrado):

-   Input: Los paquetes que llegan al firewall.
    
-   Output: Paquetes de salida.
    
-   Forward: Permiten redireccionar los paquetes hacia otro firewall/destino.
    

Eeeeey pero no te apresures, que antes de estas reglas de filtrado, están las tipo NAT (que básicamente dicen adonde va a parar cada cosa):

-   Pre-Routing: El encargado de revisar la dirección de red antes de enviar los paquetes.
    
-   Post-Routing: Aplicar reglas de manipulación de paquetes después de que se hayan realizado las traducciones de dirección IP y puerto. Es decir, especifica las reglas que se aplicarán a los paquetes justo antes de que se envíen a través de la interfaz de salida.
    

Comandos y parámetros:

-   A (Append): Agrega una nueva regla al final de una cadena.
    
-   -I (Insert): Inserta una nueva regla en una posición específica dentro de una cadena.
    
-   -R (Replace): Reemplaza una regla existente en una cadena por una nueva.
    
-   -D (Delete): Elimina una regla específica de una cadena.
    
-   -L (List): Lista las reglas en una cadena o en todas las cadenas.
    
-   -F (Flush): Elimina todas las reglas de una cadena.
    
-   -P (Policy): Establece la política predeterminada de una cadena.
    
-   -N (New chain): Crea una nueva cadena personalizada.
    
-   -X (Delete chain): Elimina una cadena personalizada.
    
-   -E (Rename chain): Cambia el nombre de una cadena.
    
-   -Z (Zero counters): Restablece los contadores de paquetes y bytes de una cadena.
    
-   -C (Check): Comprueba si un paquete coincide con una regla en una cadena, sin tomar ninguna acción.
    
-   -M (Module): Especifica un módulo adicional para extender las capacidades de iptables.
    
-   -j (Jump): Especifica la acción a tomar si un paquete coincide con una regla.
    

Y también pueden tener parámetros:

-   --sport: Especifica el puerto de origen.
    
-   --dport: Especifica el puerto de destino.
    
-   --source: Especifica la dirección IP o rango de direcciones IP de origen.
    
-   --to-destination: Especifica la dirección IP o rango de direcciones IP de destino.
    
-   --protocol: Especifica el protocolo de red (por ejemplo, TCP, UDP, ICMP).
    
-   --in-interface: Especifica la interfaz de entrada.
    
-   --out-interface: Especifica la interfaz de salida.
    
-   --state: Especifica el estado de la conexión (por ejemplo, NEW, ESTABLISHED, RELATED).
    
-   --icmp-type: Especifica el tipo de mensaje ICMP.
    
-   --mac-source: Especifica la dirección MAC de origen.
    
-   --mac-destination: Especifica la dirección MAC de destino.
    
-   --limit: Limita la tasa de paquetes que coinciden con la regla.
    
-   --log-prefix: Agrega un prefijo a los registros generados por la regla.
    
-   --jump: Especifica la acción a tomar si el paquete coincide con la regla.
    

Pero bueno, dejémonos de tanta teoría y vamos a ver algunos ejemplos

(Encima esta lo que hace y debajo su comando. No al revés).

-   Agrega una regla a la cadena INPUT que permite el tráfico TCP entrante al puerto 22, utilizado para SSH.


``` bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

-   Agrega una regla a la cadena INPUT que bloquea cualquier tráfico proveniente de la red 192.168.0.0/24.


``` bash
iptables -A INPUT -s 192.168.0.0/24 -j DROP
```

-   Agrega una regla a la cadena FORWARD que permite el reenvío de paquetes desde la interfaz eth0 a la interfaz eth1.

``` bash
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
```

-   Agrega una regla a la cadena OUTPUT que permite el tráfico UDP saliente al puerto 53, utilizado para consultas DNS.

``` bash
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
```

-   Agrega una regla a la cadena INPUT que permite los mensajes ICMP de tipo echo-request, utilizados para los comandos ping.


``` bash
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
```

-   Agrega una regla a la cadena OUTPUT en la tabla nat. Cuando se envía un paquete TCP a la dirección IP 127.0.0.1 y al puerto 1099, se realiza una traducción de dirección de destino (DNAT) y se redirige al destino 172.22.1.97 en el puerto 1099

``` bash
iptables -t nat -A OUTPUT -p tcp -d 127.0.0.1 --dport 1099 -j DNAT --to-destination 172.22.1.97:1099
```

-   Elimina una regla de la cadena PREROUTING en la tabla nat. La regla originalmente redirige los paquetes TCP con destino al puerto 1337 en la dirección IP 10.10.16.7 hacia la dirección IP 172.22.1.97 mediante una traducción de dirección de destino (DNAT)


``` bash
iptables -t nat -D PREROUTING -d 10.10.16.7/32 -p tcp -m tcp --dport 1337 -j DNAT --to-destination 172.22.1.97
```

Y eso ha sido todo por hoy!

A cuidarse y recordad: Siempre white hat nunca back hat.

