import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function BuildingYourPC({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Montando seu PC</Text>
      <Text>Aqui você pode selecionar peças.</Text>
      <Button
        title="Comece a montar"
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
