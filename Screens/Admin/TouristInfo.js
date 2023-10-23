import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TouristInfo = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;
  const buttonWidth = screenWidth * 0.9;
  const inputBoxWidth = containerWidth - 40; // Subtract padding

  const navigation = useNavigation();

  const navigateToAdminRegister = () => {
    navigation.navigate('AirlineProfile');
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
            
            <ImageBackground style={styles.Rectangle} source={require("../../assets/5.png")}>
                <Text style={[styles.Text, {fontFamily: "Poppins-Bold"}]}>
                    Tourist <Text style={[styles.Text, { color: 'white' }]}>Info</Text>
                </Text>
            </ImageBackground>
            <View style={[styles.ProfileContainer, { width: containerWidth }]}>
                
            <View style={[styles.textBox, { width: buttonWidth }]}>
     
     <View style={styles.Profile}>
       <Image
         style={styles.ProfileImage}
         source={require('../../assets/USER.png')}
       />

       <View style={styles.ProfileInfoContainer}>
         <Text style={styles.ProfileName}>Mehdi King</Text>
         <View style={styles.ProfileButtons}>
           <TouchableOpacity style={styles.Button}>
             <Text style={styles.ButtonText}>Past Packages</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.Button}>
             <Text style={styles.ButtonText}>Current Packages</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
     </View>
     <View style={[styles.textBox, { width: buttonWidth }]}>
         <View style={styles.Profile}>
             <Image
                 style={styles.ProfileImage}
                 source={require('../../assets/USER.png')}
             />

             <View style={styles.ProfileInfoContainer}>
                 <Text style={styles.ProfileName}>Afnan Iqbal</Text>
                 <View style={styles.ProfileButtons}>
                 <TouchableOpacity style={styles.Button}>
                     <Text style={styles.ButtonText}>Past Packages</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.Button}>
                     <Text style={styles.ButtonText}>Current Packages</Text>
                 </TouchableOpacity>
                 </View>
             </View>
         </View>
     </View>

     <View style={[styles.textBox, { width: buttonWidth }]}>

         <View style={styles.Profile}>
             <Image
             style={styles.ProfileImage}
             source={require('../../assets/USER.png')}
             />

             <View style={styles.ProfileInfoContainer}>
             <Text style={styles.ProfileName}>Tanees Shakeel</Text>
             <View style={styles.ProfileButtons}>
                 <TouchableOpacity style={styles.Button}>
                 <Text style={styles.ButtonText}>Past Packages</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.Button}>
                 <Text style={styles.ButtonText}>Current Packages</Text>
                 </TouchableOpacity>
             </View>
             </View>
         </View>
   </View>
   

                
                  </View>
      <View style={styles.ButtonContainer1}>
        <TouchableOpacity activeOpacity={0.5} onPress={navigateToAdminRegister}>
          <Image
            style={styles.homeicon}
            source={require('../../assets/camera-indoor-black.png')}
          />
          <Text style={styles.home}>Home</Text>
        </TouchableOpacity>
      </View>
      
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
    },
    Text: {
        fontSize: 30,
        color: 'black',
        marginTop: 190,
        right: 65,
    },
   
      Profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      ProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
      },
      ProfileInfoContainer: {
        flex: 1,
      },
      ProfileName: {
        fontSize: 22,
        fontFamily: "Poppins-SemiBold",
      },
      ProfileButtons: {
        flexDirection: 'row',
        marginTop: 1,
      },
    textBox: {
        marginTop: 10,
        backgroundColor:  '#CDEDFF',
        height: 150,
        borderRadius: 30,
        padding: 20,
        elevation:20,
        shadowColor:'black',
       
    },
    homeicon: {
        width: 24,
        height: 24,
        overflow: "hidden",
    },
    bio: {
        color: 'black',
        right: 100,
        marginTop: 30,
        fontSize: 27,
    },

    home: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        marginTop: 2,
        textAlign: "center",
        color: 'white',
    },

    Rectangle: {
        backgroundColor: 'linear-gradient(190deg, rgb(3, 16, 69), rgb(3, 16, 69))',
        borderRadius: 46,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
      
    },
    Button: {
        backgroundColor: '#213555',
        borderRadius: 10,
        padding: 5, // Reduce padding
        marginRight: 5, // Reduce margin
        width:95,
        alignItems:'center',
      },
      ButtonText: {
        fontFamily: "Poppins-Regular",
        textAlign:'center',
        fontSize: 12,
        color:'white', // Reduce font size
      },
    ProfileContainer: {
        backgroundColor: 'white',
        borderRadius: 28,
        marginTop: 250,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        height: 480,
    },
    Buttons: {
        backgroundColor: 'white',
        height: 90,
        left: 90,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    ButtonContainer1: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#213555',
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 50,
        marginTop: 100,
        width: 100,

    },

});

export default TouristInfo;
