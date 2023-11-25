import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker;
import Dropdown from 'react-native-modal-dropdown';

const ActiveTicket = ({ ticketDetails: initialTicketDetails, ticketNumber, onUpdateTicket, onDeleteTicket }) => {
    
    const [ticketDetails, setTicketDetails] = useState({ ...initialTicketDetails });
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedTicket, setEditedTicket] = useState({ ...initialTicketDetails });
    const [showPicker, setShowPicker] = useState(false);
    const [dateSelect, setDateSelect] = useState('');
    const [seatType, setSeatType] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;

    const cityOptions = ['Karachi', 'Lahore', 'Quetta']; // Options for the city dropdown
    const seatTypes = ['Economy', 'Business', 'First-Class']; 

    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        return `${hours}h ${minutes}min`;
      };
      
      // Function to handle setting the flight duration in the edit modal
      const handleFlightDuration = (text) => {
        // Clear the flight duration if the input is empty
        if (text === '') {
          setEditedTicket({ ...editedTicket, flightDuration: '' });
          return;
        }
      
        // Ensure the input is numeric
        const duration = parseInt(text);
      
        if (!isNaN(duration)) {
          const formattedDuration = formatDuration(duration);
          setEditedTicket({ ...editedTicket, flightDuration: formattedDuration });
        }
      };
  
    useEffect(() => {
      setTicketDetails({ ...initialTicketDetails });
      setEditedTicket({ ...initialTicketDetails });
    }, [initialTicketDetails]);
  
    const toggleDatepicker = () => {
      setShowPicker(!showPicker);
    };
  
    const onChange = (event, selectedDate) => {
      if (selectedDate) {
        const currentDate = selectedDate;
        setEditedTicket({ ...editedTicket, departureDate: currentDate }); // Set the selected date to the state
        if (Platform.OS === 'android') {
          toggleDatepicker();
          setDateSelect(currentDate.toDateString());
        }
      } else {
        toggleDatepicker();
      }
    };
  
    const showDatePicker = () => {
      return (
        <DateTimePicker
          mode="date"
          display="compact"
          value={editedTicket.departureDate || new Date()} // Use editedTicket.departureDate if available, otherwise set to current date
          onChange={onChange}
        />
      );
    };
  
    useEffect(() => {
      setTicketDetails({ ...initialTicketDetails });
      setEditedTicket({ ...initialTicketDetails });
    }, [initialTicketDetails]);
  
    const handleEdit = () => {
      setEditedTicket({ ...initialTicketDetails });
      setEditModalVisible(true);
    };
  
    const handleSave = () => {
        onUpdateTicket(ticketNumber, editedTicket); // Update the ticket details via the parent component function
        setTicketDetails({ ...editedTicket }); // Update the local state to reflect the edited ticket details
        setEditModalVisible(false); // Close the edit modal after saving
    };
      
    const handleInputChange = (field, value) => {
      setEditedTicket({ ...editedTicket, [field]: value });
    };
  
    const handleDelete = () => {
      onDeleteTicket(ticketNumber);
    };

  return (
    <View style={[styles.activeTicketContainer , { width: containerWidth }]}>

        <Text style={[styles.ticketNumber, {backgroundColor: '#A5A5AA', width: '50%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 20,}]}>Ticket #{ticketNumber}</Text>

        <View style={styles.flightInfoContainer}>
            <Text style={styles.flightName}>Serene Airline</Text>
            <Text style={styles.flightNumber}>{ticketDetails.flightNumber}</Text>
        </View>

        
        <View style={styles.dottedLine}>
            <View style={styles.circle1}/>
            <View style={styles.circle2}/>
        </View>

        <View style={styles.CityContainer}>
            <Text style={styles.ticketText}>{ticketDetails.departureCity}</Text>
            <Image style={styles.flightImage} source={require('../../assets/flight.png')}/>
            <Text style={styles.ticketText}>{ticketDetails.arrivalCity}</Text>
        </View>

        <View style={styles.seatTypeContainer}>
        <View style={[
            styles.seatTypeOption,
            ticketDetails.flightType && ticketDetails.flightType.trim().toLowerCase() === 'first-class' && styles.selectedSeat
            ]}>
            <Text style={styles.seatTypeText}>First Class</Text>
        </View>

        <View style={[
            styles.seatTypeOption, 
            ticketDetails.flightType && ticketDetails.flightType.trim().toLowerCase() === 'business' && styles.selectedSeat
            ]}>
            <Text style={styles.seatTypeText}>Business</Text>
        </View>
        <View style={[
            styles.seatTypeOption, 
            ticketDetails.flightType && ticketDetails.flightType.trim().toLowerCase() === 'economy' && styles.selectedSeat
            ]}>
            <Text style={styles.seatTypeText}>Economy</Text>
        </View>
        </View>
        
        <View style={styles.ticketInfoContainer}>
            <View style={styles.ticketText}>
                <Text style={styles.title}>Price : </Text>
                <Text style={styles.ticketText}>{ticketDetails.price} PKR</Text>
                <Text style={styles.title}>Departure Date : </Text>
                <Text style={styles.ticketText}>
                {(editedTicket.departureDate && new Date(editedTicket.departureDate)?.toDateString()) || " "}
                </Text>
                <Text style={styles.title}>Flight Duration : </Text>
                <Text style={styles.ticketText}>{ticketDetails.flightDuration}</Text>
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                <Text style={[{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18,}]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={[{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18,}]}>Delete</Text>
            </TouchableOpacity>
        </View>

        <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>

          <Text style={styles.PopupHeading}>Edit Ticket</Text>

          <TextInput
            style={styles.input}
            placeholder="Flight Number"
            value={editedTicket.flightNumber}
            onChangeText={(text) => handleInputChange('flightNumber', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Departure City"
            value={editedTicket.departureCity}
            onChangeText={(text) => handleInputChange('departureCity', text)}
          />
          <View style={styles.input}>
          <Dropdown
            defaultValue={editedTicket.flightType} // Set default value from state
            options={seatTypes}
            textStyle={styles.DropdownText}
            dropdownStyle={styles.DropdownContainer}
            dropdownTextStyle={styles.CustomDropdownText}
            onSelect={(index, value) => {
              setEditedTicket({ ...editedTicket, flightType: value });
              setSeatType(value);
            }}
          />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={(editedTicket.price !== undefined ? editedTicket.price.toString() : '')}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="numeric"
            />

          <View style={styles.input}>
            {showPicker && showDatePicker()}
            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  style={styles.DropdownText}
                  placeholder="Departure Date"
                  value={dateSelect || editedTicket.departureDate?.toDateString() || ''}
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Flight Duration (in minutes)"
            value={(editedTicket.flightDuration && editedTicket.flightDuration.replace(/\D/g, '')) || ''}
            onChangeText={handleFlightDuration}
            keyboardType="numeric"
            />
          <TouchableOpacity onPress={handleSave} style={styles.AddTicketButton}>
            <Text style={styles.AddTicketButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>



    </View>
  );
};

const styles = StyleSheet.create({
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
  Duration: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ticketText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
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
  modalContent: {
    flex: 1,
    backgroundColor: '#404258',
    paddingTop: 40,
    paddingHorizontal: 20,
    
  },
  PopupHeading: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
    padding: 5,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  input: {
    backgroundColor: '#E9E8E8',
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 20,
  },
  AddTicketButton: {
    backgroundColor: '#61677A',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  AddTicketButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  DropdownContainer: {
    width: 280,
  },
  DropdownText: {
    fontSize: 15,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 10,
  },
  CustomDropdownText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
    color: 'black',
  }
});

export default ActiveTicket;
