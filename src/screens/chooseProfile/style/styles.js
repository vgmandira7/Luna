import { StyleSheet, Dimensions} from "react-native";
import { theme } from '../../../styles/theme';


const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
  },
  header: {
    width: width,
    alignItems: "flex-end", 
    
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg
  },
  logo: {
    width: 35,
    height: 20,
    
  },
  luna: {
    width: 75,
    height: 45,
    
    
  },
  boneca: {
    width: 300,
    height: 470,
    

    
  },
  buttonsArea: {
    marginTop: 7,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    width: 240,
    height: 60,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md
  },

  textButton: {
    fontSize: theme.fontSize.large,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.bold,
    
  }
});
