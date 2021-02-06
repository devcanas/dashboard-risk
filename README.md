# Dashboard Risco Covid-19

## Overview

O dashboard neste momento é composto por 4 componentes.

- Cliente (este repo)
- [API](https://github.com/devcanas/dashboard-risk-api)
  - Responsavel por servir dados para o cliente. O README deste contém mais informacao sobre os diferentes endpoints e o que fazem.
- [geojson-merge](https://github.com/devcanas/geojson-merge)
  - Pega em todos os dados de todos os `*_risk_iqd.js` e compila-os numa base de dados posteriormente usada pela API para podermos gerir eficientemente a memoria que usamos no cliente.
  - o output deste script é um ficheiro `riskIqd.js` que deve ser colocado no servidor.
- [geojson-translate](https://github.com/devcanas/geojson_translate)
  - traduz ficheiros `.asc` para geojson usavel nos mapas em js

Possivelmente podemos pegar nestes dois ultimos e colocar num só script mas para já está assim.

A ideia é colocar um chronjob no servidor a correr o geojson-merge de X em X tempo para manter o website atualizado com os dados introduzidos na pasta 'data' pela equipa do professor Leonardo.

---

## Config

De forma a facilitar a mudanca entre dev e prod criei um ficheiro `config.js` que tem as configuracoes para o dashboard mais acessíveis e faceis de localizar.
Para mudar no entre ambientes basta mudar o export no fim do ficheiro.

---

## Correr a app

- `npm install`
- `npm run dev`

Nota: o servidor da API deve estar também a correr, de outro modo os pedidos vão falhar

## Deploy para servidor

`npm run build`

Este comando cria uma pasta 'public' cujo conteudo deve ser colocado na root do servidor

---
