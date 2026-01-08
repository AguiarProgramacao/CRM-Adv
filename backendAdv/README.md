# backendAdv

Backend Node.js/Express com Prisma (PostgreSQL) para o SaaS de advocacia.

## Stack
- Node.js + Express
- Prisma ORM + PostgreSQL
- Stripe (boletos)
- Google Calendar (OAuth)
- Supabase (funcoes auxiliares)

## Estrutura de pastas
- `server.js`: bootstrap do servidor
- `src/app.js`: config do Express e rotas
- `src/routes/`: rotas HTTP
- `src/controllers/`: camada de controllers
- `src/services/`: regra de negocio e acesso ao banco
- `prisma/schema.prisma`: schema do Prisma
- `supabase/functions/`: funcoes usadas no Supabase (Deno)

## Requisitos
- Node.js 18+ (ou compat)
- PostgreSQL rodando localmente

## Configuracao de ambiente
Crie/ajuste `.env` com as variaveis abaixo (exemplo):

```
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/AdvSaas?schema=public"
JWT_SECRET="sua_chave"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REDIRECT_URI="http://localhost:3000/google/callback"
EVO_INSTANCE="..."
EVO_API_KEY="..."
BACKEND_URL="http://localhost:3000"
```

## Instalacao
```
npm install
```

## Banco de dados e migracoes
- Para aplicar as migracoes:
```
npx prisma migrate dev
```

- Em caso de drift (schema do banco diferente das migracoes):
```
npx prisma migrate reset
```
Isso apaga todos os dados do schema `public`.

## Seed de etapas (lead)
Ao subir o servidor, se nao existir nenhuma etapa no banco, o sistema cria:
- Contato Inicial
- Proposta enviada
- Contrato Fechado

Isso acontece em `src/services/etapasService.js` e e acionado em `src/app.js`.

## Scripts
- `npm run start`: inicia o servidor

## Rotas principais
Base: `http://localhost:3000`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Clientes
- `POST /clientes`
- `GET /clientes`
- `GET /clientes/:id`
- `PUT /clientes/:id`
- `DELETE /clientes/:id`
- `POST /clientes/atendimento`
- `POST /clientes/lead`
- `GET /clientes/relatorio/funil`
- `GET /clientes/filtro/avancado`

### Processos
- `POST /processos`
- `GET /processos`
- `GET /processos/:id`
- `PUT /processos/:id`
- `DELETE /processos/:id`
- `GET /processos/cliente/:clienteId`
- `POST /processos/:id/timeline`
- `GET /processos/:id/timeline`
- `PUT /processos/timeline/:eventoId`
- `DELETE /processos/timeline/:eventoId`
- `POST /processos/:id/anotacoes`
- `GET /processos/:id/anotacoes`
- `PUT /processos/anotacoes/:anotacaoId`
- `DELETE /processos/anotacoes/:anotacaoId`
- `POST /processos/upload-arquivo`
- `GET /processos/:id/arquivos`
- `POST /processos/:id/tarefas`
- `GET /processos/:id/tarefas`
- `PUT /processos/tarefas/:tarefaId`
- `DELETE /processos/tarefas/:tarefaId`
- `GET /processos/tarefas`

### Agendamentos
- `POST /agendamentos`
- `GET /agendamentos`
- `GET /agendamentos/:id`
- `PUT /agendamentos/:id`
- `DELETE /agendamentos/:id`
- `POST /agendamentos/agendar/:slug`

### Etapas (lead)
- `GET /etapas`
- `POST /etapas`
- `PUT /etapas/:id`
- `DELETE /etapas/:id`

### Financeiro
- `POST /financeiro/honorarios`
- `GET /financeiro/honorarios/:processoId`
- `POST /financeiro/transacao`
- `GET /financeiro/transacoes`
- `PATCH /financeiro/transacoes/:id/status`
- `POST /financeiro/contas`
- `GET /financeiro/contas`
- `GET /financeiro/relatorio`
- `GET /financeiro/relatorio-financeiro`
- `GET /financeiro/exportar`

### Stripe
- `POST /stripe/gerar-boleto`
- `GET /stripe/boletos`
- `PATCH /stripe/boletos/:id`
- `POST /webhook` (Stripe webhook)

### WhatsApp
- `POST /whatsapp`
- `GET /whatsapp`
- `POST /whatsapp/enviar`

### Email
- `POST /email/enviar`

### Google
- `GET /google/auth`
- `GET /google/callback`

## Observacoes
- Uploads sao salvos em `src/uploads` e servidos por `/uploads`.
- O webhook do Stripe usa `express.raw` no `src/app.js`.

## Troubleshooting rapido
- Erro "argument handler must be a function": verifique se o controller exporta as funcoes usadas nas rotas.
- Erro de assinatura Stripe: valide `STRIPE_WEBHOOK_SECRET`.
- Erro de OAuth Google: valide `GOOGLE_REDIRECT_URI`.