#! /bin/sh

$(umount /var/www/cryptfile)
$(cryptsetup luksClose cryptobox)
$(losetup -d /dev/loop0)
