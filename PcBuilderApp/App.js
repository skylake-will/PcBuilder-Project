import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BuildProvider } from './contexts/BuildContext';

// Import Screens
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
import SsdCategoryScreen from './screens/secondaryScreens/tertiaryScreens/SsdCategoryScreen';
import CompareScreen from './screens/CompareScreen';
import CompareCategoryScreen from './screens/secondaryScreens/tertiaryScreens/CompareCategoryScreen';
import DetailedComparison from './screens/secondaryScreens/tertiaryScreens/DetailedComparison';
import GpuCompare from './screens/secondaryScreens/GpuCompare';
import CpuCompare from './screens/secondaryScreens/CpuCompare';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarIcon = (routeName, color, size) => {
  let iconName;
  switch (routeName) {
    case 'Pesquisar':
      iconName = 'search-web';
      break;
    case 'Perfil':
      iconName = 'account';
      break;
    case 'Montando seu PC':
      iconName = 'desktop-tower';
      break;
    case 'Compare':
      iconName = 'compare';
      break;
    default:
      iconName = 'help-circle';
  }
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f5f5f5', paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => tabBarIcon(route.name, color, size),
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Pesquisar" component={PcPartsSearchScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Montando seu PC" component={BuildingYourPC} />
      <Tab.Screen name="Compare" component={CompareScreen} />
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
          <Stack.Screen name="PcBuild" component={PcBuildScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CpuScreen" component={CpuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GpuScreen" component={GpuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FonteScreen" component={FonteScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RamScreen" component={RamScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SsdScreen" component={SsdScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GabineteScreen" component={GabineteScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CompareScreen" component={CompareScreen} options={{ headerShown: false }} />
          <Stack.Screen name="YourBuildsScreen" component={YourBuildsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PCs" component={PCs} options={{ headerShown: false }} />
          <Stack.Screen name="SelectBuildScreen" component={SelectBuildScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CpuCategoryScreen" component={CpuCategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GpuCategoryScreen" component={GpuCategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RamCategoryScreen" component={RamCategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SsdCategoryScreen" component={SsdCategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CompareCategoryScreen" component={CompareCategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailedComparison" component={DetailedComparison} options={{ headerShown: false }} />
          <Stack.Screen name='GpuCompare' component={GpuCompare} options={{headerShwon: false}} />
          <Stack.Screen name='CpuCompare' component={CpuCompare} options={{headerShwon: false}} />
        </Stack.Navigator>
      </BuildProvider>
    </NavigationContainer>
  );
}
