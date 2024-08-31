import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useBuildContext } from '../../../contexts/BuildContext';

export default function SelectBuildScreen({ route, navigation }) {
  const { option, type } = route.params; // Get the option and type from route params
  const { builds, addBuild, removeBuild, renameBuild, addOptionToBuild } = useBuildContext();
  const [selectedBuild, setSelectedBuild] = useState('');
  const [newBuildName, setNewBuildName] = useState('');

  // Add a new build
  const handleAddNewBuild = () => {
    if (newBuildName) {
      addBuild(newBuildName);
      setNewBuildName('');
    } else {
      Alert.alert('Error', 'Please enter a name for the new build.');
    }
  };

  // Rename an existing build
  const handleRenameBuild = (oldName) => {
    Alert.prompt(
      'Rename Build',
      'Enter new name for this build:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (newName) => {
            if (newName) {
              renameBuild(oldName, newName);
            }
          },
        },
      ],
      'plain-text',
      oldName
    );
  };

  // Delete an existing build
  const handleDeleteBuild = (buildName) => {
    Alert.alert(
      'Delete Build',
      `Are you sure you want to delete ${buildName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => removeBuild(buildName),
          style: 'destructive',
        },
      ]
    );
  };

  // Handle adding option to the selected build
  const handleAddOption = () => {
    console.log('Selected Build:', selectedBuild);
    console.log('Type:', type);
    console.log('Option:', option);
  
    if (!selectedBuild) {
      Alert.alert('Error', 'Please select a PC build');
      return;
    }
  
    if (!type) {
      Alert.alert('Error', 'No type specified');
      return;
    }
  
    if (!option) {
      Alert.alert('Error', `No option selected for ${type}`);
      return;
    }
  
    addOptionToBuild(selectedBuild, type, option);
    navigation.navigate('PCs', { build: selectedBuild });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a PC Build for {type} Option</Text>

      {/* Display list of existing builds with options to rename or delete */}
      {Object.keys(builds).map((build, index) => (
        <View key={index} style={styles.buildContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedBuild(build)}
            onLongPress={() => handleRenameBuild(build)}
          >
            <Text style={styles.buttonText}>{build}</Text>
          </TouchableOpacity>
          <Button title="Delete" color="red" onPress={() => handleDeleteBuild(build)} />
        </View>
      ))}

      {/* Input for adding a new build */}
      <TextInput
        style={styles.input}
        value={newBuildName}
        onChangeText={setNewBuildName}
        placeholder="Enter PC build name"
      />
      <Button title="Add New PC Build" onPress={handleAddNewBuild} />

      {/* Button to add option to the selected build */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleAddOption}
      >
        <Text style={styles.confirmButtonText}>Add to Build</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  buildContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: '70%',
    padding: 15,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
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
