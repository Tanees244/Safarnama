import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';

const PaymentGateway = ({ route }) => {
  const navigation = useNavigation();
  const { email, totalPrice } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.95;
  const buttonWidth = containerWidth * 0.95;
  const inputWidth = containerWidth * 0.5;
  const inputWidth1 = containerWidth * 0.5;
  const submitButton = screenWidth * 0.4;
  const uploadButtonWidth = containerWidth * 0.9;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Data, setData] = useState([]);
  const [packagePrice, setPackagePrice] = useState(0);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const [paymentInitialized, setPaymentInitialized] = useState(false); // Track if payment sheet is initialized
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [ready, setReady] = useState(false);
  

useEffect(() => {
  initializePaymentSheet();
}, []);


  

    const initializePaymentSheet = async () => {
 
        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
        });
        if(error){
          Alert.alert(`Error Code: ${error.code}`,error.message);
        }
        else{
          setReady(true);
        }
    };

    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://192.168.100.12:8000/api/PaymentRoutes/payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          amount: totalPrice,
        }),
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  console.log(response.data);

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };

    
  const handlePayment = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      setReady(false);
    }
  };


  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>

        <Text style={styles.Text}>
          Payment{" "}
          <Text style={[styles.Text, { color: "#405676" }]}>Checkout</Text>
        </Text>



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
             {totalPrice} PKR
            </Text>
          </View>
          <StripeProvider publishableKey="pk_test_51N4iDhKsAkXEeSiVqAMxPzEdV665Osiy3pdcg2h3tI4ANiO6JPPW6P3wkSOPc8Z122WPv6Eyx3C48hXY4oj6sWge00ohqxmG8d">
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.submitButton, { width: submitButton }]}
          disabled={!ready || loading}
          onPress={handlePayment}
          
        >
          <Text style={styles.submitButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </StripeProvider>
        </View>

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

export default PaymentGateway;
