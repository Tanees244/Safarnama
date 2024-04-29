import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image,  Pressable, Platform, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HotelDashboard = () => {

  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.9;
  const containerWidth = screenWidth * 0.9;

  const navigation = useNavigation();

  const NavigatetoCreatehotel = () => {
    // Navigate to the login screen
    navigation.navigate('CreateHotel');
  };

  const ProfileNavigate = () => {
    navigation.navigate('HotelProfile');
  }

    const [user, setUser] = useState(null);
  const [BusPackages, setBusPackages] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("authToken")
      .then((token) => {
        console.log("Token retrieved from AsyncStorage:", token);
        if (token) {
          fetchUserProfile(token);
          fetchAirlinePackages(token);
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


  const fetchUserProfile = async (token) => {
    try {

      const response = await fetch(
        "http://192.168.100.12:8000/api/VendorsRoutes/bus-details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user profile", response.status);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  useEffect(() => {
    fetchAirlinePackages();
  }, []);

  const fetchAirlinePackages = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://192.168.100.12:8000/api/VendorsRoutes/get_bus_packages", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBusPackages(data);
      } else {
        console.error("Failed to fetch airline packages:", response.status);
      }
    } catch (error) {
      console.error("Error fetching airline packages:", error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes, seconds] = timeString.split(':');
    const arrivalDate = new Date();
    arrivalDate.setHours(hours);
    arrivalDate.setMinutes(minutes);
    arrivalDate.setSeconds(seconds);

    return arrivalDate.toLocaleTimeString();
  };

  const formatDuration = (durationString) => {
    if (!durationString) return "";
  
    const [month,day, hours] = durationString.split(':').map(Number);
  
    const formattedDuration = [];
      formattedDuration.push(`${hours} hr`);
  
    return formattedDuration.join(' ');
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
      <Svg height="500%" width="500%" style={styles.backgroundEllipse1}>
        <Ellipse cx="2%" cy="43%" rx="140" ry="140" fill="#1B1B1E" />
      </Svg>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextHello}>Hello !</Text>
          <Text style={[ { color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18 }]}>{user?.name}</Text>
        </View>
        <Image source={{ uri: `data:image/jpeg;base64,${user?.logo}` }} style={styles.headerImage} />
      </View>
      <TouchableOpacity
        onPress={ProfileNavigate}
        style={styles.ProfileButton}
      >
        <Image source={require('../../assets/account-circle-black.png')} style = {[{width: 40, height: 40}]}/>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.PackageContainer}>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity onPress={NavigatetoCreatehotel} style={styles.AddTicketButton}>
                <Text style={styles.AddTicketButtonText}>Add Hotel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.activeTicketsContainer}>

<View style={[styles.activeTicketContainer, { width: containerWidth }]}>

<Text style={[styles.ticketNumber, { backgroundColor: '#A5A5AA', width: '50%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 20, }]}>Ticket # </Text>

<View style={styles.flightInfoContainer}>
<Text style={styles.flightName}> hotel name</Text>
</View>
<View style={styles.flightInfoContainer}>
<Text style={styles.flightNumber}> hotel # </Text>
</View>



<View style={styles.CityContainer}>
<Text style={styles.ticketText}></Text>
<Image style={styles.flightImage} source={require('../../assets/whitebus.png')} />
<Text style={styles.ticketText}></Text>
</View>

<View style={styles.seatTypeContainer}>
<View style={
styles.seatTypeOption}>
<Text style={styles.seatTypeText}>Luxury</Text>
</View>

<View style={
styles.seatTypeOption}>
<Text style={styles.seatTypeText}>Business</Text>
</View>
<View style={
styles.seatTypeOption}>
<Text style={styles.seatTypeText}>Standard</Text>
</View>
</View>

<View style={styles.ticketInfoContainer}>
<View style={styles.ticketText}>
<View style={styles.Time}>
<View style={styles.DTime}>
  <Text style={styles.title2}>Departure Date</Text>
  <Text style={styles.ticketText2}>
   
  </Text>
  <Text style={styles.title2}>Departure Time : </Text>
  <Text style={styles.ticketText2}>
    
  </Text>
</View>
<View style={styles.ATime}>
  <Text style={styles.title2}>Arrival Date : </Text>
  <Text style={styles.ticketText2}>
    
  </Text>
  <Text style={styles.title2}>Arrival Time : </Text>
  <Text style={styles.ticketText2}>
   
  </Text>
</View>
</View>
<View style={styles.Duration}>
<View>
  <Text style={styles.title}>Price : </Text>
  <Text style={styles.ticketText}>PKR</Text>
</View>
<View>
  <Text style={styles.title}>Flight Duration:</Text>
  <Text style={styles.ticketText}>
 
  </Text>
</View>
</View>
</View>
</View>

<View style={styles.buttonContainer}>
  <TouchableOpacity  style={styles.editButton}>
      <Text style={[{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18,}]}>Edit</Text>
  </TouchableOpacity>
  <TouchableOpacity  style={styles.deleteButton}>
      <Text style={[{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18,}]}>Delete</Text>
  </TouchableOpacity>
</View>
</View>
</ScrollView>

      </ScrollView>

      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  modalcontainer: {
    flexGrow: 1,
    padding: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  Container: {
    backgroundColor: '#4F515A',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#319BD6',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
  activeTicketContainer: {
    backgroundColor: '#393646',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  ticketNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  flightInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#1B2430',
    padding: 20,
    marginBottom: 25,
  },
  flightNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',

  },
  flightName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  dottedLine: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    borderStyle: 'dashed',
    marginBottom: 30,
  },
  circle1: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#4F515A',
    position: 'absolute',
    top: -10,
    left: -30,
  },
  circle2: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#4F515A',
    position: 'absolute',
    top: -10,
    right: -30,
  },
  CityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flightImage: {
    width: 50,
    height: 50,
  },
  seatTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  seatTypeOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  seatTypeText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  selectedSeat: {
    backgroundColor: '#73777B',
  },
  Time: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  DTime: {
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 25,
    marginRight: 25,
    padding: 10,
  },
  ATime: {
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#73777B',
    fontSize: 16,
  },
  ticketTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  title2: {
    fontFamily: 'Poppins-Bold',
    color: '#73777B',
    fontSize: 10,
  },
  Duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  ticketText2: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketInfo: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  backgroundEllipse1: {
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    backgroundColor: 'black',
    shadowColor: 'white',
    elevation: 40,
    paddingHorizontal: 40,
    position: 'relative',
  },
  headerTextContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  headerTextHello: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  headerImage: {
    marginTop: 20,
    width: 100,
    height: 95,
    position:'relative',
    resizeMode: 'contain',
    
  },
  ButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
  },
  ProfileButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 90,
    height: 90,
    padding: 15,
    borderRadius: 35,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 2,
  },
  PackageContainer: {
    backgroundColor: '#D8D9DA',
    marginTop: 20,
    borderRadius: 20,
    width: '90%',
    zIndex: 1, // Set a zIndex for the PackageContainer lower than the header
    position: 'relative',
  },
  AddTicketButton: {
    backgroundColor: '#61677A',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  AddTicketButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  modalContent: {
    backgroundColor: '#404258',
    padding: 20,
    borderRadius: 10,
    height: Dimensions.get('window').height * 0.8,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  PopupHeading: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    padding: 20,
    paddingBottom: 30,
  },
  input: {
    backgroundColor: '#E9E8E8',
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 10,
  },
  DropdownText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 10,
  },
  DropdownContainer: {
    width: 280,
  },
  CustomDropdownText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
    color: 'black',
  },
  PackageHeading: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
    paddingTop: 20,
  },

  activeTicketsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },

  activeTicketContainer: {
    backgroundColor: '#393646',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  ticketNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  flightInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#1B2430',
    padding: 20,
    marginBottom: 25,
  },
  flightNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  flightName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'right',
  },
  dottedLine: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    borderStyle: 'dashed',
    marginBottom: 30,
  },
  circle1: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#4F515A',
    position: 'absolute',
    top: -10,
    left: -30,
  },
  circle2: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#4F515A',
    position: 'absolute',
    top: -10,
    right: -30,
  },
  CityContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flightImage:{
    width: 50,
    height: 50, 
 },
 seatTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  seatTypeOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  seatTypeText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  selectedSeat: {
    backgroundColor: '#73777B', 
  },
  Time:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  DTime:{
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 25,
    marginRight: 25,
    padding: 10,
  },
  ATime:{
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
  },
  title:{
    fontFamily: 'Poppins-Bold',
    color: '#73777B',
    fontSize: 16,
  },
  ticketTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  title2:{
    fontFamily: 'Poppins-Bold',
    color: '#73777B',
    fontSize: 10,
  },
  Duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  ticketText2: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketInfo: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#319BD6',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default HotelDashboard;