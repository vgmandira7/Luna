import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuestionCard({ pergunta, opcoes, respostaCerta, onFinish }) {
  const [resposta, setResposta] = useState(null);

  const verificarResposta = (opcao) => {
    setResposta(opcao);
    setTimeout(() => onFinish(), 1500);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.pergunta}>{pergunta}</Text>

      {opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.botao,
            resposta === opcao &&
              (opcao === respostaCerta ? styles.certo : styles.errado),
          ]}
          onPress={() => verificarResposta(opcao)}
        >
          <Text style={styles.textoBotao}>{opcao}</Text>
        </TouchableOpacity>
      ))}

      {resposta && (
        <Text style={styles.feedback}>
          {resposta === respostaCerta ? "✅ Muito bem!" : "❌ Tente novamente!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    width: "100%",
  },
  pergunta: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  botao: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 6,
    width: "80%",
    alignItems: "center",
  },
  textoBotao: {
    fontSize: 18,
    color: "#333",
  },
  certo: {
    backgroundColor: "#A5D6A7",
  },
  errado: {
    backgroundColor: "#EF9A9A",
  },
  feedback: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    color: "#555",
  },
});
