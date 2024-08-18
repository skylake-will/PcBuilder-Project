import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { BuildProvider } from './contexts/BuildContext';
import PcPartsSearchScreen from './screens/PcPartsSearchScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 
import BuildingYourPC from './screens/BuildingYourPC';
import PcBuildScreen from './screens/PcBuildScreen'; 
import CpuScreen from './screens/secondaryScreens/CpuScreen';
import GpuScreen from './screens/secondaryScreens/GpuScreen';
import FonteScreen from './screens/secondaryScreens/FonteScreen';
import RamScreen from './screens/secondaryScreens/RamScreen'; 
import SsdScreen from './screens/secondaryScreens/SsdScreen'; 
import GabineteScreen from './screens/secondaryScreens/GabineteScreen';  
import YourBuildsScreen from './screens/secondaryScreens/YourBuildsScreen';
import PCs from './screens/secondaryScreens/tertiaryScreens/PCs';
import SelectBuildScreen from './screens/secondaryScreens/tertiaryScreens/SelectBuildScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 20,
        mass: 3,
      },
    },
    close: {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 20,
        mass: 3,
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'PcPartsSearch') {
            iconName = 'search-web';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'BuildingYourPC') {
            iconName = 'desktop-tower';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="PcPartsSearch" component={PcPartsSearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="BuildingYourPC" component={BuildingYourPC} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
     <BuildProvider>
<Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
    <Stack.Screen name="PcBuild" component={PcBuildScreen} />
    <Stack.Screen name="CpuScreen" component={CpuScreen} />
    <Stack.Screen name="GpuScreen" component={GpuScreen} />
    <Stack.Screen name="FonteScreen" component={FonteScreen} />
    <Stack.Screen name="RamScreen" component={RamScreen} />
    <Stack.Screen name="SsdScreen" component={SsdScreen} />
    <Stack.Screen name="GabineteScreen" component={GabineteScreen} />
    <Stack.Screen name="YourBuildsScreen" component={YourBuildsScreen} />
    <Stack.Screen name="PCs" component={PCs} />
    <Stack.Screen name="SelectBuildScreen" component={SelectBuildScreen} />
    </Stack.Navigator>
    </BuildProvider>   
      
    
    </NavigationContainer>
  );
}