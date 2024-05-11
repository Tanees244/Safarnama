import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const GuideDocument = () => {

  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.26;
  const submitButton = screenWidth * 0.8;
  const containerWidth = screenWidth * 0.9;
  const indicatorWidth = screenWidth * 0.2;

  const [images, setImages] = useState(new Array(4).fill(null));

  const route = useRoute();
  const { guideId } = route.params;

  const pickImage = async (index) => {
    try {
      console.log(index);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
    
      console.log("ImagePicker Result:", result);
    
      if (!result.canceled && result.assets.length > 0) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri; // Accessing URI from the first asset
        setImages(newImages);
        console.log("Selected Image URI:", result.assets[0].uri);
      } else {
        console.log("Image picking cancelled.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  
  
  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, {
        uri: image,
        type: 'image/jpeg',
        name: `image${index + 1}.jpg`,
      });
    });

    formData.append('guideId', guideId);
  
    try {
      console.log("Submitting form with images:", images);
  
      const response = await axios.post(
        "http://192.168.100.12:8000/api/guideRoutes/guide_submit_documents",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      console.log("Form submission response:", response.data);
  
      if (response.status === 200) {
        console.log("User registered successfully");
        navigation.navigate("GuideExperience", { guideId });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Documents</Text>

        <View style={styles.indicator}>
          <View style={[styles.pageIndicatorActive, { width: indicatorWidth }]} />
          <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
          <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
          <View style={[styles.pageIndicator, { width: indicatorWidth }]} />
        </View>

        <View style={[styles.uploadContainer, { width: containerWidth }]}>
        {/* Image upload buttons */}
        {images.map((image, index) => (
          <View style={styles.subContainer} key={index}>
            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: buttonWidth }]}
              onPress={() => pickImage(index)}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/upload.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[{ fontFamily: 'Poppins-Regular', color: 'white' }]}>Placeholder Text</Text>
            </View>
          </View>
        ))}
      </View>

        <TouchableOpacity activeOpacity={0.9} style={[styles.submitButton, { width: submitButton }]} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#1a1a1a',
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
  text: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 30,
    marginBottom: 20,
  },
  indicator: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  pageIndicator: {
    borderWidth: 1,
    borderRadius: 30,
    height: 15,
    borderColor: 'black',
    backgroundColor: '#CCCCCC',
    marginHorizontal: 5,
  },
  pageIndicatorActive: {
    borderWidth: 1,
    borderRadius: 30,
    height: 15,
    borderColor: 'white',
    backgroundColor: '#071B26',
    marginHorizontal: 5,
  },
  uploadContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    backgroundColor: '#4f697c',
    borderRadius: 60,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    borderRadius: 38,
    backgroundColor: '#319BD6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 30,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});

export default GuideDocument;
