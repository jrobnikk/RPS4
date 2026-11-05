#!/bin/sh
# Varnostna kopija baze. Zaženite iz korena repozitorija. Cron (vsak dan ob 2:00):
# 0 2 * * * cd /pot/do/rps && ./skripte/backup.sh >> backup/backup.log 2>&1
set -e
mkdir -p backup
IME="backup/sola_is_$(date +%Y%m%d_%H%M%S).sql.gz"
docker compose exec -T baza sh -c 'mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" --single-transaction sola_is' | gzip > "$IME"
find backup -name 'sola_is_*.sql.gz' -mtime +14 -delete
echo "$(date) kopija: $IME"
# Obnova: gunzip -c backup/DATOTEKA.sql.gz | docker compose exec -T baza sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" sola_is'
