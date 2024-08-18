import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RamScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Escolha a memória</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Option 3</Text>
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
  optionButton: {
    width: 100,
    height: 100,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
