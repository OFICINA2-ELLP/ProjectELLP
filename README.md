# ProjectELLP
Sistema web de apoio ao ensino de lógica desenvolvido para o projeto de extensão ELLP da UTFPR — Cornélio Procópio. A plataforma centraliza a autenticação via Google, um jogo de fases em que o aluno move um personagem por labirintos e responde perguntas de lógica, e o acompanhamento do progresso dos usuários em um único ambiente.

**Índice:** [Sobre o Projeto](#sobre-o-projeto) · [Tecnologias](#tecnologias) · [Requisitos funcionais](#requisitos-funcionais) · [Requisitos não funcionais](#requisitos-não-funcionais) · [Arquitetura de Alto Nível](#arquitetura-de-alto-nível) · [Configuração de Ambiente](#configuração-de-ambiente) · [Documentação e Diagramas](#documentação-e-diagramas) · [Planejamento e Cronograma](#planejamento-e-cronograma-do-projeto) · [Contribuindo](#contribuindo) · [Equipe](#equipe)

---

## Sobre o Projeto

O **ELLP (Ensino Lúdico de Lógica e Programação)** é um projeto de extensão universitária dedicado a levar conhecimentos de ciência, tecnologia e lógica de programação para estudantes da rede pública de ensino da região de Cornélio Procópio. Por meio de oficinas e experiências lúdicas, o projeto busca desmistificar a computação, estimulando a criatividade, a cooperação e a autoconfiança de crianças e adolescentes.

Este sistema foi desenvolvido como projeto da disciplina de **Oficina de Integração 2** do curso de **Bacharelado em Engenharia de Software da UTFPR** — Campus Cornélio Procópio, com o objetivo de disponibilizar uma ferramenta web interativa e intuitiva de movimentação visual de personagens, permitindo que os alunos pratiquem conceitos básicos de lógica e acompanhem seu aprendizado de forma centralizada e acessível.

### Como o jogo funciona

O aluno controla um quadrado vermelho com as setas do teclado (ou WASD) por um labirinto cheio de círculos azuis em movimento. Cada fase tem moedas: ao tocar uma moeda, o jogo pausa e aparece uma pergunta de lógica de programação. Acertar coleta a moeda e inicia uma contagem de 3 segundos; errar devolve o jogador ao início. Para vencer, é preciso coletar todas as moedas e chegar à zona de chegada (verde). A dificuldade cresce a cada fase, e a próxima só é liberada depois de concluir a anterior.

---

## Tecnologias

| Camada | Tecnologia | Situação |
|--------|-----------|:---:|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 (jogo em HTML5 Canvas) | Em uso |
| Backend | NestJS, Prisma ORM | Sprint 2 |
| Banco de dados | PostgreSQL (Supabase) | Sprint 2 |
| Autenticação | JWT + Google OAuth 2.0 (Passport.js) | Sprint 2 |
| Testes Automatizados Frontend | Vitest + React Testing Library | Sprint 2 |
| Testes Automatizados Backend | Jest + Supertest (Unitários e Integração) | Sprint 2 |
| CI/CD | GitHub Actions (lint, testes e build) | Sprint 2 |
| Hospedagem Frontend | Vercel | Sprint 2 |
| Hospedagem Backend | Railway | Sprint 2 |
| Modelagem e Diagramas | PlantUML, Mermaid, dbdiagram.io | Em uso |

> O HeroUI constava na lista de tecnologias, mas não é usado no código. A interface usa apenas Tailwind CSS. Se a equipe decidir adotá-lo, volta para a tabela.

---

## Requisitos funcionais

| Código | Descrição |
|:---:|---|
| **RF01** | O sistema deve exibir um mapa contendo um ponto inicial, um objetivo e obstáculos (paredes e inimigos em movimento). |
| **RF02** | O sistema deve posicionar o personagem no ponto inicial ao carregar ou reiniciar uma fase. |
| **RF03** | O sistema deve permitir mover o personagem (quadrado vermelho) em todas as direções por meio das setas do teclado ou das teclas WASD. |
| **RF04** | O sistema deve disponibilizar botões direcionais na tela para controlar o personagem em dispositivos sem teclado (toque). |
| **RF05** | O sistema deve movimentar automaticamente os inimigos (círculos azuis) em trajetórias definidas por fase; ao tocar um inimigo, o personagem volta ao ponto inicial e o contador de mortes é incrementado. |
| **RF06** | O sistema deve exibir moedas no mapa e, ao toque do personagem em uma moeda, pausar o jogo e apresentar uma pergunta de lógica de múltipla escolha. |
| **RF07** | O sistema deve, quando a resposta for correta, coletar a moeda e iniciar uma contagem regressiva de 3 segundos antes de retomar o jogo; quando for incorreta, o personagem volta ao ponto inicial e a moeda continua disponível. |
| **RF08** | O sistema deve exibir durante a partida o número de moedas coletadas e o número de mortes. |
| **RF09** | O sistema deve impedir que o personagem ultrapasse os limites do mapa ou atravesse paredes. |
| **RF10** | O sistema deve sinalizar ao usuário quando o personagem for atingido por um inimigo (retorno ao início e atualização do contador de mortes). |
| **RF11** | O sistema deve identificar quando o personagem atingir a zona de chegada com todas as moedas coletadas e exibir uma mensagem de fase concluída. |
| **RF12** | O sistema deve permitir que o usuário reinicie a fase a qualquer momento (tecla R ou botão), zerando moedas coletadas e mortes. |
| **RF13** | O sistema deve permitir a autenticação do usuário utilizando o login com conta do Google |
| **RF14** | O sistema deve persistir o progresso do usuário autenticado (fase atual/concluída) no banco de dados |
| **RF15** | O sistema deve permitir que o usuário retome o jogo a partir da última fase salva ao logar novamente |
| **RF16** | O sistema deve disponibilizar múltiplas fases com dificuldade progressiva (mais inimigos, inimigos mais rápidos, mais moedas e corredores mais estreitos) |
| **RF17** | O sistema deve desbloquear a próxima fase somente após a conclusão da fase atual |
| **RF18** | O sistema deve permitir que o usuário selecione, entre as fases já desbloqueadas, qual deseja jogar |
| **RF19** | O sistema deve exibir um resumo/histórico do desempenho do usuário (ex: fases concluídas, tentativas por fase) |
| **RF20** | O sistema deve permitir logout do usuário autenticado |
| **RF21** | O sistema deve sortear a pergunta apresentada em cada moeda a partir de um banco de perguntas de lógica de programação |

> **Revisão v2:** RF03 a RF08, RF10 a RF12, RF16 e RF21 foram reescritos para o formato atual do jogo (labirinto com inimigos e moedas com perguntas), que substitui o modelo anterior de fila de comandos ("cima", "baixo"...). RNF10 e RNF11 foram acrescentados.

## Requisitos não funcionais

| Código | Descrição do Requisito Não Funcional |
| :--- | :--- |
| **RNF01** | A aplicação deve ser compatível e funcionar corretamente nos principais navegadores modernos (Google Chrome, Microsoft Edge, Mozilla Firefox e Safari). |
| **RNF02** | A interface da aplicação deve ser responsiva, adaptando-se adequadamente a computadores e dispositivos móveis. |
| **RNF03** | A interface visual deve responder aos comandos de movimentação do personagem em tempo de execução inferior a 100ms. |
| **RNF04** | A interface gráfica deve manter contraste suficiente e identificação clara do personagem, obstáculos, ponto inicial e objetivo. |
| **RNF05** | O sistema deve possuir suítes de testes automatizados para validar a lógica de movimentação no Front-End e as rotas e regras de negócio no Back-End. |
| **RNF06** | A arquitetura deve ser construída em TypeScript, utilizando Next.js/React no Front-End, NestJS no Back-End, Prisma ORM e PostgreSQL no Banco de Dados. |
| **RNF07** | O código-fonte deve seguir princípios de Clean Code, modularização por camadas (Controller, Service, Repository) e possuir documentação de rotas via Swagger/OpenAPI. |
| **RNF08** | As rotas privadas da API devem ser protegidas por tokens JWT emitidos após autenticação segura via Google OAuth 2.0. |
| **RNF09** | O repositório deve utilizar GitHub Actions como esteira de Integração Contínua (CI) para execução automática de linter e testes. |
| **RNF10** | O sistema deve coletar apenas os dados pessoais necessários (nome, e-mail e identificador Google) e tratá-los conforme a LGPD, considerando que o público-alvo inclui menores de idade. |
| **RNF11** | O progresso salvo do usuário não deve ser perdido em caso de falha ou reinício da aplicação (persistência em banco de dados gerenciado). |

---

## Arquitetura de Alto Nível

### Visão geral

O sistema segue uma arquitetura **cliente-servidor em três camadas**, com front-end e back-end em serviços separados dentro do mesmo repositório (monorepo). O jogo roda inteiramente no navegador; o back-end cuida de identidade e persistência.

### Componentes e responsabilidades

| Componente | Responsabilidade | Não faz |
|---|---|---|
| **Front-end (Next.js)** | Telas de login e de jogo, renderização em Canvas, motor do jogo (movimento, colisões, moedas, perguntas), chamadas à API | Não guarda dados de forma definitiva; não valida identidade |
| **Back-end (NestJS)** | Login com Google, emissão e validação do JWT, regras de desbloqueio de fases, gravação e consulta de progresso, documentação Swagger | Não simula o jogo |
| **Banco (PostgreSQL / Supabase)** | Usuários, fases, progresso por fase e histórico de tentativas | Não contém lógica de jogo |
| **Google OAuth 2.0** | Autentica o usuário e informa nome, e-mail e identificador | Não conhece o progresso |



### API REST prevista

Documentação interativa (Swagger/OpenAPI) em `/docs` quando o back-end estiver no ar (RNF07).

| Método | Rota | Acesso | Descrição | Requisitos |
|:---:|---|:---:|---|---|
| GET | `/auth/google` | Público | Inicia o login com Google | RF13 |
| GET | `/auth/google/callback` | Público | Recebe o retorno do Google e emite o JWT | RF13, RNF08 |
| POST | `/auth/logout` | JWT | Encerra a sessão (limpa o cookie) | RF20 |
| GET | `/me` | JWT | Dados do usuário logado | RF13 |
| GET | `/levels` | JWT | Lista as fases com situação (bloqueada, liberada, concluída) | RF16, RF17, RF18 |
| GET | `/progress` | JWT | Progresso e resumo de desempenho | RF14, RF15, RF19 |
| PUT | `/progress/:levelId` | JWT | Registra tentativa ou conclusão da fase | RF14, RF17 |
| GET | `/health` | Público | Verificação de saúde (usada pelo Railway) | — |

### Estrutura do repositório

```text
ProjectELLP/
├── frontend/                  # Next.js (existe)
│   └── src/
│       ├── app/               # rotas: /login e /jogo
│       ├── components/        # GameCanvas.tsx
│       └── game/              # engine.ts, types.ts, levels, questions.ts
├── backend/                   # NestJS (Sprint 2)
│   ├── prisma/                # schema.prisma e migrations
│   └── src/
│       ├── auth/              # estratégia Google, JWT, guards
│       ├── progress/          # controller, service e DTOs
│       └── prisma/            # PrismaService
├── docs/                      # CONTRIBUTING.md e diagramas
└── .github/workflows/         # CI (Sprint 2)
```

### Decisões arquiteturais

| Decisão | Motivo | Consequência |
|---|---|---|
| O motor do jogo roda só no front-end | O jogo é em tempo real (60 quadros por segundo); uma ida e volta à API a cada quadro seria inviável | O back-end confia no resultado enviado pelo front. Para um jogo educativo isso é aceitável; anti-trapaça não é requisito |
| Fases e perguntas ficam no código do front na Sprint 1 | Simples e suficiente para poucas fases | Quando professores precisarem editar perguntas, migrar para tabelas no banco |
| JWT em cookie `httpOnly`, não em `localStorage` | JavaScript da página não consegue ler o cookie, o que reduz o risco de roubo por XSS | Exige configurar CORS com credenciais ou usar o proxy abaixo |
| Front chama `/api/*` e o Next.js repassa ao back-end (`rewrites`) | Front (Vercel) e back (Railway) ficam em domínios diferentes; o proxy deixa o cookie no mesmo domínio e evita CORS | Uma variável a mais (`API_URL`) no front |
| Monorepo com `frontend/` e `backend/` | Um só repositório para a equipe de 4 pessoas, com PRs que atravessam as duas partes | CI com um job por pasta |
| Prisma + Supabase | Migrations versionadas e tipagem do banco em TypeScript | Atenção às duas URLs de conexão (ver Problemas comuns) |

---

## Configuração de Ambiente

> **Situação atual:** apenas o `frontend/` existe no repositório. Os passos do `backend/` descrevem a estrutura prevista para a Sprint 2 e serão revistos quando a pasta for criada.

### Pré-requisitos

| Ferramenta | Versão | Observação |
|---|---|---|
| Node.js | 20.9 ou superior (recomendado 22 LTS) | Exigência do Next.js 16 |
| npm | 10 ou superior | Vem com o Node.js |
| Git | Qualquer versão recente | |
| Conta Google Cloud | — | Credenciais OAuth (Sprint 2) |
| Conta Supabase | — | Banco PostgreSQL (Sprint 2) |

Extensões úteis do VS Code: ESLint, Tailwind CSS IntelliSense e Prisma.

### 1. Clonar e rodar o front-end

```bash
git clone https://github.com/<organizacao>/ProjectELLP.git
cd ProjectELLP/frontend
npm install
npm run dev
```

Abra http://localhost:3000. O front-end não precisa de variáveis de ambiente enquanto o back-end não existir.

### 2. Variáveis de ambiente (Sprint 2)

Cada pasta tem um arquivo `.env.example` versionado, com nomes e valores de exemplo. Para usar, copie para o arquivo real e preencha:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

**`backend/.env`**

| Variável | Exemplo | Descrição |
|---|---|---|
| `PORT` | `3001` | Porta da API |
| `DATABASE_URL` | `postgresql://postgres.<ref>:<senha>@<host>.pooler.supabase.com:6543/postgres?pgbouncer=true` | Conexão usada pela aplicação (pooler do Supabase) |
| `DIRECT_URL` | `postgresql://postgres.<ref>:<senha>@<host>.pooler.supabase.com:5432/postgres` | Conexão direta, usada nas migrations |
| `JWT_SECRET` | texto longo e aleatório | Assinatura do token. Nunca reutilizar entre ambientes |
| `JWT_EXPIRES_IN` | `1d` | Validade do token |
| `GOOGLE_CLIENT_ID` | `<id>.apps.googleusercontent.com` | Credencial OAuth |
| `GOOGLE_CLIENT_SECRET` | `<segredo>` | Credencial OAuth |
| `GOOGLE_CALLBACK_URL` | `http://localhost:3001/auth/google/callback` | Deve ser idêntica à cadastrada no Google |
| `FRONTEND_URL` | `http://localhost:3000` | Para onde o back redireciona após o login |

**`frontend/.env.local`**

| Variável | Exemplo | Descrição |
|---|---|---|
| `API_URL` | `http://localhost:3001` | Destino do proxy `/api/*` (usado só no servidor do Next.js) |

> **Atenção:** o `.gitignore` do front-end ignora `.env*`, o que também esconde o `.env.example`. Acrescente a linha `!.env.example` ao `.gitignore` de cada pasta para ele ser versionado. Os arquivos `.env` e `.env.local` com segredos **nunca** devem ir para o GitHub.

### 3. Credenciais do Google (Sprint 2)

1. Acesse o [Google Cloud Console](https://console.cloud.google.com) e crie um projeto.
2. Em **APIs e serviços > Tela de permissão OAuth**, escolha o tipo **Externo**, preencha o nome do app e adicione os escopos `email` e `profile`.
3. Enquanto o app estiver em modo de teste, **só os e-mails cadastrados como usuários de teste conseguem entrar**. Cadastre os e-mails da equipe e do professor, ou publique o app.
4. Em **Credenciais > Criar credenciais > ID do cliente OAuth**, escolha **Aplicativo da Web**.
5. Em **URIs de redirecionamento autorizados**, adicione `http://localhost:3001/auth/google/callback` e, depois do deploy, a URL de produção equivalente.
6. Copie o ID e o segredo para `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`.

### 4. Banco de dados no Supabase (Sprint 2)

1. Crie um projeto em [supabase.com](https://supabase.com) e guarde a senha do banco.
2. Em **Project Settings > Database > Connection string**, copie a conexão do pooler (porta 6543) para `DATABASE_URL`, com `?pgbouncer=true` no final, e a conexão direta (porta 5432) para `DIRECT_URL`.
3. Com o `backend/` criado, aplique o schema:

```bash
cd backend
npm install
npx prisma migrate dev     # cria as tabelas e gera o Prisma Client
npx prisma db seed         # cadastra as fases
```

### 5. Executar tudo

```bash
# Terminal 1 - back-end (Sprint 2)
cd backend && npm run start:dev      # http://localhost:3001  (Swagger em /docs)

# Terminal 2 - front-end
cd frontend && npm run dev           # http://localhost:3000
```

| Serviço | Endereço |
|---|---|
| Front-end | http://localhost:3000 |
| API | http://localhost:3001 |
| Swagger | http://localhost:3001/docs |

### Scripts do front-end

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção (precisa de internet para baixar as fontes do Google) |
| `npm run start` | Serve a versão de produção gerada pelo `build` |
| `npm run lint` | Verifica o estilo do código (ESLint) |

Os scripts `test` e `typecheck` serão adicionados junto com os testes automatizados (Sprint 2).

### Como saber se o ambiente está certo

- [ ] `node -v` mostra 20.9 ou superior.
- [ ] `npm run dev` sobe sem erros e http://localhost:3000 abre a tela de login.
- [ ] `npm run lint` termina sem erros.
- [ ] Em `/jogo`, o quadrado vermelho se move com as setas e o jogo reinicia com a tecla R.
- [ ] (Sprint 2) http://localhost:3001/docs abre o Swagger.
- [ ] (Sprint 2) O botão Entrar com o Google leva à tela do Google e volta para `/jogo` logado.

## Documentação e Diagramas
Os diagramas abaixo descrevem o sistema. Foram elaborados com PlantUML, Mermaid e dbdiagram.io.

* Diagrama de Casos de Uso
* Diagrama de Atividades
* Diagrama de Classes
* Diagrama do Banco de Dados

## Diagrama de Casos de Uso
<p align="center"> <img width="1125" height="827" alt="Diagrama de Casos de Uso do sistema ELLP" src="https://github.com/user-attachments/assets/2cecd0fa-9902-4642-885b-afa242555233" /> <br> <em>Figura 1 – Diagrama de Casos de Uso: interações do aluno com o sistema e com o serviço de autenticação do Google.</em> </p>

## Diagrama de Atividades
<p align="center"> <img width="651" height="908" alt="Diagrama de Atividades - parte 1" src="https://github.com/user-attachments/assets/cb6afdd6-ccb8-4d3f-a80b-e158c380ced9" /> <br> <em>Figura 2 – Diagrama de Atividades (parte 1): fluxo do jogador, da autenticação até a montagem da sequência de comandos.</em> </p> <p align="center"> <img width="651" height="908" alt="Diagrama de Atividades - parte 2" src="https://github.com/user-attachments/assets/890783ea-57eb-4868-9da1-b024e6c37b7c" /> <br> <em>Figura 3 – Diagrama de Atividades (parte 2): execução dos comandos, tratamento de colisão, conclusão da fase e salvamento do progresso.</em> </p>

## Diagrama de Classes
<p align="center"> <img width="1747" height="537" alt="Diagrama de Classes do domínio do sistema" src="https://github.com/user-attachments/assets/79690eaa-1d9e-4ccf-aff3-35b8c60c32b1" /> <br> <em>Figura 4 – Diagrama de Classes: entidades do domínio (usuário, fase, progresso) e a lógica de execução de comandos (MotorDeJogo).</em> </p>

## Diagrama do Banco de Dados


<p align="center"> <img width="901" height="820" alt="Diagrama de BD" src="https://github.com/user-attachments/assets/7e0a6cc3-548c-49f9-8929-af03c28e6110" /> <br> <em>Figura 5 – Diagrama do Banco de Dados (PostgreSQL): usuários, fases, obstáculos, progresso por fase e histórico de tentativas.</em> </p>

---

## Planejamento e Cronograma do Projeto

O desenvolvimento do **ProjectELLP** segue a metodologia ágil **Scrum**, dividido em duas **Sprints de Implementação**, cada uma seguida de uma janela de revisão/recuperação:

| Sprint | Entrega | Formato | Revisão/Recuperação | Foco |
|:---:|:---:|---|:---:|---|
| **1** | 16/10/2026 | Apresentação presencial | 17/10 a 24/10/2026 | Planejamento, motor do jogo e interface visual |
| **2** | 30/11/2026 | Entrega final | 01/12 a 07/12/2026 | Autenticação, back-end, persistência e progressão |

### Sprint 1 — Planejamento, Engine do Jogo e Interface Visual (Entrega: 16/10/2026) 📍 *Presencial*

* **Fase Inicial de Planejamento e Estruturação:**
  * Organização das equipes de desenvolvimento.
  * Levantamento e especificação completa dos Requisitos Funcionais (RF01 ao RF21) e Não Funcionais (RNF01 ao RNF11).
  * Definição da arquitetura do sistema e escolha do stack tecnológico (Next.js, React, TypeScript, NestJS, Prisma ORM e PostgreSQL).
  * Criação do repositório no GitHub com artefatos iniciais de configuração, padrões de código e guia de contribuição.
  * Modelagem do sistema (casos de uso, atividades, classes e banco de dados).

* **Escopo de Desenvolvimento (Engine e Frontend):**
  * **RF01 e RF02:** Mapa com zona de partida, zona de chegada, paredes e posicionamento inicial do personagem (`GameCanvas.tsx`).
  * **RF03, RF05 a RF08:** Movimento por teclado, inimigos em movimento, moedas com perguntas de lógica, contagem regressiva e placar de moedas e mortes (`engine.ts`).
  * **RF09 a RF12:** Colisão com paredes e limites, reinício ao tocar um inimigo, mensagem de fase concluída e reinício da fase.
  * **RNF04:** Contraste e identificação visual de personagem, obstáculos, início e objetivo.

* **Entregáveis da Sprint 1:**
  * Apresentação presencial do projeto e demonstração funcional.
  * Envio do vídeo de demonstração da aplicação e execução dos testes automatizados (máx. 5 minutos).
  * Histórico de commits, issues e quadro Kanban atualizados no GitHub.

* **Janela de Revisão/Recuperação:** 17/10/2026 a 24/10/2026.

* **Pendências da Sprint 1 (a resolver na janela de recuperação):**

| Pendência | Requisito | Por que importa |
|---|:---:|---|
| Testes automatizados da lógica do jogo (movimento, colisão com paredes e inimigos, moedas, resposta certa e errada, vitória) | RNF05 | A execução dos testes faz parte do vídeo de entrega. Ainda não há nenhum teste no repositório |
| Esteira de CI no GitHub Actions (lint e testes a cada Pull Request) | RNF09 | É barata de configurar e protege todo o desenvolvimento da Sprint 2 |
| Botões direcionais na tela | RF04, RNF02 | Hoje o jogo só responde ao teclado, o que impede o uso em tablets e celulares |
| Verificação em Chrome, Edge, Firefox e Safari | RNF01 | Nenhuma verificação registrada |
| Issues e quadro Kanban refletindo o estado real | Entregável | Faz parte da avaliação |

### Sprint 2 — Autenticação, Backend, Persistência e Progressão (Entrega: 30/11/2026)

* **Escopo das Funcionalidades:**
  * **RF13 a RF15:** Autenticação de usuários via Google OAuth 2.0 / JWT, controle de sessão e recuperação do estado do jogo.
  * **RF16 a RF21:** Sistema de múltiplas fases com dificuldade progressiva, desbloqueio e seleção de níveis, banco de perguntas, histórico de desempenho e funcionalidade de logout.
  * **RNF06 a RNF11:** Construção do back-end em NestJS com Prisma ORM, integração com PostgreSQL (Supabase), documentação das APIs via Swagger/OpenAPI, proteção por JWT, cuidados com a LGPD e persistência confiável.
  * **Testes do back-end:** Jest e Supertest cobrindo rotas e regras de negócio (parte do RNF05).

* **Entregáveis da Sprint 2:**
  * Vídeo de demonstração final e entrega do sistema completo integrado.
  * Validação final da cobertura de testes automatizados e arquitetura.

* **Janela de Revisão/Recuperação Final:** 01/12/2026 a 07/12/2026.

* **Marcos internos (proposta):** a Sprint 2 é a maior do projeto e, descontada a janela de recuperação da Sprint 1, tem cerca de 5 semanas. Dividi-la em marcos com datas ajuda a descobrir atrasos cedo.

| Marco | Período | Entregas |
|:---:|---|---|
| **Recuperação S1** | 20/10 a 24/10 (24/10 é sábado) | Pendências da Sprint 1 (tabela acima): testes, CI, botões na tela e verificação nos navegadores |
| **M1** | 26/10 a 06/11 | `backend/` criado, schema Prisma e migrations, projeto no Supabase, login com Google e logout (RF13, RF20) |
| **M2** | 09/11 a 19/11 | API de progresso (RF14, RF15), integração do front com a API, fases 2 a 5 e seleção de fases (RF16 a RF18) |
| **M3** | 20/11 a 26/11 | Histórico de desempenho (RF19), banco de perguntas (RF21), Swagger, testes do back-end, deploy na Vercel e no Railway. **Congelamento de escopo em 26/11** |
| **Buffer** | 27/11 a 29/11 | Correção de bugs, documentação final, vídeo e ensaio da apresentação |

> **Riscos do cronograma:** o buffer antes da entrega é curto e inclui um fim de semana, então a janela de 01/12 a 07/12 deve ser tratada como reserva, não como parte do plano. Há também feriados nacionais no período: **02/11 (Finados)** e **20/11 (Consciência Negra)**. O maior risco técnico é a integração com o Google OAuth, por isso ela entra no primeiro marco.

* **Definição de Pronto (DoD):** uma tarefa só é considerada pronta quando (1) o código passou por revisão em Pull Request, (2) lint e testes passam no CI, (3) o requisito atendido está funcionando no ambiente de demonstração, (4) a documentação afetada foi atualizada e (5) a issue correspondente foi movida para Concluído no Kanban.

---

## Contribuindo
Leia o [Guia de Contribuição](docs/CONTRIBUTING.md) antes de começar a desenvolver. Ele cobre:

* Padrão de branches (feat/, fix/, refact/, docs/, test/)
* Conventional Commits
* Fluxo de Pull Requests e Code Review (a `main` é protegida e os PRs vão para a branch `test`)
* Boas práticas de código para NestJS, Next.js e Prisma

## Equipe
Desenvolvido por estudantes do curso de Engenharia de Software da UTFPR — Cornélio Procópio:

* Julio Cezar Giandoso Filho
* Mateus Rubio Durão
* Rafael Tomé da Silva
* Silvio Henrique Mendes dos Santos

Orientador: Prof. Antonio Carlos Fernandes da Silva

---
