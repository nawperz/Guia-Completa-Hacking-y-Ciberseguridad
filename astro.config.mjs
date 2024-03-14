import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{label: 'Cheatsheets', items: [
					// Each item here is one entry in the navigation menu.
			  {label: 'Active Directory', link: '/cheatsheets/active-directory-cheatsheet/'}, 
			  {label: 'CURL', link: '/cheatsheets/cheatsheet-curl/' },
			  {label: 'Mover archivos', link: '/cheatsheets/cheatsheet-pasar-archivo/' }]},
			  {label: 'Enumeración y Reconocimiento', items: [
					// Each item here is one entry in the navigation menu.
			  {label: 'NMAP', link: '/enumeracion-y-reconocimiento/Enumeración-con-NMAP/'}, 
			  {label: 'DRUPAL (Gestor de contenido)',link: '/enumeracion-y-reconocimiento/Enumeración-de-gestores-de-contenido-(cmd)-drupal/'}, 
			  {label: 'JOOMLA (Gestor de contenido)', link: '/enumeracion-y-reconocimiento/Enumeración-de-gestores-de-contenido-(cms)-joomla/'}, 
			  {label: 'Enumeración del sistema', link: '/enumeracion-y-reconocimiento/Enumeración-del-sistema/'
			  },{ label: 'Enumeración de servicios', link: '/enumeracion-y-reconocimiento/Enumeración-de-servicios/' }, 
			  {label: 'MAGENTO (Gestor de contenido)', link: '/enumeracion-y-reconocimiento/Enumeracion-magento/'}, 
			  {label: 'Enumeración WEB ', link: '/enumeracion-y-reconocimiento/Enumeración-Web/'}, 
			  {label: 'WPSCAN Toolkit', link: '/enumeracion-y-reconocimiento/wpscan/'}]},
			  {label: 'OWASP TOP 10 Vulnerabilidades Web',items: [
				// Each item here is one entry in the navigation menu.
			  {label: 'Abuso de subida de archivos', link: '/owasp-top-10-vuln-web/abuso-de-subida-de-archivos/'}, 
			  {label: 'Ataque de Truncado SQL (SQL Truncation)', link: '/owasp-top-10-vuln-web/ataque-de-truncado-sql/'}, 
			  {label: 'Ataque ShellShock', link: '/owasp-top-10-vuln-web/ataque-shellshock/' }, 
			  {label: 'Ataque Type Juggling', link: '/owasp-top-10-vuln-web/ataque-type-juggling/'}, 
			  {label: 'Ataques de asignación masiva (Mass-Asignment Attack) & Parameter Binding', link: '/owasp-top-10-vuln-web/ataques-de-asignacion-masiva-(mass-asignment-attack)-parameter-binding/'}, 
			  {label: 'Ataques de Deserialización', link: '/owasp-top-10-vuln-web/ataques-de-deserialización/'}, 
			  {label: 'Ataques de transferencia de zona (AXFR - Full Zone Transfer)', link: '/owasp-top-10-vuln-web/ataques-de-transferencia-de-zona-(axfr-full-zone-transfer)/'}, 
			  {label: 'Client-Side Template Injection (CSTI)', link: '/owasp-top-10-vuln-web/client-side-template-injection-(csti)/'}, 
			  {label: 'Condiciones de carrera (Race Condition)', link: '/owasp-top-10-vuln-web/condiciones-de-carrera-(race-condition)/'}, 
			  {label: 'Cross-Site Request Forgery (CSRF)', link: '/owasp-top-10-vuln-web/cross-site-request-forgery-(csrf)/'}, 
			  {label: 'Enumeración y explotación de Json Web Tokens (JWT)', link: '/owasp-top-10-vuln-web/enumeracion-y-explotacion-de-json-web-tokens-(jwt)/'}, 
			  {label: 'Enumeración y explotación de SQUID Proxies', link: '/owasp-top-10-vuln-web/enumeracion-y-explotacion-de-squid-proxies/'}, 
			  {label: 'Enumeración y explotación de WebDAV', link: '/owasp-top-10-vuln-web/enumeracion-y-explotacion-de-webdav/'}, 
			  {label: 'GraphQL Introspection, Mutations e IDORs', link: '/owasp-top-10-vuln-web/graphql-introspection-mutations-e-idors/'}, 
			  {label: 'Injecciones NoSQL', link: '/owasp-top-10-vuln-web/inyecciones-nosql/'}, 
			  {label: 'Insecure Direct Object Reference (IDORs)', link: '/owasp-top-10-vuln-web/insecure-direct-object-reference-(idors)/'}, 
			  {label: 'Intercambio de recursos de origen cruzado (CORS)', link: '/owasp-top-10-vuln-web/intercambio-de-recursos-de-origen-cruzado-(cors)/'}, 
			  {label: 'Inyecciones CSS (CSSI)', link: '/owasp-top-10-vuln-web/inyecciones-css-(cssi)/'}, 
			  {label: 'Inyecciones LATEX', link: '/owasp-top-10-vuln-web/inyecciones-latex/'}, 
			  {label: 'Inyecciones LDAP', link: '/owasp-top-10-vuln-web/inyecciones-ldap/'}, 
			  {label: 'Inyecciones XPath', link: '/owasp-top-10-vuln-web/inyecciones-xpath/'}, 
			  {label: 'Local File Inclusion (LFI)', link: '/owasp-top-10-vuln-web/local-file-inclusion-(lfi)/'}, 
			  {label: 'Log Poisoning (LFI a RCE)', link: '/owasp-top-10-vuln-web/log-poisoning-(lfi-a-rce)/'}, 
			  {label: 'Open Redirect', link: '/owasp-top-10-vuln-web/open-redirect/'}, 
			  {label: 'Padding Oracle Attack', link: '/owasp-top-10-vuln-web/padding-oracle-attack/'}, 
			  {label: 'Prototype Pollution', link: '/owasp-top-10-vuln-web/prototype-pollution/'}, 
			  {label: 'Python - Ataque de Deserialización Pickle (DES-Pickle)', link: '/owasp-top-10-vuln-web/python-ataque-de-deserializacion-pickle-(des-pickle)/'}, 
			  {label: 'Python - Ataque de Deserialización Yaml (DES-Yaml)', link: '/owasp-top-10-vuln-web/python-ataque-de-deserializacion-yaml-(des-yml)/'},  
			  {label: 'Remote File Inclusion (RFI)', link: '/owasp-top-10-vuln-web/remote-file-inclusion-(rfi)/'}, 
			  {label: 'Server-Side Request Forgery (SSRF)', link: '/owasp-top-10-vuln-web/server-side-request-forgery-(ssrf)/'}, 
			  {label: 'Server-Side Template Injection (SSTI)', link: '/owasp-top-10-vuln-web/server-side-template-injection-(ssti)/'}, 
			  {label: 'Session Puzzling , Session Fixation , Session Variable Overloading', link: '/owasp-top-10-vuln-web/session-puzzling-session-fixation-session-variable-overloading/'}, 
			  {label: 'SQL Injection (SQLI)', link: '/owasp-top-10-vuln-web/sql-injection-(sqli)/'},
			  {label: 'XML External Entity Injection (XXE)', link: '/owasp-top-10-vuln-web/xml-external-entity-injection-(xxe)/'}, 
			  {label: 'XXS (Cross-Site Scripting)', link: '/owasp-top-10-vuln-web/xxs-(cross-site-scripting)/'}
			  ]},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
