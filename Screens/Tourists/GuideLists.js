import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, Dimensions } from 'react-native';

const data = [
    {
        id: '3',
        image: require('../../assets/USER.png'),
        title: 'Guide Name : Muhammad Shoib',
        Make: 'Age: 26 yrs',
        description3: 'Contct Number : 0333 - 1111222',
        description4: 'Price / Day : 3,000 pkr',
        ratings: '4.5/5.0',
      },
      {
        id: '2',
        image: require('../../assets/USER.png'),
        title: 'Guide Name : Naseer Uddin',
        Make: 'Age: 29 yrs',
        description3: 'Contct Number : 0318 - 3332222',
        description4: 'Price / Day : 4,000 pkr',
        ratings: '4.3/5.0',
      },
      {
        id: '5',
        image: require('../../assets/USER.png'),
        title: 'Guide Name :  Ali Haider',
        Make: 'Age: 24 yrs',
        description3: 'Contct Number : 0318 - 2223333',
        description4: 'Price / Day ): 4,500 pkr',
        ratings: '3.9/5.0',
      },
      {
        id: '1',
        image: require('../../assets/USER.png'),
        title: 'Guide Name :  Yousuf Khan',
        Make: 'Age: 34 yrs',
        description3: 'Contct Number : 0343 - 0827122',
        description4: 'Price / Day (With Petrol): 2,500 pkr',
        ratings: '4.9/5.0',
      },
      {
        id: '4',
        image: require('../../assets/USER.png'),
        title: 'Guide Name :  Abid Hassan',
        Make: 'Age: 32 yrs',
        description3: 'Contct Number : 0332 - 2121212',
        description4: 'Price / Day : 2,000 pkr',
        ratings: '4.0/5.0',
      },
];


const GuideLists = ({ onGuideSelect }) => {
    const [selectedGuide, setSelectedGuide] = useState(null);
  
    const handleTransportSelect = (item) => {
        setSelectedGuide(item);
      onGuideSelect(item);
    };
  
    const renderItem = ({ item }) => {
      const isSelected = selectedGuide && selectedGuide.id === item.id;
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
            <Text style={styles.subdescription}>{item.Make}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{item.description3}</Text>
              <Text style={styles.description}>{item.description4}</Text>
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
      <Text style={styles.header1}>Choose Guide</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedGuide}
        vertical
        showsVerticalScrollIndicator={false}
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
        width: 280,
        height: 400,
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
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    textAlign:'center',
},
description: {
    fontSize: 14,
    color: '#2B2D2D',
    textAlign:'center',

    fontFamily: 'Poppins-SemiBold',
},
  selectedCard: {
    borderColor: '#54aaec',
    borderWidth: 2,
  },
  image: {
    height: 150,
    width: 160,
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
    textAlign:'center',
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  ratingContainer: {
    position: 'absolute',
    top: 140, // Adjust top position as needed
    left: 40, // Adjust left position as needed
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
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

export default GuideLists;
