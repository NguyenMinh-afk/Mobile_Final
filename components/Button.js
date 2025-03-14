import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text, onPress, backgroundColor, textColor, borderColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor || '#FFFFFF', borderColor: borderColor || '#007BFF' },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor || '#007BFF' }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
