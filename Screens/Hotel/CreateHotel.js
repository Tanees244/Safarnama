import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import Dropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const cities = ['Balakot', 'Naran', 'Kaghan', 'Gilgit Baltistan', 'Kashmir', 'Muzaffarabad'];
const facilities = ['Shuttle Service', 'Air Conditioning', 'Wake-up Service', 'Car Rental', '24-Hour Security', 'Smoke Alarms', 'Daily Housekeeping', 'Dry Cleaning', 'Laundry', 'Meeting/Banquet facilities', 'Fax/Photocopying'];

const CreateHotel = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 0.7;
  const inputWidth = containerWidth * 0.9;
  const submitButton = screenWidth * 0.4;
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [roomsExecutive, setRoomsExecutive] = useState('');
  const [roomsSingleBed, setRoomsSingleBed] = useState('');
  const [roomsDoubleBed, setRoomsDoubleBed] = useState('');
  const [roomsStandardBed, setRoomsStandardBed] = useState('');
  const [priceSingleBed, setPriceSingleBed] = useState('');
  const [priceDoubleBed, setPriceDoubleBed] = useState('');
  const [priceStandard, setPriceStandard] = useState('');
  const [priceExecutive, setPriceExecutive] = useState('');
  const [adultsSingleBed, setAdultsSingleBed] = useState('');
  const [childrenSingleBed, setChildrenSingleBed] = useState('');
  const [adultsDoubleBed, setAdultsDoubleBed] = useState('');
  const [childrenDoubleBed, setChildrenDoubleBed] = useState('');
  const [adultsStandard, setAdultsStandard] = useState('');
  const [childrenStandard, setChildrenStandard] = useState('');
  const [adultsExecutive, setAdultsExecutive] = useState('');
  const [childrenExecutive, setChildrenExecutive] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [images, setImages] = useState('');
  const [facilitiesModalVisible, setFacilitiesModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const handleCityChange = (value) => {
    setCity(value);
    setCityModalVisible(false);
  };

  const toggleFacilitiesModal = () => {
    setFacilitiesModalVisible(!facilitiesModalVisible);
  };

  const toggleCityModal = () => {
    setCityModalVisible(!cityModalVisible);
  };

  const handleFacilityToggle = (facility) => {
    // Check if the facility is already selected
    const index = selectedFacilities.indexOf(facility);
    if (index === -1) {
      // Facility not selected, add it to the list
      setSelectedFacilities([...selectedFacilities, facility]);
    } else {
      // Facility already selected, remove it from the list
      const updatedFacilities = [...selectedFacilities];
      updatedFacilities.splice(index, 1);
      setSelectedFacilities(updatedFacilities);
    }
  };

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("ImagePicker Result:", result);
  
      if (!result.canceled) {
        setImages(result.assets[0].uri);
        console.log("Selected Image URI:", result.assets[0].uri);
      } else {
        console.log("Image picking cancelled.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  

  const handleChange = (name, value) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'area':
        setArea(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'roomsExecutive':
        setRoomsExecutive(value);
        break;
      case 'roomsSingleBed':
        setRoomsSingleBed(value);
        break;
      case 'roomsDoubleBed':
        setRoomsDoubleBed(value);
        break;
      case 'roomsStandardBed':
        setRoomsStandardBed(value);
        break;
      case 'priceSingleBed':
        setPriceSingleBed(value);
        break;
      case 'priceDoubleBed':
        setPriceDoubleBed(value);
        break;
      case 'priceStandard':
        setPriceStandard(value);
        break;
      case 'priceExecutive':
        setPriceExecutive(value);
        break;
      case 'adultsSingleBed':
        setAdultsSingleBed(value);
        break;
      case 'childrenSingleBed':
        setChildrenSingleBed(value);
        break;
      case 'adultsDoubleBed':
        setAdultsDoubleBed(value);
        break;
      case 'childrenDoubleBed':
        setChildrenDoubleBed(value);
        break;
      case 'adultsStandard':
        setAdultsStandard(value);
        break;
      case 'childrenStandard':
        setChildrenStandard(value);
        break;
      case 'adultsExecutive':
        setAdultsExecutive(value);
        break;
      case 'childrenExecutive':
        setChildrenExecutive(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contactNumber':
        setContactNumber(value);
        break;
      default:
        break;
    }
  };

  const handleFacilitiesChange = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
  };

const handleSubmit = async () => {
  try {
    // Construct formData object with the image and other form data
    const formData = new FormData();
    formData.append('image', {
      uri: images,
      type: 'image/jpeg',
      name: `image.jpg`,
    });

    // Append other form data to formData
    formData.append('name', name);
    formData.append('area', area);
    formData.append('city', city);
    formData.append('description', description);
    formData.append('rooms_executive', roomsExecutive);
    formData.append('rooms_single_bed', roomsSingleBed);
    formData.append('rooms_double_bed', roomsDoubleBed);
    formData.append('rooms_standard_bed', roomsStandardBed);
    formData.append('price_single_bed', priceSingleBed);
    formData.append('price_double_bed', priceDoubleBed);
    formData.append('price_standard', priceStandard);
    formData.append('price_executive', priceExecutive);
    formData.append('adults_single_bed', adultsSingleBed);
    formData.append('children_single_bed', childrenSingleBed);
    formData.append('adults_double_bed', adultsDoubleBed);
    formData.append('children_double_bed', childrenDoubleBed);
    formData.append('adults_standard', adultsStandard);
    formData.append('children_standard', childrenStandard);
    formData.append('adults_executive', adultsExecutive);
    formData.append('children_executive', childrenExecutive);
    formData.append('email', email);
    formData.append('contact_number', contactNumber);
    formData.append('facilities', JSON.stringify(selectedFacilities)); // Convert facilities array to JSON string

    console.log("Submitting form with image and data:", formData);

    // Send formData to API for submitting the form
    const authToken = await AsyncStorage.getItem('authToken');
    const response = await fetch('http://192.168.100.12:8000/api/VendorsRoutes/hotel_packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log('Hotel details added successfully');
      navigation.navigate("HotelDashboard");
    } else {
      console.error('Failed to add hotel details:', response.status);
    }
  } catch (error) {
    console.error('Error adding hotel details:', error);  
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
            Register <Text style={[styles.Text, { color: 'white' }]}>Hotel</Text>
          </Text>
        </View>
        <View style={[styles.HeadingContainer, { width: RegisterContainer }]}>
          <Text style={styles.Text}>
            Hotel <Text style={[styles.Text, { color: 'white' }]}>Details</Text>
          </Text>
        </View>
        <View style={styles.form}>
          <Text>Name:</Text>
          <TextInput style={[styles.input, { width: inputWidth }]} value={name} onChangeText={(value) => handleChange('name', value)} />

          <Text>Area:</Text>
          <TextInput style={[styles.input, { width: inputWidth }]} value={area} onChangeText={(value) => handleChange('area', value)} />

          <Text style={styles.Heading}>City:</Text>
          <Modal visible={cityModalVisible} animationType="slide">
            <View style={styles.facilitiesModal}>
              <ScrollView style={styles.facilitiesContainer}>
                {cities.map((c) => (
                  <TouchableOpacity key={c} onPress={() => handleCityChange(c)}>
                    <Text style={styles.modalItem}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
          <TouchableOpacity onPress={toggleCityModal} style={styles.dropdown}>
            <Text>{city || 'Select City'}</Text>
          </TouchableOpacity>


          <Text style={styles.Heading}>Description:</Text>
          <TextInput style={[styles.input, { width: inputWidth }]} value={description} onChangeText={(value) => handleChange('description', value)} />

          <Text style={styles.Heading}>Facilities:</Text>
          <Modal visible={facilitiesModalVisible} animationType="slide">
            <View style={styles.facilitiesModal}>
              <ScrollView style={styles.facilitiesContainer}>
                {facilities.map((f) => (
                  <TouchableOpacity key={f} onPress={() => handleFacilityToggle(f)}>
                    <Text style={[styles.facilityItem, selectedFacilities.includes(f) && styles.selectedFacilityItem]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={toggleFacilitiesModal} style={styles.closeButton}>
                <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity onPress={toggleFacilitiesModal} style={styles.dropdown}>
            <Text>{selectedFacilities.length ? selectedFacilities.join(', ') : 'Select Facilities'}</Text>
          </TouchableOpacity>

          <Text style={styles.Heading}>Rooms:</Text>
          <TextInput
            style={[styles.input, { width: inputWidth }]}
            value={roomsExecutive}
            onChangeText={setRoomsExecutive}
            placeholder="Executive Rooms"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]}
            value={roomsSingleBed}
            onChangeText={setRoomsSingleBed}
            placeholder="Single Bed Rooms"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={roomsDoubleBed}
            onChangeText={setRoomsDoubleBed}
            placeholder="Double Bed Rooms"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={roomsStandardBed}
            onChangeText={setRoomsStandardBed}
            placeholder="Standard Rooms"
          />

          {/* Prices */}
          <Text style={styles.Heading}>Prices (PKR):</Text>
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={priceSingleBed}
            onChangeText={setPriceSingleBed}
            placeholder="Price for Single Bed"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]}
            value={priceDoubleBed}
            onChangeText={setPriceDoubleBed}
            placeholder="Price for Double Bed"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={priceStandard}
            onChangeText={setPriceStandard}
            placeholder="Price for Standard Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={priceExecutive}
            onChangeText={setPriceExecutive}
            placeholder="Price for Executive Room"
            keyboardType="numeric"
          />

          {/* Capacities */}
          <Text style={styles.Heading}>Capacities:</Text>
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={adultsSingleBed}
            onChangeText={setAdultsSingleBed}
            placeholder="Adults in Single Bed Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={childrenSingleBed}
            onChangeText={setChildrenSingleBed}
            placeholder="Children in Single Bed Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={adultsDoubleBed}
            onChangeText={setAdultsDoubleBed}
            placeholder="Adults in Double Bed Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={childrenDoubleBed}
            onChangeText={setChildrenDoubleBed}
            placeholder="Children in Double Bed Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={adultsStandard}
            onChangeText={setAdultsStandard}
            placeholder="Adults in Standard Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={childrenStandard}
            onChangeText={setChildrenStandard}
            placeholder="Children in Standard Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={adultsExecutive}
            onChangeText={setAdultsExecutive}
            placeholder="Adults in Executive Room"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={childrenExecutive}
            onChangeText={setChildrenExecutive}
            placeholder="Children in Executive Room"
            keyboardType="numeric"
          />

          {/* Contact */}
          <Text style={styles.Heading}>Contact Details:</Text>
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            style={[styles.input, { width: inputWidth }]} value={contactNumber}
            onChangeText={text => {
              const formattedPhoneNumber = text.replace(/[^0-9]/g, '').slice(0, 11);
              setContactNumber(formattedPhoneNumber);
            }}
            placeholder="Contact Number"
            keyboardType="numeric"
            maxLength={11}
          />

          {/* Add more input fields for other details */}

          <Text style={styles.Heading}>Upload Your Images</Text>
          <View style={styles.PopupButton}>
            <Text style={styles.AddRoomTypeButtonText}>Upload Images</Text>
            <TouchableOpacity onPress={handleImageUpload}>
              <Image style={styles.PopupImage} source={require('../../assets/plus2.png')} />
            </TouchableOpacity>
          </View>

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

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
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  AddRoomTypeButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
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
  form: {
    marginTop: 20,
    backgroundColor: '#9dcef4',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  HeadingContainer: {
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
  RegisterContainer: {
    backgroundColor: '#54aaec',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10,
    zIndex: 2,
    justifyContent: 'center',
  },
  Heading: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#b6daf7',
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    height: 70,
    width: 320,
    justifyContent: 'center',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  facilitiesModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilitiesContainer: {
    maxHeight: 300,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  facilityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedFacilityItem: {
    backgroundColor: '#eee',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CreateHotel;
