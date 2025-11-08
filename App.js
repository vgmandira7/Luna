import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_300Light,  Inter_700Bold} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import Login from './src/screens/userStudent/login/index';
import Escolha from './src/screens/chooseProfile/index';
import Home from './src/screens/userStudent/home/index';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaTeorica from "./src/screens/userStudent/molds/gameQuiz/explanationScreen/index";
import TelaJogo from "./src/screens/userStudent/molds/gameQuiz/gameScreen/index";
import TelaBird from "./src/screens/userStudent/molds/flappyQuiz/gameScreen/index";
import TelaTeoricaNarrativa from "./src/screens/userStudent/molds/narrative/explanationScreen/index";
import TelaNarrativa from "./src/screens/userStudent/molds/narrative/StoryPlayScreen/index";

const Stack = createNativeStackNavigator();

export default function App() {
  //ta importando as fontes que vamos usar
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_700Bold,
  });

  //se não carregar a fonte vai retornar AppLoading
  if(!fontsLoaded) {
    return <AppLoading/>;
  }


  

  //conteudo principal
  return (

     <NavigationContainer>
      <Stack.Navigator initialRouteName="StoryIntro">
        <Stack.Screen
          name="TelaTeorica"
          component={TelaTeorica}
          options={{ title: "Explicação do Plano" }}
        />
        <Stack.Screen
          name="TelaJogo"
          component={TelaJogo}
          options={{ title: "Jogo Quiz" }}
        />

        <Stack.Screen
          name="flappyBird"
          component={TelaBird}
          options={{ title: "Jogo Interativo" }}
        />

        <Stack.Screen
          name="StoryIntro"
          component={TelaTeoricaNarrativa}
          options={{ title: "Jogo " }}
        />
        <Stack.Screen
          name="StoryPlay"
          component={TelaNarrativa}
          options={{ title: "Jogo I" }}
        />


      </Stack.Navigator>

    </NavigationContainer>

    // <View style={styles.container}>
    //   <Home/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
