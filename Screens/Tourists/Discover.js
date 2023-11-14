import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    image: require('../../assets/Place1.jpg'),
    title: 'Naran',
    city: 'Islamabad',
    description: 'Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters. It is located about 65 kilometers away from Babusar Top',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Place2.jpg'),
    title: 'Kalam',
    city: 'Islamabad',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Place3.jpg'),
    title: 'Kashmir',
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

const Discover = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth;
  const PackageWidth = screenWidth * 0.8;
  const buttonWidth = containerWidth * 0.22;

  const navigation = useNavigation();

  const navigateToHotelsInfo = () =>{
    navigation.navigate('HotelsLists')
  };
  const navigateToPlaceLists = () =>{
    navigation.navigate('PlaceLists')
  };
  const navigateToFlight = () =>{
    navigation.navigate('Flight')
  };
  const navigateToCreatePackage = () =>{
    navigation.navigate('CreatePackage')
  };

  const navigateToGuideProfile = () => {
    navigation.navigate('TouristProfile'); // Replace with your screen name
};

const navigateToGuideHome = () => {
    navigation.navigate('Discover'); // Replace with your screen name
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <View style={styles.ButtonContainer1}>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideHome}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/Home.png")}/>
                         <Text style={styles.home} >Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToCreatePackage} >
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/searchlogo.png")}/>
                         <Text style={styles.home}>Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideHome}>
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/itenerary.png")}/>
                         <Text style={styles.home} >Itinerary</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={navigateToGuideProfile} >
                    <Image style={styles.homeicon}
                        contentFit="cover"
                        source={require("../../assets/account-circle-black.png")}/>
                         <Text style={styles.home}>Profile</Text>
                </TouchableOpacity>
            </View>
    <ScrollView >
        <View style={styles.quote}>
        <Text style={styles.quotetext}>Creating Memories, {'\n'}One Trip at a Time</Text>
        </View>
        <View style={[styles.buttonContainer, { width: containerWidth }]}>
          <TouchableOpacity style={[styles.buttons, {width: buttonWidth}]} onPress={navigateToFlight}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/plane.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Flights</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {width: buttonWidth}]} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/hotell.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Hotels</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {width: buttonWidth}]} onPress={navigateToPlaceLists}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/placess.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Places</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {width: buttonWidth}]} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/deal.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Deals</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PackageContainer}>
          <TouchableOpacity onPress={navigateToCreatePackage} style={[styles.Package , {width: PackageWidth}]}>
            <Text style={styles.PackageText}>Create Your Package !</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Places</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <HorizontalCard item={item} />}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.text}>Hotels</Text>
        <FlatList
          data={data2}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <HorizontalCard item={item} />}
          keyExtractor={(item) => item.id}
        />
    </ScrollView>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#cee7fa',
  },
  home: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
    color: 'white',
  },
  homeicon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  
  ButtonContainer1: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#213555',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
    zIndex: 2,
    position: 'absolute',
    bottom: 20,
    alignSelf:'center',
    width: 230,
    
},
  header: {
    height: 120,
    backgroundColor: '#213555',
    shadowColor: 'black',
    elevation: 20,
    borderRadius:40,
    },
  headerText: {
      textAlign: 'center',
      top: 50,
      fontSize: 30,
      color: '#FFFFFF',
      fontFamily: 'Poppins-Bold',
  },

  quote:{
    margin:20,
    backgroundColor:'#213555',
    borderTopRightRadius:40,
    borderBottomLeftRadius:40,
    justifyContent:'center',
  },
  quotetext: {
    fontSize: 25,
    paddingTop: 25,
    textAlign:'center',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },

  text: {
    fontSize: 25,
    paddingTop: 25,
    textAlign:'center',
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer:{
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttons:{
    backgroundColor: '#213555',
    borderRadius: 30,
    height: 80,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    top: 5,
  },
  icon: {
    width: 30,
    height: 25,
    padding: 15,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center', 
    padding: 15,
  },
  PackageContainer:{
    alignItems: 'center',
  },

  Package:{
    backgroundColor: '#213555',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowColor: 'white',
  },
  PackageText:{
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: 'white',
  },
  card: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 80,
      marginTop: 15,
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 20,
  },
  image: {
      height: 220,
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
    borderRadius:30,
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
    backgroundColor: 'rgba(0,0,0,0.5)', // Background color with opacity
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
    width: 70,  // Adjust the width as needed
    height: 70,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 2,
  },  
});

export default Discover;
