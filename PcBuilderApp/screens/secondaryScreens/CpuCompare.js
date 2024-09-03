import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CpuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de CPU</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: AMD Ryzen 7');
          navigation.navigate('CompareCategoryScreen', { category: 'Ryzen 7' });
        }}
      >
        <Text style={styles.buttonText}>AMD Ryzen 7</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: AMD Ryzen 5');
          navigation.navigate('CompareCategoryScreen', { category: 'Ryzen 5' });
        }}
      >
        <Text style={styles.buttonText}>AMD Ryzen 5</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: Intel Core i5');
          navigation.navigate('CompareCategoryScreen', { category: ' Intel Core i5' });
        }}
      >
        <Text style={styles.buttonText}>Intel Core i5</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: Intel Core i7');
          navigation.navigate('CompareCategoryScreen', { category: 'i7' });
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
    backgroundColor: '#eaeaea',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a1b9a', // Purple color
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
