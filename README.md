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

Ce document a pour but de décrire le fonctionnement du projet, les choix technique qui ont était fait et aussi de mettre en avant le évolutions possible du projet, mais aussi de permettre la reproduction du projet presque a l'identique.

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

Pour que le serveur fonctionne il faut deux ordinateurs connecté soit directement par un cable ethernet soit par un switch sur deux ports dans le même VLAN
Lorsque la clé a fini de demarer elle affiche un message indiquant l'adresse a taper dans le navigateur internet afin d'accèder au "serveur FTP" et la commande a taper dans le terminal afin d'obtenir une adresse IP permettant de communiquer avec l'adresse IP de la clé.
Taper dans le terminal :
	`dhclient <interface connectée avec la clé>`
Puis lorsque votre interface a obtenu une adresse IP, tapez l'adresse indiquée par le terminal de la clé afin d'accèder à la page internet 
(Attention : si vous avez un proxy configuré il vous faudra peut-etre le désactiver pour accèder a la page internet)
Vous arriver sur une page pour accèder au fichier chiffrés il faut tous d'abord taper le mot de passe fourni par le proprietaire de la clé afin de dechiffrer les fichiers stocké sur la clé, pour chiffrer a nouveau les fichiers il suffit de clicker sur le lien en dessous du champ ou vous pouvez entrer le mot de passe
(Si la clé est arrachée outre le risque que la clé ne fonctionnenent plus, les fichiers déchiffrés seront chiffrés lors du prochain demarrage de la clé)
Apres avoir déchiffre les fichiers vous pouvez cliquer sur le lien DOWNLOAD pour acceder a l'arboréscence de fichier des fichiers déchiffrés et cliquer sur le bouton "Parcourir" pour selectionner le fichier a uploader et sur le bouton "Envoyer" pour les envoyers sur la clé.

# Choix techniques
### Système d'exploitation

Pour le système d'exploitation nous avons choisi Alpine Linux par soucis de simplification quand à la configuration de base du système d'exploitation, mais aussi parce qu'Alpline Linux utilise inittab afin de gérer les programmes executé au démarrage qui nous semblait être plus simple à configurer que systemd qui est utilisé par debian.

### Serveur Web

Pour le serveur Web nous avons choisi de partir sur une architecture double avec un serveur NGINX et un serveur NodeJS

Nous avons fait le choix d'une architecture double car nous pensions initialement a n'utiliser que NGINX mais il était compliqué d'exécuter des scripts avec NGINX, nous nous sommes donc vu dans l'obligation de rajouter un serveur NodeJS afin de d'obtenir les fonctionnalité voulue.

Le serveur NGINX sert de proxy et permet aussi d'accéder à l'arborescence de fichiers.

Le serveur NodeJS quand à lui permet l'uploader des fichiers sur la clé et gère l'exécution des scripts permettant le chiffrement et le déchiffrement.


### Serveur DHCP et DNS

Pour l'interconnexion entre le serveur et le client plutôit que de partir du principe qu'un serveur DHCP serait disponible sur le réseau nous avons choisi que, se serait la clé qui distribuerais des adresses sur le réseau et aussi que la clé servirais de serveur DNS afin de ne pas avoir a taper directement l'adresse IP de la cle. C'est pour cette raison que nous avons choisi dnsmasq qui permet de rendre ces deux services.

### Chiffrement

Nous avons choisi LUKS pour le chiffrement car nous avions vu le fonctionnement de cet outil lors du cours de Sécurité Réseau de Monsieur Caniou.

De plus ce système de chiffrement permet de déchiffrer facilement des données en passant la passphrase en paramètre ce qui permettait de ne pas stocker la passphrase dans un fichier.

# Evolutions possible

- Chiffrement d'une partition de la clé plutôt qu'un gros fichier
- Utilisation de NodeJS ou NGINX seul pour le serveur Web
- Amélioration de l'interface Web
  - Création d'une page de connexion et d'une page permettant d'accèder au fichiers et d'uploader des fichiers sur la clé
  - Déchiffrage "a la volé de la clé" au moment du téléchargement ou de l'upload d'un fichier (avec demande de la passphrase à chaque action)
