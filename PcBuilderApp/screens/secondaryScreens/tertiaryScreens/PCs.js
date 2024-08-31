import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useBuildContext } from '../../../contexts/BuildContext'; // Adjust path as necessary

export default function PCs({ route, navigation }) {
  const { build } = route.params; // Get the build name from route params
  const { builds } = useBuildContext();
  const buildDetails = builds[build] || {}; // Access build details

  // Function to navigate to the component selection screen with proper capitalization
  const navigateToSelectionScreen = (type) => {
    const screenType = type.charAt(0).toUpperCase() + type.slice(1) + 'Screen'; // Capitalize and append 'Screen'
    navigation.navigate(screenType, { build }); // Pass build name to selection screen
  };

  // Function to prepend base URL if needed
  const prependBaseUrl = (url) => {
    const baseUrl = 'https://www.kabum.com.br';
    return url && !url.startsWith('http') ? `${baseUrl}${url}` : url;
  };

  // Render product details with images and prices
  const renderProductDetail = (type, detail) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(); // Correct capitalization

    if (!detail) {
      return (
        <View style={styles.productContainer}>
          <Text style={styles.productText}>{capitalizedType}: Not selected</Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => navigateToSelectionScreen(type)}
          >
            <Text style={styles.changeButtonText}>Select {capitalizedType}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.productContainer}>
        <Image
          source={{ uri: prependBaseUrl(detail.imageUrl) }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productText}>
            {capitalizedType}: {detail.productName} - Preço: {detail.price}
          </Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => navigateToSelectionScreen(type)}
          >
            <Text style={styles.changeButtonText}>Change {capitalizedType}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do {build}</Text>

      {renderProductDetail('cpu', buildDetails.CPU)}
      {renderProductDetail('gpu', buildDetails.GPU)}
      {renderProductDetail('ram', buildDetails.RAM)}
      {renderProductDetail('ssd', buildDetails.SSD)}
      {renderProductDetail('fonte', buildDetails.Fonte)}
      {renderProductDetail('gabinete', buildDetails.Gabinete)}
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
    color: 'purple',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: 16,
    color: 'black',
  },
  changeButton: {
    padding: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
