import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CompareScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecionar peças</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CpuCompare')}
        >
          <Text style={styles.buttonText}>CPU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GpuCompare')}
        >
          <Text style={styles.buttonText}>GPU</Text>
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
    fontSize: 26,
    marginBottom: 16,
    color: 'purple',
    textAlign: 'center', // Center align the header text
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
