// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { BuildProvider } from './contexts/BuildContext';

// // Import das telas
// import PcPartsSearchScreen from './screens/PcPartsSearchScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import BuildingYourPC from './screens/BuildingYourPC';
// import PcBuildScreen from './screens/PcBuildScreen';
// import CpuScreen from './screens/secondaryScreens/CpuScreen';
// import GpuScreen from './screens/secondaryScreens/GpuScreen';
// import FonteScreen from './screens/secondaryScreens/FonteScreen';
// import RamScreen from './screens/secondaryScreens/RamScreen';
// import SsdScreen from './screens/secondaryScreens/SsdScreen';
// import GabineteScreen from './screens/secondaryScreens/GabineteScreen';
// import YourBuildsScreen from './screens/secondaryScreens/YourBuildsScreen';
// import PCs from './screens/secondaryScreens/tertiaryScreens/PCs';
// import SelectBuildScreen from './screens/secondaryScreens/tertiaryScreens/SelectBuildScreen';
// import CpuDetailScreen from './screens/secondaryScreens/tertiaryScreens/CpuDetailScreen';
// import GpuDetailScreen from './screens/secondaryScreens/tertiaryScreens/GpuDetailScreen';
// import SsdDetailScreen from './screens/secondaryScreens/tertiaryScreens/SsdDetailScreen';
// import RamDetailScreen from './screens/secondaryScreens/tertiaryScreens/RamDetailScreen'

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function HomeTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: 'purple',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: { display: 'flex' },
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === 'Pesquisar') {
//             iconName = 'search-web';
//           } else if (route.name === 'Perfil') {
//             iconName = 'account';
//           } else if (route.name === 'Montando seu PC') {
//             iconName = 'desktop-tower';
//           }
//           return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Pesquisar" component={PcPartsSearchScreen} />
//       <Tab.Screen name="Perfil" component={ProfileScreen} />
//       <Tab.Screen name="Montando seu PC" component={BuildingYourPC} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <BuildProvider>
//         <Stack.Navigator
//           screenOptions={{
//             headerStyle: { backgroundColor: 'purple' },
//             headerTintColor: '#fff',
//             headerTitleStyle: { fontWeight: 'bold' },
//           }}
//         >
//           <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
//           <Stack.Screen name="PcBuild" component={PcBuildScreen} />
//           <Stack.Screen name="CpuScreen" component={CpuScreen} />
//           <Stack.Screen name="CpuDetailScreen" component={CpuDetailScreen} />
//           <Stack.Screen name="GpuDetailScreen" component={GpuDetailScreen} />
//           <Stack.Screen name="GpuScreen" component={GpuScreen} />
//           <Stack.Screen name="FonteScreen" component={FonteScreen} />
//           <Stack.Screen name="RamScreen" component={RamScreen} />
//           <Stack.Screen name="SsdScreen" component={SsdScreen} />
//           <Stack.Screen name="GabineteScreen" component={GabineteScreen} />
//           <Stack.Screen name="YourBuildsScreen" component={YourBuildsScreen} />
//           <Stack.Screen name="PCs" component={PCs} />
//           <Stack.Screen name="SelectBuildScreen" component={SelectBuildScreen} />
//           <Stack.Screen name="SsdDetailScreen" component={SsdDetailScreen} />
//           <Stack.Screen name="RamDetailScreen" component={RamDetailScreen} />
//         </Stack.Navigator>
//       </BuildProvider>
//     </NavigationContainer>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BuildProvider } from './contexts/BuildContext';

// Import screens
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
import DetailScreen from './screens/secondaryScreens/tertiaryScreens/DetailScreen';
import CpuCategoryScreen from './screens/secondaryScreens/tertiaryScreens/CpuCategoryScreen';
import GpuCategoryScreen from './screens/secondaryScreens/tertiaryScreens/GpuCategoryScreen';
import RamCategoryScreen from './screens/secondaryScreens/tertiaryScreens/RamCategoryScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Pesquisar') {
            iconName = 'search-web';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          } else if (route.name === 'Montando seu PC') {
            iconName = 'desktop-tower';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pesquisar" component={PcPartsSearchScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Montando seu PC" component={BuildingYourPC} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BuildProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
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
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="CpuCategoryScreen" component={CpuCategoryScreen} />
          <Stack.Screen name="GpuCategoryScreen" component={GpuCategoryScreen} />
          <Stack.Screen name="RamCategoryScreen" component={RamCategoryScreen} />
        </Stack.Navigator>
      </BuildProvider>
    </NavigationContainer>
  );
}
