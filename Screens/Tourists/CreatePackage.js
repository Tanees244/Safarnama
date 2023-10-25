import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Dropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';

const CreatePackage = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 0.7;
  const inputWidth = containerWidth * 0.9;
  
  const cities = ['Balakot', 'Naran', 'Kaghan', 'Gilgit Baltistan', 'Kashmir', 'Muzaffarabad'];
  const facilities = ['Shuttle Service', 'Air Conditioning', 'Wake-up Service', 'Car Rental','24-Hour Security', 'Smoke Alarms','Daily Housekeeping', 'Dry Cleaning', 'Laundry', 'Meeting/Banquet \nfacilities', 'Fax/Photocopying'];
  const types = ['Single Bed', 'Double Bed', 'Standard', 'Executive', 'King Size'];


  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(false);
   const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
  const [text, setText] = useState('');
  const textInputRef = useRef(null);
  const [isFacilitiesPopupVisible, setIsFacilitiesPopupVisible] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isRoomTypePopupVisible, setIsRoomTypePopupVisible] = useState(false);
  const [roomType, setRoomType] = useState('');
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [isAddRoomTypeEnabled, setIsAddRoomTypeEnabled] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState('1');
  const [selectedRoomType, setSelectedRoomType] = useState('Select Room Type');
  const [roomTypeCount, setRoomTypeCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);

function handleOnPress (){
    setOpen(!open);
}

