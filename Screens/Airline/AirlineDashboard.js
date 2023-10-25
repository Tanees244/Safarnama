import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const AirlineDashboard = () => {

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 0.7;
  const inputWidth = containerWidth * 0.9;
  
  const navigation = useNavigation();
  
  const [text, setText] = useState('');
  const textInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleTextChange = (newText) => {
    setText(newText);

    const totalHeight = (newText.split('\n').length * 25) + 50;

    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        height: Math.max(55, totalHeight),
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
        <View style={styles.ButtonContainer}>
          <View style={styles.PackageContainer}>
            <Text>Hello</Text>
          </View>
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
    backgroundColor: '#181922',
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#032844',
    shadowColor: 'black',
    elevation: 20,
    zIndex: -1,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  RegisterContainer: {
    paddingVertical: 20,
    marginTop: 20,
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
  ButtonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  PackageContainer:{
    backgroundColor: '#262a3e',
  },
});

export default AirlineDashboard;
