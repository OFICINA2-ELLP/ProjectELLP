import type { EnemyDef, Level } from "./types";

const LANES = 6;
const FIRST_LANE_X = 230;
const LANE_SPACING = 70;
const ENEMY_RADIUS = 12;
const MIN_Y = 120 + ENEMY_RADIUS;
const MAX_Y = 360 - ENEMY_RADIUS;

const enemies: EnemyDef[] = Array.from({ length: LANES }, (_, i) => ({
  x: FIRST_LANE_X + i * LANE_SPACING,
  y: MIN_Y + ((i * 53) % (MAX_Y - MIN_Y)),
  radius: ENEMY_RADIUS,
  vy: i % 2 === 0 ? 150 : -150,
  minY: MIN_Y,
  maxY: MAX_Y,
}));

export const level1: Level = {
  name: "Fase 1",
  width: 800,
  height: 480,
  playerSize: 20,
  playerSpeed: 170,
  start: { x: 60, y: 240 },
  startZone: { x: 0, y: 120, w: 120, h: 240 },
  goalZone: { x: 680, y: 120, w: 120, h: 240 },
  walls: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 360, w: 800, h: 120 },
  ],
  enemies,
  coins: [{ x: 335, y: 240, radius: 9 }],
};
