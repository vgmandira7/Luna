// src/screens/userStudent/molds/flappyQuiz/Bird.js
import React from "react";
import { Image } from "react-native";

export default function Bird({ body }) {
  const x = body.position.x - 25;
  const y = body.position.y - 25;
  return (
    <Image
      source={{ uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 50,
        height: 50,
      }}
    />
  );
}