function handleChange () {
    setDate(propDate)
}

  const handleTextChange = (newText) => {
    setText(newText);

    const totalHeight = (newText.split('\n').length * 25) + 50;

    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight),
      });
    }
  };

  const handleRoomTypeSelect = (index, value) => {
    setSelectedRoomType(value);
    setRoomType(value); // Update the room type input field
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

  const toggleRoomTypePopup = () => {
    setIsRoomTypePopupVisible(!isRoomTypePopupVisible);
  };

  const [roomInfo, setRoomInfo] = useState({
    price: '',
    adultCapacity: 1,
    childCapacity: 0,
  });

  const updateCapacity = (type, increment) => {
    if (type === 'adult' && increment && roomInfo.adultCapacity < 4) {
      setRoomInfo({ ...roomInfo, adultCapacity: roomInfo.adultCapacity + 1 });
    } else if (type === 'adult' && !increment && roomInfo.adultCapacity > 0) {
      setRoomInfo({ ...roomInfo, adultCapacity: roomInfo.adultCapacity - 1 });
    } else if (type === 'child' && increment && roomInfo.childCapacity < 4) {
      setRoomInfo({ ...roomInfo, childCapacity: roomInfo.childCapacity + 1 });
    } else if (type === 'child' && !increment && roomInfo.childCapacity > 0) {
      setRoomInfo({ ...roomInfo, childCapacity: roomInfo.childCapacity - 1 });
    }
  };

  const addRoomType = (roomType) => {
    if (roomType && roomInfo.price && roomInfo.adultCapacity >= 1 && numberOfRooms) {
      if (roomTypeCount < 5) {
        // Create a new room type object with details
        const newRoomType = {
          roomType,
          price: roomInfo.price,
          adultCapacity: roomInfo.adultCapacity,
          childCapacity: roomInfo.childCapacity,
          numberOfRooms,
        };
  
        // Add the new room type to the list
        setRoomTypeList([...roomTypeList, newRoomType]);
  
        // Increment the room type count
        setRoomTypeCount(roomTypeCount + 1);
  
        // Clear the input fields
        setRoomType('');
        setRoomInfo({
          price: '',
          adultCapacity: 1,
          childCapacity: 0,
        });
        setNumberOfRooms('1');
      }
    }
  };
  

  useEffect(() => {
    // Enable the "Add Room Type" button if all conditions are met
    if (roomType && roomInfo.price && roomInfo.adultCapacity >= 1) {
      setIsAddRoomTypeEnabled(true);
    } else {
      setIsAddRoomTypeEnabled(false);
    }
  }, [roomType, roomInfo.price, roomInfo.adultCapacity]);

  useEffect(() => {
    // Enable the "Add Room Type" button if all conditions are met and the count is less than 5
    if (roomType && roomInfo.price && roomInfo.adultCapacity >= 1 && roomTypeCount < 3) {
      setIsAddRoomTypeEnabled(true);
    } else {
      setIsAddRoomTypeEnabled(false);
    }
  }, [roomType, roomInfo.price, roomInfo.adultCapacity, roomTypeCount]);
  

  const removeRoomType = (roomType) => {
    // Filter out the selected room type to remove it from the list
    setRoomTypeList(roomTypeList.filter((room) => room.roomType !== roomType));
  };

  const renderRoomDetails = (roomType) => {
    // Find the selected room type object from the list
    const selectedRoom = roomTypeList.find((room) => room.roomType === roomType);
  
    if (selectedRoom) {
      return (
        <View key={selectedRoom.roomType} style={styles.selectedRoomStyle}>
          <TouchableOpacity
            onPress={() => removeRoomType(selectedRoom.roomType)}
            style={styles.closeIconContainer}
          >
            <Image style={styles.SelectedcloseIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>
          <Text style={styles.selectedRoomTextStyle}>Room Type: {selectedRoom.roomType}</Text>
          <Text style={styles.selectedRoomTextStyle}>Price: {selectedRoom.price} PKR</Text>
          <Text style={styles.selectedRoomTextStyle}>Number Of Rooms: {selectedRoom.numberOfRooms}</Text>
          <Text style={styles.selectedRoomTextStyle}>Adult Capacity: {selectedRoom.adultCapacity}</Text>
          <Text style={styles.selectedRoomTextStyle}>Child Capacity: {selectedRoom.childCapacity}</Text>
        </View>
      );
    }
  
    return null;
  }; 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
          <Text style={styles.Text}>
            Create Your <Text style={[styles.Text, { color: 'white' }]}>Package</Text>
          </Text>
        </View>
        
        <View style={styles.ButtonContainer}>
          <Text style={styles.Heading}>Where Do You Want To Go?</Text>
          <View style={styles.Input}>
            <Dropdown
              options={cities}
              defaultValue="Select Destination"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, value) => {
              }}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>
          
          <Text style={styles.Heading}>When do you want to go?</Text>
          <TouchableOpacity onPress={handleOnPress}>
              <Text>
                Open
              </Text>

          </TouchableOpacity>
          <Modal 
        isVisible={open}
        backdropColor="#000"
        backdropOpacity={0.5}  >
            <View style={styles.dateselector} >
                <View style={styles.ModalView}>
                <DatePicker 
                    mode='calendar'
                    minDate={startDate}
                    date={date}
                    onDateChange={handleChange}
                />
                <TouchableOpacity onPress={handleOnPress}>
              <Text>
                Close
              </Text>

          </TouchableOpacity>
                </View>
            </View>
        </Modal>
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

          <Text style={styles.Heading}>Selected Facilities:</Text>
          <View style={styles.SelectedFacilitiesContainer}>
            {selectedFacilities.map((facility) => (
              <Text key={facility} style={styles.SelectedFacility}>
                {facility}
              </Text>
            ))}
          </View>
          <Text style={styles.Heading}>Number Of Rooms</Text>
          <View style={styles.PopupButton}>
            <Text style={styles.AddRoomTypeButtonText}>Add Room Type</Text>
            <TouchableOpacity onPress={toggleRoomTypePopup}>
              <Image style={styles.PopupImage} source={require('../../assets/plus2.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.Heading}>Selected Room Types:</Text>
          <View style={styles.SelectedFacilitiesContainer}>
            {roomTypeList.map((roomType) => renderRoomDetails(roomType.roomType))}
          </View>
          <Text style={styles.Heading}>Email Address Of Hotel</Text>
          <TextInput
            placeholder='Enter Email Address Of Your Hotel'
            ref={textInputRef}
            multiline={true}
            style={[styles.Input, { width: inputWidth }]}
            onChangeText={handleTextChange}
          />
          <Text style={styles.Heading}>Phone Number</Text>
          <TextInput
            placeholder="Enter 11-digit Phone Number"
            style={[styles.Input, { width: inputWidth }]}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={text => {
              const formattedPhoneNumber = text.replace(/[^0-9]/g, '').slice(0, 11);
              setPhoneNumber(formattedPhoneNumber);
            }}
          />
          <Text style={styles.Heading}>Upload Your Images</Text>
          <View style={styles.PopupButton}>
            <Text style={styles.AddRoomTypeButtonText}>Upload Images</Text>
            <TouchableOpacity onPress={pickImage}>
              <Image style={styles.PopupImage} source={require('../../assets/plus2.png')}/>
            </TouchableOpacity>
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

      <Modal
        isVisible={isRoomTypePopupVisible}
        backdropColor="#000"
        backdropOpacity={0.5}
      >
        <View style={styles.RoomTypePopup}>
          <Text style={styles.RoomTypePopupHeading}>Add Room Type</Text>
          <View style={styles.RoomTypeNameInput}>
            <Dropdown
              options={types}
              defaultValue={selectedRoomType}
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={handleRoomTypeSelect}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>
          <TextInput
            placeholder="Price in PKR"
            keyboardType="numeric"
            style={styles.RoomTypePriceInput}
            value={roomInfo.price}
            onChangeText={(text) => setRoomInfo({ ...roomInfo, price: text })}
          />
          <Text style={styles.CapacityText}>Number Of Rooms:</Text>
          <TextInput
            placeholder="Number of Rooms"
            keyboardType="numeric"
            style={styles.RoomTypeCapacityInput}
            value={numberOfRooms}
            onChangeText={(text) => setNumberOfRooms(text)}
          />
          <Text style={styles.CapacityText}>Adults: {roomInfo.adultCapacity}</Text>
          <View style={styles.CapacityButtons}>
            <TouchableOpacity onPress={() => updateCapacity('adult', true)} style={styles.CapacityButton}>
              <Text style={styles.CapacityButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateCapacity('adult', false)} style={styles.CapacityButton}>
              <Text style={styles.CapacityButtonText}>-</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.CapacityText}>Children: {roomInfo.childCapacity}</Text>
          <View style={styles.CapacityButtons}>
            <TouchableOpacity onPress={() => updateCapacity('child', true)} style={styles.CapacityButton}>
              <Text style={styles.CapacityButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateCapacity('child', false)} style={styles.CapacityButton}>
              <Text style={styles.CapacityButtonText}>-</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => addRoomType(roomType)}
            style={[
              styles.AddRoomTypeSubmitButton,
              isAddRoomTypeEnabled ? {} : styles.DisabledAddRoomTypeSubmitButton
            ]}
            disabled={!isAddRoomTypeEnabled}
          >
            <Text style={styles.AddRoomTypeSubmitText}>Add Room Type</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRoomTypePopup} style={styles.RoomTypeCloseIconContainer}>
            <Image style={styles.RoomTypeCloseIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>
        </View>
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
    height: 140,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  HeadingContainer:{
    backgroundColor: '#0a78cd',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: -60,
    marginLeft: 130,
    elevation: 10,
    shadowColor: 'black',
    zIndex: 3,
  },

  dateselector:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:22,
  },

  ModalView: {
    margin:20,
    backdropColor:'white',
    borderRadius: 20,
    width:'80%',
    padding:35,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },

  RegisterContainer: {
    backgroundColor: '#54aaec',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10,
    zIndex: 2,
    flex:1,
    justifyContent: 'center',
    left:50,
  },
  Text: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 15,
    textAlign:'center',
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
    marginTop: 20,
    marginBottom: 10,
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
    width: 280,
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
    marginTop: 10,
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
    top: 5,
    right: 5,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  SelectedcloseIcon: {
    width: 20,
    height: 20,
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
  SelectedFacilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  SelectedFacility: {
    backgroundColor: '#54aaec',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  AddRoomTypeButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  RoomTypePopup: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    margin: 10,
  },
  RoomTypePopupHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    paddingTop: 10,
  },
  RoomTypeNameInput: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 10,
  },
  RoomTypePriceInput: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 10,
  },
  RoomTypeCapacityInput: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 50,
    marginBottom: 10,
  },
  AddRoomTypeSubmitButton: {
    backgroundColor: '#b6daf7',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DisabledAddRoomTypeSubmitButton: {
    backgroundColor: 'grey',  // Specify your desired background color for the disabled button
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  AddRoomTypeSubmitText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
  },
  RoomTypeCloseIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  RoomTypeCloseIcon: {
    width: 40,
    height: 40,
  },
  CapacityText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  CapacityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  CapacityButton: {
    backgroundColor: '#b6daf7',
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  CapacityButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  selectedRoomStyle: {
    backgroundColor: '#021b2e', // Specify your desired background color
    padding: 15,
    width: '90%',
    marginVertical: 5,
    borderRadius: 15,
  },
  selectedRoomTextStyle:{
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default CreatePackage;
