import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CpuData from '../../../web-scraping-api/controllers/updateAllHardwareData.json'; // Adjust path as necessary

export default function CpuCategoryScreen({ route, navigation }) {
  // Destructure category with a default empty string
  const { category = '' } = route.params || {};

  // Validate and filter data based on category
  const cpuData = CpuData ? CpuData.filter(item =>
    item.productName.includes(category) && item.productName.includes('Processador')
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
    navigation.navigate('DetailScreen', { item, type: 'CPU' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a CPU {category} Option</Text>
      <FlatList
        data={cpuData}
        keyExtractor={(item) => item.productUrl} // Use a unique identifier
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect(item)}>
            <Image
              source={{ uri: item.imageUrl ? prependBaseUrl(item.imageUrl) : 'https://www.kabum.com.br' }} // Use a placeholder if image URL is missing
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
  image: {
    width: 100, // Adjust width and height as needed
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonPrice: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});
