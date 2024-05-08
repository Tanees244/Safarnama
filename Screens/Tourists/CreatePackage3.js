import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreatePackage3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [package_id, setPackageId] = useState(null);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (route.params && route.params.package_id) {
      setPackageId(route.params.package_id);
    }

    if (package_id) {
      fetchDates(package_id);
    }
  }, [route.params, package_id]);

  useEffect(() => {
    if (dates.start_date && dates.end_date) {
      const startDate = new Date(dates.start_date);
      const endDate = new Date(dates.end_date);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      const daysArray = [];
      for (let i = 0; i <= differenceInDays; i++) {
        daysArray.push(i + 1);
      }
      setDays(daysArray);
    }
  }, [dates]);

  const fetchDates = async (packageId) => {
    try {
      const response = await fetch(
        `http://192.168.100.18:8000/api/routes/packages/${packageId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dates");
      }
      const data = await response.json();
      console.log(packageId);
      setDates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToHotelsLists = () => {
    navigation.navigate("HotelsLists");
  };

  const navigateToPlacesLists = () => {
    navigation.navigate("PlaceLists");
  };

  const handleSubmit = () => {
    navigation.navigate("PaymentGateway");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        style={styles.Rectangle}
        source={require("../../assets/8.png")}
      >
        <Text style={styles.Text}>
          Planning
          <Text style={[styles.Text, { color: "white" }]}> Your Trip</Text>
        </Text>
      </ImageBackground>
      <View style={styles.ProfileContainer}>
        {days.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayHeading}>Day {day}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttons}
              onPress={navigateToHotelsLists}
            >
              <Text style={styles.buttonText}>Hotel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttons}
              onPress={navigateToPlacesLists}
            >
              <Text style={styles.buttonText}>Places</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#071B26",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Rectangle: {
    height: 300,
    top: -10,
    width: "100%",
    position: "absolute",
  },
  Text: {
    fontSize: 30,
    color: "black",
    marginTop: 150,
    fontFamily: "Poppins-ExtraBold",
    textAlign: "center",
  },
  ProfileContainer: {
    backgroundColor: "#071B26",
    borderRadius: 40,
    marginTop: 250,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
    width: "100%",
    // flexGrow: 1,
  },
  dayHeading:{
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 16  
  },
  dayContainer:{
    alignItems: "center",
    width: "80%",
  },
  buttons: {
    backgroundColor: "white",
    height: 100,
    width: "70%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: '#54aaec',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

export default CreatePackage3;
