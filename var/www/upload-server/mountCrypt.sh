#!/bin/ash

passphrase="$1"

$(losetup /dev/loop0 /root/crypto.img)
$(echo -n "$passphrase" | cryptsetup luksOpen /dev/loop0 cryptobox --key-file=-)
$(mount /dev/mapper/cryptobox /var/www/cryptfile)
