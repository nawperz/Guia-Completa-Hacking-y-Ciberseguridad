---
title: NodeJS Security Best Practices
---

[#node](https://dev.to/t/node)[#javascript](https://dev.to/t/javascript)[#react](https://dev.to/t/react)[#aws](https://dev.to/t/aws)

Para leer más artículos como este,  [visita my blog](https://www.mohammadfaisal.dev/blog)

Hoy veremos cómo podemos mejorar la seguridad de una aplicación NodeJS. Hay muchos aspectos relacionados con la seguridad en una aplicación NodeJS. Nos familiarizaremos con muchos de los conceptos y veremos cómo prevenir ataques no deseados a nuestra aplicación.

Nada es a prueba de balas, pero estar seguro no hace daño.
### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#the-most-popular-one)The most popular one!

Primero usaremos un excelente paquete npm llamado [helmet](https://www.npmjs.com/package/helmet).

Configura varias cabeceras HTTP para prevenir ataques como Cross-Site-Scripting(XSS), clickjacking, etc. 


``` 
yarn add helmet
```

Luego úsalo dentro de tu **index.ts**.

``` python
import helmet from "helmet";It sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.

app.use(helmet());
```

Ya está. No necesitas hacer nada más.

También deberías echar un vistazo a [helmet-csp](https://www.npmjs.com/package/helmet-csp)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#prevent-dos-attack)Prevent DOS attack

DOS significa Denegación de Servicio. Si un atacante intenta inundar su servidor con peticiones, nuestros usuarios reales pueden sentir el dolor de un tiempo de respuesta lento.

Para prevenir esto, podemos usar un excelente paquete llamado [toobusy-js](https://www.npmjs.com/package/toobusy-js)  
Esto monitorizará el bucle de eventos, y podemos definir un parámetro lag que monitorizará el lag del bucle de eventos e indicará si nuestro bucle de eventos está demasiado ocupado para servir peticiones en este momento.

``` 
yarn add toobusy-js
```

A continuación, añada un nuevo middleware para indicar que el servidor está demasiado ocupado.

``` python
import too busy from 'toobusy-js';

app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, 'Server too busy!');
  } else {
    next();
  }
});
```

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#rate-limiting)Rate Limiting

La limitación de velocidad ayuda a su aplicación frente a ataques de fuerza bruta. Esto permite evitar que el servidor sea estrangulado.

Los usuarios no autorizados pueden realizar cualquier número de peticiones con intención maliciosa, y usted puede controlar eso con la limitación de tasa.  
Por ejemplo, puede permitir que un usuario realice cinco peticiones cada 15 minutos para crear una cuenta.  
O puede permitir que los usuarios no suscritos realicen peticiones a un cierto límite de velocidad, algo así como 100 peticiones al día.

Hay un buen paquete llamado [express-rate-limit](https://www.npmjs.com/package/express-rate-limit). Primero, instálelo

```
yarn add express-rate-limit
```

A continuación, cree una configuración de limitación de velocidad para él.

```python
import rateLimit from "express-rate-limit";

export default rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100, // maximum number of request inside a window
  message: "You have exceeded the 100 requests in 24 hrs limit!", // the message when they exceed limit
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(rateLimiter);
```

Esto le permitirá añadir un límite de tarifa para todas sus rutas. También puede añadir un límite de velocidad para rutas específicas.

Pero si usted está detrás de un proxy. Este es el caso en la mayoría de los casos cuando se utiliza cualquier proveedor de la nube como Heroku aws etc, entonces la IP de la solicitud es básicamente la IP del proxy, lo que hace que parezca que la solicitud proviene de una sola fuente, y el servidor se obstruye muy rápido.

Para resolver este problema, puedes averiguar el **numberOfProxies** entre tú y el servidor y establecer ese recuento justo después de crear la aplicación express.

```python
const numberOfProxies = 1;
const app = express();

app.set("trust proxy", numberOfProxies);
```

To learn more about [**trust proxy**](https://expressjs.com/en/guide/behind-proxies.html) refer to the [documentation](https://expressjs.com/en/guide/behind-proxies.html)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#configure-cors)Configure Cors

CORS mantendrá tu aplicación a salvo de ataques maliciosos de fuentes desconocidas  
Es muy fácil de configurar en nodejs.

```
npm i cors
```

then use it inside the index.ts file  

```python
import cors from "cors";

let corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
```

## [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#prevent-xss-attacks)Prevent XSS attacks

Ataque XSS significa cross-site scripting attacks. Inyecta scripts maliciosos en su aplicación.

Un atacante puede utilizar XSS para enviar un script malicioso a un usuario desprevenido. El navegador del usuario final no tiene forma de saber que el script no es de confianza y lo ejecutará. Como piensa que el script proviene de una fuente de confianza, el script malicioso puede acceder a cualquier cookie, testigo de sesión u otra información sensible retenida por el navegador y utilizada con ese sitio.

Puede proteger su aplicación utilizando `xss-clean`.

```
yarn add xss-clean
```

Luego úsalo dentro del archivo `index.ts`.

```
import xss from "xss-clean";

app.use(xss());
```

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#prevent-sql-query-injection-attacks)Prevent SQL Query injection attacks

Si utilizas entradas de usuario sin comprobarlas, un usuario puede pasar datos inesperados y cambiar fundamentalmente tus consultas SQL.

Por ejemplo, si tu código tiene este aspecto.

```
UPDATE users
    SET first_name="' + req.body.first_name +  '" WHERE id=1001;
```

Si un usuario escribe su nombre de pila como

```
Bobby", last_name="Egg"; --
```

Entonces la consulta pasa a ser

```
UPDATE users
    SET first_name="Bobby", last_name="Egg"; --" WHERE id=1001;
```

Así que todos tus usuarios se llamarán Bobby Egg, lo cual no está bien.

Si usas [Sequalize](https://sequelize.org/), [TypeORM](https://typeorm.io/) o para MongoDB, tenemos [Mongoose](https://mongoosejs.com/) estos tipos de herramientas ORM, entonces estás seguro por defecto porque estas nos ayudan contra los ataques de inyección de consultas SQL por defecto.

Si no quieres usar ORM, también hay otros paquetes.  
Para PostgreSQL tenemos [node-postgres](https://node-postgres.com/)

## [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#limit-the-size-of-the-body-of-the-request)Limit the size of the body of the request

Utilizando [body-parser](https://github.com/expressjs/body-parser) puede establecer el límite del tamaño de la carga útil

```
npm i body-parser
```

Por defecto, body-parser está configurado para permitir cargas de 100kb de tamaño. Puede establecer el límite de la siguiente manera.

```
import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
```

## [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#use-linter)Use linter

Un linter puede obligarle a seguir estas buenas prácticas por defecto. Puede utilizar [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) para ello.

```
yarn add -D eslint-plugin-security
```

Y dentro de tu archivo **.eslintrc**

```
"extends": ["plugin:@typescript-eslint/recommended", "plugin:security/recommended"],
```

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#enforce-https)Enforce HTTPS

Lo mejor sería utilizar siempre HTTPS sobre HTTP cuando sea posible.

```
yarn add hsts
```

Luego úsalo dentro de tu **index.ts**.

```
import hsts from "hsts";

app.use(
  hsts({
    maxAge: 15552000, // 180 days in seconds
  })
);
// Strict-Transport-Security: max-age: 15552000; includeSubDomains
```

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#use-csrf-protection-middleware)Use CSRF Protection middleware

Para saber más sobre CSRF. [Vaya aquí](https://github.com/pillarjs/understanding-csrf)  
Considere el uso de [csurf](https://github.com/expressjs/csurf)

```
import csrf from "csurf";
var csrfProtection = csrf({ cookie: true });

app.get("/form", csrfProtection, function (req, res) {
  // generate and pass the csrfToken to the view
  res.render("send", { csrfToken: req.csrfToken() });
});
```

Esto no es necesario para una aplicación que no maneja ningún tipo de datos.

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#validate-incoming-requests)Validate Incoming Requests

Deberías considerar validar las peticiones entrantes a tu aplicación para comprobar si contienen datos maliciosos. Hay muchas formas de hacerlo, pero la más popular es utilizar una librería de validación de esquemas como Joi o class-validator.

Puedes consultar el siguiente artículo para más información.

[https://www.mohammadfaisal.dev/blog/request-validation-nodejs-express](https://www.mohammadfaisal.dev/blog/request-validation-nodejs-express)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#validating-output)Validating Output

Usted quiere asegurar los datos entrantes en lugar usted debe tratar de validar cualquier dato que usted da salida.  
Por ejemplo, si renderizas al frontend usando NodeJS, entonces esto se convierte en un problema.

Digamos que nuestro usuario genera los siguientes datos para mostrarlos en el navegador más tarde.

```
<script>alert('I am not sanitized!');</script>
```

Esto es inofensivo, pero si no lo desinfectas antes de devolverlo al frontend javascript, entonces puede causar problemas.

Para evitar esto, tenemos varias opciones.

[`html-escape`](https://www.npmjs.com/package/html-escape) // si necesitas renderizar la salida html  
[`xml-escape`](https://www.npmjs.com/package/xml-escape) // si necesitas dar salida xml  
[`shell-escape`](https://www.npmjs.com/package/shell-escape) // para comandos shell

Estas librerías también pueden ayudarte a sanear la salida.

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#using-hash-for-sensitive-information)Using Hash for Sensitive Information

Almacenar contraseñas en texto plano nunca fue una buena idea. En su lugar, deberías crear un has de tu contraseña.

Un hash es una cadena de tamaño fijo que podemos generar a partir de cualquier cadena, y no es descifrable por diseño. Sólo se puede volver a producir si se vuelve a dar el mismo texto de entrada.

Por lo tanto, al almacenar contraseñas, crearemos un hash de nuestra contraseña y lo almacenaremos en la base de datos. De esta manera, incluso si nuestra base de datos está expuesta, las contraseñas no estarán expuestas.

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#using-the-salt-with-hash)Using the Salt with Hash

Existe un problema con el mecanismo Hashing porque dos textos idénticos siempre generarán el mismo hash. Como la mayoría de la gente utiliza contraseñas muy comunes, esta técnica es vulnerable a la explotación.

Para evitar este problema, utilizamos una técnica llamada sal. Es básicamente una cadena aleatoria que se añade a la entrada dada. Así que incluso si das dos entradas idénticas, las salidas no serán las mismas.

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#hide-errors-from-endusers)Hide errors from end-users

Lo mejor sería que no expusieras los errores a tus usuarios. Para hacer eso, usted necesitará manejar seriamente el manejo de errores en el ambiente de producción. La siguiente es una buena guía por donde empezar.

[https://www.mohammadfaisal.dev/blog/error-handling-nodejs-express](https://www.mohammadfaisal.dev/blog/error-handling-nodejs-express)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#load-secrets-securely)Load secrets securely

Tenga mucho cuidado al cargar secretos en su aplicación. No debe incluir secretos como cadenas simples en la aplicación. Para ello es necesario utilizar algún tipo de archivo de entorno. Puede consultar el siguiente ejemplo para ello.

[https://www.mohammadfaisal.dev/blog/nodejs-environment-handling](https://www.mohammadfaisal.dev/blog/nodejs-environment-handling)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#compression)Compression

La compresión es una técnica que puede reducir el tamaño del archivo estático y la respuesta JSON.  
En nodejs, que podemos hacer con un paquete de middleware agradable llamado [**compresión**](https://www.npmjs.com/package/compression)

Primero, instálelo

```
yarn add compression
```

Then add it inside your **index.ts**  

```
import compression from "compression";
app.use(compression());
```

Y ya está. Hay otras opciones que puede utilizar. Consulte la documentación al respecto.

#### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#some-more-resources)Some more resources:

[https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)  
[https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d)

### [](https://dev.to/mohammadfaisal/nodejs-security-best-practices-34ck?ref=dailydev#github-repo)Github Repo

[https://github.com/Mohammad-Faisal/nodejs-security-best-practices](https://github.com/Mohammad-Faisal/nodejs-security-best-practices)

**Have something to say? Get in touch with me via [LinkedIn](https://www.linkedin.com/in/56faisal/) or [Personal Website](https://www.mohammadfaisal.dev/)**