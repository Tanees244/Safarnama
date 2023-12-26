import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Image, FlatList, ImageBackground, ScrollView, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const data = [
  {
    id: '1',
    image: require('../../assets/Hotel3.jpg'),
    title: 'Marriot Hotel',
    city: 'Islamabad',
    description: 'Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters. ',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Hotel1.jpg'),
    title: 'Pearl Continental',
    city: 'Islamabad',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Hotel2.jpg'),
    title: 'Ramada',
    city: 'Islamabad',
    description: 'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range',
    ratings: '3.9/5.0',
  },
];

const data2 = [
  {
    id: '1',
    image: require('../../assets/Hotel1.jpg'),
    title: 'Marriot Hotel',
    city: 'Islamabad',
    description: 'Marriott Hotels & Resorts is Marriott International`s brand of full-service hotels and resorts based in Bethesda, Maryland. As of June 30, 2020, there were 582 hotels and resorts with 205,053 rooms operating under the brand, in addition to 160 hotels with 47,765 rooms planned for development.',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Hotel2.jpg'),
    title: 'Pearl Continental',
    city: 'Islamabad',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Hotel3.jpg'),
    title: 'Ramada',
    city: 'Islamabad',
    description: 'Ramada is a large American multinational hotel chain owned by Wyndham Hotels & Resorts. As of December 31, 2022, it operates 851 hotels with 120,3444 rooms across 63 countries under the Ramada brand',
    ratings: '3.9/5.0',
  },
];

const HorizontalCard = ({ item, onPress }) => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const containerHeight = screenHeight * 0.8;
    const containerWidth = screenWidth * 0.9;
    const buttonWidth = containerWidth * 0.22;

    return (
      <View style={[styles.card, { width: containerWidth, height: containerHeight }]}>
        <View style={styles.imageContainer}>
        <ImageBackground source={item.image} style={styles.image} borderRadius={20}>
            <View style={styles.ratingContainer}>
              <Image source={require('../../assets/star.png')} style={styles.iconStar} />
              <Text style={styles.ratingValue}>{item.ratings}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.content, { width: containerWidth, height: containerHeight }]}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subdescription}>{item.city}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.CardbuttonContainer}>
          <TouchableOpacity 
            style={styles.Cardbutton}
            onPress={onPress}
            >
            <Text style={styles.CardbuttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};
  
  

