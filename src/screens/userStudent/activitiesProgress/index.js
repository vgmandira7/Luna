import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { theme } from "../../../styles/theme";
import { CustomInput, CustomButton } from "../../../components/index";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { styles } from "./style/style";
import Svg, { Circle, Rect, Path } from "react-native-svg";

const { height, width } = Dimensions.get("window");

export default function activitiesProgressScreen() {
  const logoPosition = useSharedValue(height / 2 - 100);
  const logoSize = useSharedValue(200);
  const modalTranslate = useSharedValue(height * 0.7);

  useEffect(() => {
    setTimeout(() => {
      logoSize.value = withTiming(150, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      }); // logo maior
      logoPosition.value = withTiming(90, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });

      modalTranslate.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      });
    }, 500);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    top: logoPosition.value,
    width: logoSize.value,
    height: logoSize.value,
  }));

  const lunaStyle = useAnimatedStyle(() => ({
    top: logoPosition.value - 70,
    width: logoSize.value * 0.5,
    height: logoSize.value * 0.5,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslate.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.viewBorderRadius]}>
        {/* Foto de Luna animada acima da logo */}
        <Animated.Image
          source={require("../../../assets/luna-positivo.png")}
          style={[styles.luna, lunaStyle]}
          resizeMode="contain"
        />

        {/* Foto da logo do Luna */}
        <Image
          source={require("../../../assets/logo mobile-positivo.png")}
          style={[styles.logo]}
        ></Image>

        <Text style={[styles.titleActivitie]}>Atividades em andamento</Text>
        <Text style={[styles.titleData]}>27 de maio, 2025</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 60, // ⬅️ ESPAÇO NO FINAL
          justifyContent: "center", // ⬅️ Centraliza o conteúdo se for pequeno
        }}
      >
        {/* Primeira lição */}
        <View style={[styles.progressMatter]}>
          <View style={[styles.centerProgressMatter]}>
            <Image
              source={require("../../../assets/img1-atividade-andamento.png")}
              style={[styles.imgProgress]}
            ></Image>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={30}
            style={[styles.arrowLesson]}
          />
          <Text style={[styles.titleLesson]}>Formação de palavras</Text>
          <Text style={[styles.textLesson]}>
            Junte as sílabas e forme palavras
          </Text>
        </View>
        {/* Segunda lição */}
        <View style={[styles.progressMatter, {backgroundColor: theme.colors.secondMatter}]}>
          <View style={[styles.centerProgressMatter, {backgroundColor: theme.colors.borderSecondMatter}]}>
            <Image
              source={require("../../../assets/img2-atividade-andamento.png")}
              style={[styles.imgProgress]}
            ></Image>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={30}
            style={[styles.arrowLesson, {color: theme.colors.borderSecondMatter}]}
          />
          <Text style={[styles.titleLesson, {color: theme.colors.borderSecondMatter}]}>Ordem decrescente</Text>
          <Text style={[styles.textLesson]}>
            Organize os números em ordem decrescente
          </Text>
        </View>
        {/* Terceira lição */}
        <View style={[styles.progressMatter, {backgroundColor: theme.colors.thirdMatter}]}>
          <View style={[styles.centerProgressMatter, {backgroundColor: theme.colors.borderThirdMatter}]}>
            <Image
              source={require("../../../assets/img3-atividade-andamento.png")}
              style={[styles.imgProgress]}
            ></Image>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={30}
            style={[styles.arrowLesson, {color: theme.colors.borderThirdMatter}]}
          />
          <Text style={[styles.titleLesson, {color: theme.colors.borderThirdMatter}]}>Espaços rurais</Text>
          <Text style={[styles.textLesson]}>
            Identifique as imagens que apresentam espaços rurais
          </Text>
        </View>
        {/* Quarta lição */}
        <View style={[styles.progressMatter, {backgroundColor: theme.colors.fourthMatter}]}>
          <View style={[styles.centerProgressMatter, {backgroundColor: theme.colors.borderFourthMatter}]}>
            <Image
              source={require("../../../assets/img4-atividade-andamento.png")}
              style={[styles.imgProgress]}
            ></Image>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={30}
            style={[styles.arrowLesson, {color: theme.colors.borderFourthMatter}]}
          />
          <Text style={[styles.titleLesson, {color: theme.colors.borderFourthMatter}]}>Rotina em casa</Text>
          <Text style={[styles.textLesson]}>
            Detalhe sua rotina quando está em casa
          </Text>
        </View>
        {/* Quinta lição */}
        <View style={[styles.progressMatter, {backgroundColor: theme.colors.fifthMatter}]}>
          <View style={[styles.centerProgressMatter, {backgroundColor: theme.colors.borderFifthMatter}]}>
            <Image
              source={require("../../../assets/img5-atividade-andamento.png")}
              style={[styles.imgProgress]}
            ></Image>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={30}
            style={[styles.arrowLesson, {color: theme.colors.borderFifthMatter}]}
          />
          <Text style={[styles.titleLesson, {color: theme.colors.borderFifthMatter}]}>Partes do corpo humano</Text>
          <Text style={[styles.textLesson]}>
            Escreva o nome das partes do corpo humano
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
