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
    
    const cityOptions = ['Karachi', 'Lahore', 'Quetta'];
    
    const [isAddTicketModalVisible, setAddTicketModalVisible] = useState(false);
    const [fromCity, setFromCity] = useState('');
    const toCity = 'Islamabad';
    const [FlightNumber,setFlightNumber] = useState('');
    const [price, setPrice] = useState('');
    const [seatType, setSeatType] = useState('Select Ticket Type'); 
    const seatTypes = ['Economy', 'Business', 'First-Class']; 
    const [submittedData, setSubmittedData] = useState([]);
    const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);
    const [departureDate, setDepartureDate] = useState('');
    const [flightDuration, setFlightDuration] = useState('');
    const [selectedCity, setSelectedCity] = useState('Select City');
    const [editTicketIndex, setEditTicketIndex] = useState(-1);
    const [isCityDropdownVisible, setCityDropdownVisible] = useState(false);

    const toggleCityDropdown = (visible) => {
      setCityDropdownVisible(visible);
    };
    
    const handleCitySelection = (city) => {
      setFromCity(city); // Assuming "fromCity" state is used to store the selected city
      toggleCityDropdown(false);
    };    

    const toggleAddTicketModal = () => {
    setAddTicketModalVisible(!isAddTicketModalVisible);
    };

    const handleEditTicket = (index) => {
      setEditTicketIndex(index);
      toggleAddTicketModal(); // Open the same modal used for adding tickets
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

    const handleDepartureDateChange = (value) => {
      setDepartureDate(value);
      checkSubmitButtonState();
    };
    
    const handleFlightDurationChange = (value) => {
      setFlightDuration(value);
      checkSubmitButtonState();
    };
    

    const checkSubmitButtonState = () => {
      if (
        fromCity &&
        toCity &&
        FlightNumber &&
        price &&
        seatType !== 'Select Ticket Type' &&
        departureDate &&
        flightDuration
      ) {
        setIsSubmitButtonEnabled(true); // Enable the button when all fields are filled
      } else {
        setIsSubmitButtonEnabled(false); // Disable the button if any field is empty
      }
    };
    
    
    const handleSubmission = () => {
      if (fromCity && toCity && FlightNumber && price && seatType && departureDate && flightDuration !== 'Select Ticket Type') {
        if (editTicketIndex >= 0) {
          // Editing an existing ticket
          const editedTicket = {
            fromCity,
            toCity,
            FlightNumber,
            price,
            seatType,
            departureDate,
            flightDuration,
          };
    
          const updatedData = [...submittedData];
          updatedData[editTicketIndex] = editedTicket;
    
          setSubmittedData(updatedData);
        } else {
          const newTicket = {
            fromCity,
            FlightNumber,
            price,
            seatType,
            departureDate,
            flightDuration,
          };
    
          setSubmittedData([...submittedData, newTicket]);
        }
    
        setIsSubmitButtonEnabled(false);
        toggleAddTicketModal();
      }
    };
    
    
    const handleCancelTicket = (index) => {
      // Create a copy of the submittedData array
      const updatedSubmittedData = [...submittedData];
      
      // Remove the ticket at the specified index
      updatedSubmittedData.splice(index, 1);
      
      // Update the state with the modified array
      setSubmittedData(updatedSubmittedData);
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
                  <Text>Flight Duration: {ticket.flightDuration}</Text>
                  <Text>Departure Date: {ticket.departureDate}</Text>

                  <TouchableOpacity onPress={() => handleEditTicket(index)} style={styles.editIconContainer}>
                    <Image style={styles.editIcon} source={require('../../assets/edit.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleCancelTicket(index)} style={styles.closeIconContainer}>
                    <Image style={styles.closeIcon} source={require('../../assets/deleteicon.png')} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isAddTicketModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.PopupHeading}>
            {editTicketIndex >= 0 ? 'Edit Ticket' : 'Add Ticket'}
          </Text>
          <View style={styles.input}>
          <Dropdown
            options={cityOptions}
            defaultValue='Select A City'
            textStyle={styles.DropdownText}
            dropdownStyle={styles.DropdownContainer}
            isVisible={isCityDropdownVisible}
            onClose={() => toggleCityDropdown(false)}
            onSelect={(index, city) => handleCitySelection(city)}
            dropdownTextStyle={styles.CustomDropdownText}
            dropdownPosition={0}
            dropdownOffset={{ top: 0, left: 0 }}
          />
          </View>
          <View style={styles.input}>
            <Text style={styles.DropdownText}>{toCity}</Text>
          </View>
            <TextInput
            placeholder="Flight Number"
            value={editTicketIndex >= 0 ? submittedData[editTicketIndex]?.FlightNumber : FlightNumber}
            onChangeText={(value) => handleFlightNumberChange(value, editTicketIndex)}
            style={styles.input}
            />
            <TextInput
            placeholder="Price"
            value={editTicketIndex >= 0 ? submittedData[editTicketIndex]?.price : price}
            onChangeText={(value) => handlePriceChange(value, editTicketIndex)}
            keyboardType="numeric"
            style={styles.input}
            />
            <TextInput
              placeholder="Departure Date"
              value={editTicketIndex >= 0 ? submittedData[editTicketIndex]?.departureDate : departureDate}
              onChangeText={(value) => handleDepartureDateChange(value, editTicketIndex)}
              style={styles.input}
            />
            <TextInput
              placeholder="Flight Duration"
              value={editTicketIndex >= 0 ? submittedData[editTicketIndex]?.flightDuration : flightDuration}
              onChangeText={(value) => handleFlightDurationChange(value, editTicketIndex)}
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
            <TouchableOpacity onPress={toggleAddTicketModal} style={styles.closeIconContainer}>
              <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmission}
              style={[
                styles.AddTicketButton,
                {
                  backgroundColor: isSubmitButtonEnabled ? '#54aaec' : 'grey',
                },
              ]}
              disabled={!isSubmitButtonEnabled}
            >
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
    backgroundColor: '#b6daf7',
    borderRadius: 15,
    width: 260,
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
  editIconContainer:{

  },
  ActiveTicketItem:{
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
});

export default AirlineDashboard;
