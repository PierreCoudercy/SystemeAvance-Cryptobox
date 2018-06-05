```
   _____                  _        _               
  / ____|                | |      | |              
 | |     _ __ _   _ _ __ | |_ ___ | |__   _____  __
 | |    | '__| | | | '_ \| __/ _ \| '_ \ / _ \ \/ /
 | |____| |  | |_| | |_) | || (_) | |_) | (_) >  < 
  \_____|_|   \__, | .__/ \__\___/|_.__/ \___/_/\_\
               __/ | |                             
              |___/|_|                             
```
Projet par Coudercy Pierre et Duchet Loïc
Avec l'aide de Monsieur Gelas Jean-Patrick

Ce document a pour but de decrire le fonctionnement du projet, les choix technique qui ont etait fait et aussi de mettre en avant le evolutions possible du projet, mais aussi de permettre la reproduction du projet presque a l'identique.

# Sommaire

   1. Cryptobox
   2. Choix techniques
   3. Evolutions possible
   4. Comment reproduire le projet
      1. Pré-requis
      2. Marche à suivre
      
# Cryptobox
### Caractéristiques

- Système d'exploitation
  - Alpine Linux 
- Serveur Web
  - NGINX : permet de télécharger les fichiers sur la clé
  - NodeJS : gère le chiffrement et le déchiffrement des fichiers et l'upload de fichier sur la clé
- Serveur DHCP et DNS :
  - dnsmasq
- Chiffrement :
  - LUKS

### Fonctionnement

Pour que le serveur fonctionne il faut deux ordinateurs connecte soit directement par un cable ethernet soit par un switch sur deux ports dans le meme VLAN
Lorsque la cle a fini de demarre elle affiche un message indiquant l'adresse a taper dans le navigateur internet afin d'acceder au "serveur FTP" et la commande
a taper dans le terminal afin de pouvoir d'obtenir une adresse IP permettant de communiquer avec l'adresse IP de la cle.
Taper dans le terminal :
	`dhclient <interface connectee avec la cle>`
Puis lorsque votre interface a obtenu une adresse IP, tapez l'adresse indiquee par le terminal de la cle afin d'acceder a la page internet 
(Attention : si vous avez un proxy configure il vous faudra peut-etre le desactiver pour acceder a la page internet)
Vous arriver sur une page pour acceder au fichier chiffres il faut tous d'abord taper le mot de passe fourni par le proprietaire de la cle afin de dechiffrer
les fichiers stocke sur la cle, pour chiffrer a nouveau les fichiers il suffit de clicker sur le lien en dessous du champ ou vous pouvez entrer le mot de passe
(Si la cle est arrache outre le risque que la cle ne fonctionnenent plus, les fichiers dechiffres seront chiffre lors du prochain demarrage de la cle)
Apres avoir dechiffre les fichiers vous pouvez cliquer sur le lien DOWNLOAD pour acceder a l'arborescence de fichier des fichiers dechiffres
et cliquer sur le bouton "Parcourir" pour selectionner le fichier a uploader et sur le bouton "Envoyer" pour les envoyers sur la cle.

# Choix techniques
### Système d'exploitation

Pour le système d'exploitation nous avons choisi Alpine Linux par soucis de simplification quand à la configuration de base du système d'exploitation, mais aussi parce qu'Alpline Linux utilise inittab afin de gérer les programmes executé au démarrage qui nous semblait être plus simple à configurer que systemd qui est utilisé par debian.

### Serveur Web

Pour le serveur Web nous avons choisi de partir sur une architecture double avec un serveur NGINX et un serveur NodeJS
Nous avons fait le choix d'une architecture double car nous pensions initialement a n'utiliser que NGINX mais il etait complique d'executer des scripts avec NGINX, nous nous sommes donc vu dans l'obligation de rajouter un serveur NodeJS afin de d'obtenir les fonctionnalite voulue
Le serveur NGINX sert de proxy et permet aussi d'acceder a l'arborescence de fichiers.
Le serveur NodeJS quand a lui permet l'upload des fichiers sur la cle et aussi a l'execution des scripts permettant le chiffrement et le dechiffrement.


### Serveur DHCP et DNS

Pour l'interconnexion entre le serveur et le client plutot que de partir du principe qu'un serveur DHCP serait disponible sur le reseau nous avons choisi que, se serait la cle qui distribuerais des adresses sur le reseau et aussi que la cle servirais de serveur DNS afin de ne pas avoir a taper directement l'adresse IP de la cle. C'est pour cette raison que nous avons choisi dnsmasq qui permet de rendre ces deux services.

