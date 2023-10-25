import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
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
    const [price, setPrice] = useState('');
    const [seatType, setSeatType] = useState(null); // Initialize with null
    const seatTypes = [
    { label: 'Economy', value: 'economy' },
    { label: 'Business', value: 'business' },
    { label: 'First Class', value: 'first-class' },
    ]; // Define your list of seat types


    // Function to show/hide the modal
    const toggleAddTicketModal = () => {
    setAddTicketModalVisible(!isAddTicketModalVisible);
    };

    const handleTextChange = (newText) => {
        setText(newText);

        const totalHeight = (newText.split('\n').length * 25) + 50;

        if (textInputRef.current) {
        textInputRef.current.setNativeProps({
            height: Math.max(55, totalHeight),
        });
        }
    };

    const handleFromCityChange = (value) => {
        setFromCity(value);
    };
    
    const handleToCityChange = (value) => {
        setToCity(value);
    };
    
    const handlePriceChange = (value) => {
        setPrice(value);
    };
    
    const handleSeatTypeChange = (value) => {
        setSeatType(value);
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
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isAddTicketModalVisible}>
        <View style={styles.modalContent}>
            <Text>Add Ticket Form</Text>
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
            placeholder="Price"
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            style={styles.input}
            />
            <DropDownPicker
            items={seatTypes}
            placeholder="Select Seat Type"
            value={seatType}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            onChangeItem={handleSeatTypeChange}
            />
            <TouchableOpacity onPress={toggleAddTicketModal}>
            <Text>Close</Text>
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
    height: 200,
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
  
  input: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 10,
  },
  dropdownContainer: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#b6daf7',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
});

export default AirlineDashboard;
