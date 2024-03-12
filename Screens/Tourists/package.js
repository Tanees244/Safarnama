import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Packages = () => {
  const [packageData, setPackageData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.100.12:8000/api/packages/");
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDiscoverPress = () => {
    navigation.navigate("Discover");
  };

  const handleBookNowPress = (packageItem) => {
    console.log("Book Now Pressed for package:", packageItem);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={handleDiscoverPress}
        activeOpacity={0.5}
      >
        <Image source={require("../../assets/Home.png")} style={styles.icon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {packageData.map((packageItem) => (
          <View key={packageItem.package_id} style={styles.packageItem}>
            <View style={styles.textContainer}>
              <View style={styles.rightText}>
                <Image source={require("../../assets/star.png")} style={styles.icon} />
                <Text>{packageItem.rating}</Text>
              </View>
            </View>
            <Text style={styles.packageDestination}>
              Destination: {packageItem.destination}
            </Text>
            <Text style={styles.packageDates}>
              Dates: {packageItem.start_date} to {packageItem.end_date}
            </Text>
            <Text style={styles.packagePrice}>
              Price: ${parseFloat(packageItem.price).toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => handleBookNowPress(packageItem)}
            >
              <Text style={styles.bookNowButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  homeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 70,
    height: 70,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 2,
  },
  textContainer: {
    flexDirection: "row",
  },
  rightText: {
    width: "65%",
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  packageItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  packageDestination: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  packageDates: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 5,
  },
  packagePrice: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#319bd6",
    marginTop: 5,
  },
  bookNowButton: {
    backgroundColor: "#071B26",
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bookNowButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
});

export default Packages;
