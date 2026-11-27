"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answerQuestion, createState, restart, step } from "@/game/engine";
import { level1 } from "@/game/level1";
import { pickQuestion } from "@/game/questions";
import type { GameState, GameStatus, Input, Question } from "@/game/types";

const LEVEL = level1;

const KEY_DIRECTIONS: Record<string, { dx?: -1 | 1; dy?: -1 | 1 }> = {
  ArrowUp: { dy: -1 },
  ArrowDown: { dy: 1 },
  ArrowLeft: { dx: -1 },
  ArrowRight: { dx: 1 },
  w: { dy: -1 },
  s: { dy: 1 },
  a: { dx: -1 },
  d: { dx: 1 },
};

function readInput(pressed: Set<string>): Input {
  let dx = 0;
  let dy = 0;
  pressed.forEach((key) => {
    const dir = KEY_DIRECTIONS[key];
    dx += dir?.dx ?? 0;
    dy += dir?.dy ?? 0;
  });
  return { dx: Math.sign(dx) as Input["dx"], dy: Math.sign(dy) as Input["dy"] };
}

function draw(ctx: CanvasRenderingContext2D, state: GameState) {
  const { width, height, startZone, goalZone, walls, coins, playerSize } = LEVEL;

  // Piso xadrez
  const tile = 40;
  for (let ty = 0; ty < height / tile; ty++) {
    for (let tx = 0; tx < width / tile; tx++) {
      ctx.fillStyle = (tx + ty) % 2 === 0 ? "#e8e8f5" : "#f7f7ff";
      ctx.fillRect(tx * tile, ty * tile, tile, tile);
    }
  }

  // Zonas de início e objetivo
  ctx.fillStyle = "#b9f0b9";
  ctx.fillRect(startZone.x, startZone.y, startZone.w, startZone.h);
  ctx.fillRect(goalZone.x, goalZone.y, goalZone.w, goalZone.h);

  // Paredes
  ctx.fillStyle = "#1f2540";
  walls.forEach((w) => ctx.fillRect(w.x, w.y, w.w, w.h));

  // Moedas
  coins.forEach((coin, i) => {
    if (state.collected[i]) return;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#facc15";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a16207";
    ctx.stroke();
  });

  // Inimigos
  state.enemies.forEach((enemy, i) => {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, LEVEL.enemies[i].radius, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0b1b4d";
    ctx.stroke();
  });

  // Jogador
  const px = state.player.x - playerSize / 2;
  const py = state.player.y - playerSize / 2;
  ctx.fillStyle = "#dc2626";
  ctx.fillRect(px, py, playerSize, playerSize);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#450a0a";
  ctx.strokeRect(px, py, playerSize, playerSize);
}

interface Hud {
  deaths: number;
  coins: number;
  status: GameStatus;
  countdown: number;
  question: Question | null;
}

const INITIAL_HUD: Hud = { deaths: 0, coins: 0, status: "playing", countdown: 0, question: null };

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createState(LEVEL));
  const questionRef = useRef<Question | null>(null);
  const [hud, setHud] = useState<Hud>(INITIAL_HUD);

  const handleRestart = useCallback(() => {
    restart(LEVEL, stateRef.current);
    questionRef.current = null;
    setHud(INITIAL_HUD);
  }, []);

  const handleAnswer = useCallback((optionIndex: number) => {
    const question = questionRef.current;
    if (!question) return;
    answerQuestion(LEVEL, stateRef.current, optionIndex === question.correctIndex);
    questionRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pressed = new Set<string>();
    const normalize = (key: string) => (key.length === 1 ? key.toLowerCase() : key);

    const onKeyDown = (e: KeyboardEvent) => {
      const key = normalize(e.key);
      if (key in KEY_DIRECTIONS) {
        e.preventDefault();
        pressed.add(key);
      } else if (key === "r") {
        handleRestart();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => pressed.delete(normalize(e.key));
    const onBlur = () => pressed.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    let last = performance.now();
    let frame = requestAnimationFrame(function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const state = stateRef.current;
      step(LEVEL, state, readInput(pressed), dt);
      draw(ctx, state);

      if (state.status === "question") questionRef.current ??= pickQuestion();

      const coins = state.collected.filter(Boolean).length;
      const countdown = Math.ceil(state.countdown);
      const question = state.status === "question" ? questionRef.current : null;
      setHud((prev) =>
        prev.deaths === state.deaths &&
        prev.coins === coins &&
        prev.status === state.status &&
        prev.countdown === countdown &&
        prev.question === question
          ? prev
          : { deaths: state.deaths, coins, status: state.status, countdown, question },
      );

      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [handleRestart]);

  return (
    <div className="w-full max-w-[800px]">
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{LEVEL.name}</span>
        <span>
          Moedas: {hud.coins}/{LEVEL.coins.length}
        </span>
        <span>Mortes: {hud.deaths}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-300">
        <canvas
          ref={canvasRef}
          width={LEVEL.width}
          height={LEVEL.height}
          className="block h-auto w-full"
          aria-label="Mapa do jogo"
        />

        {hud.question && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/80 p-4 text-white">
            <p className="text-xs uppercase tracking-wide text-amber-300">
              Responda para continuar
            </p>
            <h2 className="max-w-md text-center text-lg font-bold sm:text-xl">
              {hud.question.prompt}
            </h2>
            <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
              {hud.question.options.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {hud.status === "countdown" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 text-white">
            <p className="text-sm">Resposta correta! Prepare-se…</p>
            <p className="text-7xl font-bold">{hud.countdown}</p>
          </div>
        )}

        {hud.status === "won" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/70 text-center text-white">
            <h2 className="text-3xl font-bold">Fase concluída!</h2>
            <p className="text-sm">Mortes: {hud.deaths}</p>
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Jogar novamente
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Setas ou WASD para mover · Pegue a moeda, responda a pergunta e chegue à zona verde · R reinicia
      </p>
    </div>
  );
}
