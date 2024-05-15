import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import ItineraryDay from './ItineraryDay';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Itinerary = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  const [dayWiseData, setDayWiseData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

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
        setDayWiseData(organizeDataByDays(data));
        return data;
      } else {
        console.error('Failed to fetch data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const organizeDataByDays = (data) => {
    const dayWise = {};
    data.hotelBookingDetails.forEach((booking) => {
      const day = booking.day;
      if (!dayWise[day]) {
        dayWise[day] = {
          hotelBookingDetails: [],
          hotelDetails: [],
        };
      }
      const hotelBooking = data.hotelDetails.find(
        (hotel) => hotel.hotel_booking_id === booking.hotel_booking_id
      );
      dayWise[day].hotelBookingDetails.push(booking);
      dayWise[day].hotelDetails.push(hotelBooking);
    });
    return dayWise;
  };

  const toggleModal = (dayData) => {
    setSelectedDayData(dayData);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width={screenWidth} style={styles.backgroundEllipse}>
        <Ellipse cx="-10%" cy="20%" rx={screenWidth} ry={screenWidth} fill="#071B2E" />
      </Svg>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Safarnama</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Tour Itinerary</Text>
          {Object.keys(dayWiseData).map((day, index) => (
            <View
              key={index}
              style={[
                styles.card,
                { width: containerWidth },
                index % 2 === 0 ? styles.leftCard : styles.rightCard,
              ]}
            >
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Day {day}</Text>
                {dayWiseData[day].hotelBookingDetails.map((booking, i) => (
                  <TouchableOpacity key={i} onPress={() => toggleModal(dayWiseData[day])}>
                    <Text style={styles.readMore}>Hotel : {dayWiseData[day].hotelDetails[i].name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal isVisible={isModalVisible} style={styles.modalContent}>
          <ItineraryDay dayWiseData={selectedDayData} />
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeModal}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EEEB',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#153647',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
  },
  backgroundEllipse: {
    position: 'absolute',
    zIndex: -1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    padding: 20,
  },
  card: {
    backgroundColor: '#E1E9F0',
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftCard: {
    marginRight: 'auto',
  },
  rightCard: {
    marginLeft: 'auto',
  },
  cardImage: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2E3B40',
  },
  cardSubtitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  readMore: {
    color: 'grey',
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    alignItems: 'center',
    borderRadius: 20,
  },
  modalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 15,
  },
  closeModal: {
    color: '#4391F3',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Itinerary;
