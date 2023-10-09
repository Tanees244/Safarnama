import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Homescreen';
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Discover from './Screens/Discover';
import Hotel from './Screens/Hotel';
import GuideHome from './Screens/GuideHome';
import GuidePersonalDetail from './Screens/GuidePersonalDetail';
import GuideDocument from './Screens/GuideDocument';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Register' component={Register}/>
        <Stack.Screen options={{headerShown: false}} name='Login' component={Login}/>
        <Stack.Screen options={{headerShown: false}} name='Discover' component={Discover}/>
        <Stack.Screen options={{headerShown: false}} name='Hotel' component={Hotel}/>
        <Stack.Screen options={{headerShown: false}} name='GuideHome' component={GuideHome}/>
        <Stack.Screen options={{headerShown: false}} name='GuidePersonalDetail' component={GuidePersonalDetail}/>    
        <Stack.Screen options={{headerShown: false}} name='GuideDocument' component={GuideDocument}/>       
      </Stack.Navigator>
     </NavigationContainer>
  );
}