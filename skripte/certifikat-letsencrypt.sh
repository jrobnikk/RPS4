#!/bin/sh
# Uporaba: ./skripte/certifikat-letsencrypt.sh domena.si ime@posta.si
# Pogoj: domena kaže na strežnik, vrata 80 in 443 so odprta, nginx teče (npr. s samopodpisanim potrdilom).
set -e
DOMENA="$1"; EPOSTA="$2"
if [ -z "$DOMENA" ] || [ -z "$EPOSTA" ]; then echo "Uporaba: $0 domena eposta"; exit 1; fi
docker run --rm -v "$PWD/nginx/certbot:/var/www/certbot" -v "$PWD/nginx/letsencrypt:/etc/letsencrypt" \
  certbot/certbot certonly --webroot -w /var/www/certbot -d "$DOMENA" -m "$EPOSTA" --agree-tos -n
cp -L "nginx/letsencrypt/live/$DOMENA/fullchain.pem" nginx/certs/fullchain.pem
cp -L "nginx/letsencrypt/live/$DOMENA/privkey.pem" nginx/certs/privkey.pem
docker compose restart nginx
echo "Let's Encrypt potrdilo nameščeno. Obnova (cron, mesečno): ponovno zaženite ta skript."
