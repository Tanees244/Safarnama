import React, { useState, useEffect } from "react";
import {   View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; 

const PaymentFormModal = () => {
 
    const screenWidth = Dimensions.get("window").width;
    const containerWidth = screenWidth * 0.95;
    const buttonWidth = containerWidth * 0.95;
    const inputWidth = containerWidth * 0.5;
    const inputWidth1 = containerWidth * 0.5;
    const submitButton = screenWidth * 0.4;
    const uploadButtonWidth = containerWidth * 0.9;
    const [email, setEmail] = useState("");
    const [Data, setData] = useState([]);
    const [packagePrice, setPackagePrice] = useState(0);
    const navigation = useNavigation();
    
    const handleProceed = () => {
        // Navigate to PaymentGateway screen and pass data as props
        navigation.navigate("PaymentGateway", {
          totalPrice: getTotalPayment(),
          email: email
        });
        
      };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
  
          // Fetch hotel booking price
          const hotelBookingResponse = await axios.get(
            "http://192.168.100.12:8000/api/VendorsRoutes/hotel-booking-price",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(hotelBookingResponse.data);
  
          // Fetch package price
        //   const packagePriceResponse = await axios.get(
        //     "http://192.168.100.12:8000/api/VendorsRoutes/package-price",
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );
  
        //   setPackagePrice(packagePriceResponse.data);
        //   console.log(packagePriceResponse.data);
        } catch (error) {
          console.error("Error:", error);
          Alert.alert("Error", "Failed to fetch data. Please try again later.");
        }
    };
  
      fetchData();
    }, []);
  
    const getTotalPrice = () => {
      if (!Array.isArray(Data) || Data.length === 0) {
        return 0; // Return 0 if data is not an array or is empty
      }
  
      let totalPrice = 0;
      Data.forEach(item => {
        totalPrice += item.price * item.rooms;
      });

      return totalPrice;
    };
  
    const getTotalPayment = () => {
      // Initialize total payment with service fee
      let totalPayment = 1000;
    
      // Add package price if available
      if (packagePrice && packagePrice.p !== null) {
        totalPayment += parseFloat(packagePrice.p);
      }
      totalPayment += getTotalPrice();
      totalPayment += 7000;
   console.log(totalPayment);
      return totalPayment;
    };
  

  return (
    <View style={styles.Container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Safarnama</Text>
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.Text}>
        Payment{" "}
        <Text style={[styles.Text, { color: "#405676" }]}>Checkout</Text>
      </Text>

      <View style={[styles.Headercontainer, { width: containerWidth }]}>
        <View style={[styles.paymentheader, { width: containerWidth }]}>
          <Text
            style={{ fontSize: 20, fontFamily: "Poppins-SemiBold", left: 10 }}
          >
            Package Itinerary
          </Text>
          <TouchableOpacity style={styles.ChangeButton}>
            <Text style={{ color: "blue" }}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 15, left: 30 }}>
          11 - 16 Juni 2023 * 2 Per, 1 Chi
        </Text>

        <View style={[styles.Buttons, { width: buttonWidth }]}>
          <Image
            style={styles.UserIcon}
            contentFit="cover"
            source={require("../../assets/Naran2.png")}
          />
          <View>
            <TouchableOpacity style={[styles.cont, { width: inputWidth }]}>
              <Text style={{ fontFamily: "Poppins-Bold", left: 20 }}>
                Your Package{" "}
              </Text>
              <Text style={{ left: 20 }}>
                You can see your package Itinerary, lorem ipsum lorem ipsum
                lorem ipsum{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.paymentcontainer, { width: containerWidth }]}>
        <Text
          style={{ fontSize: 20, fontFamily: "Poppins-SemiBold", left: 10 }}
        >
          Payment Method
        </Text>
        <View style={[styles.Buttons1, { width: buttonWidth }]}>
          <Image
            style={styles.UserIcon1}
            source={require("../../assets/stripe.png")}
          />
          <View style={[styles.cont, { width: inputWidth1 }]}>
            <Text style={{ fontFamily: "Poppins-Bold", left: 20 }}>
              5543 9929 0013 9925
            </Text>
            <Text style={{ left: 20 }}>Afnan Iqbal </Text>
          </View>
          <TouchableOpacity>
            <Text style={{ color: "blue", left: 30 }}>Change</Text>
          </TouchableOpacity>
        </View>
        <View >
        <TextInput
      style={styles.emailInput}
      onChangeText={setEmail} // Update email state when input changes
      value={email}
      placeholder="Enter your email"
      keyboardType="email-address"
    />
    </View>
      </View>
      <View style={[styles.paymentbox, { width: containerWidth }]}>
        <Text
          style={{ fontSize: 20, fontFamily: "Poppins-SemiBold", left: 10 }}
        >
          Price Details
        </Text>
        <View style={[styles.Buttons2, { width: buttonWidth }]}>
          <Text style={{ fontFamily: "Poppins-Bold" }}>Package Price: </Text>
          <Text style={{ fontFamily: "Poppins-Light" }}>{packagePrice.p} PKR</Text>
        </View>
        <View style={[styles.Buttons2, { width: buttonWidth }]}>
          <Text style={{ fontFamily: "Poppins-Bold" }}>
           Hotel Prices
          </Text>
          <Text style={{ fontFamily: "Poppins-Light" }}>{getTotalPrice()} PKR</Text>
        </View>

        <View style={[styles.Buttons2, { width: buttonWidth }]}>
          <Text style={{ fontFamily: "Poppins-Bold" }}>
            Transport Price:{" "}
          </Text>
          <Text style={{ fontFamily: "Poppins-Light" }}>7,000 pkr</Text>
        </View>
        <View style={[styles.Buttons2, { width: buttonWidth }]}>
          <Text style={{ fontFamily: "Poppins-Bold" }}>Service Fee: </Text>
          <Text style={{ fontFamily: "Poppins-Light" }}>1000 pkr</Text>
        </View>
      </View>
      <View style={[styles.paybox, { width: containerWidth }]}>
        <View style={[styles.Buttons3, { width: buttonWidth }]}>
          <Text
            style={{
              fontFamily: "Poppins-MediumItalic",
              left: 50,
              color: "white",
            }}
          >
            Total payment:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-ExtraBold",
              left: 60,
              color: "white",
            }}
          >
           {getTotalPayment()} PKR
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.submitButton, { width: submitButton }]}
          onPress={handleProceed}
        >
          <Text style={styles.submitButtonText}>Pay Now</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#CAE8EE",
      },
      Container: {
        flex: 1,
      },
      emailContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: "80%",
        alignSelf: "center",
      },
      emailInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "Poppins-Regular",
        color:'black',
      },
      header: {
        height: 100,
        backgroundColor: "#405676",
        shadowColor: "black",
        elevation: 20,
        zIndex: -1,
      },
      headerText: {
        textAlign: "center",
        top: 40,
        color: "white",
        fontSize: 30,
        fontFamily: "Poppins-Bold",
      },
      Buttons: {
        height: 150,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 30,
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "row",
      },
      Buttons1: {
        height: 100,
        marginLeft: 10,
        borderRadius: 30,
        alignItems: "center",
        flexDirection: "row",
      },
      Buttons2: {
        height: 30,
        marginLeft: 10,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
      },
      Buttons3: {
        height: 30,
        marginLeft: 10,
        borderRadius: 30,
      },
      cont: {},
      UserIcon: {
        width: 110,
        height: 110,
        borderRadius: 20,
      },
      UserIcon1: {
        width: 70,
        height: 70,
      },
    
      ChangeButton: {
        marginLeft: 105,
      },
      submitButtonText: {
        fontSize: 25,
        fontFamily: "Poppins-Bold",
        color: "white",
        textAlign: "center",
      },
      Headercontainer: {
        backgroundColor: "#F0F3F9",
        marginTop: 20,
        marginBottom: 10,
        height: 230,
      },
      paymentcontainer: {
        backgroundColor: "#F0F3F9",
        marginBottom: 30,
        height: 120,
      },
      paymentbox: {
        backgroundColor: "#F0F3F9",
        marginBottom: 30,
        marginTop:40,
        height: 180,
      },
      paybox: {
        backgroundColor: "#405676",
        marginBottom: 30,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "#5BC0F8",
      },
    
      paymentheader: {
        height: 30,
        flexDirection: "row",
      },
    
      Text: {
        fontSize: 30,
        color: "black",
        fontFamily: "Poppins-Bold",
        marginTop: 30,
        padding: 0,
      },
      submitButton: {
        backgroundColor: "#5BC0F8",
        borderRadius: 30,
        height: 40,
        right: 40,
      },
});

export default PaymentFormModal;
