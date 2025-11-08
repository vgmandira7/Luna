// src/screens/TelaTeorica.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TelaTeorica({ navigation }) {
  const plano =
    "Hoje vamos aprender adição! Somar é juntar duas partes para formar um todo.";

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{plano}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("flappyBird")}
      >
        <Text style={styles.textoBotao}>Começar Jogo 🎮</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  texto: {
    fontSize: 22,
    textAlign: "center",
    color: "#333",
  },
  botao: {
    marginTop: 40,
    backgroundColor: "#5AC8FA",
    padding: 15,
    borderRadius: 10,
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
