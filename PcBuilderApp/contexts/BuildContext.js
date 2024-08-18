import React, { createContext, useState, useContext } from 'react';

const BuildContext = createContext();

export const BuildProvider = ({ children }) => {
  const [builds, setBuilds] = useState({
    'PC1': { CPU: null, GPU: null, Fonte: null, RAM: null, SSD: null, Gabinete: null },
    'PC2': { CPU: null, GPU: null, Fonte: null, RAM: null, SSD: null, Gabinete: null },
  });

  const addOptionToBuild = (buildName, type, option) => {
    setBuilds((prevBuilds) => ({
      ...prevBuilds,
      [buildName]: {
        ...prevBuilds[buildName],
        [type]: option,
      },
    }));
  };

  return (
    <BuildContext.Provider value={{ builds, addOptionToBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuildContext = () => useContext(BuildContext);
