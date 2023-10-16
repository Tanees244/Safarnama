import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Homescreen';
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Discover from './Screens/Discover';
import Hotel from './Screens/Hotel';
import GuideHome from './Screens/Guide/GuideHome';
import GuidePersonalDetail from './Screens/Guide/GuidePersonalDetail';
import GuideDocument from './Screens/Guide/GuideDocument';
import GuideExperience from './Screens/Guide/GuideExperience';
import GuideHomeScreen from './Screens/Guide/GuideHomeScreen';
import GuideQuestionnaire from './Screens/Guide/GuideQuestionnaire';
import GuideBankDetail from './Screens/Guide/GuideBankDetail';
import GuideCurrentPackage from './Screens/Guide/GuideCurrentPackage';
import GuidePastPackage from './Screens/Guide/GuidePastPackage';
import GuideUserReview from './Screens/Guide/GuideUserReview';
import GuideClientsFeedback from './Screens/Guide/GuideClientsFeedback';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();



export default function App() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded && !error) {
    return null;
  }
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Register' component={Register} />
        <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
        <Stack.Screen options={{ headerShown: false }} name='Discover' component={Discover} />
        <Stack.Screen options={{ headerShown: false }} name='Hotel' component={Hotel} />
        <Stack.Screen options={{ headerShown: false }} name='GuideHome' component={GuideHome} />
        <Stack.Screen options={{ headerShown: false }} name='GuidePersonalDetail' component={GuidePersonalDetail} />
        <Stack.Screen options={{ headerShown: false }} name='GuideDocument' component={GuideDocument} />
        <Stack.Screen options={{ headerShown: false }} name='GuideExperience' component={GuideExperience} />
        <Stack.Screen options={{ headerShown: false }} name='GuideHomeScreen' component={GuideHomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='GuideQuestionnaire' component={GuideQuestionnaire} />
        <Stack.Screen options={{ headerShown: false }} name='GuideBankDetail' component={GuideBankDetail} />
        <Stack.Screen options={{ headerShown: false }} name='GuideCurrentPackage' component={GuideCurrentPackage} />
        <Stack.Screen options={{ headerShown: false }} name='GuidePastPackage' component={GuidePastPackage} />
        <Stack.Screen options={{ headerShown: false }} name='GuideUserReview' component={GuideUserReview} />
        <Stack.Screen options={{ headerShown: false }} name='GuideClientsFeedback' component={GuideClientsFeedback} />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
}