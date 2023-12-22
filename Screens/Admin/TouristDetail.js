import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TouristDetail = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>
          Tourists
        </Text>

        <View style={styles.ButtonContainer}>

          <View style={[styles.Detail, {width: containerWidth}]}>
            <View style={styles.UserName}>
              <Image style={styles.UserImage} source={require("../../assets/ellipse.png")}/>
                <Text style={styles.UserNameText}>Name</Text>
            </View>

            <View style={styles.UserDetails}>
              <Text style={styles.UserDetailsText}>Id # :</Text>
              <Text style={styles.UserDetailsText}>Packages :</Text>
            </View>

            <View style={styles.Buttons}>
              <TouchableOpacity
                style={styles.RemoveButton}
              >
                <Text style={styles.ButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.Detail, {width: containerWidth}]}>
            <View style={styles.UserName}>
              <Image style={styles.UserImage} source={require("../../assets/ellipse.png")}/>
                <Text style={styles.UserNameText}>Name</Text>
            </View>

            <View style={styles.UserDetails}>
              <Text style={styles.UserDetailsText}>Id # :</Text>
              <Text style={styles.UserDetailsText}>Packages :</Text>
            </View>

            <View style={styles.Buttons}>
              <TouchableOpacity
                style={styles.RemoveButton}
              >
                <Text style={styles.ButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
          

        </View>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#C8F2F5',
  },
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#1a1a1a',
    shadowColor: 'black',
    elevation: 20,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  Text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
    padding: 20,
  },
  ButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  Detail:{
    backgroundColor: '#1E3740',
    borderRadius: 50,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UserImage: {
    width: 90,
    height: 90,
  },
  UserName:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  UserNameText:{
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 24,
    marginLeft: 20,
  },
  UserDetails:{
    backgroundColor: '#C1D8EA',
    width: '90%',
    marginTop: 20,
    padding: 20,
    borderRadius: 30,
  },
  UserDetailsText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  Buttons:{
    flexDirection: 'row',
    marginTop: 20,
  },
  ButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  RemoveButton: {
    backgroundColor: '#CE1B2E',
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
});

export default TouristDetail;
