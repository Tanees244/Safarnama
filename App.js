import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './Screens/Homescreen';
import Login from "./Screens/Login";
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
import HotelRegister from './Screens/Hotel/HotelRegister';
import HotelProfile from './Screens/Hotel/HotelProfile';
import AirlineProfile from './Screens/Airline/AirlineProfile';
import BusProfile from './Screens/Bus/BusProfile';
import AdminDashboard from './Screens/Admin/AdminDashboard';
import HotelsLists from './Screens/Tourists/HotelsLists';
import HotelsInfo from './Screens/Tourists/HotelsInfo';
import CreateHotel from './Screens/Hotel/CreateHotel';
import HotelVendorPersonalDetails from './Screens/Hotel/HotelVendorPersonalDetails'
import HotelDashboard from './Screens/Hotel/HotelDashboard'
import GetStarted from './Screens/CreatePackage/GetStarted';
import CreatePackage from './Screens/Tourists/CreatePackage';
import CreatePackage2 from './Screens/Tourists/CreatePackage2';
import CreatePackage3 from './Screens/Tourists/CreatePackage3';
import Flight from './Screens/Tourists/Flight';
import Train from './Screens/Tourists/Train';
import Bus from './Screens/Tourists/Bus';
import PlacesInfo from './Screens/Tourists/PlacesInfo';
import PlaceLists from './Screens/Tourists/PlaceLists';
import TouristProfile from './Screens/Tourists/TouristProfile';
import RegisterA from './Screens/Airline/RegisterA';
import RegisterT from './Screens/Train/RegisterT';
import RegisterB from './Screens/Bus/RegisterB';
import GuideRegister from './Screens/Guide/GuideRegister';
import TrainDashboard from './Screens/Train/TrainDashboard';
import BusDashboard from './Screens/Bus/BusDashboard';
import TrainDetails from './Screens/Train/TrainDetails';
import TrainProfile from './Screens/Train/TrainProfile';
import BusDetails from './Screens/Bus/BusDetails';
import AirlineDetails from './Screens/Airline/AirlineDetails';
import TouristRegister from './Screens/Tourists/TouristRegister';
import TouristPersonalDetail from './Screens/Tourists/TouristPersonalDetail';
import ActiveTicket from './Screens/Airline/ActiveTicket';
import ActiveTicketB from './Screens/Bus/ActiveTicketB';
import ActiveTicketT from './Screens/Train/ActiveTicketT';
import PaymentGateway from './Screens/Tourists/PaymentGateway';
import HotelsInfoPackage from './Screens/Tourists/HotelsInfoPackage';
import Option from './Screens/Tourists/option';
import Itinerary from './Screens/Tourists/Itinerary';
import ItineraryDay from './Screens/Tourists/ItineraryDay';
import GuideApplication from './Screens/Admin/GuideApplication';
import VendorApplication from './Screens/Admin/VendorApplication';
import TouristDetail from './Screens/Admin/TouristDetail.js';
import GuideDetail from './Screens/Admin/GuideDetail.js';
import VendorDetail from './Screens/Admin/VendorDetail';
import Packages from './Screens/Tourists/package.js';
import HotelsListsPackage from './Screens/Tourists/HotelsListsPackage.js';
import Plantrip from './Screens/Tourists/Plantrip.js';
import LoadingScreen from './Screens/Tourists/LoadingScreen.js';
import Details from './Screens/Tourists/Details.js';

