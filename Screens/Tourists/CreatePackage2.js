import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';

const CreatePackage2 = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 1.05;
  const inputWidth = containerWidth * 0.6;
  const RWidth = containerWidth * 0.9;

  const navigation = useNavigation();
  const [flightSelected, setFlightSelected] = useState(false);
  const [busSelected, setBusSelected] = useState(false);
  const [trainSelected, setTrainSelected] = useState(false);
  const [skipSelected, setSkipSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

   
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleCreatePackage3 = () => {
    if (!isChecked && !(flightSelected || busSelected || trainSelected)) {
      alert('Please select a transportation option or skip this part.');
      return;
    }

    navigation.navigate('CreatePackage3');
  };

  const handleFlight = () => {
    setFlightSelected(true);
    setBusSelected(false);
    setTrainSelected(false);
    navigation.navigate('Flight');
  };

  const handleBus = () => {
    setFlightSelected(false);
    setBusSelected(true);
    setTrainSelected(false);
    navigation.navigate('Bus');
  };

  const handleTrain = () => {
    setFlightSelected(false);
    setBusSelected(false);
    setTrainSelected(true);
    navigation.navigate('Train');
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
          <Text style={{ fontSize: 22, fontFamily: 'Poppins-Bold', textAlign: 'center', color: 'white' }}>
            Transport To <Text style={styles.Text}>Islamabad</Text>
          </Text>
        </View>

        <View style={styles.ButtonContainer}>
          <Text style={styles.Heading}>Select Mode Of Transport</Text>
          <View style={[{ width: RWidth }, styles.Roww]}>
            <Image style={styles.train} contentFit="cover" source={require('../../assets/airplane.png')} />
            <TouchableOpacity
              style={[{ width: inputWidth }, styles.Input, flightSelected && styles.selectedOption]}
              onPress={handleFlight}>
              <Text style={styles.DropdownText}>
                FLIGHT
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[{ width: RWidth }, styles.Roww]}>
            <Image style={styles.train} contentFit="cover" source={require('../../assets/bus.png')} />
            <TouchableOpacity
              style={[{ width: inputWidth }, styles.Input, busSelected && styles.selectedOption]}
              onPress={handleBus}>
              <Text style={styles.DropdownText}>
                BUS
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[{ width: RWidth }, styles.Roww]}>
            <Image style={styles.train} contentFit="cover" source={require('../../assets/train.png')} />
            <TouchableOpacity
              style={[{ width: inputWidth }, styles.Input, trainSelected && styles.selectedOption]}
              onPress={handleTrain}>
              <Text style={styles.DropdownText}>
                TRAIN
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.checkboxContainer}> */}
            <CheckBox
              title='Skip this part if you want to go on your own!'
              checked={isChecked}
              onPress={handleCheckBox}
              textStyle={styles.checkboxText}
              containerStyle={styles.checkboxContainer}
            />
          {/* </View> */}
        </View>

        <View style={styles.Button}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleCreatePackage3}
            style={[styles.buttonText, { width: inputWidth }]}
            disabled={!isChecked && !(flightSelected || busSelected || trainSelected)}>
            <Text style={styles.TextDesign}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  Container: {
    backgroundColor: '#cee7fa',
    flex: 1,
  },
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 120,
      backgroundColor: '#032844',
  },
  headerText: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'Poppins-Bold',
      marginTop: 40,
  },
  Button:{
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
      borderRadius: 38,
      backgroundColor: '#54aaec',
      justifyContent: 'center',
      alignItems: 'center',
  },
  TextDesign: {
      fontSize: 20,
      padding: 10,
      color: '#082847',
      fontFamily: 'Poppins-Bold',
  },
  RegisterContainer: {
    backgroundColor: '#092547',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10,
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  Text: {
    fontSize: 24,
    color: '#54aaec',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  ButtonContainer: {
    marginTop: 20,
    backgroundColor: '#264769',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  Heading: {
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  Roww: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    height: 100,
    backgroundColor: '#cee7fa',
    borderRadius: 25,
  },
  train: {
    margin: 8,
    marginTop: 15,
    height: 35,
    width: 35,
  },
  Input: {
    backgroundColor: '#092547',
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
    height: 60,
  },
  DropdownText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#54aaec', // Change to your desired highlight color
  },
  checkboxText: {
    fontSize: 16,
    color: 'black', // Adjust the color to your preference
    fontFamily: 'Poppins-Bold',
  },
  checkboxContainer: {
    backgroundColor: 'white', // Change the background color of the checkbox container
    borderRadius: 25,
    borderWidth: 2, // Optionally, remove border if not needed
    marginTop: 20,
  },
});

export default CreatePackage2;
