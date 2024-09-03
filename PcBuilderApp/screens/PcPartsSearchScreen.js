import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
// import { useBuildContext } from '../web-scraping-api/controllers/updateAllHardwareData.json';
import hardwareData from '../web-scraping-api/controllers/updateAllHardwareData.json'; // Importe o arquivo JSON

// Defina a função prependBaseUrl
const prependBaseUrl = (url) => {
  const baseUrl = 'https://www.kabum.com.br';
  return url.startsWith('http') ? url : `${baseUrl}${url}`;
};

export default function PcPartsSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);


  // Handle search logic
  const handleSearch = () => {
    setLoading(true);
    setError(null);

    try {
      const query = searchQuery.toLowerCase().trim();
      const filteredResults = hardwareData.filter(item =>
        item.productName.toLowerCase().includes(query)
      );
      
      setResults(filteredResults);

      if (filteredResults.length === 0) {
        setError('No results found.');
      }

    } catch (err) {
      console.error('Search error:', err); // Log do erro
      setError('Error performing search. Please try again.');
    } finally {
      setLoading(false);
    }

  //     // Function to prepend base URL if needed
  // const prependBaseUrl = (url) => {
  //   const baseUrl = 'https://www.kabum.com.br';
  //   if (url && !url.startsWith('http')) {
  //     return `${baseUrl}${url}`;
  //   }
  //   return url;
  // };

  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PC Parts Search</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for PC parts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" color="purple" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {results.length > 0 && (
        <View style={styles.results}>
          {results.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => navigation.navigate('DetailScreen', { item })}
            >
             <Image 
             source={{ uri: item.imageUrl ? prependBaseUrl(item.imageUrl) : 'https://www.kabum.com.br' }} 
             style={styles.image} 
             resizeMode="cover"
             />
              <Text style={styles.resultText}>{item.productName}</Text>
              <Text style={styles.resultText}>Price: {item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {results.length === 0 && !loading && !error && (
        <Text style={styles.noResults}>No results found. Please try a different search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    color: 'purple',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  results: {
    marginTop: 20,
    width: '100%',
  },
  resultItem: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginLeft: 10,
  },
  noResults: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  image: {
    width: 50,
    height: 50,
  },
});
