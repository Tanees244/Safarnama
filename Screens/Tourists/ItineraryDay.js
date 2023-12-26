import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const getRandomValue = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const ItineraryDay = ({ dayData }) => {
  const { day, destination, hotel } = dayData;

  const [activeSection, setActiveSection] = useState('Itinerary');

  const randomTime = ['Morning', 'Afternoon', 'Evening'];
  const randomActivity = getRandomValue(['Explore Karimabad and Baltit Fort', 'Hike to Rakaposhi Base Camp', 'Visit Attabad Lake']);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day {day}</Text>
      <View style={styles.DayDetails}>
        <View style={styles.destination}>
          <Text style={styles.subtitle}>{destination}</Text>
        </View>
        <View style={styles.hotel}>
          <Text style={styles.subtitle}>{hotel}</Text>
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
              <Image source={require('../../assets/ellipse.png')}style={styles.GuidePic} />
              <View style={styles.GuideDetails}>
                <Text style={styles.subtitle}>Guide Name</Text>
                <Text style={styles.GuideText}>Contact Number</Text>
              </View>
          </View>
        )}
        {activeSection === 'Transport' && (
          <View style={styles.GuideContainer}>
            <Image source={require('../../assets/ellipse.png')}style={styles.GuidePic} />
            <View style={styles.GuideDetails}>
              <Text style={styles.subtitle}>Car Name</Text>
              <Text style={styles.GuideText}>Driver's Name</Text>
              <Text style={styles.GuideText}>Driver's Contact Number</Text>
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
   
  },
});

export default ItineraryDay;