- Utilisation d'un serveur DHCP présent sur le reseau plutot que d'host le serveur sur la clé pour permettre éventuellement de connecter la clé a un reseau WiFi
- Réduction de l'emprunte mémoire de la clé.

# Comment reproduire le projet
### Pré-requis

- Une clé USB avec au moins 8Gb de memoire (16Gb peut-être mieux si vous voulez pouvoir stocker plus de données sur la clé)
- Avoir une machine sous une distribution linux avec qemu d'installé pour créer la clé et avec un port éthernet
- Avoir une seconde machine sous une distribution linux avec un port éthernet
- Avoir un cable éthernet pouvant être branché entre les deux machines

### Marche à suivre

1. Préparation de la clé

   1. Formater la clé avec les commandes `fdisk` et `mkfs` :

	```
	$ fdisk -l
	Disque /dev/sdb : 14,5 GiB, 15524167680 octets, 30320640 secteurs
	Unités : sectors of 1 * 512 = 512 octets
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disklabel type: dos
	Disk identifier: 0x316f7406
	```
	Editer la table de partition de la clé avec la commande `fdisk /dev/sdb`
- Appuyer sur la touche `d` jusqu'à ce que toutes les  partitions soit supprimée
- Appuyer sur `p` pour lister les partitions et vérifier qu'il n'en reste plus sur la clé
- Créer une partition avec `n`
  - Une partion primaire avec `p` (valeur par défaut)
  - De numero `1` (valeur par défaut)
  - Premier secteur `2048` (valeur par défaut)
  - Dernier secteur `14,5 GiB` (ou choisir la valeur par défaut si la cle est plus petite)
- Ajouter le flag bootable sur la partition cree `a` puis `1`
- Vérifier que la partition a bien été crée et occupe bien tous l'espace sur la clé `p`
- Ecrire sur la clé les changements `w`
- Taper la commande `mkfs.ext4 /dev/sdb`

   2. Installation d'Alpine Linux sur la clé avec `qemu`
   
Récupèrer l'image iso `standard` de la distribution Alpine sur le [site d'Alpine Linux](https://alpinelinux.org/downloads/)

Booter sur la clé avec  l'image à l'aide de `QEMU` :

`qemu-system-x86_64 -hda /dev/sdb -boot menu=on -drive file=alpine-standard-X.X.X-x86_64.iso`

Appuyer sur `F12` pour passer au menu de boot et appuyer sur `2` pour que le système boot sur l'image disque d'Alpine Linux

On se connecte en tant que `root`

   3. Configuration d'Alpine

S'il y a un proxy :
`export HTTP_PROXY=<URL DU PROXY>`

Appel du script pré-existant de configuration d'Alpine:

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

Après cela il faut mettre à jour les index des paquets pour pouvoir en installer d'autres:

`$ apk update`

   4. Installation des logiciels nécessaire
   
Installation de NGINX

`apk add nginx`

Installation de NodeJS

`apk add nodejs`

Installation de dnsmaq

`apk add dnsmasq`

Installation de LUKS

`apk add cryptsetup`

Installation e2fsprog

`apk add e2fsprog`

   5. Configuration final 
   
Création d'un gros fichier chiffré servant a contenir les fichiers protegé

```
$ fallocate -l 4G crypt.img
$ losetup /dev/loop0 /root/crypto.img
$ cryptsetup -y luksFormat -c blowfish -s 256 /dev/loop0
$ cryptsetup luksOpen /dev/loop0 cryptobox
$ mkfs.msdos -j /dev/mapper/cryptobox (FAT32)
$ losetup -d /dev/loop0
```
Configuration des services

Pour configurer les services il suffit de copier les fichiers du dépôt a la racines de la cle pour se faire il suffit de monter sur une des machines à notre disposition la partition /dev/sdb3 

```
$ mkdir temp
$ mount /dev/sdb3 temp
```

et de copier les fichiers du dépôt dans le filesystem monté.

`sudo cp depot/* temp/`




   

