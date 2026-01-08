# SaaS Adv - Frontend

Frontend web do SaaS Adv, voltado para escritorios juridicos. Esta aplicacao oferece modulos para gestao de processos, clientes, tarefas, agenda, financeiro e atendimento, com dashboard centralizado.

## Sumario
- Visao geral
- Objetivos do sistema
- Funcionalidades por modulo
- Tecnologias
- Como rodar localmente
- Scripts disponiveis
- Variaveis de ambiente
- Estrutura do projeto (detalhada)
- Rotas principais
- Integracao com API e dados
- Temas (claro/escuro)
- Padroes e convencoes
- Troubleshooting
- Checklist de manutencao

## Visao geral
Aplicacao React com Vite que se conecta a uma API backend para autenticacao e dados. A interface e organizada por paginas (rotas) e componentes reutilizaveis, incluindo modais, cards e graficos. O token de autenticacao e lido do `localStorage` e enviado automaticamente nas requisicoes.

## Objetivos do sistema
- Centralizar informacoes juridicas (processos, clientes e tarefas).
- Acompanhar agenda e prazos.
- Controlar financeiro (transacoes e boletos).
- Facilitar comunicacao e atendimento.

## Funcionalidades por modulo
- Dashboard
  - Indicadores (clientes, processos, agendamentos, mensagens)
  - Graficos de distribuicao e comparativos
  - Listas de tarefas urgentes, processos e mensagens recentes
- Processos
  - Listagem e acesso aos detalhes
  - Cadastro/edicao via modal
  - Associacao com clientes e tarefas
- Clientes
  - Listagem e detalhe
  - Cadastro/edicao via modal
- Agendamentos
  - Calendario e criacao de eventos
- Tarefas
  - Listagem, status, prioridade
  - Cadastro/edicao via modal
- Financeiro
  - Resumo de entradas/saidas e saldo
  - Fluxo de caixa e distribuicao por categoria
  - Boletos e transacoes
- Atendimento
  - Conversas e mensagens recentes
  - Notificacoes via toast
- Configuracoes
  - Perfil do usuario
  - Integracoes (Google Calendar / WhatsApp)
  - Tema claro/escuro

## Tecnologias
- React 19
- Vite 6
- Tailwind CSS
- React Router
- Recharts e Chart.js
- FullCalendar
- Axios
- date-fns
- Lucide e react-icons
- Stripe JS (checkout/boletos)

## Como rodar localmente
Requisitos: Node.js 18+ e npm.

1) Instale dependencias
```bash
npm install
```

2) Rode o projeto
```bash
npm run dev
```

3) Build de producao
```bash
npm run build
```

4) Preview do build
```bash
npm run preview
```

5) Lint
```bash
npm run lint
```

## Scripts disponiveis
Definidos em `package.json`:
- `dev`: inicia o servidor Vite em modo desenvolvimento
- `build`: gera o build de producao
- `preview`: serve o build localmente
- `lint`: roda ESLint em todo o projeto

## Variaveis de ambiente
Crie um arquivo `.env` na raiz para configurar a URL da API.

```
VITE_API_BASE_URL=http://SEU_LOCAL_HOST:3000
```

Se nao for definido, o sistema usa o valor padrao definido em `src/services/api.js`.

## Estrutura do projeto (detalhada)
```
src/
  assets/
    favicon.ico, imagens e audio
  components/
    atendimento/         UI do atendimento e conversas
    clientes/            Cards e modais de clientes
    dashboard/           Componentes do dashboard (cards, graficos e listas)
    financeiro/          Graficos, tabelas e componentes do financeiro
    layout/              Sidebar, navbar e layout geral
    modal/               Modais genericos (formularios)
    processos/           Componentes de processos (info, tarefas, anotacoes)
    ui/                  Componentes de interface (Card, Badge, Input, Switch)
  context/
    ToastContext.jsx     Provider e hook de notificacao
    ThemeContext.jsx     Provider e hook de tema claro/escuro
  hooks/
    useDashboardData.js  Carrega dados do dashboard
    useMensagens.js      Carrega mensagens e contagem de nao lidas
  pages/
    Dashboard.jsx        Visao geral
    Processos.jsx        Lista de processos
    DetalhesProcesso.jsx Detalhe do processo
    ClientesPage.jsx     Lista de clientes
    ClienteDetalhesWrapper.jsx  Detalhe do cliente
    Agendamentos.jsx     Agenda
    Tarefas.jsx          Tarefas
    Financeiro.jsx       Financeiro
    Atendimento.jsx      Atendimento
    ConfigPage.jsx       Configuracoes
    Login.jsx / Register.jsx / SelecionarPlano.jsx
  services/
    api.js               Cliente Axios e configuracao de token
    clienteService.js    Clientes e agendamentos
    processoService.js   Processos e tarefas
    financeiroService.js Transacoes e boletos
    mensagemService.js   Mensagens
    usuarioService.js    Usuarios
  utils/
    metrics.js           Calculos de crescimento
    dateUtils.js         Helpers de data
```

## Rotas principais
Definidas em `src/App.jsx`:
- `/` Dashboard
- `/processos` Processos
- `/processos/:id` Detalhes do processo
- `/cliente` Clientes
- `/detalhes-cliente` Detalhe de cliente
- `/agendamento` Agendamentos
- `/tarefas` Tarefas
- `/financeiro` Financeiro
- `/atendimento` Atendimento
- `/configuracao` Configuracoes
- `/login` Login
- `/register` Registro
- `/planos` Selecionar plano
- `/pagamento-sucesso` Finalizar cadastro
- `/google-callback` Callback Google Calendar

## Integracao com API e dados
- Cliente HTTP central em `src/services/api.js`
  - Base URL vem de `VITE_API_BASE_URL` ou default definido no arquivo
  - Token e lido do `localStorage` e enviado via `Authorization: Bearer <token>`
- Pages chamam services e atualizam estado local com `useState`/`useEffect`.
- Componentes de grafico recebem dados ja preparados (ex: fluxo de caixa e categorias).

Principais services:
- `clienteService.js`: clientes e agendamentos
- `processoService.js`: processos e tarefas
- `financeiroService.js`: transacoes e boletos
- `mensagemService.js`: atendimento/mensagens
- `usuarioService.js`: usuarios

## Temas (claro/escuro)
- Controlado via `ThemeContext`.
- Estado do tema fica em `localStorage` com chave `theme`.
- O tema aplica classe `theme-light` ou `theme-dark` no `document.documentElement`.
- Estilos globais ficam em `src/index.css`.

## Padroes e convencoes
- Preferir componentes pequenos e reutilizaveis.
- Evitar logica de negocio complexa em componentes de UI; mover para `services/` ou `hooks/`.
- Modais ficam em `src/components/modal/` ou no dominio correspondente.
- Usar Tailwind para estilos. Evitar CSS global quando possivel.
- Rotas protegidas verificam `token` no `localStorage`.

## Troubleshooting
- Sem dados na tela: verifique se a API esta online e se `VITE_API_BASE_URL` esta correta.
- Redirecionando para login: confira se existe `token` valido no `localStorage`.
- Erros de CORS: ajuste configuracoes do backend ou proxy.

## Checklist de manutencao
- Atualize este README quando:
  - Novas rotas forem adicionadas
  - Variaveis de ambiente forem criadas
  - Scripts do `package.json` forem alterados
  - Novos modulos/componentes principais entrarem no projeto
  - Mudancas de tema forem feitas no `ThemeContext`/`index.css`
