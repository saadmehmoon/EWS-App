import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ text, onPress, bgColor, txtColor, type, }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}, ]}>
      <Text style={[styles.text, styles[`text_${type}`], txtColor ? {color: txtColor} : {}, ]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    borderColor: '#7339e5',
  },

  container_PRIMARY: {
    backgroundColor: 'black',
  },

  container_SECONDARY: {
    backgroundColor: '#ffffff',
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  text_PRIMARY:{
    color: '#fff',
  },

  text_SECONDARY:{
    color: 'black'
  },
});

export default CustomButton;