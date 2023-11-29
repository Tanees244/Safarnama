import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image,  Pressable, Platform, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker;
import ActiveTicket from './ActiveTicket';

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

  const handleFormSubmit = () => {
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
    setActiveTickets([...activeTickets, newTicket]);

  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
      <Svg height="500%" width="500%" style={styles.backgroundEllipse1}>
        <Ellipse cx="2%" cy="43%" rx="140" ry="140" fill="#1B1B1E" />
      </Svg>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextHello}>Hello !</Text>
          <Text style={[ { color: 'white', fontFamily: 'Poppins-Bold', fontSize: 22 }]}>Serene Airline</Text>
        </View>
        <Image source={require('../../assets/serene.png')} style={styles.headerImage} />
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
          {activeTickets.map((ticket, index) => (
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
    marginTop : 20,
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
  },
  ButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
  },
  ProfileButton:{
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
  PackageContainer:{
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
    height: Dimensions.get('window'). height *0.8,
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
  PackageHeading:{
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
    paddingTop: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  activeTicketsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default AirlineDashboard;