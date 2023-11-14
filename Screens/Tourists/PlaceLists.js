import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    image: require('../../assets/Place1.jpg'),
    title: 'Naran',
    city: 'KPK',
    description: 'Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters. ',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Place3.jpg'),
    title: 'Kalam',
    city: 'GB',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Place2.jpg'),
    title: 'Kashmir',
    city: 'PUNJAB',
    description: 'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range',
    ratings: '3.9/5.0',
  },
];

const data2 = [
  {
    id: '1',
    image: require('../../assets/Place1.jpg'),
    title: 'Naran',
    city: 'KPK',
    description: 'Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters.',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Place2.jpg'),
    title: 'Kashmir',
    city: 'PUNJAB',
    description: 'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Place3.jpg'),
    title: 'KALAM',
    city: 'GB',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
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
  
  

const PlaceLists = () => {

    const navigation = useNavigation();

    const handleDiscoverPress = () => {
        navigation.navigate('Discover')
    }

    const navigateToPlacesInfo = () => {
        navigation.navigate('PlacesInfo')
    }
  
    return (
      <View style={styles.Container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Safarnama</Text>
        </View>
        <TouchableOpacity 
            style={styles.HomeButton}
            onPress={handleDiscoverPress}
            activeOpacity={0.5}
            >
            <Image source={require("../../assets/Home.png")} style = {[{width: 30, height: 30}]}/>
        </TouchableOpacity>
        <ScrollView>
          <Text style={styles.text}>Top <Text style={[styles.text, { color: '#2D78A2' }]}>Rated Places</Text></Text>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <HorizontalCard item={item} onPress={navigateToPlacesInfo} />}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.text}>Places</Text>
          <FlatList
            data={data2}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <HorizontalCard item={item} onPress={navigateToPlacesInfo}/>}
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

export default PlaceLists;