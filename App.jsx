import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen/AuthScreen.js';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.js';
import CreatePostScreen from './src/screens/CreatePostScreen/CreatePostScreen.js';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
