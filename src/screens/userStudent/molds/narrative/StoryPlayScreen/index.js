import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import QuestionCard from "../../../../../components/QuestionCard/index";

export default function StoryPlayScreen({ navigation }) {
  const [storyFinished, setStoryFinished] = useState(false);

  const storyText =
    "Os Minions estão aprendendo frações com bananas! Eles precisam dividir 6 bananas igualmente entre 3 amigos.";

  useEffect(() => {
    Speech.speak(storyText, {
      language: "pt-BR",
      rate: 1.0,
      onDone: () => setStoryFinished(true),
    });

    return () => Speech.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 História</Text>
      <Text style={styles.text}>{storyText}</Text>

      {storyFinished ? (
        <QuestionCard
          pergunta="Quantas bananas cada Minion vai ganhar?"
          opcoes={["2", "3", "6"]}
          respostaCerta="2"
          onFinish={() => navigation.navigate("StoryIntro")}
        />
      ) : (
        <Text style={styles.waiting}>🎧 Ouvindo história...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDE7",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  waiting: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
});
