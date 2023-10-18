import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminRegister = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8;
  const buttonWidth = containerWidth * 0.8; // 80% of container width

  const navigateToTourists = () => {
    navigation.navigate('AdminTourist'); // Replace with your screen name
  };

  const navigateToGuide = () => {
    navigation.navigate('AdminGuide'); // Replace with your screen name
  };

  const navigateToVendors = () => {
    navigation.navigate('AdminVendors'); // Replace with your screen name
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.rectangle} />
      <View style={[styles.infoContainer, { width: containerWidth }]}>
        <Image style={styles.guideImage} source={require('../../assets/ellipse.png')} />
        <Text style={[styles.guideName, {fontFamily: 'Poppins-SemiBold'}]}>Safarnama</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToTourists}
        >
          <Text style={styles.buttonText}>Tourists</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToGuide}
        >
          <Text style={styles.buttonText}>Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToVendors}
        >
          <Text style={styles.buttonText}>Vendors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A4B0B2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    backgroundColor: '#071B26',
    borderRadius: 46,
    height: 320,
    width: '100%',
    position: 'absolute',
    top: -10,
  },
  infoContainer: {
    backgroundColor: 'white',
    height: 280,
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    borderRadius: 40,
  },
  guideImage: {
    top: 30,
  },
  guideName: {
    fontSize: 20,
    marginTop: 70,
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: '#D9D9D9',
    borderRadius: 33,
    marginTop: 360,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  buttons: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AdminRegister;
