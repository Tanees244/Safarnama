import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image,  Pressable, Platform, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker;
import ActiveTicket from './ActiveTicket';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AirlineDashboard = () => {
  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.9;
  const containerWidth = screenWidth * 0.9;

  const navigation = useNavigation();

  const [flightNumber, setFlightNumber] = useState('');
  const [price, setPrice] = useState('');
  const [calculatedDuration, setCalculatedDuration] = useState('');
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [showPicker1, setShowPicker1] = useState(false); // State to control the visibility of DateTimePicker
  const [dateSelect1, setDateSelect1] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [showPicker2, setShowPicker2] = useState(false); // State to control the visibility of Arrival Date DatePicker
  const [dateSelect2, setDateSelect2] = useState('');
  const [flightType, setFlightType] = useState('');
  const [activeTickets, setActiveTickets] = useState([]);
  
  const [showPicker3, setShowPicker3] = useState(false); // State to control the visibility of Departure Time TimePicker
  const [showPicker4, setShowPicker4] = useState(false); // State to control the visibility of Arrival Time TimePicker
  const [timeSelect1, setTimeSelect1] = useState('');
  const [timeSelect2, setTimeSelect2] = useState('');

  const cityOptions = ['Karachi', 'Lahore', 'Quetta']; // Options for the city dropdown
  const seatTypes = ['Economy', 'Business', 'First-Class']; 
  const toCity = ['Islamabad'];

  const [isAddTicketModalVisible, setAddTicketModalVisible] = useState(false);

  const ProfileNavigate = () => {
    navigation.navigate('AirlineProfile');
  }

  const toggleAddTicketModal = () => {
    setAddTicketModalVisible(!isAddTicketModalVisible);
  };

  const updateTicket = (ticketIndex, updatedTicket) => {
    const updatedTickets = [...activeTickets];
    updatedTickets[ticketIndex] = updatedTicket;
    setActiveTickets(updatedTickets);
  };
  
  const deleteTicket = (ticketIndex) => {
    const updatedTickets = activeTickets.filter((ticket, index) => index !== ticketIndex);
    setActiveTickets(updatedTickets);
  };

  const toggleDatepicker1 = () => {
    setShowPicker1(!showPicker1);
  };

  const onChange1 = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDepartureDate(currentDate); // Set the selected date to the state
      if (Platform.OS === 'android') {
        toggleDatepicker1();
        setDateSelect1(currentDate.toDateString());
      }
    } else {
      toggleDatepicker1();
    }
  };

  const showDatePicker = () => {
    return (
      <DateTimePicker
        mode="date"
        display="compact"
        value={departureDate || new Date()} // Use departureDate if available, otherwise set to current date
        onChange={onChange1}
      />
    );
  };

  const toggleTimepicker1 = () => {
    setShowPicker3(!showPicker3);
  };

  const toggleTimepicker2 = () => {
    setShowPicker4(!showPicker4);
  };

  const onTimeChange1 = (event, selectedTime) => {
    if (selectedTime) {
      const currentTime = selectedTime;
      setDepartureTime(currentTime);
      if (Platform.OS === 'android') {
        toggleTimepicker1();
        setTimeSelect1(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimepicker1();
    }
  };

  const onTimeChange2 = (event, selectedTime) => {
    if (selectedTime) {
      const currentTime = selectedTime;
      setArrivalTime(currentTime);
      if (Platform.OS === 'android') {
        toggleTimepicker2();
        setTimeSelect2(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimepicker2();
    }
  };

  const showTimePicker1 = () => {
    return (
      <DateTimePicker
        mode="time"
        display="clock"
        value={departureTime || new Date()} // Use departureTime if available, otherwise set to current time
        onChange={onTimeChange1}
      />
    );
  };

  const showTimePicker2 = () => {
    return (
      <DateTimePicker
        mode="time"
        display="clock"
        value={arrivalTime || new Date()} // Use arrivalTime if available, otherwise set to current time
        onChange={onTimeChange2}
      />
    );
  };


  useEffect(() => {
    calculateFlightDuration();
  }, [departureTime, arrivalTime]);

  const calculateFlightDuration = () => {
    if (departureDate && arrivalDate && departureTime && arrivalTime) {
      const departureDateTime = new Date(departureDate);
      departureDateTime.setHours(departureTime.getHours());
      departureDateTime.setMinutes(departureTime.getMinutes());
  
      const arrivalDateTime = new Date(arrivalDate);
      arrivalDateTime.setHours(arrivalTime.getHours());
      arrivalDateTime.setMinutes(arrivalTime.getMinutes());
  
      const durationInMillis = arrivalDateTime.getTime() - departureDateTime.getTime();
      if (durationInMillis > 0) {
        const durationInMinutes = Math.floor(durationInMillis / (1000 * 60)); // Convert milliseconds to minutes
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedDuration = `${hours}h ${minutes}min`;
        setCalculatedDuration(formattedDuration);
      } else {
        setCalculatedDuration('Invalid date or time'); // Handle invalid input
      }
    } else {
      setCalculatedDuration(''); // Reset the duration if any required field is missing
    }
  };  

  useEffect(() => {
    calculateFlightDuration();
  }, [departureTime, arrivalTime]);

  const handleFormSubmit = async () => {
    toggleAddTicketModal();
    const newTicket = {
      departureCity,
      flightType,
      flightNumber,
      price,
      departureDate,
      arrivalDate,
      arrivalCity,
      arrivalTime,
      departureTime,
      calculatedDuration,
    };
    // Update state with the new ticket
    setActiveTickets([...activeTickets, newTicket]);

    // Add the ticket to the airline_packages API
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://192.168.100.12:8000/api/VendorsRoutes/airline_packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newTicket),
      });
      if (response.ok) {
        // Handle success
        console.log("Ticket added successfully");
      } else {
        // Handle error
        console.error("Failed to add ticket:", response.status);
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const [user, setUser] = useState(null);
  const [airlinePackages, setAirlinePackages] = useState([]);

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
      console.log("Bearer token:", token);

      const response = await fetch(
        "http://192.168.100.12:8000/api/VendorsRoutes/airline-details/",
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
      const response = await fetch("http://192.168.100.12:8000/api/VendorsRoutes/get_airline_packages", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAirlinePackages(data);
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
            <TouchableOpacity onPress={toggleAddTicketModal} style={styles.AddTicketButton}>
                <Text style={styles.AddTicketButtonText}>Add Tickets</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.activeTicketsContainer}>
          {airlinePackages.map((ticket, index) => (
            <ActiveTicket
              key={index}
              ticketDetails={ticket}
              ticketNumber={1}
              onUpdateTicket={(updatedTicket) => updateTicket(index, updatedTicket)}
              onDeleteTicket={() => deleteTicket(index)}
            />
          ))}
        </ScrollView>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddTicketModalVisible}
        onRequestClose={toggleAddTicketModal}
      >
        
        <View style={styles.modalContent}>
          <Text style={styles.PopupHeading}>Add Tickets</Text>
          <TouchableOpacity onPress={toggleAddTicketModal} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.modalcontainer}>
          <View style={styles.input}>
            <Dropdown
              options={cityOptions}
              defaultValue="Select Departure City"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, departureCity) => setDepartureCity(departureCity)}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>
          <View style={styles.input}>
            <Dropdown
              options={toCity}
              defaultValue="Select Arrival City"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, arrivalCity) => setArrivalCity(arrivalCity)}
              dropdownTextStyle={styles.CustomDropdownText}
            />
          </View>
          <View style={styles.input}>
            <Dropdown
              options={seatTypes}
              defaultValue="Select Seat Type"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, flightType) => setFlightType(flightType)}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Flight Number"
            value={flightNumber}
            onChangeText={(text) => setFlightNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
          />
          <View style={ styles.input}>
            {showPicker1 && showDatePicker()} 
            {!showPicker1 && (
              <Pressable onPress={toggleDatepicker1}>
                <TextInput
                  style={styles.DropdownText}
                  placeholder="Departure Date "
                  value={dateSelect1}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.input}>
            {showPicker3 && showTimePicker1()}
            {!showPicker3 && (
              <Pressable onPress={toggleTimepicker1}>
                <TextInput
                  style={styles.DropdownText}
                  placeholder="Departure Time"
                  value={timeSelect1}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.input}>
            {showPicker2 && (
              <DateTimePicker
                mode="date"
                display="compact"
                value={arrivalDate || new Date()} // Use arrivalDate if available, otherwise set to current date
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setArrivalDate(selectedDate);
                    if (Platform.OS === 'android') {
                      setShowPicker2(false);
                      setDateSelect2(selectedDate.toDateString());
                    }
                  } else {
                    setShowPicker2(false);
                  }
                }}
              />
            )}
            {!showPicker2 && (
              <Pressable onPress={() => setShowPicker2(true)}>
                <TextInput
                  style={styles.DropdownText}
                  placeholder="Arrival Date"
                  value={dateSelect2}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.input}>
            {showPicker4 && showTimePicker2()}
            {!showPicker4 && (
              <Pressable onPress={toggleTimepicker2}>
                <TextInput
                  style={styles.DropdownText}
                  placeholder="Arrival Time"
                  value={timeSelect2}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Flight Duration (in minutes)"
            value={calculatedDuration}
            keyboardType='numeric'
          />
          <TouchableOpacity onPress={handleFormSubmit} style={styles.AddTicketButton}>
            <Text style={styles.AddTicketButtonText}>Submit</Text>
          </TouchableOpacity>
          </ScrollView>
          

        </View>
        
      </Modal>
      

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


});

export default AirlineDashboard;