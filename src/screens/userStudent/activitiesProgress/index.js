import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
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
import { ProgressCard } from "../../../components/activities/index"; 

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
    <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          
          // paddingTop: 20,
          // paddingBottom: 700, // ⬅️ ESPAÇO NO FINAL
          justifyContent: "center", // ⬅️ Centraliza o conteúdo se for pequeno
        }}
      >
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

        <Text style={[styles.titleActivitie]}>Atividades</Text>
        {/* colocar data atual */}
        <Text style={[styles.titleData]}>27 de maio, 2025</Text>
      </View>

      
        {/* Atividades em andamento */}
        <Text style={styles.textAndamento}>Atividades em Andamento</Text>

        {/* Primeira lição */}
        <ProgressCard
          title="Formação de palavras"
          description="Junte as sílabas e forme palavras"
          image={require("../../../assets/img1-atividade-andamento.png")}
        />

        <Text style={styles.textAndamento}>Atividades Vencidas</Text>
        {/* Atividades Vencidas */}
        <ProgressCard
          title="Formação de palavras"
          description="Junte as sílabas e forme palavras"
          image={require("../../../assets/img1-atividade-andamento.png")}
        />


        <Text style={styles.textAndamento}>Atividades Concluídas</Text>
        {/* Atividades concluidas */}
        <ProgressCard
          title="Formação de palavras"
          description="Junte as sílabas e forme palavras"
          image={require("../../../assets/img1-atividade-andamento.png")}
        />
      
       
      
    </View>
    </ScrollView>
  );
}
