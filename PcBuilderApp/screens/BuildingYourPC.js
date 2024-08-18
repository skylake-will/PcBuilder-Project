import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function BuildingYourPC({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Building Your PC</Text>
      <Text>Here you will see the progress of building your PC.</Text>
      <Button
        title="Start Building"
        onPress={() => navigation.navigate('PcBuild')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginVertical: 16,
    color: 'purple',
  },
});
