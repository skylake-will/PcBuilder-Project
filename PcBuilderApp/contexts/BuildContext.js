// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Create the context
// const BuildContext = createContext();

// // BuildProvider component
// export const BuildProvider = ({ children }) => {
//   const [builds, setBuilds] = useState({});
//   const [selectedCpus, setSelectedCpus] = useState([]);

//   // Load builds and selected CPUs from AsyncStorage when the app starts
//   useEffect(() => {
//     const loadBuilds = async () => {
//       try {
//         const savedBuilds = await AsyncStorage.getItem('builds');
//         if (savedBuilds !== null) {
//           setBuilds(JSON.parse(savedBuilds));
//         }
//       } catch (error) {
//         console.error('Failed to load builds', error);
//       }
//     };

//     const loadSelectedCpus = async () => {
//       try {
//         const savedCpus = await AsyncStorage.getItem('selectedCpus');
//         if (savedCpus !== null) {
//           setSelectedCpus(JSON.parse(savedCpus));
//         }
//       } catch (error) {
//         console.error('Failed to load selected CPUs', error);
//       }
//     };

//     loadBuilds();
//     loadSelectedCpus();
//   }, []);

//   // Save builds and selected CPUs to AsyncStorage
//   const saveBuilds = async (updatedBuilds) => {
//     try {
//       await AsyncStorage.setItem('builds', JSON.stringify(updatedBuilds));
//     } catch (error) {
//       console.error('Failed to save builds', error);
//     }
//   };

//   const saveSelectedCpus = async (updatedCpus) => {
//     try {
//       await AsyncStorage.setItem('selectedCpus', JSON.stringify(updatedCpus));
//     } catch (error) {
//       console.error('Failed to save selected CPUs', error);
//     }
//   };

//   // Function to add a new build
//   const addBuild = (buildName) => {
//     if (builds[buildName]) {
//       console.error('Build with this name already exists.');
//       return;
//     }
//     const updatedBuilds = {
//       ...builds,
//       [buildName]: { CPU: null, GPU: null, Fonte: null, RAM: null, SSD: null, Gabinete: null },
//     };
//     setBuilds(updatedBuilds);
//     saveBuilds(updatedBuilds);
//   };

//   // Function to remove a build
//   const removeBuild = (buildName) => {
//     if (!builds[buildName]) {
//       console.error('Build not found:', buildName);
//       return;
//     }
//     const { [buildName]: _, ...updatedBuilds } = builds;
//     setBuilds(updatedBuilds);
//     saveBuilds(updatedBuilds);
//   };

//   // Function to rename a build
//   const renameBuild = (oldName, newName) => {
//     if (builds[newName]) {
//       console.error('A build with this name already exists:', newName);
//       return;
//     }
//     if (!builds[oldName]) {
//       console.error('Old build name not found:', oldName);
//       return;
//     }
//     const updatedBuilds = { ...builds };
//     updatedBuilds[newName] = updatedBuilds[oldName];
//     delete updatedBuilds[oldName];
//     setBuilds(updatedBuilds);
//     saveBuilds(updatedBuilds);
//   };

//   // Function to add or update options in a build
//   const addOptionToBuild = (buildName, type, option) => {
//     if (!builds[buildName]) {
//       console.error('Build not found:', buildName);
//       return;
//     }

//     // Ensure valid component types
//     const validTypes = ['CPU', 'GPU', 'Fonte', 'RAM', 'SSD', 'Gabinete'];
//     if (!validTypes.includes(type)) {
//       console.error('Invalid component type:', type);
//       return;
//     }

//     setBuilds((prevBuilds) => {
//       const updatedBuilds = {
//         ...prevBuilds,
//         [buildName]: {
//           ...prevBuilds[buildName],
//           [type]: option,
//         },
//       };
//       saveBuilds(updatedBuilds);
//       return updatedBuilds;
//     });
//   };

//   // Function to add or remove CPUs from the selected list
//   const toggleCpuSelection = (cpu) => {
//     setSelectedCpus((prevSelection) => {
//       const updatedSelection = prevSelection.some(item => item.cpuName === cpu.cpuName)
//         ? prevSelection.filter(item => item.cpuName !== cpu.cpuName)
//         : [...prevSelection, cpu];
      
//       saveSelectedCpus(updatedSelection);
//       return updatedSelection;
//     });
//   };

//   return (
//     <BuildContext.Provider value={{ builds, addBuild, removeBuild, renameBuild, addOptionToBuild, selectedCpus, toggleCpuSelection }}>
//       {children}
//     </BuildContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useBuildContext = () => useContext(BuildContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const BuildContext = createContext();

