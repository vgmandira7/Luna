// src/screens/userStudent/molds/flappyQuiz/index.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import Bird from "../../../../../components/birds/index";
import Pipe from "../../../../../components/pipes/index";
import { gerarPipes } from "../../../../../components/utils/index";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function FlappyQuiz() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [entities, setEntities] = useState({});
  const [question] = useState({
    texto: "Quanto é 2 + 3?",
    respostas: [4, 5, 6],
    correta: 5,
  });

  const engine = useRef(Matter.Engine.create({ enableSleeping: false })).current;
  const world = engine.world;

  // 🧲 Gravidade
  useEffect(() => {
    world.gravity.y = 1.0; // força da gravidade (quanto maior, mais rápido cai)
  }, []);

  const startGame = () => {
    Matter.World.clear(world);
    Matter.Engine.clear(engine);

    world.gravity.y = 1.0;

    // 🐦 cria o pássaro
    const bird = Matter.Bodies.circle(80, HEIGHT / 2, 25, {
      label: "bird",
      restitution: 0.4, // “mola”
    });

    // 🧱 chão (para limitar a queda)
    const ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 20, WIDTH, 40, {
      isStatic: true,
      label: "ground",
    });

    // 🎯 cria canos com respostas
    const pipes = gerarPipes(world, question);

    Matter.World.add(world, [bird, ground]);

    const newEntities = {
      bird: { body: bird, renderer: <Bird body={bird} /> },
      ground: {
        body: ground,
        renderer: (
          <View
            style={{
              position: "absolute",
              left: 0,
              top: HEIGHT - 40,
              width: WIDTH,
              height: 40,
              backgroundColor: "#4CAF50",
            }}
          />
        ),
      },
    };

    pipes.forEach((p, i) => {
      newEntities[`pipe_${i}`] = { body: p.body, renderer: <Pipe {...p} /> };
    });

    setEntities(newEntities);
    setStarted(true);
    setScore(0);
  };

  const handleTouch = () => {
    // 🖱️ funciona com clique ou toque
    const birdBody = entities.bird?.body;
    if (birdBody) {
      Matter.Body.setVelocity(birdBody, { x: 0, y: -8 }); // força do pulo
    }
  };

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        Matter.Engine.update(engine, 16);

        // 🚧 colisão básica
        Matter.Events.on(engine, "collisionStart", (event) => {
          event.pairs.forEach((collision) => {
            const labels = [collision.bodyA.label, collision.bodyB.label];
            if (labels.includes("bird")) {
              const outro = labels[0] === "bird" ? collision.bodyB : collision.bodyA;
              if (outro.label === "ground") {
                Alert.alert("💥 Fim de jogo!", "Você caiu!");
                setStarted(false);
              } else {
                const resposta = parseInt(outro.label);
                if (resposta === question.correta) {
                  Alert.alert("🎯 Correto!", "Você passou pelo cano certo!");
                  setScore((prev) => prev + 1);
                  setStarted(false);
                } else {
                  Alert.alert("❌ Errou!", "Resposta incorreta!");
                  setStarted(false);
                }
              }
            }
          });
        });
      }, 16);
    }
    return () => clearInterval(interval);
  }, [started]);

  return (
    <View style={{ flex: 1, backgroundColor: "#b3e5fc" }}>
      {!started ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>{question.texto}</Text>
          {question.respostas.map((r, i) => (
            <Text key={i} style={{ fontSize: 20, marginBottom: 5 }}>
              Opção {i + 1}: {r}
            </Text>
          ))}
          <TouchableOpacity
            onPress={startGame}
            style={{ backgroundColor: "#007bff", padding: 15, borderRadius: 10 }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Iniciar Jogo 🕹️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <GameEngine
          systems={[]}
          entities={entities}
          onTouchStart={handleTouch}
          style={{ flex: 1 }}
        />
      )}

      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Pontuação: {score}</Text>
      </View>
    </View>
  );
}