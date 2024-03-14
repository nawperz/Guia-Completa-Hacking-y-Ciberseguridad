---
title: WifiPwned XD
---
# WifiPwnedd

❗ Usar esta herramienta en entornos controlados es completamente ilegal sin la autorización necesaria.

Cómo se ejecuta la herramienta?
``` bash
cd WifiPwnedd

chmod 755 wifipwnedd.sh

sudo ./wifipwnedd.sh
```
#### Menú de ataque
![[227698176-f602ecf2-6d91-40df-92da-31cbe4bd88b5.png]]

 - Configurar la tarjeta especificada para que esté en modo monitor (obligatorio)

 - La dirección MAC se cambia con Macchanger para ser aún más anónimo

#### 1) Ataque Handshake
Aparecerá una ventana airodump-ng con todas las redes disponibles y sus canales. Debemos indicar correctamente el nombre de la red y su canal.
A continuación aparecerá una ventana similar, pero ahora filtrada por el nombre (essid) y el canal que hayamos proporcionado previamente

Esperamos unos segundos y comenzará el ataque de desautenticación con aireplay-ng.

Tras unos segundos, recibiremos el paquete necesario con la contraseña encriptada (Handshake).

A continuación realizará un ataque de fuerza bruta con el diccionario que le hemos proporcionado (tardará un rato dependiendo de tu ordenador y de la contraseña)

#### 2) Ataque PMKID
Esperará el paquete solicitado con hcxdumptool durante el número de segundos que especifiques (recomendado 600).

Si lo captura, procederá a la fase de fuerza bruta con hashcat.

Si no lo captura, se cerrará el ataque y volveremos al menú de ataque.

#### 3) Ataque DoS
Nos preguntará qué red queremos atacar

Luego nos pedirá los canales, los recomendados son 1, 6, 11 pero puedes poner todos del 1 al 12 o el que prefieras.

La red puede cambiar de canal para evitar este ataque.

Puedes cerrar la ventana cuando quieras que termine el ataque.

#### 4) Ataque Beacon Flood
La tasa de paquetes es de 1000 paquetes por segundo, pero depende de tu tarjeta de red la velocidad.
####  5) Tráfico de Red
Usted puede monitorear todo el tráfico y los paquetes que viajan
#### 6) Escáner
reiniciará toda la tarjeta de red para poder volver a conectarse a una red.

A continuación, buscará los dispositivos en nuestra red y los mostrará en la pantalla con sus direcciones IP.

Después de pulsar enter pondrá nuestra tarjeta en modo monitor

#### 7) Wifiphisher
Gemelo Malvado

Debes elegir una red a la cual se enviaran paquetes deautenticacion global (All MAC'S), esto para que los usuarios no tengan la red disponible y se conecten a nuestra red.

El nombre de la red es el mismo de la red que queremos clonar.

Se generarán los archivos de configuración hostapd y dnsmasq, y también se configurará que cuando un dispositivo se conecte se le asigne una dirección IP y una NetMask.

A continuación podemos elegir un login a utilizar

Esperamos las credenciales de las víctimas

#### 8) Fake/Rogue Ap
Crea una red falsa con el nombre que quieras.

Generará los ficheros de configuración hostapd y dnsmasq con el nombre y canal que dimos antes, y también configurará que cuando se conecte un dispositivo se le asigne una dirección IP y una NetMask.

Luego podemos elegir un login para usar

Esperamos las credenciales de las víctimas

#### 9) Fuerza Bruta .cap
Fuerza bruta el diccionario que pasamos a un fichero .cap.
#### 10) Hash .cap -> .hccapx
Convierte tu hash o fichero .cap a hccapx
#### 11) Diccionario Hashed (Tablas Rainbow)
Es un diccionario precalculado que se utiliza para forzar los hashes. Esto ayudará a acelerar el proceso (dependiendo de las contraseñas)
#### 12) Fuerza bruta con GPU
❕ Esta opción no se puede hacer en una máquina virtual, sólo funcionará cuando el SO esté directamente instalado.

Te pedirá un hash, ya sea .cap o hccapx, si es .cap se convertirá automáticamente a formato hccapx con el nombre que quieras.

Luego nos saldrá un menú donde veremos nuestro Hardware y podremos seleccionar nuestra GPU (Si pones una CPU no se hará la fuerza bruta).

Automáticamente se hará la fuerza bruta con nuestro diccionario preferido para el hash y con la GPU de tu pc.