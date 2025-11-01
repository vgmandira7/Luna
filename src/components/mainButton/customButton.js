// components/CustomButton/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export default function CustomButton({
  title,
  onPress,
  style,          
  textStyle,      
  backgroundColor = theme.colors.secondary, 
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 149
  },
  text: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
