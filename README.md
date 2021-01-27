# Dashboard Risco Covid-19

## Overview

O dashboard neste momento é composto por 2 componentes, o dashboard em si e a API que alimenta o dashboard.

Existem dois indicadores consumidos pelo dashboard:

- risco / incerteza
- stay @ home

Para o primeiro indicador, são colocados na pasta 'data' na raíz do servidor ficheiros geojson para cada dia.
Estes dados são consumidos pelo script **geojson_merge** que junta todos os dados numa BD.

Os dados de _stay@home_ são colocados numa BD também.

---

### **geojson merge**

O output deste script é o ficheiro riskIqd.js que é um geojson e guarda um uuid para cada feature que é usado como referencia para se ir buscar mais tarde as propriedades organizadas por dia na BD.

---

## Correr a app

- `npm install`
- `npm run dev`

Nota: o servidor da API deve estar a correr, de outro modo os pedidos vão falhar

## Deploy para servidor

`npm run build`

Este comando cria uma pasta 'public' cujo conteudo deve ser colocado na root do servidor

## scripts auxiliares

Os seguintes ficheiros são ficheiros auxiliares para a tool

- dates.php: vai buscar um array com todas as datas que temos para os dados de risco e incerteza
- sah.php: que para uma determinada data vai buscar o valor do Stay@Home para todos os concelhos.

O ficheiro sah.php idealmente pode ser extendido para ir buscar os dados por concelho em vez de data e assim construirmos o grafico de evolução deste indicador.
