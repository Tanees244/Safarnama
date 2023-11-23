import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';
import CreateHotel from './CreateHotel';

const HotelDashboard = () => {

    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 0.9;
    const RegisterContainer = containerWidth * 0.7;
    
  const navigation = useNavigation();
    
    const NavigatetoCreatehotel = () => {
        // Navigate to the login screen
        navigation.navigate('CreateHotel');
      };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
            <Image source={require('../../assets/ellipse.png')}/>
          <Text style={styles.Text}>
            Welcome <Text style={[styles.Text, { color: 'white' }]}>Vendor</Text>
          </Text>
        </View>
        <View style={[styles.hotelcontainer, { width: containerWidth }]}>
        <Text style={styles.text} >
                    Add Hotel 
                </Text>
            <TouchableOpacity style={[styles.hotelbutton, { width: RegisterContainer }]} onPress={NavigatetoCreatehotel} >
                <Image style={styles.UploadButtonImage} source={require('../../assets/plus.png')} />
            </TouchableOpacity>
        </View>
        <View style={[styles.hoteldetail, { width: containerWidth }]}>
        <Text style={styles.hoteldetailtext} >  Hotel Name: </Text>
        <Text style={styles.hoteldetailtext} >  City: </Text>
        <Text style={styles.hoteldetailtext} >  Email Address: </Text>
        <Text style={styles.hoteldetailtext} >  phoneNumber: </Text>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Container: {
    backgroundColor: '#e9eaec',
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
  },
  hotelcontainer:{
    backgroundColor: '#272a3e',
    margin:30,
    height:80,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:50,
  },
  hotelbutton:{
    flexDirection:'row',
    padding:20,
  },
  hoteldetail:{
    backgroundColor: '#272a3e',
    margin:0,
    height:140,
    borderRadius:20,
  },
  hoteldetailtext:{
    textAlign:'left',
    color:'white',
    fontSize:20, 
     },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  
  RegisterContainer: {
    backgroundColor: '#272a3e',
    paddingVertical: 20,
    marginTop: 20,
    borderTopRightRadius:100,
    borderTopLeftRadius:100,
    marginBottom: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  UploadButtonImage: {
    width: 50,
    height: 50,
    marginLeft:80,
  },
});

export default HotelDashboard;
