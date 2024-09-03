import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useBuildContext } from '../../contexts/BuildContext';

export default function YourBuildsScreen({ navigation }) {
  const { builds, addBuild, removeBuild, renameBuild } = useBuildContext();
  const [newBuildName, setNewBuildName] = useState('');

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

  const handleAddNewBuild = () => {
    if (newBuildName) {
      addBuild(newBuildName);
      setNewBuildName('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(builds).length === 0 ? (
        <Text style={styles.noBuildsText}>No builds available. Add a new build!</Text>
      ) : (
        Object.keys(builds).map((build, index) => (
          <View key={index} style={styles.buildContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PCs', { build })}
              onLongPress={() => handleRenameBuild(build)}
            >
              <Text style={styles.buttonText}>{build}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => removeBuild(build)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <TextInput
        style={styles.input}
        value={newBuildName}
        onChangeText={setNewBuildName}
        placeholder="Enter new build name"
        placeholderTextColor="#888" // Placeholder text color
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddNewBuild}
      >
        <Text style={styles.addButtonText}>Add New Build</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  noBuildsText: {
    fontSize: 18,
    color: '#6a1b9a', // Purple color
    marginBottom: 20,
  },
  buildContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#6a1b9a', // Purple border color
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
