# Landing Page VertexJuris

Este projeto e uma landing page do produto VertexJuris, feita com Vite + React + TypeScript e estilizada com Tailwind + shadcn/ui.

## O que esta pagina faz

- Mostra as secoes de marketing (Hero, Como funciona, Precos, Depoimentos e Contato)
- O formulario de contato envia um email via `mailto:` para `aguiarprogramacao@gmail.com` com nome, email, WhatsApp, empresa e plano selecionado
- Layout responsivo para desktop e mobile

## Como rodar localmente

Requisitos: Node.js e npm instalados.

```sh
npm i
npm run dev
```

## Scripts disponiveis

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

## Estrutura do projeto (resumo)

- `src/components/LandingPage` - secoes da landing page
- `src/components/ui` - componentes de UI reutilizaveis

## Deploy

Gere a versao de producao e publique a pasta `dist/` no seu provedor de hospedagem:

```sh
npm run build
```
