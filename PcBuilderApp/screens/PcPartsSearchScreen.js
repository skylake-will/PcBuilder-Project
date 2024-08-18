import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function PcPartsSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Adicionar lógica
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PC Parts Search</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for PC parts..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* Display search results here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  },
});
