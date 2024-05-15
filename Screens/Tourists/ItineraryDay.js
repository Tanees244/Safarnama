import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getRandomValue = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const ItineraryDay = ({ dayWiseData }) => {

  const [activeSection, setActiveSection] = useState('Itinerary');
  const [dayData, setDayData] = useState({});
  const randomTime = ['Morning', 'Afternoon', 'Evening'];
  const randomActivity = getRandomValue(['Explore Karimabad and Baltit Fort', 'Hike to Rakaposhi Base Camp', 'Visit Attabad Lake']);

  console.log(dayWiseData);

  useEffect(() => {
    AsyncStorage.getItem("authToken")
      .then((token) => {
        console.log("Token retrieved from AsyncStorage:", token);
        if (token) {
          fetchData(token);
        } else {
          console.log("Token not found. Redirecting to login...");
          Alert.alert(
            "Sign In Required",
            "Please sign in to view your profile.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Sign In", onPress: () => navigation.navigate("Login") },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.error("Error retrieving token:", error);
      });
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch('http://192.168.100.12:8000/api/routes/Itinerary', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDayData(data);
        console.log(data);
      } else {
        console.error('Failed to fetch data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day {dayWiseData?.hotelBookingDetails[0]?.day}</Text>
      <View style={styles.DayDetails}>
        <View style={styles.destination}>
          <Text style={styles.subtitle}>{dayWiseData?.hotelDetails[0]?.area}</Text>
        </View>
        <View style={styles.hotel}>
          <Text style={styles.subtitle}>{dayWiseData?.hotelDetails[0]?.name}</Text>
        </View>
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => handleSectionChange('Itinerary')}>
          <Text style={[styles.sectionText, activeSection === 'Itinerary' && styles.activeSection]}>Itinerary</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('Guide')}>
          <Text style={[styles.sectionText, activeSection === 'Guide' && styles.activeSection]}>Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('Transport')}>
          <Text style={[styles.sectionText, activeSection === 'Transport' && styles.activeSection]}>Transport</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View>
        {activeSection === 'Itinerary' && (
          <>
          <View style={styles.Itinerary}>
            <View style={styles.DayItem}>
              <Text style={styles.detailTime}>{randomTime[0]}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
            </View>
            <View style={styles.DayItem}>
              <Text style={styles.detailTime}>{randomTime[1]}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
            </View>
            <View style={styles.DayItem}>
              <Text style={styles.detailTime}>{randomTime[2]}</Text>
              <Text style={styles.detailActivity}>• {randomActivity}</Text>
            </View>
          </View>
          </>
        )}
        {activeSection === 'Guide' && (
          <View style={styles.GuideContainer}>
              <Image source={{uri: `data:image/jpeg;base64,${dayData?.guideDetails?.picture}`}} style={styles.GuidePic} />
              <View style={styles.GuideDetails}>
                <Text style={styles.subtitle}>{dayData?.guideDetails?.name}</Text>
                <Text style={styles.GuideText}>{dayData?.guideDetails?.contact_number}</Text>
              </View>
          </View>
        )}
        {activeSection === 'Transport' && (
          <View style={styles.GuideContainer}>
            <Image  source={{ uri: `data:image/jpeg;base64,${dayData?.guideDetails?.Picture}` }} style={styles.GuidePic} />
            <View style={styles.GuideDetails}>
              <Text style={styles.subtitle}>{dayData?.carRentalDetails?.car_name}</Text>
              <Text style={styles.GuideText}>{dayData?.carRentalDetails?.driver_name}</Text>
              <Text style={styles.GuideText}>{dayData?.carRentalDetails?.contact_number}</Text>
            </View>
        </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#333',
  },
  activeSection: {
    fontFamily: 'Poppins-SemiBold',
    borderBottomWidth: 4,
    borderBottomColor: '#0B6180', // Change this color as needed
  },
  title:{
    fontFamily: 'Poppins-Bold',
    fontSize: 42,
  },
  DayDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destination:{
    width: '45%',
    backgroundColor: '#E0C29D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  hotel:{
    width: '45%',
    backgroundColor: '#AB7E56',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  Itinerary:{
    padding: 20,
  },
  detailTime: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 5,
  },
  detailActivity:{
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  DayItem:{
    marginBottom: 35,
  },
  GuideContainer:{
    backgroundColor: '#A4A68A',
    paddingVertical: 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  GuideText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  GuideDetails:{
   alignContent: "center",
  },
  GuidePic: {
    height: 200,
    width: 280,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 20,
  },
});

export default ItineraryDay;
