// src/screens/userStudent/molds/flappyQuiz/Pipe.js
import React from "react";
import { View, Text } from "react-native";

export default function Pipe({ body, label, correta }) {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor: correta ? "#8BC34A" : "#FF7043",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{label}</Text>
    </View>
  );
}
