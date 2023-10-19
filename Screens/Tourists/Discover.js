import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    image: require('../../assets/Place1.jpg'),
    title: 'Naran',
    description: 'Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters. It is located about 65 kilometers away from Babusar Top',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Place2.jpg'),
    title: 'Kalam',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Place3.jpg'),
    title: 'Kashmir',
    description: 'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range',
    ratings: '3.9/5.0',
  },
];

const data2 = [
  {
    id: '1',
    image: require('../../assets/Hotel1.jpg'),
    title: 'Marriot Hotel',
    description: 'Marriott Hotels & Resorts is Marriott International`s brand of full-service hotels and resorts based in Bethesda, Maryland. As of June 30, 2020, there were 582 hotels and resorts with 205,053 rooms operating under the brand, in addition to 160 hotels with 47,765 rooms planned for development.',
    ratings: '4.5/5.0',
  },
  {
    id: '2',
    image: require('../../assets/Hotel2.jpg'),
    title: 'Pearl Continental',
    description: 'Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.',
    ratings: '3.3/5.0',
  },
  {
    id: '3',
    image: require('../../assets/Hotel3.jpg'),
    title: 'Ramada',
    description: 'Ramada is a large American multinational hotel chain owned by Wyndham Hotels & Resorts. As of December 31, 2022, it operates 851 hotels with 120,3444 rooms across 63 countries under the Ramada brand',
    ratings: '3.9/5.0',
  },
];

const HorizontalCard = ({item}) => {
  
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={item.image} style={styles.image} >
          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/star.png')} style={styles.iconStar}/>
          <Text style={styles.ratingValue}>{item.ratings}</Text>
          </View>
        </ImageBackground>
      </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.CardbuttonContainer}>
          <TouchableOpacity style={styles.Cardbutton}>
            <Text style={styles.CardbuttonText}>Visit Now</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const Discover = () => {

  const navigation = useNavigation();

  const navigateToHotelsInfo = () =>{
    navigation.navigate('HotelsLists')
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
    <View style={styles.container}>
        <Text style={styles.text}>Creating Memories, One Trip at a Time</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttons} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/plane-departure.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Flights</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/bed.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Hotels</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/island-tropical.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Places</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={navigateToHotelsInfo}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/box.png')} 
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Deals</Text>
            </View>
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
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header: {
    height: 100,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
  },
  headerText: {
    textAlign: 'center',
    top: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    width: '75%',
    fontSize: 25,
    padding: 15,
    fontWeight: 'bold',
  },
  buttonContainer:{
    paddingHorizontal: 5,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  buttons:{
    backgroundColor: '#319bd6',
    marginRight: 10,
    borderRadius: 20,
    width: 88,
    height: 95,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    top: 5,
  },
  icon: {
    width: 30,
    height: 30,
    padding: 20,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center', 
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    flexDirection: 'column',
    width: 220,
    paddingBottom: 15,
  },
  imageContainer: {
    height: 280, 
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    paddingTop: 5,
    paddingBottom: 15,
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
  },
  descriptionContainer: {
    height: 280,
  },
  description: {
    fontSize: 13,
    color: '#777',
    flexWrap: 'wrap',
    paddingBottom: 10,
    fontWeight: '400',
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
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  iconStar: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  Cardbutton: {
    backgroundColor: '#071B26',
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  CardbuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },  
  CardbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

export default Discover;
