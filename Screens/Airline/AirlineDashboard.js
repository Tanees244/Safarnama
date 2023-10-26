import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';

const AirlineDashboard = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;
    const RegisterContainer = containerWidth * 0.7;
    const inputWidth = containerWidth * 0.9;
    
    const navigation = useNavigation();
    
    const [text, setText] = useState('');
    const textInputRef = useRef(null);
    const [isAddTicketModalVisible, setAddTicketModalVisible] = useState(false);
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [FlightNumber,setFlightNumber] = useState('');
    const [price, setPrice] = useState('');
    const [seatType, setSeatType] = useState('Select Ticket Type'); // Initialize with null
    const seatTypes = ['Economy', 'Business', 'First-Class']; 
    const [submittedData, setSubmittedData] = useState([]);
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);


    const toggleAddTicketModal = () => {
    setAddTicketModalVisible(!isAddTicketModalVisible);
    };

    const handleFromCityChange = (value) => {
        setFromCity(value);
        checkSubmitButtonState();
    };
    
    const handleToCityChange = (value) => {
        setToCity(value);
        checkSubmitButtonState();
    };
    
    const handlePriceChange = (value) => {
        setPrice(value);
        checkSubmitButtonState();
    };
    
    const handleSeatTypeChange = (value) => {
        setSeatType(value);
        checkSubmitButtonState();
    };

    const handleFlightNumberChange = (value) => {
      setFlightNumber(value);
      checkSubmitButtonState();
    };

    const checkSubmitButtonState = () => {
      if (fromCity && toCity && FlightNumber && price && seatType !== 'Select Ticket Type') {
        setIsSubmitButtonEnabled(true); // Enable the button when all fields are filled
      } else {
        setIsSubmitButtonEnabled(false); // Disable the button if any field is empty
      }
    };
    
    const handleSubmission = () => {
      if (fromCity && toCity && FlightNumber && price && seatType !== 'Select Ticket Type') {
        const newTicket = {
          fromCity,
          toCity,
          FlightNumber,
          price,
          seatType,
        };
    
        setSubmittedData([...submittedData, newTicket]);
        setIsSubmitButtonEnabled(false); // Disable the button after submission
        toggleAddTicketModal();
      }
    };
    

  

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
            <Image source={require('../../assets/ellipse.png')}/>
          <Text style={styles.Text}>
            Welcome <Text style={[styles.Text, { color: 'white' }]}>Vendor</Text>
          </Text>
        </View>
        <View style={styles.PackageContainer}>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity onPress={toggleAddTicketModal} style={styles.AddTicketButton}>
                <Text style={styles.AddTicketButtonText}>Add Tickets</Text>
            </TouchableOpacity>
            <Text style={styles.PackageHeading}>Active Tickets</Text>
              {submittedData.map((ticket, index) => (
                <View key={index} style={styles.ActiveTicketItem}>
                  <Text>From: {ticket.fromCity}</Text>
                  <Text>To: {ticket.toCity}</Text>
                  <Text>Flight Number: {ticket.FlightNumber}</Text>
                  <Text>Price: {ticket.price}</Text>
                  <Text>Seat Type: {ticket.seatType}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isAddTicketModalVisible}>
        <View style={styles.modalContent}>
            <Text style={styles.PopupHeading}>Add Ticket</Text>
            <TextInput
            placeholder="From City"
            value={fromCity}
            onChangeText={handleFromCityChange}
            style={styles.input}
            />
            <TextInput
            placeholder="To City"
            value={toCity}
            onChangeText={handleToCityChange}
            style={styles.input}
            />
            <TextInput
            placeholder="Flight Number"
            value={FlightNumber}
            onChangeText={handleFlightNumberChange}
            style={styles.input}
            />
            <TextInput
            placeholder="Price"
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            style={styles.input}
            />
            <View style={styles.input}>
              <Dropdown
                options={seatTypes}
                defaultValue={seatType}
                textStyle={styles.DropdownText}
                dropdownStyle={styles.DropdownContainer}
                onSelect={handleSeatTypeChange}
                dropdownTextStyle={styles.CustomDropdownText}
                dropdownPosition={0}
                dropdownOffset={{ top: 0, left: 10 }}
              />
            </View>
            <TouchableOpacity onPress={handleSubmission} style={styles.AddTicketButton} disabled={!isSubmitButtonEnabled}>
              <Text style={styles.AddTicketButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Container: {
    backgroundColor: '#e9eaec',
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  RegisterContainer: {
    backgroundColor: '#272a3e',
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 30,
    marginBottom: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  ButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
  },
  PackageContainer:{
    backgroundColor: '#262a3e',
    marginTop: 20,
    borderRadius: 20,
    width: '90%',
  },
  AddTicketButton: {
    backgroundColor: '#54aaec',
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
    color: 'black',
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    padding: 20,
    paddingBottom: 40,
  },
  input: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
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
    backgroundColor: '#b6daf7',
    borderRadius: 15,
    width: 320,
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
});

export default AirlineDashboard;
