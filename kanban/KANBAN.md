# Kanban Sprint 2 (entrega 30/11)

Kanban oficial = GitHub Projects (exigido pelo professor).
1. Rode `DRY_RUN=1 ./criar-issues.sh`, depois `REPO=org/repo M1=.. M2=.. M3=.. M4=.. ./criar-issues.sh`.
2. Repo > Projects > New project > template **Board**. Colunas: Backlog · A fazer · Em andamento · Em revisão (PR) · Feito.
3. Workflows do projeto: auto-adicionar issues do repo; PR mergeado → Feito.
4. Add items → todas as issues do milestone "Sprint 2".

Regras: 1 issue = 1 branch (`feat/...`) = 1 PR para `test`, com `Closes #N`. Máx. 2 cards em andamento por pessoa.
Corte: P0 obrigatório até 28/11; P1 em 29/11; P2/extra vai para recuperação 01–07/12.

| Dono | Trilha |
|---|---|
| M1 | Game: engine, fases, testes engine |
| M2 | Front: telas, HUD, perguntas, testes RTL |
| M3 | Back: NestJS, auth Google, progresso, testes |
| M4 | Infra/CI, integração, vídeo, README, reunião |

Plano: 26 setup+auth+engine · 27 fases/telas/endpoints · 28 integração · 29 CI/vídeo/testes · 30 entrega.
