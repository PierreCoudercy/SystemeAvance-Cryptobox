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

# Sommaire

   1. Cryptobox
   2. Choix techniques
   3. Evolutions possible
   4. Comment reproduire le projet
      1. Pré-requis
      2. Marche à suivre
      
# Cryptobox
### Caractéristiques
### Fonctionnement
# Choix techniques
### Système d'exploitation : Alpine Linux
Pour le système d'exploitation nous avons choisi Alpine Linux par soucis de simplification quand à la configuration de base du système d'exploitation, mais aussi parce qu'Alpline Linux utilise inittab afin de gérer les programmes executé au démarrage qui nous semblait être plus simple à configurer que systemd qui est utilisé par debian.
### Serveur Web : NGINX + NodeJS

### Serveur DHCP et DNS : dnsmasq

### Chiffrement : LUKS
Nous avons choisi LUKS pour le chiffrement car nous avions vu le fonctionnement de cet outil lors du cours de Sécurité Réseau de Monsieur Caniou. 
De plus ce système de chiffrement permet de déchiffrer facilement des données en passant la passphrase en paramètre ce qui permettait de ne pas stocker la passphrase dans un fichier.
# Evolutions possible
# Comment reproduire le projet
### Pré-requis
### Marche à suivre
