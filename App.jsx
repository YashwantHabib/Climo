import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherScreen from './screens/WeatherScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Weather"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
