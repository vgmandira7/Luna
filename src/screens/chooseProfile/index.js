import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import { styles } from '../chooseProfile/style/styles';

const { height, width } = Dimensions.get("window");
export default function App() {


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Logo no canto superior direito */}
      <View style={styles.header}>
        <Image 
          source={require("../../assets/logo mobile.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Luna centralizado */}
      <Image 
        source={require("../../assets/luna.png")} 
        style={styles.luna}
        resizeMode="contain"
      />

      {/* Boneca animada */}
      <Image 
        source={require("../../assets/boneca-animada.png")} 
        style={styles.boneca}
        resizeMode="contain"
      />

      {/* Espaço para botões */}
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textButton}>Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textButton}>Professor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textButton}>Instituição de ensino</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

