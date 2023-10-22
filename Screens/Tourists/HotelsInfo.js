import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    image: require('../../assets/F1.png'),
    title: 'WiFi',
  },
  {
    id: '2',
    image: require('../../assets/F2.png'),
    title: 'Breakfast',
  },
  {
    id: '3',
    image: require('../../assets/F3.png'),
    title: 'Gym',
  },
  {
    id: '4',
    image: require('../../assets/F4.png'),
    title: 'Parking',
  },
  {
    id: '5',
    image: require('../../assets/F5.png'),
    title: 'Parking',
  },
  {
    id: '6',
    image: require('../../assets/F6.png'),
    title: 'Parking',
  },
  {
    id: '7',
    image: require('../../assets/plus.png'),
    title: 'Parking',
  },
];

const FacilitiesList = ({ data }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  
    const handleFacilityButtonClick = () => {
      setIsPopupVisible(true);
    };
  
    const closePopup = () => {
      setIsPopupVisible(false);
    };
  
    return (
        <View>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.facilityItem}>
                {index === data.length - 1 ? (
                  <TouchableOpacity style={styles.facilityButton} onPress={handleFacilityButtonClick}>
                    <Image source={item.image} style={styles.facilityImage} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.facilityBox}>
                    <Image source={item.image} style={styles.facilityImage} />
                  </View>
                )}
              </View>
            )}
          />
    
          <Modal isVisible={isPopupVisible} onBackdropPress={closePopup} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <TouchableOpacity onPress={closePopup}>
                  <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
                </TouchableOpacity>
                {/* Add your popup content here */}
                <Text>Popup Content</Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
  
  

const HotelsInfo = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <TouchableOpacity
        style={styles.MapButton}
        activeOpacity={0.7}
      >
        <Image source={require("../../assets/map.png")} style={[{ width: 30, height: 30 }]} />
      </TouchableOpacity>
      <ImageBackground style={styles.Image} source={require("../../assets/HotelBackground.png")} />
      <View style={[styles.ContentContainer, { width: containerWidth }]}>
        <View style={styles.TextContainer}>
          <View style={styles.RightText}>
            <Text style={styles.Title}>Marriot Hotel</Text>
            <Text style={styles.subDescription}>Islamabad</Text>
            <View style={styles.ratingContainer}>
              <Image source={require('../../assets/star.png')} style={styles.iconStar} />
              <Text style={styles.ratingValue}>4.5</Text>
            </View>
          </View>
          <View style={styles.LeftText}>
            <Text style={styles.Price}>25$/Night</Text>
          </View>
        </View>
        <View style={styles.FacilityContainer}>
          <Text style={styles.FacilityText}>Facilities</Text>
          <FacilitiesList data={data} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Image: {
    borderRadius: 46,
    height: 450,
    top: -10,
    width: '100%',
    position: 'absolute',
    flex: 1,
  },
  ContentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
    height: 280,
    position: 'absolute',
    top: 400,
  },
  TextContainer: {
    flexDirection: 'row',
  },
  RightText: {
    width: '65%',
    paddingLeft: 20,
    paddingTop: 30,
  },
  LeftText: {
    width: '35%',
    paddingTop: 80,
  },
  Price: {
    fontFamily: 'Poppins-Bold',
    color: '#319bd6',
    fontSize: 20,
  },
  Title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
  },
  subDescription: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    bottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#ffc107',
  },
  iconStar: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  MapButton: {
    position: 'absolute',
    top: 360,
    right: 30,
    width: 80,
    height: 80,
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#319BD6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 2,
  },
  FacilityContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  FacilityText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  facilityItem: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    width: 75,
    height: 75,
  },
  facilityButton:{
    alignItems: 'center',
  },
  facilityBox: {
    alignItems: 'center',
  },
  facilityImage: {
    width: 40,
    height: 40,
  },
  facilityButtonText: {
    fontSize: 14,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the alpha value for the blur effect
  },
  popupContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%', 
    alignSelf: 'center',
    justifyContent: 'center', 
    padding: 20,
    height: 600,
    marginBottom: 100,
    marginTop: 100, 
  },
  closeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    top : -280,
    right : 5,
  },
});

export default HotelsInfo;
