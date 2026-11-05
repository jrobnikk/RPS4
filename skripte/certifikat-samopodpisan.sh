#!/bin/sh
# Samopodpisano potrdilo za razvoj. Zaženite iz korena repozitorija.
mkdir -p nginx/certs
openssl req -x509 -nodes -newkey rsa:2048 -days 365 -subj "/CN=localhost" \
  -keyout nginx/certs/privkey.pem -out nginx/certs/fullchain.pem
echo "Potrdilo ustvarjeno v nginx/certs/"