const HotelsLists = () => {

    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;
    const PackageWidth1 = screenWidth * 0.72;
    const [isExpanded, setIsExpanded] = useState(false);
    const scaleValue = new Animated.Value(0);

    const navigateToHotesInfo = () => {
        navigation.navigate('HotelsInfo')
    }

    const toggleMenu = () => {
      const toValue = isExpanded ? 0 : 1;
      Animated.timing(scaleValue, {
          toValue,
          duration: 0,
          useNativeDriver: true,
      }).start();
      setIsExpanded(!isExpanded);
    }

    const handleMenuItemPress = (menuItem) => {
      // Handle navigation based on the selected menu item
      // For example:
      if (menuItem === 'Home') {
        navigation.navigate('Discover')
      } else if (menuItem === 'Profile') {
        navigation.navigate('TouristProfile')
      } else if (menuItem === 'Booking') {
        navigation.navigate('CreatePackage')
      }
      else if (menuItem === 'Itinerary') {
        navigation.navigate('Itinerary')
      }
      // Collapse the menu after selection
      toggleMenu();
  }

    const scale = scaleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 4],
    });
  
    return (
      <View style={styles.Container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Safarnama</Text>
        </View>
        {isExpanded && (
                <View style={[styles.expandedMenu, { width: PackageWidth1 }]}>
                    <TouchableOpacity
                        style={[styles.expandedMenuItem, {bottom : 140, left : -80}]}
                        onPress={() => handleMenuItemPress('Home')}
                    >
                        <Image source={require("../../assets/Home.png")} style = {[{width: 30, height: 30}]} />
                        <Text style={styles.expandedMenuItemText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.expandedMenuItem, {bottom : 120, left : -70}]}
                        onPress={() => handleMenuItemPress('Profile')}
                    >
                        <Image source={require("../../assets/account-circle-black.png")} style = {[{width: 30, height: 30}]}/>
                        <Text style={styles.expandedMenuItemText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.expandedMenuItem, {bottom : 65, left : -75}]}
                        onPress={() => handleMenuItemPress('Booking')}
                    >
                        <Image source={require("../../assets/booking.png")} style = {[{width: 30, height: 30}]}/>
                        <Text style={styles.expandedMenuItemText}>Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.expandedMenuItem, {bottom : -15, left : -120}]}
                        onPress={() => handleMenuItemPress('Itinerary')}
                    >
                        <Image source={require("../../assets/itenerary.png")} style = {[{width: 30, height: 30}]}/>
                        <Text style={styles.expandedMenuItemText}>Itinerary</Text>
                    </TouchableOpacity>
                    
                </View>
            )}
            <TouchableOpacity
                style={styles.HomeButton}
                onPress={toggleMenu}
                activeOpacity={0.5}
            >
                {isExpanded ? (
                    // Render close icon or any icon you prefer
                    <Image source={require("../../assets/WhiteClose.png")} style = {[{width: 30, height: 30}]}/>
                ) : (
                    // Your existing Home button content
                    <Image source={require("../../assets/ViewMore.png")} style = {[{width: 35, height: 35}]}/>
                )}
            </TouchableOpacity>
        <ScrollView>
          <Text style={styles.text}>Top <Text style={[styles.text, { color: '#2D78A2' }]}>Rated Hotels</Text></Text>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <HorizontalCard item={item} onPress={navigateToHotesInfo} />}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.text}>Hotels</Text>
          <FlatList
            data={data2}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <HorizontalCard item={item} onPress={navigateToHotesInfo}/>}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  };
  


const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#cee7fa',
        flex: 1,
    },
    header: {
        height: 140,
        backgroundColor: '#1a1a1a',
        shadowColor: 'black',
        elevation: 20,
        zIndex: -1,
    },
    headerText: {
        textAlign: 'center',
        top: 60,
        fontSize: 30,
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
    },
    text: {
        width: '75%',
        fontSize: 30,
        padding: 30,
        color: '#1f4084',
        fontFamily: 'Poppins-Bold',
    },
    buttonContainer:{
        paddingHorizontal: 5,
        paddingVertical: 20,
        flexDirection: 'row',
    },
    card: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        flexDirection: 'column',
        width: 340,
        height: 600,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
    image: {
        height: 200,
        width: 280,
        shadowColor: 'black',
        elevation: 20,
    },
    contentContainer:{
        top: 130,
    },
    content: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 340,
        height: 600,
        top: -100,
        zIndex: -1,
    },
    title: {
        paddingLeft: 18,
        fontSize: 20,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
    },
    subdescription:{
        fontSize: 14,
        paddingLeft: 18,
        color: '#777',
        fontFamily: 'Poppins-Regular',
    },
    description: {
        fontSize: 14,
        color: '#2B2D2D',
        paddingLeft: 18,
        paddingTop: 20,
        fontFamily: 'Poppins-Medium',
    },
    ratingContainer: {
        position: 'absolute',
        top: 10, // Adjust top position as needed
        left: 10, // Adjust left position as needed
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    ratingValue: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
    },
    iconStar: {
        width: 15,
        height: 15,
        marginRight: 5,
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
    CardbuttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%', 
        alignItems: 'center',
    },
    HomeButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: 80,  // Adjust the width as needed
      height: 80,
      padding: 15,
      borderRadius: 50,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      zIndex: 2,
    },
    expandedMenu: {
      position: 'absolute',
      bottom: 20,
      left: 90,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 3,
    },
    expandedMenuItem: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'black',
    },  
    expandedMenuItemText: {
      color: 'white',
      fontFamily: 'Poppins-Bold',
      fontSize: 10,
    },
});

export default HotelsLists;