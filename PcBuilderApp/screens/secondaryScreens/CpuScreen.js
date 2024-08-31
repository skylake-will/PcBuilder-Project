import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CpuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select CPU Category</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CpuCategoryScreen with category: i5');
          navigation.navigate('CpuCategoryScreen', { category: 'i5' });
        }}
      >
        <Text style={styles.buttonText}>Intel Core i5</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CpuCategoryScreen with category: i7');
          navigation.navigate('CpuCategoryScreen', { category: 'i7' });
        }}
      >
        <Text style={styles.buttonText}>Intel Core i7</Text>
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
