import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../../../styles/theme';
import { CustomInput, CustomButton } from '../../../components/index';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { styles } from './style/style';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

const { height, width } = Dimensions.get("window");

export default function studentPerformanceScreen() {
  const logoPosition = useSharedValue(height / 2 - 100);
  const logoSize = useSharedValue(200);
  const modalTranslate = useSharedValue(height * 0.7);

  useEffect(() => {
    setTimeout(() => {
      logoSize.value = withTiming(150, { duration: 600, easing: Easing.out(Easing.exp) }); // logo maior
      logoPosition.value = withTiming(90, { duration: 600, easing: Easing.out(Easing.exp) });

      modalTranslate.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
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
      {/* Foto de Luna animada acima da logo */}
      <Animated.Image
        source={require('../../../assets/luna.png')}
        style={[styles.luna, lunaStyle]}
        resizeMode="contain"
      />

      {/* Foto da logo do Luna */}
      <Animated.Image
        source={require('../../../assets/logo mobile.png')}
        style={[styles.logo, lunaStyle]}
        resizeMode="contain"
      />
      
       <Text style={styles.titleScreen}>Gráfico de desempenho geral</Text>

      {/* Modal de login animado */}
      <Animated.View style={[styles.percentMatter, modalStyle]}>

      
      </Animated.View>

      {/* Modal com o nome das matérias e o tempo médio*/}
      <Animated.View style={[styles.timeMatter, modalStyle]}>
        <Text style={styles.matter}>Matérias</Text>
        <View style={[styles.firstMatter]}></View>
        <Text style={styles.titleMatter}>Língua Portuguesa</Text>
        <View style={[styles.secondMatter]}></View>
        <Text style={styles.titleMatter}>Matemática</Text>
        <View style={[styles.thirdMatter]}></View>
        <Text style={styles.titleMatter}>Geografia</Text>
        <View style={[styles.fourthMatter]}></View>
        <Text style={styles.titleMatter}>Histótia</Text>
        <View style={[styles.fifthMatter]}></View>
        <Text style={styles.titleMatter}>Ciências</Text>
        <View style={styles.row}></View>
        <Text numberOfLines={1} style={styles.averagetime}>Tempo</Text>  
        <Text numberOfLines={1} style={styles.time}>15:30</Text>
        <Text numberOfLines={1} style={styles.time}>15:30</Text>
        <Text numberOfLines={1} style={styles.time}>15:30</Text>
        <Text numberOfLines={1} style={styles.time}>15:30</Text>
        <Text numberOfLines={1} style={styles.time}>15:30</Text>
      </Animated.View>
    </View>
  );
}

