// MotherboardCategoryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MotherboardData from '../../../web-scraping-api/controllers/updateAllHardwareData.json'; // Adjust path as necessary

export default function MotherboardCategoryScreen({ route, navigation }) {
  // Destructure category with a default empty string
  const { category = '' } = route.params || {};

  // Validate and filter data based on category
  const motherboardData = MotherboardData ? MotherboardData.filter(item =>
    item.productName.includes(category) && item.productName.includes('Placa Mãe')
  ) : [];

  // Function to prepend base URL if needed
  const prependBaseUrl = (url) => {
    const baseUrl = 'https://www.kabum.com.br';
    if (url && !url.startsWith('http')) {
      return `${baseUrl}${url}`;
    }
    return url;
  };

  const handleOptionSelect = (item) => {
    navigation.navigate('DetailScreen', { item, type: 'Motherboard' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione a Placa Mãe {category}</Text>
      <FlatList
        data={motherboardData}
        keyExtractor={(item) => item.productUrl} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect(item)}>
            <Image
              source={{ uri: item.imageUrl ? prependBaseUrl(item.imageUrl) : 'https://www.kabum.com.br' }} // Placeholder image
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.buttonText}>{item.productName}</Text>
            <Text style={styles.buttonPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6a1b9a', // Purple color
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonPrice: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});
