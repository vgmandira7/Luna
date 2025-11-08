import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function StoryIntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }}
        style={styles.image}
      />
      <Text style={styles.title}>Narrativo (História)</Text>
      <Text style={styles.text}>
        Vamos ouvir uma história divertida! Preste atenção e depois responda
        uma pergunta sobre ela.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StoryPlay")}
      >
        <Text style={styles.buttonText}>Ouvir história 🎧</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFB300",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});
