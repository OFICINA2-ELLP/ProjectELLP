#!/usr/bin/env bash
# Uso: DRY_RUN=1 ./criar-issues.sh   (apenas imprime)
#      REPO=OFICINA2-ELLP/ProjectELLP ./criar-issues.sh
# Requer: gh auth login. Troque M1..M4 pelos @usuarios GitHub reais.
set -euo pipefail
REPO="${REPO:-OFICINA2-ELLP/ProjectELLP}"
M1="${M1:-membro1}"; M2="${M2:-membro2}"; M3="${M3:-membro3}"; M4="${M4:-membro4}"
run() { if [ "${DRY_RUN:-0}" = 1 ]; then echo "[dry] $*"; else "$@"; fi; }

for l in "P0:B60205" "P1:FBCA04" "P2:0E8A16" "front:1D76DB" "back:5319E7" "game:D93F0B" "infra:6F42C1" "docs:0075CA" "teste:C5DEF5"; do
  run gh label create "${l%%:*}" --color "${l##*:}" --repo "$REPO" --force
done
run gh api -X POST "repos/$REPO/milestones" -f title="Sprint 2" -f due_on="2026-11-30T23:59:00Z" || true

issue() { # titulo | labels | responsavel | corpo
  run gh issue create --repo "$REPO" --title "$1" --label "$2" --assignee "$3" --milestone "Sprint 2" --body "$4"
}

# --- Membro 1: Game ---
issue "Integrar engine com suporte a eixo X/Y nos inimigos" "P0,game" "$M1" "Aplicar niveis/game/engine.ts e types.ts. Critério: level1 continua igual; testes da engine passam."
issue "Integrar parser ASCII de fases (parse.ts) + fases 2 a 4" "P0,game" "$M1" "Aplicar parse.ts e levels/index.ts. Rodar npx tsx check-levels.ts: todas as fases 'venceu' a 30Hz e 60Hz."
issue "Projetar fases 5 e 6 (labirinto, 3-4 moedas, folga 2-3 px)" "P1,game" "$M1" "Usar bot.ts para validar solvabilidade."
issue "Testes unitários da engine (colisão, moeda, chegada)" "P0,teste,game" "$M1" "Vitest; cobertura >= meta definida."

# --- Membro 2: Front ---
issue "Tela de seleção de fases com bloqueio/desbloqueio" "P0,front" "$M2" "Consome GET /levels e /progress."
issue "HUD: fase, mortes, moedas, tempo; botões na tela (RF04)" "P1,front" "$M2" "Controles touch + teclado/WASD."
issue "Fluxo de pergunta ao pegar moeda (manter questions.ts)" "P0,front,game" "$M2" "Acerto: countdown 3s; erro: volta ao início."
issue "Testes de componentes (RTL) para GameCanvas e seleção" "P1,teste,front" "$M2" ""

# --- Membro 3: Back ---
issue "Setup NestJS + Prisma + Supabase (schema, migrations, seed das fases)" "P0,back" "$M3" "Variáveis conforme README; .env.example versionado."
issue "Login Google OAuth2 + JWT em cookie httpOnly" "P0,back" "$M3" "/auth/google, /callback, /logout, /me."
issue "Endpoints /levels, /progress e PUT /progress/:levelId" "P0,back" "$M3" "Guard JWT; progresso salvo por usuário/fase."
issue "Testes Jest + Supertest dos endpoints" "P0,teste,back" "$M3" ""

# --- Membro 4: Infra/Docs/PO ---
issue "GitHub Actions CI (lint + testes + cobertura) em front e back" "P0,infra" "$M4" "Cobertura visível no PR."
issue "Deploy Vercel (front) e Railway (back) + CORS/cookies" "P1,infra" "$M4" ""
issue "Integração front↔back: login real e salvar progresso" "P0,front,back" "$M4" "Substituir mocks."
issue "Vídeo de até 5 min (execução, testes, funcionalidades)" "P0,docs" "$M4" "Gravar em 29/11."
issue "Atualizar README + agendar reunião quinzenal com o professor" "P1,docs" "$M4" "Cada integrante com commits próprios (autoria individual avaliada)."