### Chiffrement

Nous avons choisi LUKS pour le chiffrement car nous avions vu le fonctionnement de cet outil lors du cours de Sécurité Réseau de Monsieur Caniou. 
De plus ce système de chiffrement permet de déchiffrer facilement des données en passant la passphrase en paramètre ce qui permettait de ne pas stocker la passphrase dans un fichier.

# Evolutions possible

- Chiffrement du partition de la cle plutot qu'un gros fichier
- Utilisation de NodeJS ou NGINX seul pour le serveur Web
- Amelioration de l'interface Web
  - Creation d'une page de connexion et d'une page permettant d'acceder au fichiers et d'uploader des fichiers sur la cle
  - Dechiffrage "a la vole de la cle" au moment du telechargement ou de l'upload d'un fichier (avec demande de la passphrase a chaque action)
- Utilisation d'un serveur DHCP present sur le reseau plutot que d'host le serveur sur la cle pour permettre eventuellement de connecter la cle a un reseau WiFi
- Reduction de l'emprunte memoire de la cle.

# Comment reproduire le projet
### Pré-requis

- Une cle USB avec au moins 8Gb de memoire (16Gb peut etre mieux si vous voulez pouvoir stocker plus de donnees sur la cle)
- Avoir une machine sous une distribution linux avec qemu d'installe pour creer la cle et avec un port ethernet
- Avoir une seconde machine sous une distribution linux avec un port ethernet
- Avoir un cable ethernet pouvant etre branche entre les deux machines

### Marche à suivre

1. Preparation de la cle

   1. Formater la cle avec les commandes `fdisk` et `mkfs` :

	```
	$ fdisk -l
	Disque /dev/sdb : 14,5 GiB, 15524167680 octets, 30320640 secteurs
	Unités : sectors of 1 * 512 = 512 octets
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disklabel type: dos
	Disk identifier: 0x316f7406
	```
	Editer la table de partition de la cle avec la commande `fdisk /dev/sdb`
- Appuyer sur la touche `d` jusqu'a ce que toutes les  partitions soit supprimee
- Appuyer sur `p` pour lister les partitions et verifier qu'il n'en reste plus sur la cle
- Creer une partition avec `n`
  - Une partion primaire avec `p` (valeur par defaut)
  - De numero `1` (valeur par defaut)
  - Premier secteur `2048` (valeur par defaut)
  - dernier secteur `14,5 GiB` (ou choisir la valeur par defaut si la cle est plus petite)
- Ajouter le flag bootable sur la partition cree `a` puis `1`
- Verifier que la partition a bien ete cree et occupe bien tous l'espace sur la cle `p`
- Ecrire sur la cle les changements `w`
- Taper la commande `mkfs.ext4 /dev/sdb`

   2. Installation d'Alpine Linux sur la cle avec qemu
   
Recuperer l'image iso `standard` de la distribution Alpine sur le [site d'Alpine Linux](https://alpinelinux.org/downloads/)

Booter sur la cle avec  l'image a l'aide de `QEMU` :

`qemu-system-x86_64 -hda /dev/sdb -boot menu=on -drive file=alpine-standard-X.X.X-x86_64.iso`

Appuyer sur `F12` pour passer au menu de boot et appuyer sur `2` pour que le systeme boot sur l'image disque d'Alpine Linux

On se connecte en tant que `root`

   3. Configuration d'Alpine

S'il y a un proxy :
`export HTTP_PROXY=<URL DU PROXY>`

Appel du script pre-existant de configuration d'Alpine:

```
$ setup-alpine
keybord-layout: fr
variant: fr-azerty
hostname: cryptobox
initialise interface: eth0
ip address: dhcp
manual config: no
password: **** (mot de passe de votre choix)
timezone: Europe/Paris
proxy: none // Meme quand le proxy est configure il faut l'exporter si on souhaite avoir acces a internet
mirror: 1 (dl-cdn.alpinelinux.org)
ssh server: none
disk: sda
mode: sys
overwrite: yes

$ reboot
```

Apres cela il faut mettre a jour les index des paquets pour pouvoir en installer d'autres:

`$ apk update`

   3. Installation des logiciels necessaire
   
Installation de NGINX

`apk add nginx`

Installation de NodeJS

`apk add nodejs`

Installation de dnsmaq

`apk add dnsmasq`

Installation de LUKS

`apk add cryptsetup`

   4. Configuration final 
   

