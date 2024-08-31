import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useBuildContext } from '../../../contexts/BuildContext';

const SsdDetailScreen = ({ route, navigation }) => {
  const { ssd, build } = route.params; // Get the SSD data and build name passed from the previous screen
  const { addOptionToBuild } = useBuildContext();

  // Handle the addition of the SSD to the selected build
  const handleAddSsd = () => {
    if (!build) {
      Alert.alert('Error', 'No PC build selected');
      return;
    }

    addOptionToBuild(build, 'SSD', ssd);
    navigation.navigate('PCs', { build }); // Navigate back to PCs screen with the updated build
  };

  // Open the product URL in the default browser
  const handleViewProduct = () => {
    if (ssd.url) {
      Linking.openURL(ssd.url).catch((err) => console.error('Failed to open URL:', err));
    } else {
      Alert.alert('Error', 'Product URL is not available');
    }
  };

  // Navigate to the build selection screen to choose a build
  const handleSelectBuild = () => {
    navigation.navigate('SelectBuildScreen', { option: ssd, type: 'SSD' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ssd.productName}</Text>
      <Text style={styles.price}>Preço: {ssd.price}</Text>
      
      <TouchableOpacity style={styles.linkButton} onPress={handleViewProduct}>
        <Text style={styles.linkButtonText}>Ver Produto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSelectBuild}>
        <Text style={styles.buttonText}>Selecione o PC</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleAddSsd}
      >
        <Text style={styles.confirmButtonText}>Adicionar ao Build</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
  },
  linkButton: {
    padding: 15,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 18,
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
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  confirmButton: {
    width: '80%',
    padding: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SsdDetailScreen;
