import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  const GuideApplication = () => {
    navigation.navigate('GuideApplication');
  };

  const VendorApplication = () => {
    navigation.navigate('VendorApplication');
  };

  const TouristDetail = () => {
    navigation.navigate('TouristDetail');
  };

  const VendorDetail = () => {
    navigation.navigate('VendorDetail');
  };

  const GuideDetail = () => {
    navigation.navigate('GuideDetail');
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>

        <Svg height="100%" width="100%" style={styles.backgroundEllipse}>
          <Ellipse cx="60%" cy="10%" rx="300" ry="300" fill="#071B2E" />
        </Svg>

        <Text style={styles.Text}>Admin {'\n'}Dashboard</Text>

        <Text style={styles.Heading}>Applications</Text>

        <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={GuideApplication}
                >
                    <Image source={require('../../assets/Application.png')}/>
                    <Text style={styles.ButtonText}>Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.Button}
                onPress={VendorApplication}
                >
                    <Image source={require('../../assets/Application.png')}/>
                    <Text style={styles.ButtonText}>Vendor</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.Heading, {color:'black'}]}>Users</Text>

        <View style={styles.UserContainer}>

            <TouchableOpacity 
                style={[styles.User, {width: containerWidth}]}
                onPress={TouristDetail}
                >
                    <Image source={require('../../assets/Tourist.png')}/>
                    <Text style={styles.UserText}>Tourist</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.User, {width: containerWidth}]}
                onPress={GuideDetail}
                >
                    <Image source={require('../../assets/Guide.png')}/>
                    <Text style={styles.UserText}>Guide</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.User, {width: containerWidth}]}
                onPress={VendorDetail}
                >
                    <Image source={require('../../assets/Vendor.png')}/>
                    <Text style={styles.UserText}>Vendor</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#DDEBF5',
  },
  backgroundEllipse: {
    position: 'absolute',
  },
  Text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    marginTop: 80,
    padding: 20,
  },
  ButtonText:{
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 16,
  },
  Heading:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: 'white',
    padding: 20,
  },
  ButtonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  Button: {
    backgroundColor: '#4E7596',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 120,
    height: 140,
    borderRadius: 20,
  },
  UserContainer:{
    alignItems: 'center',
  },
  User:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4E8A96',
    borderRadius: 30,
    height: 120,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  UserText:{
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    paddingTop: 5,
  },
});

export default AdminDashboard;
