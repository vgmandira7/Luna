import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_300Light,  Inter_700Bold} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import Login from './src/screens/userStudent/login/index';
import Escolha from './src/screens/chooseProfile/index';
import Home from './src/screens/userStudent/home/index';
import StudentPerformance from './src/screens/userStudent/studentPerformance/index';

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
    <View style={styles.container}>
      <StudentPerformance/>
    </View>
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
