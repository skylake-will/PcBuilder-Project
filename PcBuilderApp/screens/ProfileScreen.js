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

      if (!result.canceled) {
        const uri = result.assets[0].uri;
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
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: image || 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Button 
          title="Edit Profile Photo" 
          onPress={handleImagePick} 
          color="#6a1b9a" // Purple color for button
        />
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Enter your name"
        placeholderTextColor="#888" // Placeholder text color
      />
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#6a1b9a', // Purple border for image
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
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
