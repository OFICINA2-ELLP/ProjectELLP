import type { Metadata } from "next";
import GameCanvas from "@/components/GameCanvas";

export const metadata: Metadata = {
  title: "Jogo | ELLP",
};

export default function GamePage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-amber-50 px-4 py-8">
      <GameCanvas />
    </main>
  );
}
