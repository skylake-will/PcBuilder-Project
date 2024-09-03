import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
// Import your JSON data
import hardwareData from '../web-scraping-api/controllers/updateAllHardwareData.json'; // Adjust the path to your JSON file

export default function PcPartsSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Function to tokenize text into words
  const tokenize = (text) => text.toLowerCase().split(/\s+/);

  // Function to handle search logic
  const handleSearch = () => {
    setLoading(true);
    setError(null);

    try {
      const queryTokens = tokenize(searchQuery.trim());
      if (queryTokens.length === 0) {
        setError('Search query cannot be empty.');
        setLoading(false);
        return;
      }

      // Filter data based on whether any word in productName matches the search query
      const filteredResults = hardwareData.filter(item => {
        const productTokens = tokenize(item.productName);
        return queryTokens.some(queryToken => productTokens.includes(queryToken));
      });

      setResults(filteredResults);

      if (filteredResults.length === 0) {
        setError('No results found.');
      }
    } catch (err) {
      setError('Error performing search. Please try again.');
    } finally {
      setLoading(false);
    }
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
                source={{ uri: item.imageUrl.startsWith('/') ? `https://www.kabum.com.br${item.imageUrl}` : item.imageUrl }}
                style={styles.resultImage}
              />
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>{item.productName}</Text>
                <Text style={styles.resultText}>Price: {item.price}</Text>
              </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 18,
  },
  noResults: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
