import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native';
import { useBuildContext } from '../../../contexts/BuildContext'; // Adjust path as necessary

const DetailScreen = ({ route, navigation }) => {
  const { item, type } = route.params || {}; // Destructure 'type' from params
  const { builds, addOptionToBuild } = useBuildContext();

  // Handle adding the item to an existing build
  const handleAddToBuild = () => {
    if (!item || !type) {
      Alert.alert('Error', 'No item details or type available');
      return;
    }

    // Navigate to the build selection screen
    navigation.navigate('SelectBuildScreen', {
      option: item,
      type: type, // Use the passed type
    });
  };

  // Function to handle viewing the product URL
  const handleViewProduct = () => {
    if (item.productUrl) {
      Linking.openURL(item.productUrl).catch((err) => Alert.alert('Error', 'Failed to open URL'));
    } else {
      Alert.alert('Error', 'Product URL is not available');
    }
  };

  // Function to prepend base URL if needed
  const prependBaseUrl = (url) => {
    const baseUrl = 'https://www.kabum.com.br';
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item ? (
        <View style={styles.content}>
          <Image
            source={{ uri: prependBaseUrl(item.imageUrl) }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.productName}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity style={styles.button} onPress={handleViewProduct}>
            <Text style={styles.buttonText}>View Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={handleAddToBuild}>
            <Text style={styles.addButtonText}>Add to Build</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.errorText}>No item details available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: '#6a1b9a', // Purple color
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    maxWidth: 300,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default DetailScreen;
