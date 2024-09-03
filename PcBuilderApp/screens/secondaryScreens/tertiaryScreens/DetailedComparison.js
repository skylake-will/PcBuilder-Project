import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CompareScreen() {
  const route = useRoute();
  const { selectedCpus, selectedGpus } = route.params || {};

  const MAX_SINGLE_CORE_SCORE = 5000;
  const MAX_MULTI_CORE_SCORE = 50000;
  const MAX_GPU_SCORE = 10000; // Adjust as needed for GPU scores

  const getBarWidth = (score, maxScore) => {
    if (score === null || score === undefined || maxScore === 0) {
      return '0%';
    }
    const widthPercentage = Math.min((score / maxScore) * 100, 100);
    return `${widthPercentage}%`;
  };

  const getBarStyle = (score, maxScore, barColor) => ({
    width: getBarWidth(score, maxScore),
    backgroundColor: barColor,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Comparison</Text>
        </View>

        <View style={styles.comparisonContainer}>
          {/* CPU Comparison Section */}
          {selectedCpus && selectedCpus.length > 0 ? (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>CPU Comparison</Text>
              <View style={styles.gridContainer}>
                {selectedCpus.map((cpu, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{ uri: cpu.imageUrl || 'https://via.placeholder.com/150' }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <Text style={styles.itemName} numberOfLines={1} adjustsFontSizeToFit>
                      {cpu.cpuName || 'Unknown CPU'}
                    </Text>

                    <View style={styles.specsContainer}>
                      <Text style={styles.specsLabel}>Single Core Score:</Text>
                      <View style={styles.barWrapper}>
                        <View style={[styles.bar, getBarStyle(cpu.singleCoreScore, MAX_SINGLE_CORE_SCORE, '#4caf50')]}>
                          <Text style={styles.barText}>{cpu.singleCoreScore || 'N/A'}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.specsContainer}>
                      <Text style={styles.specsLabel}>Multi Core Score:</Text>
                      <View style={styles.barWrapper}>
                        <View style={[styles.bar, getBarStyle(cpu.multiCoreScore, MAX_MULTI_CORE_SCORE, '#2196f3')]}>
                          <Text style={styles.barText}>{cpu.multiCoreScore || 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.noData}>No CPUs selected for comparison</Text>
          )}
        </View>

        <View style={styles.comparisonContainer}>
          {/* GPU Comparison Section */}
          {selectedGpus && selectedGpus.length > 0 ? (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>GPU Comparison</Text>
              <View style={styles.gridContainer}>
                {selectedGpus.map((gpu, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{ uri: gpu.imageUrl || 'https://via.placeholder.com/150' }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <Text style={styles.itemName} numberOfLines={1} adjustsFontSizeToFit>
                      {gpu.gpuName || 'Unknown GPU'}
                    </Text>

                    <View style={styles.specsContainer}>
                      <Text style={styles.specsLabel}>Benchmark Score:</Text>
                      <View style={styles.barWrapper}>
                        <View style={[styles.bar, getBarStyle(gpu.score, MAX_GPU_SCORE, '#ff5722')]}>
                          <Text style={styles.barText}>{gpu.score || 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.noData}>No GPUs selected for comparison</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ea', // Deep purple background
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  comparisonContainer: {
    flexDirection: 'column',
    padding: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 15,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  specsContainer: {
    marginBottom: 15,
  },
  specsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bar: {
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    justifyContent: 'center',
    marginRight: 12,
    paddingHorizontal: 10,
    flexGrow: 1,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  barText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  noData: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
