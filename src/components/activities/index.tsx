import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

type ProgressCardProps = {
  title: string;
  description: string;
  image: any;
};

export function ProgressCard({ title, description, image }: ProgressCardProps) {
  return (
    <View style={styles.progressMatter}>
      <View style={styles.centerProgressMatter}>
      <Image source={image} style={styles.imgProgress} />
      </View>

      <MaterialIcons
        name="arrow-forward"
        size={30}
        style={styles.arrowLesson}
      />

      <Text style={styles.titleLesson}>{title}</Text>
      <Text style={styles.textLesson}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  progressMatter: {
    backgroundColor: theme.colors.firstMatter,
    width: 350,
    height: 140,
    alignSelf: "center",
    top: 10,
    borderRadius: theme.radius.md,
    boxShadow: theme.colors.shadowColor,
    elevation: 6,
    margin: 20,
  },
  centerProgressMatter: {
    height: 140,
    width: 100,
    backgroundColor: theme.colors.borderFirstMatter,
    borderTopLeftRadius: theme.radius.md,
    borderStartEndRadius: theme.radius.md,
  },
  imgProgress: {
    width: "80%",
    height: "60%",
    alignSelf: "center",
    top: 25,
  },
  titleLesson: {
    fontFamily: "Inter_700Bold",
    color: theme.colors.borderFirstMatter,
    bottom: 150,
    marginLeft: 110,
    fontSize: theme.fontSize.normal,
  },
  textLesson: {
    fontFamily: "Inter_300Light",
    fontSize: theme.fontSize.normal,
    bottom: 135,
    marginLeft: 110,
  },
  arrowLesson: {
    color: theme.colors.borderFirstMatter,
    bottom: 135,
    marginLeft: 315,
  },
});