import { useFonts } from 'expo-font';

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
        <Stack.Screen options={{ headerShown: false }} name='HotelRegister' component={HotelRegister} />
        <Stack.Screen options={{ headerShown: false }} name='HotelProfile' component={HotelProfile} />
        <Stack.Screen options={{ headerShown: false }} name='AirlineProfile' component={AirlineProfile} />
        <Stack.Screen options={{ headerShown: false }} name='BusProfile' component={BusProfile} />
        <Stack.Screen options={{ headerShown: false }} name='AdminDashboard' component={AdminDashboard} />
        <Stack.Screen options={{ headerShown: false }} name='GuideApplication' component={GuideApplication} />
        <Stack.Screen options={{ headerShown: false }} name='VendorApplication' component={VendorApplication} />
        <Stack.Screen options={{ headerShown: false }} name='TouristDetail' component={TouristDetail} />
        <Stack.Screen options={{ headerShown: false }} name='VendorDetail' component={VendorDetail} />
        <Stack.Screen options={{ headerShown: false }} name='GuideDetail' component={GuideDetail} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsLists' component={HotelsLists} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsInfo' component={HotelsInfo} />
        <Stack.Screen options={{ headerShown: false }} name='CreateHotel' component={CreateHotel} />
        <Stack.Screen options={{ headerShown: false }} name='HotelDashboard' component={HotelDashboard} />
        <Stack.Screen options={{ headerShown: false }} name='HotelVendorPersonalDetails' component={HotelVendorPersonalDetails} />
        <Stack.Screen options={{ headerShown: false }} name='GetStarted' component={GetStarted} />
        <Stack.Screen options={{ headerShown: false }} name='CreatePackage' component={CreatePackage } />
        <Stack.Screen options={{ headerShown: false }} name='CreatePackage2' component={CreatePackage2 } />
        <Stack.Screen options={{ headerShown: false }} name='CreatePackage3' component={CreatePackage3 } />
        <Stack.Screen options={{ headerShown: false }} name='Flight' component={Flight } />
        <Stack.Screen options={{ headerShown: false }} name='Train' component={Train } />
        <Stack.Screen options={{ headerShown: false }} name='Bus' component={Bus } />
        <Stack.Screen options={{ headerShown: false }} name='PlacesInfo' component={PlacesInfo } />
        <Stack.Screen options={{ headerShown: false }} name='PlaceLists' component={PlaceLists } />
        <Stack.Screen options={{ headerShown: false }} name='TouristProfile' component={TouristProfile } />
        <Stack.Screen options={{ headerShown: false }} name='TouristRegister' component={TouristRegister } />
        <Stack.Screen options={{ headerShown: false }} name='RegisterA' component={RegisterA } />
        <Stack.Screen options={{ headerShown: false }} name='RegisterT' component={RegisterT } />
        <Stack.Screen options={{ headerShown: false }} name='RegisterB' component={RegisterB } />
        <Stack.Screen options={{ headerShown: false }} name='TrainDashboard' component={TrainDashboard } />
        <Stack.Screen options={{ headerShown: false }} name='BusDashboard' component={BusDashboard } />
        <Stack.Screen options={{ headerShown: false }} name='TrainDetails' component={TrainDetails } />
        <Stack.Screen options={{ headerShown: false }} name='BusDetails' component={BusDetails } />
        <Stack.Screen options={{ headerShown: false }} name='AirlineDetails' component={AirlineDetails } />
        <Stack.Screen options={{ headerShown: false }} name='GuideRegister' component={GuideRegister} />
        <Stack.Screen options={{ headerShown: false }} name='TouristPersonalDetail' component={TouristPersonalDetail} />
        <Stack.Screen options={{ headerShown: false }} name='ActiveTicket' component={ActiveTicket} />
        <Stack.Screen options={{ headerShown: false }} name='ActiveTicketB' component={ActiveTicketB} />
        <Stack.Screen options={{ headerShown: false }} name='ActiveTicketT' component={ActiveTicketT} />
        <Stack.Screen options={{ headerShown: false }} name='PaymentGateway' component={PaymentGateway} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsInfoPackage' component={HotelsInfoPackage} />
        <Stack.Screen options={{ headerShown: false }} name='HotelsListsPackage' component={HotelsListsPackage} />
        <Stack.Screen options={{ headerShown: false }} name='Option' component={Option} />
        <Stack.Screen options={{ headerShown: false }} name='TrainProfile' component={TrainProfile} />
        <Stack.Screen options={{ headerShown: false }} name='Itinerary' component={Itinerary} />
        <Stack.Screen options={{ headerShown: false }} name='ItineraryDay' component={ItineraryDay} />
        <Stack.Screen options={{ headerShown: false }} name='Packages' component={Packages} />
        <Stack.Screen options={{ headerShown: false }} name='Plantrip' component={Plantrip} />
        <Stack.Screen options={{ headerShown: false }} name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Details' component={Details} />
        

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
