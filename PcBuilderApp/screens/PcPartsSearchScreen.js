import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useBuildContext } from '../contexts/BuildContext';

export default function PcPartsSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Function to extract CPU options from builds
  const getCpuOptions = () => {
    const cpuOptions = [];
    for (const buildName in builds) {
      const build = builds[buildName];
      if (build.CPU) {
        cpuOptions.push(build.CPU);
      }
    }
    return cpuOptions;
  };

  // Handle search logic
  const handleSearch = () => {
    setLoading(true);
    setError(null);

    try {
      const cpuOptions = getCpuOptions();
      const query = searchQuery.toLowerCase().trim();
      const filteredResults = cpuOptions.filter(cpu =>
        cpu.productName.toLowerCase().includes(query)
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
              onPress={() => navigation.navigate('CpuDetailScreen', { cpu })}
            >
              <Text style={styles.resultText}>{cpu.productName}</Text>
              <Text style={styles.resultText}>Price: {cpu.price}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
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
