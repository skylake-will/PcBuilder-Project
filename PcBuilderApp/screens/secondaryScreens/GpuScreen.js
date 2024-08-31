import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GpuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select GPU Brand</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GpuCategoryScreen', { category: 'AMD' })}
      >
        <Text style={styles.buttonText}>AMD RADEON </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GpuCategoryScreen', { category: 'NVIDIA' })}
      >
        <Text style={styles.buttonText}>NVIDIA GEFORCE </Text>
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
