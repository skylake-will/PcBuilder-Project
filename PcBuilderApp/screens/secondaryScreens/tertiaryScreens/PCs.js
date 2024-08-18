import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { useBuildContext } from ''.../contexts/BuildContext.js'; // Correct import path

export default function BuildDetailsScreen({ route }) {
  const { build } = route.params;
  const { builds } = useBuildContext();
  const buildDetails = builds[build];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for {build}</Text>
      <Text style={styles.details}>CPU: {buildDetails.CPU || 'Not selected'}</Text>
      <Text style={styles.details}>GPU: {buildDetails.GPU || 'Not selected'}</Text>
      <Text style={styles.details}>Fonte: {buildDetails.Fonte || 'Not selected'}</Text>
      <Text style={styles.details}>RAM: {buildDetails.RAM || 'Not selected'}</Text>
      <Text style={styles.details}>SSD: {buildDetails.SSD || 'Not selected'}</Text>
      <Text style={styles.details}>Gabinete: {buildDetails.Gabinete || 'Not selected'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'purple',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: 'black',
    marginVertical: 5,
  },
});
