import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, Dimensions } from 'react-native';

const data = [
    {
        id: '3',
        image: require('../../assets/corolla.png'),
        title: 'Corolla',
        Make: 'Toyota',
        description: 'Model:2019',
        description2: 'Driver Name : Ashraf Ali',
        description3: 'Contct Number : 0333 - 1111222',
        description5: 'Number of seats : 4',
        description4: 'Price / Day (With Petrol): 6,000 pkr',
        ratings: '4.5/5.0',
      },
      {
        id: '2',
        image: require('../../assets/civic.png'),
        title: 'Civic',
        Make: 'Honda',
        description: 'Model:2018',
        description2: 'Driver Name : Naseer Uddin',
        description3: 'Contct Number : 0318 - 3332222',
        description5: 'Number of seats : 4',
        description4: 'Price / Day (With Petrol): 6,000 pkr',
        ratings: '4.3/5.0',
      },
      {
        id: '5',
        image: require('../../assets/hiace.png'),
        title: 'Hiace',
        Make: 'Toyota',
        description: 'Model:2020',
        description2: 'Driver Name : Ali Haider',
        description3: 'Contct Number : 0318 - 2223333',
        description5: 'Number of seats : 18',
        description4: 'Price / Day (With Petrol): 10,000 pkr',
        ratings: '3.9/5.0',
      },
      {
        id: '1',
        image: require('../../assets/landcruiser.png'),
        title: 'Land Cruiser',
        Make: 'Toyota',
        description: 'Model:2015',
        description2: 'Driver Name : Yousuf Khan',
        description3: 'Contct Number : 0343 - 0827122',
        description5: 'Number of seats : 5',
        description4: 'Price / Day (With Petrol): 9,000 pkr',
        ratings: '4.9/5.0',
      },
      {
        id: '4',
        image: require('../../assets/coaster.png'),
        title: 'Coaster',
        Make: 'Toyota',
        description: 'Model:2021',
        description2: 'Driver Name : Abid Hassan',
        description3: 'Contct Number : 0332 - 2121212',
        description5: 'Number of seats : 30',
        description4: 'Price / Day (With Petrol): 20,000 pkr',
        ratings: '4.0/5.0',
      },
];


const TransportLists = ({ onTransportSelect }) => {
    const [selectedTransport, setSelectedTransport] = useState(null);
  
    const handleTransportSelect = (item) => {
      setSelectedTransport(item);
      onTransportSelect(item);
    };
  
    const renderItem = ({ item }) => {
      const isSelected = selectedTransport && selectedTransport.id === item.id;
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;
      const containerHeight = screenHeight * 0.8;
      const containerWidth = screenWidth * 0.9;
      const buttonWidth = containerWidth * 0.22;
      return (
        <TouchableOpacity
          style={[styles.card, isSelected ? styles.selectedCard : null]}
          onPress={() => handleTransportSelect(item)}
        >
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
            <Text style={styles.subdescription}>{item.make}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.description}>{item.description2}</Text>
              <Text style={styles.description}>{item.description3}</Text>
              <Text style={styles.description}>{item.description4}</Text>
              <Text style={styles.description}>{item.description5}</Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
                <Text style={styles.headerText}>Safarnama</Text>
            </View>
      <Text style={styles.header1}>Choose Rental Transport</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedTransport}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cee7fa',
    alignItems: 'center',
  },

  header: {
    height: 100,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width:Dimensions.get('window').width,
},
headerText: {
    textAlign: 'center',
    top: 20,
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
},
  header1: {
    fontSize: 24,
    fontFamily:'Poppins-Bold',
    marginBottom: 20,
    color:'#032844',
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
  selectedCard: {
    borderColor: '#54aaec',
    borderWidth: 2,
  },
  image: {
    height: 180,
    width: 320,
    shadowColor: 'black',
    elevation: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
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
});

export default TransportLists;
