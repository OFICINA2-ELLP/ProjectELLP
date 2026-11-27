export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface EnemyDef {
  x: number;
  y: number;
  radius: number;
  /** Velocidade vertical em px/s (o sinal define a direção inicial). */
  vy: number;
  minY: number;
  maxY: number;
}

export interface CoinDef {
  x: number;
  y: number;
  radius: number;
}

export interface Level {
  name: string;
  width: number;
  height: number;
  playerSize: number;
  playerSpeed: number;
  start: Point;
  startZone: Rect;
  goalZone: Rect;
  walls: Rect[];
  enemies: EnemyDef[];
  coins: CoinDef[];
}

export type GameStatus = "playing" | "question" | "countdown" | "won";

export interface Question {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface GameState {
  player: Point;
  enemies: { x: number; y: number; vy: number }[];
  collected: boolean[];
  deaths: number;
  status: GameStatus;
  /** Índice da moeda cuja pergunta está aberta (status "question"). */
  pendingCoin: number | null;
  /** Segundos restantes da contagem após acertar (status "countdown"). */
  countdown: number;
}

export interface Input {
  dx: -1 | 0 | 1;
  dy: -1 | 0 | 1;
}
