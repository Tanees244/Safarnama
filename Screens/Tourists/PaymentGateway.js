import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';

const PaymentGateway = ({ route }) => {
  const navigation = useNavigation();
  const { email, totalPrice } = route.params;
  const [PaymentPrice, setPaymentPrice] = useState(totalPrice);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
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
    if (error) {
      Alert.alert(`Error Code: ${error.code}`, error.message);
    } else {
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
    const { paymentIntent, ephemeralKey, customer } = await response.json();
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
      setPaymentPrice(0);
      Alert.alert('Success', 'Your order is confirmed!');
      setTimeout(() => {
        navigation.navigate('Discover');
      }, 3000);
      setReady(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <Text style={styles.titleText}>
        Payment <Text style={styles.titleTextHighlight}>Checkout</Text>
      </Text>
      <View style={styles.paybox}>
        <Text style={styles.totalText}>Total payment: {PaymentPrice} PKR</Text>
        <StripeProvider publishableKey="pk_test_51N4iDhKsAkXEeSiVqAMxPzEdV665Osiy3pdcg2h3tI4ANiO6JPPW6P3wkSOPc8Z122WPv6Eyx3C48hXY4oj6sWge00ohqxmG8d">
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.payButton}
            disabled={!ready || loading}
            onPress={handlePayment}
          >
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </StripeProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAE8EE",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 140,
    backgroundColor: "#405676",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    elevation: 20,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  titleText: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
  },
  titleTextHighlight: {
    color: "#405676",
  },
  paybox: {
    width: Dimensions.get("window").width * 0.9,
    padding: 20,
    backgroundColor: "#405676",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#5BC0F8",
  },
  totalText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-MediumItalic",
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: "#5BC0F8",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  payButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default PaymentGateway;
