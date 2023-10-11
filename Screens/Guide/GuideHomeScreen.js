//done
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const GuideHome = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8;
  const buttonWidth = containerWidth * 0.8;

  return (
    <View style={styles.Container}>
      <View style={styles.Rectangle} />
      <View style={[styles.InfoContainer, { width: containerWidth }]}>
        <Text style={styles.GuideName}>GUIDE'S NAME</Text>
        <Text style={styles.GuideId}>GUIDE'S ID</Text>
      </View>
      <View style={[styles.ButtonContainer, { width: containerWidth }]}>
        <TouchableOpacity activeOpacity={0.9} style={[styles.Buttons, { width: buttonWidth }]}>
          <Text style={styles.ButtonText}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={[styles.Buttons, { width: buttonWidth }]}>
          <Text style={styles.ButtonText}>Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={[styles.Buttons, { width: buttonWidth }]}>
          <Text style={styles.ButtonText}>Bank Details</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={[styles.Buttons, { width: buttonWidth }]}>
          <Text style={styles.ButtonText}>Questionnaire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#A4B0B2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rectangle: {
    backgroundColor: '#A5A2D8',
    borderRadius: 46,
    height: 320,
    top: -10,
    width: '100%',
    position: 'absolute',
  },
  InfoContainer: {
    backgroundColor: 'white',
    height: 280,
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    borderRadius: 40,
  },
  GuideName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  GuideId: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 5,
  },
  ButtonContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 33,
    marginTop: 360,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  Buttons: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GuideHome;
