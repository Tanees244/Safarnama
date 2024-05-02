import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker;
import Dropdown from 'react-native-modal-dropdown';

const Activehotels = ({ ticketDetails: initialTicketDetails, ticketNumber, onUpdateTicket, onDeleteTicket }) => {
    
    const [ticketDetails, setTicketDetails] = useState({ ...initialTicketDetails });
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedTicket, setEditedTicket] = useState({ ...initialTicketDetails });
    const [showPicker, setShowPicker] = useState(false);
    const [dateSelect, setDateSelect] = useState('');
    const [seatType, setSeatType] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;

    const cityOptions = ['Karachi', 'Lahore', 'Quetta']; // Options for the city dropdown
    const seatTypes = ['Standard', 'Business', 'Luxury']; 

    const [departureTime, setDepartureTime] = useState(null);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  // Toggle functions for showing/hiding time pickers
  const toggleDepartureTimepicker = () => {
    setShowDeparturePicker(!showDeparturePicker);
  };

  const toggleArrivalTimepicker = () => {
    setShowArrivalPicker(!showArrivalPicker);
  };

  // Event handlers for time changes
  const onDepartureTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setDepartureTime(selectedTime);
      if (Platform.OS === 'android') {
        toggleDepartureTimepicker();
        // Handle time selection (formatting, etc.)
      }
    } else {
      toggleDepartureTimepicker();
    }
  };

  const onArrivalTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setArrivalTime(selectedTime);
      if (Platform.OS === 'android') {
        toggleArrivalTimepicker();
        // Handle time selection (formatting, etc.)
      }
    } else {
      toggleArrivalTimepicker();
    }
  };

  const formatDuration = (durationString) => {
    if (!durationString) return "";
  
    const [month,day, hours] = durationString.split(':').map(Number);
  
    const formattedDuration = [];
      formattedDuration.push(`${hours} hr`);
  
    return formattedDuration.join(' ');
  };
  
    useEffect(() => {
      setTicketDetails({ ...initialTicketDetails });
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
  
    const handleSave = async () => {
      try {
          // Call the API to update the airline package
          const response = await fetch(`http://192.168.100.12:8000/api/VendorsRoutes/update_bus_package/${editedTicket.bus_package_id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(editedTicket),
          });
  
          if (response.ok) {
              const updatedPackage = await response.json();
              onUpdateTicket(updatedPackage.updatedPackage); // Update the ticket details in the parent component
              setEditModalVisible(false); // Close the edit modal
          } else {
              // Handle the error if the API call fails
              console.error('Failed to update airline package');
          }
      } catch (error) {
          console.error('Error updating airline package:', error);
      }
  };
    const handleInputChange = (field, value) => {
      setEditedTicket({ ...editedTicket, [field]: value });
    };
  
    const handleDelete = async () => {
      try {
          const response = await fetch(`http://192.168.100.12:8000/api/VendorsRoutes/delete_bus_package/${ticketDetails.bus_package_id}`, {
              method: 'DELETE',
          });
  
          if (response.ok) {
              onDeleteTicket(ticketNumber); // Remove the ticket from the UI
          } else {
              console.error('Failed to delete airline package');
          }
      } catch (error) {
          console.error('Error deleting airline package:', error);
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
  

  

  return (
    <View style={[styles.activeTicketContainer, { width: containerWidth }]}>

    <Text style={[styles.ticketNumber, { backgroundColor: '#A5A5AA', width: '50%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 20, }]}>Ticket # </Text>
    
    <View style={styles.flightInfoContainer}>
    <Text style={styles.flightName}> {ticketDetails?.name}</Text>
    </View>
    <View style={styles.flightInfoContainer}>
    <Text style={styles.flightNumber}> Hotel Id:  {ticketDetails?.hotel_id} </Text>
    </View>
    
    
    
    <View style={styles.CityContainer}>
    <Text style={styles.ticketText}></Text>
    <Image style={styles.flightImage} source={{ uri: `data:image/jpeg;base64,${ticketDetails?.images}` }} />
    <Text style={styles.ticketText}></Text>
    </View>
    
    
    <View style={styles.ticketInfoContainer}>
    <View style={styles.ticketText}>
    <View style={styles.Time}>
    <View style={styles.DTime}>
    <Text style={styles.title2}>Area </Text>
    <Text style={styles.ticketText2}>{ticketDetails?.area} </Text>
    <Text style={styles.title2}>City</Text>
      <Text style={styles.ticketText2}>
       {ticketDetails?.city}
      </Text>
    
      <Text style={styles.title2}>Facilities</Text>
      <Text style={styles.ticketText2}>
       {ticketDetails?.facilities}
      </Text>
      <Text style={styles.title2}>Description : </Text>
      <Text style={styles.ticketText2}>
        {ticketDetails?.description}
      </Text>
    </View>
    </View>
    <Text style={styles.title2}>Rooms Available </Text>
    <View style={styles.roomTypeContainer}>
    
    <View style={[
    styles.seatTypeOption, styles.selectedSeat]}>
    <Text style={styles.seatTypeText}>Single Bed</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.rooms_single_bed}</Text>
    </View>
    
    <View style={
    styles.seatTypeOption}>
    <Text style={styles.seatTypeText}>Double Bed</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.rooms_double_bed}</Text>
    </View>
    
    <View style={[
    styles.seatTypeOption, styles.selectedSeat]}>
    <Text style={styles.seatTypeText}>Standard</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.rooms_standard}</Text>
    </View>
    
    <View style={
    styles.seatTypeOption}>
    <Text style={styles.seatTypeText}>Executive</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.rooms_executive}</Text>
    </View>
    
    </View>
    <Text style={styles.title2}>Prices (pkr) </Text>
    <View style={styles.roomTypeContainer}>
    
    <View style={[
    styles.seatTypeOption, styles.selectedSeat]}>
    <Text style={styles.seatTypeText}>Single Bed</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.price_single_bed}</Text>
    </View>
    
    <View style={
    styles.seatTypeOption}>
    <Text style={styles.seatTypeText}>Double Bed</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.price_double_bed}</Text>
    </View>
    
    <View style={[
    styles.seatTypeOption, styles.selectedSeat]}>
    <Text style={styles.seatTypeText}>Standard</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.price_standard}</Text>
    </View>
    
    <View style={
    styles.seatTypeOption}>
    <Text style={styles.seatTypeText}>Executive</Text>
    <Text style={styles.ticketText2}>{ticketDetails?.price_executive}</Text>
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
      <Modal visible={isEditModalVisible} animationType="slide">
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeIconContainer}>
          <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
        </TouchableOpacity>

        <Text style={styles.PopupHeading}>Edit Ticket</Text>

        <TextInput
          style={styles.input}
          placeholder="Bus Number"
          value={editedTicket.BusNumber}
          onChangeText={(text) => handleInputChange('BusNumber', text)}
        />
        <View style={styles.input}>
          <Dropdown
            defaultValue={editedTicket.departureCity || 'Departure City'} 
            options={cityOptions}
            textStyle={styles.DropdownText}
            dropdownStyle={styles.DropdownContainer}
            dropdownTextStyle={styles.CustomDropdownText}
            onSelect={(index, value) => {
              setEditedTicket({ ...editedTicket, departureCity: value });
              setSeatType(value);
            }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Arrival City"
          value={editedTicket.arrivalCity}
          onChangeText={(text) => handleInputChange('arrivalCity', text)}
        />
        <View style={styles.input}>
          <Dropdown
            defaultValue={editedTicket.flightType || 'Flight Type'} 
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
        <View style={styles.input}>
          {showPicker && showDatePicker()}
          {!showPicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.DropdownText}
                placeholder="Arrival Date"
                value={dateSelect || editedTicket.arrivalDate?.toDateString() || ''}
                editable={false}
              />
            </Pressable>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={(editedTicket.price !== undefined ? editedTicket.price.toString() : '')}
          onChangeText={(text) => handleInputChange('price', text)}
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
        width: 150,
        height: 150, 
        resizeMode:'contain',
     },
    
      roomTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
      },
      seatTypeOption: {
        flex: 1,
        padding: 0,
        alignItems: 'center',
      },
      seatTypeText: {
        fontSize: 11,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        borderWidth:1,
        borderBottomColor:'white',
      },
      selectedSeat: {
        borderWidth:1,
        borderColor:'white',
      },
      Time:{
        justifyContent: 'center',
        marginBottom:30,
    
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
        fontFamily: 'Poppins-ExtraBold',
        color: 'white',
        fontSize: 18,
        textAlign:'center',
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
        textAlign:'center',
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

export default Activehotels;
