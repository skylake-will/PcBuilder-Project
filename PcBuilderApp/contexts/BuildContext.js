import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const BuildContext = createContext();

// BuildProvider component
export const BuildProvider = ({ children }) => {
  const [builds, setBuilds] = useState({});

  // Load builds from AsyncStorage when the app starts
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
    loadBuilds();
  }, []);

  // Save builds to AsyncStorage
  const saveBuilds = async (updatedBuilds) => {
    try {
      await AsyncStorage.setItem('builds', JSON.stringify(updatedBuilds));
    } catch (error) {
      console.error('Failed to save builds', error);
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

  return (
    <BuildContext.Provider value={{ builds, addBuild, removeBuild, renameBuild, addOptionToBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

// Custom hook to use the context
export const useBuildContext = () => useContext(BuildContext);
