import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CpuScreen({ navigation }) {
  const handleOptionSelect = (option) => {
    navigation.navigate('SelectBuildScreen', { option, type: 'CPU' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a CPU Option</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect('CPU Option 1')}>
        <Text style={styles.buttonText}>CPU Option 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect('CPU Option 2')}>
        <Text style={styles.buttonText}>CPU Option 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect('CPU Option 3')}>
        <Text style={styles.buttonText}>CPU Option 3</Text>
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
