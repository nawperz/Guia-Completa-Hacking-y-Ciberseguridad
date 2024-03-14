---
title: Nginx para algunos
---
En este post explicaremos que es Nginx (a grandes rasgos). El como romperlo lo dejamos para más tarde.

### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-que-es-nginx "Permalink")¿Qué es Nginx?

Nginx es un servidor web y proxy inverso que se utiliza para manejar solicitudes HTTP, TCP y UDP. Le hace la competencia a Apache básicamente. Es escalable, estable y capaz de manejar un gran número de conexiones simultáneas con recursos de hardware limitados. Fin.

### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-directorios-importantes "Permalink")Directorios importantes


``` bash
# Directorio principal
/etc/nginx
# Archivos de configuración de los sitios webs alojados
/etc/nginx/sites-available/default
/etc/nginx/sites-enabled/default
# Archivo de configuración principal
/etc/nginx/nginx.conf
# Archivos de logs
/etc/nginx/access.log 
/etc/nginx/error.log
# Ver tipos de archivos que nginx puede "aguantar"
/etc/nginx/mime.types
# Trozos de codigo reutilizables 
/etc/nginx/snippets
```

También pueden estar en estas rutas en lugar de `/etc/`


``` bash
/usr/local/nginx/
/usr/local/etc/nginx/
```

### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contextos "Permalink")Contextos

¿Qué es eso? Son secciones de configuración que permiten administrar cómo el servidor debe manejar diferentes tipos de solicitudes.

Por ejemplo, dentro del contexto HTTP puede haber un contexto Server, que indique específicamente como tratar las requests hacia este.

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-principal "Permalink")Contexto principal

El boss. Lo que hay dentro de él suele afectar a toda la aplicación o pagina web.


``` bash
context {
    # Código
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-de-eventos "Permalink")Contexto de eventos

Se usa para establecer ajustes globales que afectan la forma en que Nginx maneja las conexiones a nivel general (cual se debe usar, cual es la más eficiente, numero de conexiones soportadas, etc). Solo puede haber uno en toda la configuración


```
# Va dentro del contexto general (del anterior que he explicado)
context {
    events {
        # Contexto de eventos bla bla bla
    }
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-http "Permalink")Contexto HTTP

Contiene todas las directivas para configurar el servidor HTTP. Es el más importante ya que es aquí donde se definen los parámetros principales del servidor HTTP, como los ajustes de rendimiento, el manejo de errores, las rutas de acceso a los archivos y la configuración de los servidores virtuales.

Es hermano del contexto eventos, asi que tendrá que ponerse al lado suya y nunca dentro:

```

context {
    events {
        # Contexto de eventos bla bla bla
    }
    http {
        # Cositas
    }
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-servidor "Permalink")Contexto servidor

Ya te lo expliqué al inicio, pero por si no te ha quedado claro, define cómo el servidor debe manejar las solicitudes para un servidor web específico y permite configurar detalles específicos para un sitio web en particular.

Obviamente, irá dentro del contexto http y puede haber más de uno.

Dos directivas importantes en este contexto:

-   Listen: Dirección IP y el puerto en el que el servidor web debe escuchar las solicitudes entrantes.
    
-   Server_name: Especificar el nombre del servidor (lo que tienes que poner en la URL para acceder. La DNS vaya).
    


```

context {
    events {
        # Contexto de eventos bla bla bla
    }
    http {
        # Cositas
        server {    
            listen 80; # Escuchará en el puerto 80
            server_name pepito.com;
        }
        server {
            listen 8080;
            server_name beta.pepito.com
        }
    }
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-de-ubicacion "Permalink")Contexto de ubicación

Permite personalizar la forma en que el servidor maneja las solicitudes para una ubicación específica dentro de la estructura de directorios del servidor, y se pueden definir varias directivas para lograrlo.

```
context {
    events {
        # Contexto de eventos bla bla bla
    }
    http {
        # Cositas
        server {    
            listen 80; # Escuchará en el puerto 80
            server_name pepito.com;
            location /directorio-X {
                    # Haces cosas en este directorio
           }
        }
        server {
            listen 8080;
            server_name beta.pepito.com;
            location /directorio-Y {
                    # Aqui ya la lías parda
            }
        }
    }
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-if "Permalink")Contexto if

Se utiliza para especificar una condición que debe cumplirse para que se ejecute un bloque de configuración.

```
# demás contextos
location /directorio-Z {
    # Codigo
    if (condición) {
    # Código a ejecutar    
    }
}
```

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-contexto-limitexcept "Permalink")Contexto Limit_except

Para restringir ciertos métodos HTTP en una location determinada.
```
# contextos externos
location /directorio-Z {
    # Codigo
    limit_except POST {
        # Se prohibirán el resto de métodos excepto POST
    }
}
```

### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-aliases-variables-y-fallos-comunes "Permalink")Aliases, Variables y Fallos comunes

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-aliases "Permalink")Aliases

Todo el mundo sabe lo que es un alias, asi que no hace falta que lo explique.

En Nginx, esto se puede ver de la siguiente manera:


```
# Contextos
location /videos/ {
    alias /usr/share/videos/;
}
```

Por lo tanto, cuando se acceda al directorio `/videos`, hace referencia a `/usr/share/videos`

Ojo cuidado con poner `/videos` en lugar de `/videos/` (a no ser de que te quieras comer un Local File inclusión como una casa de grande).

Esto se debe a que si yo hago `/videos../../../../etc/passwd`, adivina que voy a leer?

#### [](https://viksant.hashnode.dev/nginx-para-dummies#heading-variables "Permalink")Variables

Cuando podemos pasar "parámetros" a la URL:

```
# Contextos
location /mi_casa {
  return 302 https://dev.mi_casa$uri;
}
```

Por lo tanto, lo que le pasemos por parámetro se inyectará en los headers de la página, llevando a un HTTP-Split attack, porque si yo pongo

```
http://mi_casa/$0d%0aHeader-Perso:Pwned
```

Si interceptas la request con BurpSuite, podrás ver que hay una cabecera que pone:

`Header-Perso:Pwned`