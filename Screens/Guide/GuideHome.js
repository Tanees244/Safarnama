import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const GuideHome = () => {

  const navigation = useNavigation();
  const [guideData, setGuideData] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8;
  const buttonWidth = containerWidth * 0.8;

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        const response = await fetch('http://192.168.100.12:8000/api/guideRoutes/guide-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch guide details');
        }
        setGuideData(data);
      } catch (error) {
        console.error('Error fetching guide details:', error);
      }
    };
  
    fetchGuideDetails();
  }, []);

  const navigateToPersonalDetails = () => {
    navigation.navigate('GuidePersonalDetail'); // Replace with your screen name
  };

  const navigateToExperience = () => {
    navigation.navigate('GuideExperience'); // Replace with your screen name
  };

  const navigateToQuestionnaire = () => {
    navigation.navigate('GuideQuestionnaire'); // Replace with your screen name
  };

  const navigateToGuideBankDetail = () => {
    navigation.navigate('GuideBankDetail'); // Replace with your screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle} />
      <View style={[styles.infoContainer, { width: containerWidth }]}>
        <Image style={styles.guideImage} source={require('../../assets/ellipse.png')} />
        <Text style={styles.guideName}>{guideData?.name}</Text>
        <Text style={styles.guideId}>{guideData?.guide_id}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToPersonalDetails}
        >
          <Text style={styles.buttonText}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToExperience}
        >
          <Text style={styles.buttonText}>Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToGuideBankDetail}
        >
          <Text style={styles.buttonText}>Bank Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToQuestionnaire}
        >
          <Text style={styles.buttonText}>Questionnaire</Text>
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
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  guideId: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 5,
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

export default GuideHome;
