// YourBuildsScreen.js

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
      {Object.keys(builds).map((build, index) => (
        <View key={index} style={styles.buildContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PCs', { build })}
            onLongPress={() => handleRenameBuild(build)}
          >
            <Text style={styles.buttonText}>{build}</Text>
          </TouchableOpacity>
          <Button title="Delete" color="red" onPress={() => removeBuild(build)} />
        </View>
      ))}
      <TextInput
        style={styles.input}
        value={newBuildName}
        onChangeText={setNewBuildName}
        placeholder="Enter PC name"
      />
      <Button title="Add New PC" onPress={handleAddNewBuild} />
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
});
