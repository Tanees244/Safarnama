import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';

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

const imageGallery = [
    {
      id: '1',
      image: require('../../assets/Hotel1.jpg'),
    },
    {
      id: '2',
      image: require('../../assets/Hotel2.jpg'),
    },
    {
      id: '3',
      image: require('../../assets/Hotel3.jpg'),
    },
    {
      id: '4',
      image: require('../../assets/Hotel1.jpg'),
    },
  ];

const FacilityListDetails = ({ details }) => {
    return (
      <View style={styles.facilityDetails}>
        {details.map((facility, index) => (
          <View key={index} style={styles.facilityDetail}>
            <Text style={styles.detailTitle}>{facility.title}</Text>
            {facility.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.detailText}>
                {item}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };
  
  const FacilitiesList = ({ data }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  
    const handleFacilityButtonClick = () => {
      setIsPopupVisible(true);
    };
  
    const closePopup = () => {
      setIsPopupVisible(false);
    };
  
    const facilityDetails = [
        {
            title: 'General',
            items: ['Shuttle Service', 'Air Conditioning', 'Wake-up Service', 'Car Rental'],
        },
        {
            title: 'Safety & Security',
            items: ['24-Hour Security', 'Smoke Alarms'],
        },
        {
            title: 'Cleaning Services',
            items: ['Daily Housekeeping', 'Dry Cleaning', 'Laundry'],
        },
        {
            title: 'Business Facilities',
            items: ['Meeting/Banquet facilities', 'Fax/Photocopying'],
        },
      ];
  
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
            <TouchableOpacity onPress={closePopup} style={styles.closeIconContainer}>
                <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
              </TouchableOpacity>
              <ScrollView >
                <Text style={styles.popupTitle}>Facilities And Services</Text>
                <FacilityListDetails details={facilityDetails} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const GalleryList = ({ data }) => {
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
    const handleGalleryButtonClick = (index) => {
      setSelectedImageIndex(index);
      setIsGalleryVisible(true);
    };
  
    const closeGallery = () => {
      setIsGalleryVisible(false);
    };
  
    return (
      <View>
        <FlatList
          data={imageGallery}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.GalleryItem}>
              <TouchableOpacity
                style={styles.facilityButton}
                onPress={() => handleGalleryButtonClick(index)}
              >
                <Image source={item.image} style={styles.GalleryImage} />
              </TouchableOpacity>
            </View>
          )}
        />
  
        <Modal
          isVisible={isGalleryVisible}
          onBackdropPress={closeGallery}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
            <ImageBackground
                  source={imageGallery[selectedImageIndex].image}
                  style={styles.PopupGalleryImage}
                  contentFit="cover"
            >
                <TouchableOpacity onPress={closeGallery} style={styles.closeIconContainer}>
                    <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
                </TouchableOpacity>
            </ImageBackground>
        </Modal>
      </View>
    );
  };

const HotelsInfo = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  return (
    <ScrollView contentContainerStyle={styles.Container} >
        <TouchableOpacity
            style={styles.MapButton}
            activeOpacity={0.7}
            >
            <Image source={require("../../assets/map.png")} style={[{ width: 30, height: 30 }]} />
        </TouchableOpacity>
    <Image style={styles.Image} source={require("../../assets/HotelBackground.png")} />
    <View style={styles.ContentContainer}>
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
            <View style={styles.FacilityContainer}>
                <Text style={styles.FacilityText}>Gallery</Text>
                <GalleryList data={data} />
            </View>
            <View style={styles.FacilityContainer}>
                <Text style={styles.FacilityText}>Description</Text>
                <Text style={styles.Description}>Marriott Hotels & Resorts is Marriott International's brand of full-service hotels and resorts based in Bethesda, Maryland. As of June 30, 2020, there were 582 hotels and resorts with 205,053 rooms operating under the brand, in addition to 160 hotels with 47,765 rooms planned for development.</Text>
            </View>
            <View style={styles.FacilityContainer}>
                <Text style={styles.FacilityText}>Reviews</Text>
                <View style={[styles.ReviewsContainer, { width : containerWidth}]}>
                  <Image source={require('../../assets/avatar.png')} style={styles.ReviewImage}/>
                  <Text style={styles.ReviewText}>Marriott Hotels & Resorts is Marriott International's brand of full-service hotels and resorts based in Bethesda,</Text>
                </View>
                <View style={[styles.ReviewsContainer, { width : containerWidth}]}>
                  <Image source={require('../../assets/avatar.png')} style={styles.ReviewImage}/>
                  <Text style={styles.ReviewText}>Marriott Hotels & Resorts is Marriott International's brand of full-service hotels and resorts based in Bethesda,</Text>
                </View>
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity 
              style={styles.Cardbutton}
              >
              <Text style={styles.CardbuttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    Container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    Image: {
        height: 450,
        width: '100%',
        position: 'absolute',
    },
    ContentContainer: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 34,
        paddingTop: 10,
        paddingBottom: 100, // Adjust this value as needed
        marginTop: 360, // Adjust this value as needed
    },
    TextContainer: {
        flexDirection: 'row',
    },
    RightText: {
        width: '65%',
        paddingLeft: 20,
        paddingTop: 20,
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
        top: 330,
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
        paddingLeft: 10,
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
    GalleryImage:{
        width: 110,
        height: 110,
        borderRadius: 20,
    },
    GalleryItem:{
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 120,
        height: 120,
    },
    PopupGalleryImage: {
        position: "absolute",
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 1,
    },
    blurBackground: {
       
        backgroundColor: 'rgba(0, 0, 0.9, 0.95)',
        // Adjust the alpha value for the blur effect
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
    closeIconContainer: {
        position: 'absolute',
        top: 10,    // Adjust the top position as needed
        right: 10,
        backgroundColor: '#C4C8CB',
        borderRadius: 60, 
        zIndex: 2, // Adjust the right position as needed
    },
    closeIcon: {
        width: 40,
        height: 40,
    },
    facilityDetails: {
        marginTop: 20,
    },
    facilityDetail: {
        marginBottom: 10,
    },
    detailTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    detailText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    popupTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Black',
        marginBottom: 20,
    },
    Description: {
      paddingLeft: 10,
      paddingRight: 10,
      fontFamily: 'Poppins-Regular',
    },
    ReviewsContainer:{
      backgroundColor: '#D9D9D9',
      height: 150,
      borderRadius: 40,
      padding: 10,
      flexDirection: 'row',
      marginTop: 10,
    },
    ReviewImage:{
      height: 90,
      width: 90,
      marginRight: 20,
      marginLeft: 10,
      marginTop: 15,
      justifyContent: 'center',
    },
    ReviewText:{
      fontFamily: 'Poppins-Regular',
      width: '60%',
      marginTop: 5,
    },
    Cardbutton: {
      backgroundColor: '#071B26',
      width: 150,
      height: 50,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    CardbuttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
    },    
    ButtonContainer:{
      marginTop: 60,
      alignItems: 'center',
    },
});

export default HotelsInfo;
