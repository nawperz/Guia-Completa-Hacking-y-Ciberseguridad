---
title: Ataque Type Juggling
---
Un ataque de **Type Juggling** (o “**cambio de tipo**” en español) es una técnica utilizada en programación para **manipular** el **tipo de dato** de una variable con el fin de engañar a un programa y hacer que éste haga algo que no debería.

La mayoría de los lenguajes de programación utilizan tipos de datos para clasificar la información almacenada en una variable, como enteros, cadenas, flotantes, booleanos, etc. Los programas utilizan estos tipos de datos para realizar operaciones matemáticas, comparaciones y otras tareas específicas. Sin embargo, los atacantes pueden explotar vulnerabilidades en los programas que no validan adecuadamente los tipos de datos que se les proporcionan.

En un ataque de Type Juggling, un atacante manipula los datos de entrada del programa para cambiar el tipo de dato de una variable. Por ejemplo, el atacante podría proporcionar una cadena de caracteres que “se parece” a un número entero, pero que en realidad no lo es. Si el programa no valida adecuadamente el tipo de dato de la variable, podría intentar realizar operaciones matemáticas en esa variable y obtener resultados inesperados.

Un ejemplo común de cómo se puede utilizar un ataque de Type Juggling para burlar la autenticación es en un sistema que utiliza comparaciones de cadena para verificar las contraseñas de los usuarios. En lugar de proporcionar una contraseña válida, el atacante podría proporcionar una cadena que se parece a una contraseña válida, pero que en realidad no lo es.

Por ejemplo, en PHP, una cadena que comienza con un número se convierte automáticamente en un número si se utiliza en una comparación numérica. Por lo tanto, si el atacante proporciona una cadena que comienza con el número **cero** (**0**), como “**00123**“, el programa la convertirá en el número entero **123**.

Aquí se puede ver un ejemplo:

![[1.png]]

Si la contraseña almacenada en el sistema también se almacena como un número entero (en lugar de como una cadena), la comparación de la contraseña del atacante con la contraseña almacenada podría ser exitosa, lo que permitiría al atacante eludir la autenticación y obtener acceso no autorizado al sistema.