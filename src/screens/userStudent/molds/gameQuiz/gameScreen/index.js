// src/screens/TelaJogo.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StyleSheet,
  Alert,
} from "react-native";

export default function TelaJogo() {
  const [fase, setFase] = useState(1);
  const [pergunta, setPergunta] = useState({});
  const [bgImage, setBgImage] = useState(null);
  const animacao = useRef(new Animated.Value(0)).current;

  // executa quando a tela abre ou a fase muda
  useEffect(() => {
    gerarNovaFase();
    gerarFundo();
  }, [fase]);

  // gera operação e alternativas aleatórias
  const gerarNovaFase = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const resposta = a + b;
    const opcoes = [resposta, resposta + 1, resposta - 1].sort(
      () => Math.random() - 0.5
    );
    setPergunta({ texto: `${a} + ${b} = ?`, resposta, opcoes });
  };

  // gera imagem de fundo (por enquanto usando Unsplash)
  const gerarFundo = async () => {
    try {
      const res = await fetch(
        "https://source.unsplash.com/random/800x600?videogame,cartoon"
      );
      setBgImage(res.url);
    } catch (error) {
      console.log("Erro ao gerar fundo:", error);
    }
  };

  // animação e lógica de resposta
  const responder = (op) => {
    if (op === pergunta.resposta) {
      Animated.sequence([
        Animated.timing(animacao, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(animacao, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setFase(fase + 1));
    } else {
      Alert.alert("Errou 😅", "Tente novamente!");
    }
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.bg}>
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Fase {fase}</Text>
        <Text style={styles.pergunta}>{pergunta.texto}</Text>

        {pergunta.opcoes?.map((op, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => responder(op)}
            style={styles.botao}
          >
            <Text style={styles.textoBotao}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  pergunta: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "rgba(255,255,255,0.9)",
    margin: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  textoBotao: {
    fontSize: 22,
    color: "#000",
  },
});
