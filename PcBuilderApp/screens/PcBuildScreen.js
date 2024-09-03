import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PcBuildScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecionar Peças</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CpuScreen')}>
          <Text style={styles.buttonText}>CPU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GpuScreen')}>
          <Text style={styles.buttonText}>GPU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoboCategoryScreen')}>
          <Text style={styles.buttonText}>Placa Mãe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FonteScreen')}>
          <Text style={styles.buttonText}>Fonte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RamScreen')}>
          <Text style={styles.buttonText}>RAM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SsdScreen')}>
          <Text style={styles.buttonText}>SSD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GabineteScreen')}>
          <Text style={styles.buttonText}>Gabinete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
  header: {
    fontSize: 28,
    marginBottom: 24,
    color: '#4a148c', // Deep purple
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: 120,
    height: 120,
    backgroundColor: '#6a1b9a', // Slightly lighter purple
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
