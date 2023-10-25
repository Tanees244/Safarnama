import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Homescreen';
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Discover from './Screens/Tourists/Discover';
import VendorCategory from './Screens/VendorRegisteration/VendorCategory';
import TransportCategory from './Screens/VendorRegisteration/TransportCategory';
import Category from './Screens/Category';
import GuideHome from './Screens/Guide/GuideHome';
import GuidePersonalDetail from './Screens/Guide/GuidePersonalDetail';
import GuideDocument from './Screens/Guide/GuideDocument';
import GuideExperience from './Screens/Guide/GuideExperience';
import GuideHomeScreen from './Screens/Guide/GuideHomeScreen';
import GuideQuestionnaire from './Screens/Guide/GuideQuestionnaire';
import GuideBankDetail from './Screens/Guide/GuideBankDetail';
import GuideCurrentPackage from './Screens/Guide/GuideCurrentPackage';
import GuidePastPackage  from './Screens/Guide/GuidePastPackage';
import GuideClientsFeedback from './Screens/Guide/GuideClientsFeedback';
import GuideUserReview from './Screens/Guide/GuideUserReview';
import GuideProfile from './Screens/Guide/GuideProfile';
import AirlineDashboard from './Screens/Airline/AirlineDashboard';
import BusRegister from './Screens/Bus/BusRegister';
import BusOperations from './Screens/Bus/BusOperations';
import BusCreatePackages from './Screens/Bus/BusCreatePackage';
import BusUpdatePackage from './Screens/Bus/BusUpdatePackage';
import BusViewPackages from './Screens/Bus/BusViewPackages';
import BusDeletePackage from './Screens/Bus/BusDeletePackage';
import HotelRegister from './Screens/Hotel/HotelRegister';
import HotelOperations from './Screens/Hotel/HotelOperations';
import HotelCreatePackages from './Screens/Hotel/HotelCreatePackages';
import HotelUpdatePackage from './Screens/Hotel/HotelUpdatePackage';
import HotelViewPackages from './Screens/Hotel/HotelViewPackage';
import HotelDeletePackage from './Screens/Hotel/HotelDeletePackage';
import HotelProfile from './Screens/Hotel/HotelProfile';
import AirlineProfile from './Screens/Airline/AirlineProfile';
import BusProfile from './Screens/Bus/BusProfile';
import AdminGuide from './Screens/Admin/AdminGuide';
import AdminGuideApplication from './Screens/Admin/AdminGuideApplication';
import AdminRegister from './Screens/Admin/AdminRegister';
import AdminTourist from './Screens/Admin/AdminTourist';
import AdminVendors from './Screens/Admin/AdminVendors';
import GuideList from './Screens/Admin/GuideList';
import GuideProcess from './Screens/Admin/GuideProcess';
import TouristInfo from './Screens/Admin/TouristInfo';
import AdminViewTouristPackages from './Screens/Admin/AdminViewTouristPackages';
import AdminDeleteTouristsPackages from './Screens/Admin/AdminDeleteTouristsPackages';
import HotelsLists from './Screens/Tourists/HotelsLists';
import HotelsInfo from './Screens/Tourists/HotelsInfo';
import CreateHotel from './Screens/VendorRegisteration/CreateHotel';
import VendorDashboard from './Screens/VendorRegisteration/VendorDashboard';
import VendorPersonalDetails from './Screens/VendorRegisteration/VendorPersonalDetails';
import GetStarted from './Screens/CreatePackage/GetStarted';

