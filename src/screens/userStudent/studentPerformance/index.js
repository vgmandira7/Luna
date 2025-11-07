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
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const { height, width } = Dimensions.get("window");

export default function studentPerformanceScreen() {
  const logoPosition = useSharedValue(height / 2 - 100);
  const logoSize = useSharedValue(200);
  const modalTranslate = useSharedValue(height * 0.7);

  const dados = [
    { matter: 'LP', porcent: 100, colorRow: theme.colors.firstMatter, colorBorder: theme.colors.borderFirstMatter, colorMatter: theme.colors.borderFirstMatter },
    { matter: 'MAT', porcent: 85, colorRow: theme.colors.secondMatter, colorBorder: theme.colors.borderSecondMatter, colorMatter: theme.colors.borderSecondMatter },
    { matter: 'GEO', porcent: 20, colorRow: theme.colors.thirdMatter, colorBorder: theme.colors.borderThirdMatter, colorMatter: theme.colors.borderThirdMatter },
    { matter: 'HIS', porcent: 58, colorRow: theme.colors.fourthMatter, colorBorder: theme.colors.borderFourthMatter, colorMatter: theme.colors.borderFourthMatter },
    { matter: 'CIÊ', porcent: 90, colorRow: theme.colors.fifthMatter, colorBorder: theme.colors.borderFifthMatter, colorMatter: theme.colors.borderFifthMatter },
  ];

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
      {/* <Image source={require('../../../assets/logo mobile.png')} style={[styles.logo]}></Image> */}
      
      
      <Text style={styles.titleScreen}>Gráfico de desempenho geral</Text>

      {/* Gráfico com o desempenho do alubo de cada matéria */}
      <View style={styles.percentMatter}>
        {dados.map((item, index) => (
          <View key={index}>   
            <View style={styles.barWrapper}>
              <Text style={styles.barText}>{item.porcent}%</Text>
              <View
                style={[
                  styles.rowGraphic,
                  {
                    height: `${item.porcent}`,
                    backgroundColor: item.colorRow,
                    borderColor: item.colorBorder,
                    borderBottomWidth: 2,
                    width: 40,
                    flexDirection: 'row'
                  },
                ]}
              >   

              </View>
              <Text style={[styles.label, {
                color: item.colorMatter,
              }]}>{item.matter}</Text>
            </View>
            
          </View>
        ))}

      </View>

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

