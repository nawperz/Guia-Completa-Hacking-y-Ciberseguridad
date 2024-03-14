---
title: Cheatsheet para Enumeración Web
---



Comandos (en orden) para enumerar una web:

### [](https://viksant.hashnode.dev/cheatsheet-enumeracion-web#heading-comandos "Permalink")Comandos

1️⃣ Enumeración con nmap:

[[Enumeración con NMAP]]

```bash
# Inicio escaneo simple
nmap --script http-enum -p80 <IP>
# Escanear a partir de un path de la web:
nmap -n -p80 --script http-enum --script-args http-enum.basepath='/<PATH>' <IP>
```

2️⃣ Enumeración con dirsearch:

COPY

``` bash
dirsearch -u http://IP -t 200
# -x para ocultar codigos de estado
```

3️⃣ Enumeración de directorios con gobuster:

COPY

``` bash
# Primero escaneo directorios
gobuster dir -u http://IP -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -t 150

# Luego busco archivos
gobuster dir -u http://IP -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -t 150 -x .php,.html,.py,.git,.sh,.bak,.js,.txt,.git
# Ocultar respuestas con X paracteres: --hide-lentgh="X"
# -k para certificados auto firmados.
```

4️⃣ Enumeración de directorios con wfuzz:

COPY

``` bash
# Primero escaneo directorios:
wfuzz -c --hc=404 -t 200 -w /usr/share/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt http://IP/FUZZ  

# Luego por tipos de archivos:
wfuzz -c --hc=404 -t 200 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -z list,sh-pl-cgi-txt-php-bak-py http://10.129.228.21/<DIR>/FUZZ.FUZ2Z
```

5️⃣ Enumeración de subdominios:

COPY

``` bash
# Primero lo hago con gobuster:
gobuster vhost -u http://IP -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -t 200

# Luego con wfuzz:
wfuzz -c --hc=404 -t 200 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.<IP>" http://<IP>
```

6️⃣ Enumeracion con ffuf

COPY

``` bash
ffuf -w "wordlist" -X POST -d "..." -H "..." -u http://10.10.209.0/customers/signup -mr "..."

# -w -> Wordlists
# -X -> Request Method
# -d -> specifies the data that we are going to send
# -H -> used for adding additional headers to the request
# -u -> specifies the URL we are making the request to
# -mr -> is the text on the page we are looking for to validate we've found a valid username.

ffuf -w usernames.txt:W1,/usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "..." -H "..." -u <TARGET> -fc X

# W1->List of usernames
# W2->List of passwords we will use
# -w-> Wordlists
# -fc-> Check for HTTP status code
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://10.129.254.241/FUZZ -t 200 -e .php,.html,.txt,.bak -recursion

# Subdominios
ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -H "Host: FUZZ.bagel.htb" -u http://bagel.htb:8000 -fs 263
```

### [](https://viksant.hashnode.dev/cheatsheet-enumeracion-web#heading-consejos "Permalink")Consejos

COPY

``` bash
~~~SHELL
# 1️⃣ Fuzzear todos los subdominios que encuentre
# 2️⃣ Fuzzear a partir de los archivos que encuentre
# 3️⃣ Prestar atención a si un determinado directorio no pertenece al gestor de contenidos ➡️ /plugins no es
```