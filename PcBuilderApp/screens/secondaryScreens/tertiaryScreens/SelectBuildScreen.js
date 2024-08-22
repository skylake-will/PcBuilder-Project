import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useBuildContext } from '../../../contexts/BuildContext';



export default function SelectBuildScreen({ route, navigation }) {
  const { option, type } = route.params;
  const [selectedBuild, setSelectedBuild] = useState('');
  const { addOptionToBuild } = useBuildContext();

  const handleAddOption = () => {
    if (!selectedBuild) {
      Alert.alert('Error', ' Por favor selecione um PC montado ');
      return;
    }
  
    addOptionToBuild(selectedBuild, type, option);
    navigation.navigate('PCs', { build: selectedBuild });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a PC Build for {type} Option</Text>
      {/* Buttons for predefined builds */}
      {['PC1', 'PC2', 'PC3', 'PC4', 'PC5'].map((build, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => setSelectedBuild(build)}
        >
          <Text style={styles.buttonText}>{build}</Text>
        </TouchableOpacity>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Enter custom PC build (if needed)"
        onChangeText={setSelectedBuild}
        value={selectedBuild}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={handleAddOption}>
        <Text style={styles.confirmButtonText}>Add to Build</Text>
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
    padding: 16,
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  confirmButton: {
    width: '80%',
    padding: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