// BuildProvider component
export const BuildProvider = ({ children }) => {
  const [builds, setBuilds] = useState({});
  const [selectedCpus, setSelectedCpus] = useState([]);
  const [selectedGpus, setSelectedGpus] = useState([]);

  // Load builds and selected CPUs/Gpus from AsyncStorage when the app starts
  useEffect(() => {
    const loadBuilds = async () => {
      try {
        const savedBuilds = await AsyncStorage.getItem('builds');
        if (savedBuilds !== null) {
          setBuilds(JSON.parse(savedBuilds));
        }
      } catch (error) {
        console.error('Failed to load builds', error);
      }
    };

    const loadSelectedCpus = async () => {
      try {
        const savedCpus = await AsyncStorage.getItem('selectedCpus');
        if (savedCpus !== null) {
          setSelectedCpus(JSON.parse(savedCpus));
        }
      } catch (error) {
        console.error('Failed to load selected CPUs', error);
      }
    };

    const loadSelectedGpus = async () => {
      try {
        const savedGpus = await AsyncStorage.getItem('selectedGpus');
        if (savedGpus !== null) {
          setSelectedGpus(JSON.parse(savedGpus));
        }
      } catch (error) {
        console.error('Failed to load selected GPUs', error);
      }
    };

    loadBuilds();
    loadSelectedCpus();
    loadSelectedGpus();
  }, []);

  // Save builds and selected CPUs/GPUs to AsyncStorage
  const saveBuilds = async (updatedBuilds) => {
    try {
      await AsyncStorage.setItem('builds', JSON.stringify(updatedBuilds));
    } catch (error) {
      console.error('Failed to save builds', error);
    }
  };

  const saveSelectedCpus = async (updatedCpus) => {
    try {
      await AsyncStorage.setItem('selectedCpus', JSON.stringify(updatedCpus));
    } catch (error) {
      console.error('Failed to save selected CPUs', error);
    }
  };

  const saveSelectedGpus = async (updatedGpus) => {
    try {
      await AsyncStorage.setItem('selectedGpus', JSON.stringify(updatedGpus));
    } catch (error) {
      console.error('Failed to save selected GPUs', error);
    }
  };

  // Function to add a new build
  const addBuild = (buildName) => {
    if (builds[buildName]) {
      console.error('Build with this name already exists.');
      return;
    }
    const updatedBuilds = {
      ...builds,
      [buildName]: { CPU: null, GPU: null, Fonte: null, RAM: null, SSD: null, Gabinete: null },
    };
    setBuilds(updatedBuilds);
    saveBuilds(updatedBuilds);
  };

  // Function to remove a build
  const removeBuild = (buildName) => {
    if (!builds[buildName]) {
      console.error('Build not found:', buildName);
      return;
    }
    const { [buildName]: _, ...updatedBuilds } = builds;
    setBuilds(updatedBuilds);
    saveBuilds(updatedBuilds);
  };

  // Function to rename a build
  const renameBuild = (oldName, newName) => {
    if (builds[newName]) {
      console.error('A build with this name already exists:', newName);
      return;
    }
    if (!builds[oldName]) {
      console.error('Old build name not found:', oldName);
      return;
    }
    const updatedBuilds = { ...builds };
    updatedBuilds[newName] = updatedBuilds[oldName];
    delete updatedBuilds[oldName];
    setBuilds(updatedBuilds);
    saveBuilds(updatedBuilds);
  };

  // Function to add or update options in a build
  const addOptionToBuild = (buildName, type, option) => {
    if (!builds[buildName]) {
      console.error('Build not found:', buildName);
      return;
    }

    // Ensure valid component types
    const validTypes = ['CPU', 'GPU', 'Fonte', 'RAM', 'SSD', 'Gabinete'];
    if (!validTypes.includes(type)) {
      console.error('Invalid component type:', type);
      return;
    }

    setBuilds((prevBuilds) => {
      const updatedBuilds = {
        ...prevBuilds,
        [buildName]: {
          ...prevBuilds[buildName],
          [type]: option,
        },
      };
      saveBuilds(updatedBuilds);
      return updatedBuilds;
    });
  };

  // Function to add or remove CPUs from the selected list
  const toggleCpuSelection = (cpu) => {
    setSelectedCpus((prevSelection) => {
      const updatedSelection = prevSelection.some(item => item.cpuName === cpu.cpuName)
        ? prevSelection.filter(item => item.cpuName !== cpu.cpuName)
        : [...prevSelection, cpu];
      
      saveSelectedCpus(updatedSelection);
      return updatedSelection;
    });
  };

  // Function to add or remove GPUs from the selected list
  const toggleGpuSelection = (gpu) => {
    setSelectedGpus((prevSelection) => {
      const updatedSelection = prevSelection.some(item => item.gpuName === gpu.gpuName)
        ? prevSelection.filter(item => item.gpuName !== gpu.gpuName)
        : [...prevSelection, gpu];
      
      saveSelectedGpus(updatedSelection);
      return updatedSelection;
    });
  };

  return (
    <BuildContext.Provider value={{ 
      builds, 
      addBuild, 
      removeBuild, 
      renameBuild, 
      addOptionToBuild, 
      selectedCpus, 
      toggleCpuSelection, 
      selectedGpus, 
      toggleGpuSelection 
    }}>
      {children}
    </BuildContext.Provider>
  );
};

// Custom hook to use the context
export const useBuildContext = () => useContext(BuildContext);
