import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GpuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de GPU</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: NVIDIA GeForce RTX 3080');
          navigation.navigate('CompareCategoryScreen', { category: 'RTX 3080' });
        }}
      >
        <Text style={styles.buttonText}>NVIDIA GeForce RTX 3080</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: NVIDIA GeForce RTX 3070');
          navigation.navigate('CompareCategoryScreen', { category: 'RTX 3070' });
        }}
      >
        <Text style={styles.buttonText}>NVIDIA GeForce RTX 3070</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: AMD Radeon RX 6800');
          navigation.navigate('CompareCategoryScreen', { category: 'RX 6800' });
        }}
      >
        <Text style={styles.buttonText}>AMD Radeon RX 6800</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CompareCategoryScreen with category: AMD Radeon RX 6700 XT');
          navigation.navigate('CompareCategoryScreen', { category: 'RX 6700 XT' });
        }}
      >
        <Text style={styles.buttonText}>AMD Radeon RX 6700 XT</Text>
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
