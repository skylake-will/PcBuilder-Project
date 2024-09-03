import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import GeekbenchData from '../../../web-scraping-api/controllers/geekbenchData.json'; 
import GpubenchData from '../../../web-scraping-api/controllers/gpuBenchmarkData.json';
import cpuImages from '../../../web-scraping-api/controllers/updateAllHardwareData.json'; 
import { useBuildContext } from '../../../contexts/BuildContext'; // Adjust path as necessary

export default function CompareCategoryScreen({ route, navigation }) {
  const { category = '' } = route.params || {};
  const { selectedCpus, selectedGpus, toggleCpuSelection, toggleGpuSelection } = useBuildContext();

  // State to manage pagination and loading
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Determine category type
  const isCpuCategory = category.toLowerCase().includes('ryzen') || category.toLowerCase().includes('core');
  const isGpuCategory = !isCpuCategory;

  // Filter data based on the category
  const cpuData = isCpuCategory ? GeekbenchData.filter(item =>
    item.cpuName && item.cpuName.toLowerCase().includes(category.toLowerCase())
  ) : [];
  
  const gpuData = isGpuCategory ? GpubenchData.filter(item =>
    item.gpuName && item.gpuName.toLowerCase().includes(category.toLowerCase())
  ) : [];

  // Combine CPU and GPU data
  const combinedData = [...cpuData, ...gpuData];

  // Calculate the total number of pages
  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  // Get data for the current page
  const paginatedData = combinedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const handleOptionSelect = (item) => {
    if (isCpuCategory) {
      toggleCpuSelection(item);
    } else if (isGpuCategory) {
      toggleGpuSelection(item);
    }
  };

  const handleCompare = () => {
    if (isCpuCategory && selectedCpus.length < 2) {
      alert('Please select at least two CPUs for comparison');
      return;
    }
    if (isGpuCategory && selectedGpus.length < 2) {
      alert('Please select at least two GPUs for comparison');
      return;
    }
    navigation.navigate('DetailedComparison', { 
      selectedCpus: isCpuCategory ? selectedCpus : undefined,
      selectedGpus: isGpuCategory ? selectedGpus : undefined 
    });
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, totalPages);
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 1);
      }
    });
  };

  const loadMoreData = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentPage(1);
      setIsRefreshing(false);
    }, 1000); // Simulate network delay
  };

  const prependBaseUrl = (url) => {
    const baseUrl = 'https://www.kabum.com.br';
    if (url && !url.startsWith('http')) {
      return `${baseUrl}${url}`;
    }
    return url;
  };

  const renderItem = ({ item }) => {
    const isCpuItem = item.cpuName;
    const isGpuItem = item.gpuName;

    let imageUrl = 'https://www.kabum.com.br'; // Default image URL
    if (isCpuItem) {
      const cpuImage = cpuImages.find(cpu => cpu.productName === item.cpuName);
      imageUrl = cpuImage ? prependBaseUrl(cpuImage.imageUrl) : imageUrl;
    } else if (isGpuItem) {
      imageUrl = prependBaseUrl(item.imageUrl); // Assuming GpubenchData has imageUrl
    }

    return (
      <TouchableOpacity
        style={[
          styles.button,
          (isCpuCategory ? selectedCpus : selectedGpus).some(selectedItem => (isCpuItem ? selectedItem.cpuName : selectedItem.gpuName) === (isCpuItem ? item.cpuName : item.gpuName)) && styles.selectedButton
        ]}
        onPress={() => handleOptionSelect(item)}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.buttonText}>{isCpuItem ? item.cpuName : item.gpuName || 'Unknown'}</Text>
        {isCpuItem && (
          <>
            <Text style={styles.buttonScore}>
              Single Core Score: {item.singleCoreScore !== undefined ? item.singleCoreScore : 'N/A'}
            </Text>
            <Text style={styles.buttonScore}>
              Multi Core Score: {item.multiCoreScore !== undefined ? item.multiCoreScore : 'N/A'}
            </Text>
          </>
        )}
        {isGpuItem && (
          <Text style={styles.buttonScore}>
            Score: {item.score !== undefined ? item.score : 'N/A'} {/* Use the correct field for GPU score */}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select {isCpuCategory ? 'CPUs' : 'GPUs'} for {category}</Text>
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => (item.cpuName || item.gpuName) || `key_${Math.random()}`}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1} // Trigger `loadMoreData` when the end of the list is near
        onRefresh={refreshData}
        refreshing={isRefreshing}
        ListFooterComponent={() => (
          isLoading ? <ActivityIndicator size="large" color="#6a1b9a" /> : null
        )}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.compareButton}
        onPress={handleCompare}
      >
        <Text style={styles.compareButtonText}>Compare Selected {isCpuCategory ? 'CPUs' : 'GPUs'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6a1b9a', // Purple color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
  },
  selectedButton: {
    backgroundColor: '#e0e0e0', // Light gray for selected items
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonScore: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  compareButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6a1b9a', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  compareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#6a1b9a', // Purple color
    borderRadius: 5,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
});
