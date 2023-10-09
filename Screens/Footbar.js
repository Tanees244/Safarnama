import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Homescreen'; // Import your Home screen component
import ProfileScreen from './Profile'; // Import your Profile screen component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          position: 'absolute', // Fixed position at the bottom
          bottom: 25,
          left: 20,
          right: 20,
          height: 90,
          elevation: 0,
          borderRadius: 15, // Remove top border
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    shadow: {

    },
});
export default BottomTabNavigator;
