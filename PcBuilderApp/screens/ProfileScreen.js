import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem('profileName');
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedName !== null) setName(savedName);
        if (savedImage !== null) setImage(savedImage);
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };

    loadProfile();
  }, []);

  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image Picker Result:', result); // Log the result to inspect it
  
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        console.log('Selected Image URI:', uri); // Log the URI to ensure it's valid
        if (uri) {
          setImage(uri);
          await AsyncStorage.setItem('profileImage', uri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  

  const handleNameChange = async (newName) => {
    setName(newName);
    await AsyncStorage.setItem('profileName', newName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
      <Button title="Editar foto de perfil" onPress={handleImagePick} />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Enter your name"
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('YourBuildsScreen')}
      >
        <Text style={styles.buttonText}>Seus PCs</Text>
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
