# EcoSync: front-end

Gestor Preditivo de Energia e Conforto (ExpoTech 2026.2, Missão 2050: Smart Home).

Interface web do EcoSync: página inicial, login e cadastro, dashboard com gráficos, dispositivos (busca, filtro e ordenação), histórico de uso (filtro por dispositivo e período), área administrativa (CRUD de dispositivos e cômodos), perfil (dados, senha e exclusão da conta) e chat com o assistente. Os dados vêm da API do `ecosync-backend`; apenas o chat ainda usa dados fictícios (`src/mocks`).

## Tecnologias

React, TypeScript, Vite, React Router, Recharts e Lucide.

## Como rodar

Antes, suba a API em `http://localhost:3000` (veja o README do `ecosync-backend`). O Vite encaminha as chamadas de `/api` para ela.

    npm install
    npm run dev

Depois abra http://localhost:5173 no navegador.

## Estrutura de src

- `pages`: telas
- `components`: peças reutilizáveis
- `services`: acesso aos dados, pela API (o chat ainda devolve dados fictícios)
- `mocks`: dados fictícios do chat
- `types`: formatos dos dados

## Créditos

Foto da seção "Rotina": Hanna Lazar (Unsplash).
