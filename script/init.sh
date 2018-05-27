#!/bin/ash

echo ""
echo "   _____                  _        _               "
echo "  / ____|                | |      | |              "
echo " | |     _ __ _   _ _ __ | |_ ___ | |__   _____  __"
echo " | |    | '__| | | | '_ \| __/ _ \| '_ \ / _ \ \/ /"
echo " | |____| |  | |_| | |_) | || (_) | |_) | (_) >  < "
echo "  \\_____|_|   \\__, | .__/ \\__\\___/|_.__/ \\___/_/\\_\\"
echo "               __/ | |                             "
echo "              |___/|_|                             "
echo ""
echo "       .-'   '-."
echo "      /         \\"
echo "      \\^^^^|^^^^/"
echo "       \\   |   /"
echo "        \\  |  /"
echo "         \\ | /"
echo "          \\|/"
echo "          <o>"
echo "           )"                
echo "           77"
echo ""
echo "Created by Ducher Loic and Coudercy Pierre"
echo "with the help of Jean-Patrick Gelas"

echo "TO ACCESS TO FTP SERVER TYPE DHCLIENT AS ROOT IN A SHELL THEN CONNECT WITH YOUR BROWSER ON :"

echo ""

echo "http://cryptobox:8080/"

server=$(node /var/www/upload-server/server.js &)
