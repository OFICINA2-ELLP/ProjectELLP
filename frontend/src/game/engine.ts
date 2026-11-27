import type { GameState, Input, Level, Point, Rect } from "./types";

export const COUNTDOWN_SECONDS = 3;

export function createState(level: Level): GameState {
  return {
    player: { ...level.start },
    enemies: level.enemies.map(({ x, y, vy }) => ({ x, y, vy })),
    collected: level.coins.map(() => false),
    deaths: 0,
    status: "playing",
    pendingCoin: null,
    countdown: 0,
  };
}

export function playerRect(center: Point, size: number): Rect {
  return { x: center.x - size / 2, y: center.y - size / 2, w: size, h: size };
}

function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleHitsRect(cx: number, cy: number, r: number, rect: Rect): boolean {
  const nearestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  const nearestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy < r * r;
}

function isBlocked(level: Level, center: Point): boolean {
  const rect = playerRect(center, level.playerSize);
  const outOfBounds =
    rect.x < 0 || rect.y < 0 || rect.x + rect.w > level.width || rect.y + rect.h > level.height;
  return outOfBounds || level.walls.some((wall) => rectsOverlap(rect, wall));
}

function moveEnemies(level: Level, state: GameState, dt: number) {
  state.enemies.forEach((enemy, i) => {
    const def = level.enemies[i];
    enemy.y += enemy.vy * dt;
    if (enemy.y < def.minY) {
      enemy.y = def.minY;
      enemy.vy = Math.abs(enemy.vy);
    } else if (enemy.y > def.maxY) {
      enemy.y = def.maxY;
      enemy.vy = -Math.abs(enemy.vy);
    }
  });
}

function movePlayer(level: Level, state: GameState, input: Input, dt: number) {
  const length = Math.hypot(input.dx, input.dy) || 1;
  const step = (level.playerSpeed * dt) / length;

  const nextX = { x: state.player.x + input.dx * step, y: state.player.y };
  if (!isBlocked(level, nextX)) state.player.x = nextX.x;

  const nextY = { x: state.player.x, y: state.player.y + input.dy * step };
  if (!isBlocked(level, nextY)) state.player.y = nextY.y;
}

function hitsEnemy(level: Level, state: GameState): boolean {
  const rect = playerRect(state.player, level.playerSize);
  return state.enemies.some((enemy, i) =>
    circleHitsRect(enemy.x, enemy.y, level.enemies[i].radius, rect),
  );
}

/** Se o jogador tocou numa moeda, congela o jogo e abre a pergunta. */
function touchCoin(level: Level, state: GameState): boolean {
  const rect = playerRect(state.player, level.playerSize);
  const index = level.coins.findIndex(
    (coin, i) => !state.collected[i] && circleHitsRect(coin.x, coin.y, coin.radius, rect),
  );
  if (index === -1) return false;
  state.status = "question";
  state.pendingCoin = index;
  return true;
}

function killPlayer(level: Level, state: GameState) {
  state.deaths += 1;
  state.player = { ...level.start };
}

function reachedGoal(level: Level, state: GameState): boolean {
  const { x, y } = state.player;
  const { goalZone: g } = level;
  const inside = x >= g.x && x <= g.x + g.w && y >= g.y && y <= g.y + g.h;
  return inside && state.collected.every(Boolean);
}

/** Avança a simulação em `dt` segundos, alterando `state` no lugar. */
export function step(level: Level, state: GameState, input: Input, dt: number) {
  if (state.status === "countdown") {
    state.countdown -= dt;
    if (state.countdown <= 0) {
      state.countdown = 0;
      state.status = "playing";
    }
    return;
  }
  if (state.status !== "playing") return;

  moveEnemies(level, state, dt);
  movePlayer(level, state, input, dt);

  if (hitsEnemy(level, state)) {
    killPlayer(level, state);
    return;
  }

  if (touchCoin(level, state)) return;
  if (reachedGoal(level, state)) state.status = "won";
}

/** Resolve a pergunta aberta: acerto inicia a contagem, erro volta ao início. */
export function answerQuestion(level: Level, state: GameState, correct: boolean) {
  if (state.status !== "question" || state.pendingCoin === null) return;

  if (correct) {
    state.collected[state.pendingCoin] = true;
    state.status = "countdown";
    state.countdown = COUNTDOWN_SECONDS;
  } else {
    killPlayer(level, state);
    state.status = "playing";
  }
  state.pendingCoin = null;
}

/** Reinicia a fase, zerando moedas, inimigos e o contador de mortes. */
export function restart(level: Level, state: GameState) {
  Object.assign(state, createState(level));
}
