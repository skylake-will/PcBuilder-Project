import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function PcBuildScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecionar peças</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CpuScreen')}>
          <Text style={styles.buttonText}>CPU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GpuScreen')}>
          <Text style={styles.buttonText}>GPU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FonteScreen')}>
          <Text style={styles.buttonText}>FONTE</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    color: 'purple',
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
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
