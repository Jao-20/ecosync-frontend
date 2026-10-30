# EcoSync: front-end

Gestor Preditivo de Energia e Conforto (ExpoTech 2026.2, Missão 2050: Smart Home).

Interface web do EcoSync: página inicial, login e cadastro, dashboard com gráficos, dispositivos (busca, filtro e ordenação), área administrativa (CRUD) e chat com o assistente. Por enquanto usa dados fictícios (`src/mocks`), prontos para serem trocados pela API.

## Tecnologias

React, TypeScript, Vite, React Router, Recharts e Lucide.

## Como rodar

    npm install
    npm run dev

Depois abra http://localhost:5173 no navegador.

## Estrutura de src

- `pages`: telas
- `components`: peças reutilizáveis
- `services`: acesso aos dados (hoje devolve os mocks, depois chama a API)
- `mocks`: dados fictícios
- `types`: formatos dos dados

## Créditos

Foto da seção "Rotina": Hanna Lazar (Unsplash).
