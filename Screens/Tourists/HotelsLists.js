import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    image: require('../../assets/Hotel3.jpg'),
    title: 'Marriot Hotel',
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

const HorizontalCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
        <ImageBackground source={item.image} style={styles.image}>
          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/star.png')} style={styles.iconStar} />
            <Text style={styles.ratingValue}>{item.ratings}</Text>
          </View>
        </ImageBackground>
        </View>
        <View style={styles.content}>
            <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subdescription}>{item.city}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.CardbuttonContainer}>
            <TouchableOpacity style={styles.Cardbutton}>
              <Text style={styles.CardbuttonText}>Book Now</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
};
  

const HotelsLists = () => {

  const navigation = useNavigation();
 

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
        <Text style={styles.text}>Hotels</Text>
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
  )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#9dd1ee',
    },
    header: {
        height: 150,
        backgroundColor: '#82D3DE',
        shadowColor: 'black',
        elevation: 20,
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        top: 70,
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },
    text: {
        width: '75%',
        fontSize: 30,
        padding: 30,
        color: 'white',
        fontFamily: 'Poppins-Bold',
    },
    buttonContainer:{
        paddingHorizontal: 5,
        paddingVertical: 20,
        flexDirection: 'row',
    },
    card: {
        marginLeft: 40,
        flexDirection: 'column',
        width: 340,
        height: 700,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
    imageContainer: {
    },
    image: {
        height: 200,
        width: 280,
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
        height: 700,
        top: -100, 
        zIndex: -1,
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 0, height: 20 }, // Shadow offset (adjust as needed)
        shadowOpacity: 0.5, // Shadow opacity (adjust as needed)
        shadowRadius: 10,
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
        flexDirection: 'row',
        justifyContent: 'center',
        top: 60,
    },  
});

export default HotelsLists;
