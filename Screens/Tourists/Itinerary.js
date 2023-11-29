// Itinerary.js
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ItineraryDay from './ItineraryDay';

const generateRandomData = () => {
  // Function to generate random data for each day
  const getRandomData = () => ({
    time: `${Math.floor(Math.random() * 12) + 8}:00 ${Math.random() < 0.5 ? 'AM' : 'PM'}`,
    place: `Visit Place ${Math.floor(Math.random() * 10) + 1}`,
    transport: ['Car', 'Bus', 'Walk', 'Taxi'][Math.floor(Math.random() * 4)],
    activity: ['Sightseeing', 'Lunch', 'Cultural Exploration', 'Dinner with a View'][
      Math.floor(Math.random() * 4)
    ],
  });

  const numberOfDays = 10;
  const data = Array.from({ length: numberOfDays }, (_, index) => ({
    day: index + 1,
    itineraryData: Array.from({ length: 4 }, () => getRandomData()),
  }));

  return data;
};

const Itinerary = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const itineraryData = generateRandomData();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <View style={styles.header1}>
        <Text style={styles.headerText1}>ITINERARY</Text>
      </View>
      <View style={styles.itinerarycontainer}>
        {/* Toggle button to show/hide sidebar */}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
          <Text style={styles.toggleButtonText}>{showSidebar ? '<' : '>'}</Text>
        </TouchableOpacity>

        {/* Sidebar */}
        <View style={[styles.sidebar, { display: showSidebar ? 'flex' : 'none' }]}>
          {itineraryData.map((dayData) => (
            <TouchableOpacity
              key={dayData.day}
              style={[styles.dayButton, selectedDay === dayData.day && styles.selectedDayButton]}
              onPress={() => setSelectedDay(dayData.day)}
            >
              <Text style={styles.dayButtonText}>Day {dayData.day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main content */}
        <ScrollView style={styles.content}>
          <ItineraryDay day={selectedDay} data={itineraryData[selectedDay - 1].itineraryData} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D6F4',
  },
  itinerarycontainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    top: 20,
    backgroundColor:'#D8D6F4',
  },
  sidebar: {
    width: 150,
    backgroundColor: '#2E3B4E',
    paddingTop: 20,
    alignItems: 'center',
  },
  toggleButton: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#092547',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 20,
    color: 'white',
  },
  dayButton: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  selectedDayButton: {
    backgroundColor: '#4A90E2',
  },
  dayButtonText: {
    fontSize: 12,
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D8D6F4',
  },
  header: {
    height: 120,
    backgroundColor: '#092547',
    shadowColor: 'black',
    elevation: 20,
    borderRadius: 40,
  },
  headerText: {
    textAlign: 'center',
    top: 50,
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  header1: {
    top: 20,
    height: 80,
    backgroundColor: '#092547',
    shadowColor: 'black',
    elevation: 50,
    borderRadius: 10,
    bottom: 50,
    width: '50%',
    left: 100,
  },
  headerText1: {
    textAlign: 'center',
    top: 20,
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
});

export default Itinerary;
