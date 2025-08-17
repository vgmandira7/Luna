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

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
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
    top: logoPosition.value - 70, // posiciona a foto acima da logo
    width: logoSize.value * 0.5,  // metade do tamanho da logo
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

      {/* Logo animada */}
      <Animated.Image
        source={require("../../../assets/cuate.png")}
        style={[styles.logo, logoStyle]}
        resizeMode="contain"
      />

      {/* Modal de login animado */}
      <Animated.View style={[styles.login, modalStyle]}>
        <Text style={styles.titleModal}>LOGIN</Text>

        <CustomInput
          title="E-MAIL INSTITUCIONAL"
          placeholder="Digite seu e-mail"
          icon={<MaterialIcons name="email" size={24} color={theme.colors.secondary} />}
          style={styles.inputEmail}
        />

        <CustomInput
          title="RA"
          placeholder="Digite sua senha"
          secureTextEntry={true}
          icon={<MaterialIcons name="lock" size={24} color={theme.colors.secondary} />}
          style={styles.inputSenha}
        />

        <CustomButton
          title="Entrar"
          onPress={() => console.log('Login clicado')}
          style={styles.CustomButton}
        />

        <View style={styles.row}></View>

        <View style={styles.socialIcons}>
          <FontAwesome name="whatsapp" size={40} color="#FFDDD2" />
          <FontAwesome name="instagram" size={40} color="#FFDDD2" />
          <MaterialIcons name="facebook" size={40} color="#FFDDD2" />
        </View>
      </Animated.View>
    </View>
  );
}

