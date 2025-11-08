import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';


const { height, width } = Dimensions.get("window");
export default function App() {


  return (
    <View style={styles.container}>
        <Text>Teste</Text>
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

