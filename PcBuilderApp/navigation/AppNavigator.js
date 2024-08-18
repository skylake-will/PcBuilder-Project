import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PcPartsSearchScreen from '../screens/PcPartsSearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PcBuildScreen from '../screens/PcBuildScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="PC Parts Search" component={PcPartsSearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PC Build" component={PcBuildScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
