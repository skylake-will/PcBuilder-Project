import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios for HTTP requests

const API_URL = 'https://your-api-url.com'; // Replace with your API URL

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [token, setToken] = useState(''); // State to store JWT token

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem('profileName');
        const savedImage = await AsyncStorage.getItem('profileImage');
        const savedToken = await AsyncStorage.getItem('authToken'); // Get token from AsyncStorage
        if (savedName !== null) setName(savedName);
        if (savedImage !== null) setImage(savedImage);
        if (savedToken !== null) setToken(savedToken);
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
          // Optionally, upload image to server
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleNameChange = async (newName) => {
    setName(newName);
    await AsyncStorage.setItem('profileName', newName);
    // Optionally, update profile name on server
    try {
      await axios.post(`${API_URL}/update-profile`, { name: newName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.buttonText}>Login / Signup</Text>
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
