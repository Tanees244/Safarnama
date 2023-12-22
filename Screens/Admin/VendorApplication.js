import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Modal  from 'react-native-modal';

const VendorApplication = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>
          Vendor Applications
        </Text>

        <View style={styles.ButtonContainer}>

          <View style={[styles.Detail, {width: containerWidth}]}>
            <Image style={styles.UserImage} source={require("../../assets/ellipse.png")}/>
            <View style={styles.UserDetail}>
              <View style={styles.UserName}>
                <Text style={styles.UserNameText}>Vendor Name</Text>
                <TouchableOpacity
                  style={styles.ReadMoreButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.ReadMoreText}>Read More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Buttons}>
                <TouchableOpacity
                  style={styles.ApproveButton}
                >
                  <Text style={styles.ButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.RejectButton}
                >
                  <Text style={styles.ButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.Detail, {width: containerWidth}]}>
            <Image style={styles.UserImage} source={require("../../assets/ellipse.png")}/>
            <View style={styles.UserDetail}>
              <View style={styles.UserName}>
                <Text style={styles.UserNameText}>Vendor Name</Text>
                <TouchableOpacity
                  style={styles.ReadMoreButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.ReadMoreText}>Read More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Buttons}>
                <TouchableOpacity
                  style={styles.ApproveButton}
                >
                  <Text style={styles.ButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.RejectButton}
                >
                  <Text style={styles.ButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

      </ScrollView>

      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
         <TouchableOpacity onPress={toggleModal} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
          </TouchableOpacity>
          
          <Text style={styles.modalHeading}>Modal Heading</Text>
          <View style={styles.modalDetails}>
            <Text style={styles.ModalDetailText}>Name :</Text>
            <Text style={styles.ModalDetailText}>Type :</Text>
            <Text style={styles.ModalDetailText}>Details :</Text>
          </View>
          <TouchableOpacity style={styles.modalButton}>
           <Text style={styles.modalButtonText}>Logo</Text>
         </TouchableOpacity>
          </View>
        </Modal>

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
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UserImage: {
    width: 90,
    height: 90,
  },
  UserDetail:{
    padding: 15,
  },  
  MoreButton:{
    height: 35,
    width: 35,
  },
  UserName:{
    alignItems: 'center',
  },
  UserNameText:{
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 24,
  },
  ReadMoreText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'white',
  },
  ReadMoreButton:{
    backgroundColor: '#4391F3',
    padding: 15,
    borderRadius: 30,
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
  ApproveButton: {
    backgroundColor: '#47B2F5',
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  RejectButton: {
    backgroundColor: '#CE1B2E',
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    marginLeft: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  modalHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#47B2F5',
    padding: 15,
    width: 300,
    borderRadius: 30,
    marginBottom: 10,
  },
  modalButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalDetails:{
    backgroundColor: '#C4C8CA',
    borderRadius: 20,
    padding: 30,
    width: "100%",
    marginBottom: 20,
  },
  ModalDetailText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});

export default VendorApplication;
