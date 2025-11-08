import { StyleSheet, Dimensions } from "react-native";
import { theme } from '../../../../styles/theme';

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  luna: {
    position: 'absolute',
    alignSelf: 'center',
  },
  logo: {
    width: '9%',
    height: '9%',
    top: 15,
    marginLeft: 415    
  },
  viewBorderRadius: {
    backgroundColor: theme.colors.primary, 
    width: 480,
    height: 300,
    borderBottomRightRadius: theme.radius.lg,
    boxShadow: theme.colors.shadowColor,
    elevation: 6,
  },
  titleActivitie: {
    color: theme.colors.secondary,
    fontFamily: 'Inter_700Bold',
    fontSize: theme.fontSize.large,
    top: 100,
    alignSelf: 'center'
  },
  titleData: {
    color: theme.colors.textPrimary,
    fontFamily: 'Inter_300Light',
    fontSize: theme.fontSize.large,
    top: 150,
    marginLeft: theme.spacing.xl
  },
  progressMatter: {
    backgroundColor: theme.colors.firstMatter,
    width: 350,
    height: 140,
    alignSelf: 'center',
    top: 30,
    borderRadius: theme.radius.md,
    boxShadow: theme.colors.shadowColor,
    elevation: 6,
    margin: 20,
  },
  centerProgressMatter: {
    height: 140,
    width: 100,
    backgroundColor: theme.colors.borderFirstMatter,
    borderTopLeftRadius: theme.radius.md,
    borderStartEndRadius: theme.radius.md,
  },
  imgProgress: {
    width: '80%',
    height: '60%',
    alignSelf: 'center',
    top: 25,
  },
  titleLesson: {
    fontFamily: 'Inter_700Bold',
    color: theme.colors.borderFirstMatter,
    bottom: 150,
    marginLeft: 110,
    fontSize: theme.fontSize.normal
  },
  textLesson: {
    fontFamily: 'Inter_300Light',
    fontSize: theme.fontSize.normal,
    bottom: 135,
    marginLeft: 110
  },
  arrowLesson: {
    color: theme.colors.borderFirstMatter,
    bottom: 135,
    marginLeft: 315
  },

 

});
