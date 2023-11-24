//done
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreatePackage3 = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;
  const buttonWidth = containerWidth * 0.8; // 80% of container width
  const inputWidth = containerWidth * 0.6;

  const handleCreatePackage3 = () => {
      navigation.navigate('PaymentGateway');
    };
  const navigateToHotelsLists = () => {
    navigation.navigate('HotelsLists'); // Replace with your screen name
  };

  const navigateToExperience = () => {
    navigation.navigate('GuideExperience'); // Replace with your screen name
  };

  const navigateToPlacesLists = () => {
    navigation.navigate('PlaceLists'); // Replace with your screen name
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container} >
         <ImageBackground style={styles.Rectangle} source={require("../../assets/8.png")}>
                <Text style={styles.Text}>
                    Your <Text style={[styles.Text, { color: 'white' }]}> Journey</Text>
                </Text>

            </ImageBackground>
     
     <View style={[styles.ProfileContainer, { width: containerWidth }]}>
     <Text style={styles.Heading}>Day 1</Text>
     <View style={styles.Roww}>
     <Image style={styles.train} contentFit="cover" source={require('../../assets/arrow-4.png')} />
     <Text style={{color:'white'}}>
     Arrived in Islamabad
     </Text>
     </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToHotelsLists}
        >
          <Text style={styles.buttonText}>Hotel </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToExperience}
        >
          <Text style={styles.buttonText}>Transport</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.buttons, { width: buttonWidth }]}
          onPress={navigateToPlacesLists}
        >
          <Text style={styles.buttonText}>Places</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={handleCreatePackage3}
                        style={[styles.buttonText2, { width: inputWidth }]}
                        >
                        <Text style={styles.TextDesign}>NEXT</Text>
                    </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#071B26',
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rectangle: {
    height: 300,
    top: -10,
    width: '100%',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    borderRadius: 900,
},
Text: {
    fontSize: 30,
    color: 'black',
    marginTop: 150,
    right: 15,
    fontFamily: 'Poppins-ExtraBold',
    textAlign:'center',
},
Roww: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    right:80,

},
Heading: {
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 26,
    textAlign: 'center',
    color:'white',
},
ProfileContainer: {
    backgroundColor: '#071B26',
    borderRadius: 40,
    marginTop: 200,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow:1,
    
},

train: {
    margin: 8,
    marginTop: 15,
    height:18,
    width:25,
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
    backgroundColor: '#071B26',
    borderRadius: 33,
    marginTop: 50,
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
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  buttonText2: {
    margin: 20,
    flexDirection: 'row',
    borderRadius: 38,
    backgroundColor: '#54aaec',
    justifyContent: 'center',
    alignContent: 'center',

},
TextDesign: {
    fontSize: 24,
    padding: 10,
    color: '#092547',
    fontFamily: 'Poppins-ExtraBold',
},
});

export default CreatePackage3;
