import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('John Doe');
  const [image, setImage] = useState('https://via.placeholder.com/150');

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <Button title="Edit Profile Picture" onPress={handleImagePick} />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {/* New Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('YourBuildsScreen')}
      >
        <Text style={styles.buttonText}>Your Builds</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
    paddingHorizontal: 8,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
