import type { Question } from "./types";

export const questions: Question[] = [
  {
    prompt: "Qual é o valor de x depois de: x = 2; x = x + 3?",
    options: ["2", "5", "23", "3"],
    correctIndex: 1,
  },
  {
    prompt: "Qual estrutura repete um bloco de código várias vezes?",
    options: ["Variável", "Comentário", "Laço (loop)", "Função de saída"],
    correctIndex: 2,
  },
  {
    prompt: "Para executar um código só quando uma condição for verdadeira, usamos:",
    options: ["if (se)", "for (para)", "return", "import"],
    correctIndex: 0,
  },
  {
    prompt: "Um algoritmo é:",
    options: [
      "Um tipo de computador",
      "Uma sequência de passos para resolver um problema",
      "Um erro no programa",
      "Uma imagem na tela",
    ],
    correctIndex: 1,
  },
  {
    prompt: "Quantas vezes o texto aparece? repita 4 vezes: mostrar(\"Oi\")",
    options: ["1", "2", "4", "0"],
    correctIndex: 2,
  },
];

export function pickQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)];
}
