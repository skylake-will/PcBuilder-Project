import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SsdScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select SSD Type</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SsdCategoryScreen', { category: 'NVMe ' })}
      >
        <Text style={styles.buttonText}>NVME</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SsdCategoryScreen', { category: 'SATA' })}
      >
        <Text style={styles.buttonText}>SATA</Text>
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
