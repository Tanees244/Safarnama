import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import Dropdown from "react-native-modal-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreatePackage = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 0.7;
  const inputWidth = containerWidth * 0.9;
  const RWidth = containerWidth * 0.4;
  const buttonWidth = containerWidth * 0.6;

  const cities = [
    "Balakot",
    "Naran",
    "Murree",
    "Kaghan",
    "Gilgit",
    "Azad Kashmir",
    "Muzaffarabad",
    "Hunza",
  ];
  const preference = ["Solo", "Partner", "Friends", "Family"];

  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [dateSelect1, setdateSelect1] = useState("");
  const [dateSelect2, setdateSelect2] = useState("");
  const [destination, setDestination] = useState(null);
  const [adultPreference, setAdultPreference] = useState(null);
  const [numberOfIndividuals, setNumberOfIndividuals] = useState(1);

  const saveDataToState = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Retrieved token:", token); 
      if (!token) {
        console.log("Token not found. Redirecting to login...");
        Alert.alert(
          "Sign In Required",
          "Please sign in to save your package details.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Sign In", onPress: () => navigation.navigate("Login") },
          ],
          { cancelable: false }
        );
        return;
      }

      const data = {
        destination,
        dateSelect1,
        dateSelect2,
        adultPreference,
        numberOfIndividuals,
      };

      const response = await fetch("http://192.168.100.18:8000/api/routes/create-package/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data saved successfully:", responseData.package_id);
        navigation.navigate("CreatePackage2", { package_id: responseData.package_id });
      } else {
        console.error("Failed to save data to API");
        Alert.alert("Error", "Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data to API:", error);
      Alert.alert("Error", "Failed to save data. Please try again.");
    }
  };

  const incrementNumberOfIndividuals = () => {
    setNumberOfIndividuals((prevCount) => prevCount + 1);
  };

  const decrementNumberOfIndividuals = () => {
    if (numberOfIndividuals > 1) {
      setNumberOfIndividuals((prevCount) => prevCount - 1);
    }
  };

  const toggleDatepicker1 = () => {
    setShowPicker1(!showPicker1);
  };

  const toggleDatepicker2 = () => {
    setShowPicker2(!showPicker2);
  };

  const onChange1 = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker1();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
        setdateSelect1(formattedDate);
      }
    } else {
      toggleDatepicker1();
    }
  };
  
  const onChange2 = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      const startDate = date; // Assuming date is the start date selected
  
      const timeDifference = Math.abs(currentDate.getTime() - startDate.getTime());
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
      if (daysDifference > 7) {
        alert("You can select a date range of up to 7 days.");
        return;
      }
  
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker2();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
        setdateSelect2(formattedDate);
      }
    } else {
      toggleDatepicker2();
    }
  };
  
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
          <Text style={styles.Text}>
            Create Your{" "}
            <Text style={[styles.Text, { color: "#7CA7D1" }]}>Package</Text>
          </Text>
        </View>

        <View style={styles.ButtonContainer}>
          <Text style={styles.Heading}>Destination</Text>

          <View style={[{ width: inputWidth }, styles.Input]}>
            <Dropdown
              options={cities}
              defaultValue="Where Do You Want To Go ?"
              style={styles.DropdownText}
              textStyle={{
                fontSize: 13,
                color: "grey",
                fontFamily: "Poppins-Regular",
              }}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, value) => setDestination(value)}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>

          <View style={[{ width: inputWidth }, styles.DateContainer]}>
            <View style={styles.DepartureContainer}>
              <Text style={styles.Heading}>Departure</Text>
              <View style={[{ width: RWidth }, styles.Input]}>
                {showPicker1 && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange1}
                  />
                )}
                {!showPicker1 && (
                  <Pressable onPress={toggleDatepicker1}>
                    <TextInput
                      style={styles.DropdownText}
                      placeholder="Start Date"
                      placeholderTextColor={"grey"}
                      value={dateSelect1}
                      onChangeText={setdateSelect1}
                      editable={false}
                    />
                  </Pressable>
                )}
              </View>
            </View>

            <View style={styles.ArrivalContainer}>
              <Text style={styles.Heading}>Arrival</Text>
              <View style={[{ width: RWidth }, styles.Input]}>
                {showPicker2 && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange2}
                  />
                )}
                {!showPicker2 && (
                  <Pressable onPress={toggleDatepicker2}>
                    <TextInput
                      style={styles.DropdownText}
                      placeholder="End Date"
                      placeholderTextColor={"grey"}
                      value={dateSelect2}
                      onChangeText={setdateSelect2}
                      editable={false}
                    />
                  </Pressable>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.Heading}>Preferences</Text>
          <View style={styles.Input}>
            <Dropdown
              options={preference}
              defaultValue="Select Your Desired Preference"
              textStyle={styles.DropdownText}
              dropdownStyle={styles.DropdownContainer}
              onSelect={(index, value) => setAdultPreference(value)}
              dropdownTextStyle={styles.CustomDropdownText}
              dropdownPosition={0}
              dropdownOffset={{ top: 0, left: 10 }}
            />
          </View>

          <Text style={styles.Heading}>Number Of Individual</Text>
          <View>
            <View style={styles.NumberInput}>
              <TouchableOpacity onPress={decrementNumberOfIndividuals}>
                <Text style={styles.NumberButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.NumberDisplay}>{numberOfIndividuals}</Text>
              <TouchableOpacity onPress={incrementNumberOfIndividuals}>
                <Text style={styles.NumberButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.Button}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={saveDataToState}
            style={[styles.buttonText, { width: buttonWidth }]}
          >
            <Text style={styles.TextDesign}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  Container: {
    backgroundColor: "#DEE9F7",
    flex: 1,
  },
  Button: {
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    borderRadius: 38,
    backgroundColor: "#54aaec",
    justifyContent: "center",
    alignItems: "center",
  },
  TextDesign: {
    fontSize: 20,
    padding: 10,
    color: "#082847",
    fontFamily: "Poppins-Bold",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    backgroundColor: "#032844",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  RegisterContainer: {
    paddingVertical: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  Text: {
    fontSize: 30,
    color: "#082847",
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  ButtonContainer: {
    marginTop: 20,
    backgroundColor: "#264769",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  Heading: {
    fontFamily: "Poppins-Bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
  },
  SubHeading: {
    fontFamily: "Poppins-Medium",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  calendar: {
    margin: 8,
    marginTop: 15,
  },
  DateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Input: {
    backgroundColor: "#CADCF4",
    paddingHorizontal: 15,
    borderRadius: 15,
    fontFamily: "Poppins-Regular",
    height: 60,
    justifyContent: "center",
    marginTop: 5,
  },
  DropdownText: {
    fontSize: 13,
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  DropdownContainer: {
    backgroundColor: "#b6daf7",
    borderRadius: 15,
    width: 320,
  },
  CustomDropdownText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
    color: "black",
  },
  NumberInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  NumberButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#b6daf7",
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  NumberDisplay: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default CreatePackage;