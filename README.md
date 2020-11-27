# Dashboard Risco Covid-19

## Correr a app

Começar um servidor php na pasta public com

- `php -S localhost:9000`

E de seguida:

- `npm install`
- `npm run dev`

## Deploy para servidor

Antes de fazer o deploy é preciso ir a pasta de constantes em src/constants.js e mudar a flag `prod` para true para mudar os endpoints que a app espera receber.

De seguida:

`npm run build`

Fazendo scp do public/build, public/index.html e, caso haja alterações, dos ficheiros PHP.

(Não fazer scp da pasta data porque não é atualizada)

## geojson merge

O output deste script (ainda não está no git) são dois ficheiros:

- properties.js
- riskIqd.js

O primeiro ficheiro tem as propriedades para o risco e incerteza nas diferentes datas e o segundo tem o geojson com os poligonos e referencias para as propriedades.

## xlsx-to-json

Este script serve para converter o xlsx dos dados da NOS para JSON.

## scripts auxiliares

Os seguintes ficheiros são ficheiros auxiliares para a tool

- dates.php: vai buscar um array com todas as datas que temos para os dados de risco e incerteza
- sah.php: que para uma determinada data vai buscar o valor do Stay@Home para todos os concelhos.

O ficheiro sah.php idealmente pode ser extendido para ir buscar os dados por concelho em vez de data e assim construirmos o grafico de evolução deste indicador.
