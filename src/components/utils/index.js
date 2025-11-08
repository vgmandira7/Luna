// src/screens/userStudent/molds/flappyQuiz/utils.js
import Matter from "matter-js";

export const gerarPipes = (world, pergunta) => {
  const baseY = 200;
  const gap = 200; // espaço entre os canos
  const largura = 100;
  const altura = 60;

  const respostas = pergunta.respostas.sort(() => Math.random() - 0.5);

  const pipes = respostas.map((r, i) => {
    const y = baseY + i * gap;
    const body = Matter.Bodies.rectangle(350, y, largura, altura, {
      isStatic: true,
      label: r.toString(),
    });
    Matter.World.add(world, [body]);
    return { body, label: r, correta: r === pergunta.correta };
  });

  return pipes;
};
