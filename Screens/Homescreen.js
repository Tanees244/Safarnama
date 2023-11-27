import React, {useEffect} from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Vector } from '../assets';
import Login from "./Login";
import Discover from './Tourists/Discover';
import { Video, ResizeMode } from 'expo-av';


const HomeScreen = () => {

  const navigation = useNavigation();
  const video = React.useRef(null);

  const handleRegisterPress = () => {
    // Navigate to the registration screen
    navigation.navigate("Category");
  };

  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.navigate("Login");
  };

  const handleDiscoverPress = () => {
    // Navigate to the login screen
    navigation.navigate(Discover);
  };

  useEffect(() => {
    // Start playing the video when the component mounts
    (async () => {
      if (video.current) {
        await video.current.playAsync();
      }
    })();
  }, []);

  return(
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.backgroundVideo}
          source={require('../assets/V3.mp4')}
          resizeMode={ResizeMode.STRETCH}
          isLooping
          isMuted
        
          
        />
        <View style={styles.Textcontainer}>

            <Image style={styles.vector} source={Vector}/>
            <Text style={styles.text}>Safarnama</Text>

            <TouchableOpacity
            onPress={handleLoginPress}
            activeOpacity={0.5}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.gap} />

            <TouchableOpacity
            onPress={handleRegisterPress}
            activeOpacity={0.5} 
            style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.horizontalLine1}></View>

            <View style={styles.guest}>
              <Text style={styles.Text2}>Continue as</Text>
                <TouchableOpacity
                onPress={handleDiscoverPress}
                activeOpacity={0.5}
                >
                  <Text style={styles.boldText}> GUEST</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine2}></View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Textcontainer: {
    flex: 1,
    top: 180,
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  vector:{
    top: 25,
    right: 140,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  button: {
    backgroundColor: '#092547',
    paddingHorizontal: 15,
    paddingVertical: 16,
    width: '60%',
    top: 250,
    borderRadius: 20,
    height:65,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#092547',
    borderWidth: 3,
  },
  buttonOutlineText: {
    color: '#092547',
    fontSize: 16,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
  },
  guest: {
    marginTop: 280,
    flexDirection: 'row',
  },
  Text2: {
    color: '#092547',
    fontFamily: 'Poppins-Black',
    fontSize: 16,
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Poppins-Black',
    color: 'white',
    marginLeft:5,
  },
  gap:{
    height: 10,
  },
  horizontalLine1: {
    borderBottomColor: '#092547',
    borderWidth: 1,
    width: 70,
    top: 293,
    right: 118,
  },
  horizontalLine2: {
    borderBottomColor: '#092547',
    borderWidth: 1,
    width: 70,
    bottom: 18,
    left: 118,
  },
});


export default HomeScreen;