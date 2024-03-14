---
title: Ataques de asignación masiva (Mass-Asigment Attack) & Parameter Binding
---
El ataque de asignación masiva (`Mass Assignment Attack`) se basa en la manipulación de parámetros de entrada de una solicitud HTTP para crear o modificar campos en un objeto de modelo de datos en la aplicación web. En lugar de agregar nuevos parámetros, los atacantes intentan explotar la funcionalidad de los parámetros existentes para modificar campos que no deberían ser accesibles para el usuario.

Por ejemplo, en una aplicación web de gestión de usuarios, un formulario de registro puede tener campos para el nombre de usuario, correo electrónico y contraseña. Sin embargo, si la aplicación utiliza una biblioteca o marco que permite la asignación masiva de parámetros, el atacante podría manipular la solicitud HTTP para agregar un parámetro adicional, como el nivel de privilegio del usuario. De esta manera, el atacante podría registrarse como un usuario con privilegios elevados, simplemente agregando un parámetro adicional a la solicitud HTTP.

A continuación, se os proporciona el enlace directo al proyecto `Juice Shop` en Docker Hub, el cual nos permitirá desplegar un laboratorio vulnerable donde poder practicar esta vulnerabilidad:
**Juice Shop**: [https://hub.docker.com/r/bkimminich/juice-shop](https://hub.docker.com/r/bkimminich/juice-shop)

Empezaremos desplegando el contenedor

```go
docker pull bkimminich/juice-shop
```

```go
docker run -dit -p 3000:3000 --name JuiceShop bkimminich/juice-shop
```

![1](/src/content/docs/anexos/Ataques-de-asignacion-masiva/page1.png)

![2](../anexos/Ataques-de-asignacion-masiva/burp1.png)

![3](../anexos/Ataques-de-asignacion-masiva/burp2.png)

![4](../anexos/Ataques-de-asignacion-masiva/page2.png)

Demostremos con otro ejemplo

```go
docker pull blabla1337/owasp-skf-lab:parameter-binding
```

```go
docker run -ti -p localhost:3000:3000 blabla1337/owasp-skf-lab:parameter-binding
```
![5](../anexos/Ataques-de-asignacion-masiva/page3.png)

![6](../anexos/Ataques-de-asignacion-masiva/page4.png)

![7](../anexos/Ataques-de-asignacion-masiva/burp3.png)

![8](../anexos/Ataques-de-asignacion-masiva/burp4.png)

![9](../anexos/Ataques-de-asignacion-masiva/page5.png)