import { useFonts } from 'expo-font';
import CreateAirline from './Screens/VendorRegisteration/CreateAirline';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
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
        <Stack.Screen options={{ headerShown: false }} name='Category' component={Category} />
        <Stack.Screen options={{ headerShown: false }} name='VendorCategory' component={VendorCategory} />
        <Stack.Screen options={{ headerShown: false }} name='TransportCategory' component={TransportCategory} />
        <Stack.Screen options={{ headerShown: false }} name='GuideHome' component={GuideHome} />
        <Stack.Screen options={{ headerShown: false }} name='GuidePersonalDetail' component={GuidePersonalDetail} />
        <Stack.Screen options={{ headerShown: false }} name='GuideDocument' component={GuideDocument} />
        <Stack.Screen options={{ headerShown: false }} name='GuideExperience' component={GuideExperience} />
        <Stack.Screen options={{ headerShown: false }} name='GuideHomeScreen' component={GuideHomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='GuideQuestionnaire' component={GuideQuestionnaire} />
        <Stack.Screen options={{ headerShown: false }} name='GuideBankDetail' component={GuideBankDetail} />
        <Stack.Screen options={{ headerShown: false }} name='GuideCurrentPackage' component={GuideCurrentPackage} />
        <Stack.Screen options={{ headerShown: false }} name='GuidePastPackage' component={GuidePastPackage} />
        <Stack.Screen options={{ headerShown: false }} name='GuideClientsFeedback' component={GuideClientsFeedback} />
        <Stack.Screen options={{ headerShown: false }} name='GuideUserReview' component={GuideUserReview} />
        <Stack.Screen options={{ headerShown: false }} name='GuideProfile' component={GuideProfile} />
        <Stack.Screen options={{ headerShown: false }} name='AirlineDashboard' component={AirlineDashboard} />
        <Stack.Screen options={{ headerShown: false }} name='BusRegister' component={BusRegister} />
        <Stack.Screen options={{ headerShown: false }} name='BusOperation' component={BusOperations} />
        <Stack.Screen options={{ headerShown: false }} name='BusCreatePackages' component={BusCreatePackages} />
        <Stack.Screen options={{ headerShown: false }} name='BusUpdatePackage' component={BusUpdatePackage} />
        <Stack.Screen options={{ headerShown: false }} name='BusViewPackages' component={BusViewPackages} />
        <Stack.Screen options={{ headerShown: false }} name='BusDeletePackage' component={BusDeletePackage} />
        <Stack.Screen options={{ headerShown: false }} name='HotelRegister' component={HotelRegister} />
        <Stack.Screen options={{ headerShown: false }} name='HotelOperations' component={HotelOperations} />
        <Stack.Screen options={{ headerShown: false }} name='HotelCreatePackages' component={HotelCreatePackages} />
        <Stack.Screen options={{ headerShown: false }} name='HotelUpdatePackage' component={HotelUpdatePackage} />
        <Stack.Screen options={{ headerShown: false }} name='HotelViewPackages' component={HotelViewPackages} />
        <Stack.Screen options={{ headerShown: false }} name='HotelDeletePackage' component={HotelDeletePackage} />
        <Stack.Screen options={{ headerShown: false }} name='HotelProfile' component={HotelProfile} />
        <Stack.Screen options={{ headerShown: false }} name='AirlineProfile' component={AirlineProfile} />
        <Stack.Screen options={{ headerShown: false }} name='BusProfile' component={BusProfile} />
        <Stack.Screen options={{ headerShown: false }} name='AdminGuide' component={AdminGuide} />
        <Stack.Screen options={{ headerShown: false }} name='AdminGuideApplication' component={AdminGuideApplication} />
        <Stack.Screen options={{ headerShown: false }} name='AdminRegister' component={AdminRegister} />
        <Stack.Screen options={{ headerShown: false }} name='AdminTourist' component={AdminTourist} />
        <Stack.Screen options={{ headerShown: false }} name='AdminVendors' component={AdminVendors} />
        <Stack.Screen options={{ headerShown: false }} name='GuideList' component={GuideList} />
        <Stack.Screen options={{ headerShown: false }} name='GuideProcess' component={GuideProcess} />
        <Stack.Screen options={{ headerShown: false }} name='TouristInfo' component={TouristInfo} />
        <Stack.Screen options={{ headerShown: false }} name='AdminViewTouristPackages' component={AdminViewTouristPackages} />
        <Stack.Screen options={{ headerShown: false }} name='AdminDeleteTouristsPackages' component={AdminDeleteTouristsPackages} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsLists' component={HotelsLists} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsInfo' component={HotelsInfo} />
        <Stack.Screen options={{ headerShown: false }} name='CreateHotel' component={CreateHotel} />
        <Stack.Screen options={{ headerShown: false }} name='VendorDashboard' component={VendorDashboard} />
        <Stack.Screen options={{ headerShown: false }} name='VendorPersonalDetails' component={VendorPersonalDetails} />
        <Stack.Screen options={{ headerShown: false }} name='GetStarted' component={GetStarted} />
        <Stack.Screen options={{ headerShown: false }} name='CreateAirline' component={CreateAirline } />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}