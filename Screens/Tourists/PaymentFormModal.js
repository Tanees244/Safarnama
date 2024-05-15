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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PaymentFormModal = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.95;
  const buttonWidth = containerWidth * 0.95;
  const inputWidth = containerWidth * 0.85;
  const submitButton = screenWidth * 0.4;
  const [email, setEmail] = useState("");
  const [Data, setData] = useState([]);
  const [packagePrice, setPackagePrice] = useState(0);
  const navigation = useNavigation();

  const handleProceed = () => {
    navigation.navigate("PaymentGateway", {
      totalPrice: getTotalPayment(),
      email: email,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        const hotelBookingResponse = await axios.get(
          "http://192.168.100.12:8000/api/VendorsRoutes/hotel-booking-price",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(hotelBookingResponse.data.hotelBookingResults);

        const packagePriceResponse = await axios.get(
          "http://192.168.100.12:8000/api/VendorsRoutes/package-price",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPackagePrice(packagePriceResponse.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const getTotalPrice = () => {
    return Data.reduce((total, item) => total + item.price * item.rooms, 0);
  };

  const getTotalPayment = () => {
    let totalPayment = 1000;
    if (packagePrice && packagePrice.p !== null) {
      totalPayment += parseFloat(packagePrice.totalPrice);
    }
    return totalPayment;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>
          Payment <Text style={styles.highlight}>Details</Text>
        </Text>

        <View style={[styles.sectionContainer, { width: containerWidth }]}>


          <Text style={styles.emailLabel}>Please Provide Email:</Text>
          <TextInput
            style={[styles.input, { width: inputWidth }]}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.sectionContainer, { width: containerWidth }]}>

          <View style={styles.priceDetailsRow}>
            <Text style={styles.priceDetailsLabel}>Package Price: </Text>
            <Text style={styles.priceDetailsValue}>{packagePrice.totalPrice} PKR</Text>
          </View>
          <View style={styles.priceDetailsRow}>
            <Text style={styles.priceDetailsLabel}>Hotel Prices</Text>
            <Text style={styles.priceDetailsValue}>{getTotalPrice()} PKR</Text>
          </View>
          <View style={styles.priceDetailsRow}>
            <Text style={styles.priceDetailsLabel}>Service Fee: </Text>
            <Text style={styles.priceDetailsValue}>1000 PKR</Text>
          </View>
        </View>

        <View style={[styles.paymentSummary, { width: containerWidth }]}>
          <View style={styles.paymentSummaryDetails}>
            <Text style={styles.paymentSummaryLabel}>Total payment: </Text>
            <Text style={styles.paymentSummaryValue}>{getTotalPayment()} PKR</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.submitButton, { width: submitButton }]}
            onPress={handleProceed}
          >
            <Text style={styles.submitButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAE8EE",
  },
  header: {
    height: 140,
    backgroundColor: "#405676",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    elevation: 20,
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginVertical: 30,
  },
  highlight: {
    color: "#405676",
  },
  sectionContainer: {
    backgroundColor: "#F0F3F9",
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  sectionSubtitle: {
    fontSize: 15,
    marginBottom: 15,
  },
  changeButton: {
    padding: 5,
  },
  changeButtonText: {
    color: "blue",
  },
  packageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  packageImage: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginRight: 15,
  },
  packageDetails: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  packageDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  paymentMethodImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  emailLabel: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  priceDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  priceDetailsLabel: {
    fontFamily: "Poppins-Bold",
  },
  priceDetailsValue: {
    fontFamily: "Poppins-Light",
  },
  paymentSummary: {
    backgroundColor: "#405676",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop:50,
  },
  paymentSummaryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  paymentSummaryLabel: {
    fontFamily: "Poppins-MediumItalic",
    color: "white",
  },
  paymentSummaryValue: {
    fontFamily: "Poppins-ExtraBold",
    color: "white",
  },
  submitButton: {
    backgroundColor: "#5BC0F8",
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default PaymentFormModal;
