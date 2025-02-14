:: Pensez à lancer votre service mysql pour accéder à la base de données et à modifier les informations de connexion à la BDD dans le fichier .env du dossier API.
@echo off
start cmd /k "npm run dev"
start cmd /k "cd api && php -S 127.0.0.1:5500"
exit