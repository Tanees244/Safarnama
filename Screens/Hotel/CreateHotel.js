import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Dropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const CreateHotel = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const inputWidth = containerWidth * 0.9;
  
  const cities = ['Balakot', 'Naran', 'Kaghan', 'Gilgit Baltistan', 'Kashmir', 'Muzaffarabad'];
  const facilities = ['Shuttle Service', 'Air Conditioning', 'Wake-up Service', 'Car Rental','24-Hour Security', 'Smoke Alarms','Daily Housekeeping', 'Dry Cleaning', 'Laundry', 'Meeting/Banquet \nfacilities', 'Fax/Photocopying'];

  const [text, setText] = useState('');
  const textInputRef = useRef(null);
  const [isFacilitiesPopupVisible, setIsFacilitiesPopupVisible] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleTextChange = (newText) => {
    setText(newText);

    const totalHeight = (newText.split('\n').length * 25) + 50;

    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight),
      });
    }
  };

  const toggleFacilitiesPopup = () => {
    setIsFacilitiesPopupVisible(!isFacilitiesPopupVisible);
  };

  const toggleFacility = (facility) => {
    if (selectedFacilities.includes(facility)) {
      // Deselect the facility
      setSelectedFacilities(selectedFacilities.filter((item) => item !== facility));
    } else {
      // Select the facility
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <View style={styles.RegisterContainer}>
        <Text style={styles.Text}>
          Register <Text style={[styles.Text, { color: 'white' }]}>Hotel</Text>
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.ButtonContainer}>
          <Text style={styles.Heading}>Name Of Hotel</Text>
          <TextInput
            placeholder='Enter Your Hotel Name'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={handleTextChange}
          />
          <Text style={styles.Heading}>Address</Text>
          <Text style={styles.SubHeading}>Area:</Text>
          <TextInput
            placeholder='Enter Your Area'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={handleTextChange}
          />
          <Text style={styles.SubHeading}>City:</Text>
          <View style={styles.Input}>
            <Dropdown
              options={cities}
              defaultValue="Select A City"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, value) => {
                // Handle the selected city here (e.g., store it in state)
              }}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>
          <Text style={styles.Heading}>Description Of Hotel</Text>
          <TextInput
            placeholder='Enter Description Of Your Hotel'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={handleTextChange}
          />
            <Text style={styles.Heading}>Facilities</Text>
          <View style={styles.PopupButton}>
            <Text style={styles.OpenFacilitiesPopupText}>Add Facilities</Text>
            <TouchableOpacity onPress={toggleFacilitiesPopup}>
              <Image style={styles.PopupImage} source={require('../../assets/plus2.png')}/>
            </TouchableOpacity>
          </View>

          {/* Selected Facilities */}
          <Text style={styles.SelectedFacilitiesHeading}>Selected Facilities:</Text>
          <View style={styles.SelectedFacilitiesContainer}>
            {selectedFacilities.map((facility) => (
              <Text key={facility} style={styles.SelectedFacility}>
                {facility}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        isVisible={isFacilitiesPopupVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
      >
        <ScrollView style={styles.FacilitiesPopup}>
          <Text style={styles.FacilitiesPopupHeading}>Facilities and {'\n'}Services</Text>
          {facilities.map((facility) => (
            <View key={facility} style={styles.FacilityItem}>
              <Text style={styles.FacilityText}>{facility}</Text>
              <TouchableOpacity
                onPress={() => toggleFacility(facility)}
                style={[
                  styles.FacilityButton,
                  selectedFacilities.includes(facility) && styles.SelectedFacilityButton
                ]}
              >
                <Text style={styles.FacilityButtonText}>
                  {selectedFacilities.includes(facility) ? 'Selected' : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity onPress={toggleFacilitiesPopup} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  Container: {
    backgroundColor: '#cee7fa',
    flex: 1,
  },
  header: {
    height: 220,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    textAlign: 'center',
    top: 80,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  RegisterContainer: {
    backgroundColor: '#54aaec',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: -60,
    height: 120,
    zIndex: 2,
    justifyContent: 'center',
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  ButtonContainer: {
    marginTop: 20,
    backgroundColor: '#9dcef4',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  Heading: {
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 10,
    fontSize: 16,
  },
  SubHeading: {
    fontFamily: 'Poppins-Medium',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  Input: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 70,
    width: 320,
    justifyContent: 'center',
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
  PopupButton: {
    backgroundColor: '#b6daf7',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  PopupImage: {
    width: 25,
    height: 25,
  },
  OpenFacilitiesPopupText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  FacilitiesPopup: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    margin: 10,
  },
  FacilitiesPopupHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    paddingTop: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  FacilityText: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  FacilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  FacilityButton: {
    backgroundColor: '#b6daf7',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  SelectedFacilityButton: {
    backgroundColor: '#54aaec',
  },
  FacilityButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  SelectedFacilitiesHeading: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  SelectedFacilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  SelectedFacility: {
    backgroundColor: '#54aaec',
    padding: 5,
    borderRadius: 15,
    margin: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
});

export default CreateHotel;
