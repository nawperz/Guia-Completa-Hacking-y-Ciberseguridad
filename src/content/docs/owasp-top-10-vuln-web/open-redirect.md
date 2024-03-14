---
title: Open Redirect
---
La vulnerabilidad de redirección abierta, también conocida como **Open Redirect**, es una vulnerabilidad común en aplicaciones web que puede ser explotada por los atacantes para dirigir a los usuarios a sitios web maliciosos. Esta vulnerabilidad se produce cuando una aplicación web permite a los atacantes manipular la URL de una página de redireccionamiento para redirigir al usuario a un sitio web malicioso.

Por ejemplo, supongamos que una aplicación web utiliza un parámetro de redireccionamiento en una URL para dirigir al usuario a una página externa después de que se haya autenticado. Si esta URL no valida adecuadamente el parámetro de redireccionamiento y permite a los atacantes modificarlo, los atacantes pueden dirigir al usuario a un sitio web malicioso, en lugar del sitio web legítimo.

![intro](/public/openredirect/Vulnerabilidad-Open-Redirect.webp)

Un ejemplo de cómo los atacantes pueden explotar la vulnerabilidad de redirección abierta es mediante la creación de correos electrónicos de **phishing** que parecen legítimos, pero que en realidad contienen enlaces manipulados que redirigen a los usuarios a un sitio web malicioso. Los atacantes pueden utilizar técnicas de **ingeniería social** para convencer al usuario de que haga clic en el enlace, como ofrecer una oferta atractiva o una oportunidad única.

Para prevenir la vulnerabilidad de redirección abierta, es importante que los desarrolladores implementen medidas de seguridad adecuadas en su código, como la validación de las URL de redireccionamiento y la limitación de las opciones de redireccionamiento a sitios web legítimos. Los desarrolladores también pueden utilizar técnicas de codificación segura para evitar la manipulación de URL, como la codificación de caracteres especiales y la eliminación de caracteres no válidos.

A continuación, se proporcionan los enlaces a los 3 proyectos de Github que estaremos desplegando en esta clase para practicar esta vulnerabilidad en un entorno controlado, viendo diferentes casos e incluso técnicas para evadir posibles restricciones:

-   **Open Redirect 1**: [https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection](https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection)
-   **Open Redirect 2**: [https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection-harder](https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection-harder)
-   **Open Redirect 3**: [https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection-harder2](https://github.com/blabla1337/skf-labs/tree/master/nodeJs/Url-redirection-harder2)

----
En este caso vamos a explicar los 3 ejemplos.

```bash
git clone https://github.com/blabla1337/skf-labs/nodeJs/Url-redirection
```
Dentro del directorio '/skf-labs/nodejs/Url-redirection' ingrese los siguientes comandos:

![[npm install.png]]
![[npm start.png]]
Una vez desplegado el laboratorio vamos al sitio web en el puerto 5000:

![page1](/public/openredirect/page1.webp)


Al hacer click al 'newsite' nos redirige a otra pagina :

![[anexos/openredirect/page2.png]]

Con la herramienta *burpsuite* podemos capturar el trafico y analizar la url del redirect:

![burpsuite1](/public/openredirect/burpsuite1.webp)

**Toolkit que sirven para Open Redirect**
*UFONet* - es un software libre, P2P y criptográfico -disruptive toolkit- que permite realizar ataques DoS y DDoS; en la Capa 7 (APP/HTTP) mediante la explotación de vectores Open Redirect en sitios web de terceros para actuar como botnet y en la Capa3 (Red) abusando del protocolo.

![ufonet1](/public/openredirect/ufonet1.webp)

También funciona como una DarkNET cifrada para publicar y recibir contenidos mediante la creación de una red global cliente/servidor basada en una arquitectura P2P de conexión directa.![ufonet2](/public/openredirect/ufonet2.webp)

Para verificar si la pagina es vulnerable a Open Redirect hay que generar una peticion GET a una pagina cualquiera, por ejemplo, Google.com.

![page3](/public/openredirect/page3.webp)
Si la URL te genera un Redirect a Google.com es porque la pagina es totalmente vulnerable a *Open Redirect*.

Vamos con el segundo ejemplo.
```bash
git clone https://github.com/blabla1337/skf-labs/nodeJs/Url-redirection-harder
```

![burpsuite2](/public/openredirect/burpsuite2.webp)
Te redirige pero no te interpreta la url por los puntos. El servidor detecta los puntos y no se puede. La unica manera es *URL-encode a los "."*. Al url-encodear, *el "." te lo transforma en "%2e"*, pero va a surgir otro error porque el servidor tambien va a detectar los puntos. Pero si lo que haces es *URL-encodear el "%" te queda en la url "%252e"*.

![burpsuite3](/public/openredirect/burpsuite3.webp)

Ahora intentamos en el sitio web si funciona el Open Redirect a google.com.ar. Si te redirige a Google la maquina es vulnerable.

![page4](/public/openredirect/page4.webp)