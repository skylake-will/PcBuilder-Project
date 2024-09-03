import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MotherboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione a Placa Mãe</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoboCategoryScreen', { category: 'LGA1700' })}
      >
        <Text style={styles.buttonText}>LGA1700</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoboCategoryScreen', { category: 'LGA1200' })}
      >
        <Text style={styles.buttonText}>LGA1200</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoboCategoryScreen', { category: 'AM4' })}
      >
        <Text style={styles.buttonText}>AM4</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoboCategoryScreen', { category: 'AM5' })}
      >
        <Text style={styles.buttonText}>AM5</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'purple',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
