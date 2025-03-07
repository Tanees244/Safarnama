import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const HorizontalCard = ({ item, onPress, isUnrated }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const containerHeight = screenHeight * 0.35;
  const containerWidth = screenWidth * 0.85;
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState("");
  const [packageId, setPackageId] = useState("");

  const toggleModal = (id) => {
    setPackageId(id);
    setModalVisible(!modalVisible);
  };

  const handleSubmitRating = async () => {
    if (rating >= 1 && rating <= 5) {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.post(
          "http://192.168.100.18:8000/api/routes/update-rating",
          { package_id: packageId, rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Rating updated successfully:", response.data);
        setModalVisible(false);
        // You can update the local state or fetch data again if needed
      } catch (error) {
        console.error("Error updating rating:", error);
        // Handle error or show an error message to the user
      }
    } else {
      alert("Please enter a valid rating between 1 and 5.");
    }
  };
  

  return (
    <View
      style={[styles.card, { width: containerWidth, height: containerHeight }]}
    >
      <View style={styles.ratingContainer}>
        <Image
          source={require("../../assets/star.png")}
          style={styles.iconStar}
        />
        <Text style={styles.ratingValue}>{item.rating}</Text>
      </View>
      <View
        style={[
          styles.content,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.destination}</Text>
          <Text style={styles.subdescription}>
            Number Of Person: {item.no_of_person}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Preferences: {item.preferences}
            </Text>
          </View>
        </View>
      </View>
      {isUnrated && ( 
        <View style={styles.CardbuttonContainer}>
          <TouchableOpacity
            style={styles.Cardbutton}
            onPress={() => toggleModal(item.package_id)}
          >
            <Text style={styles.CardbuttonText}>Rate Package</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rate Package</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rating (1-5)"
            keyboardType="numeric"
            onChangeText={(text) => setRating(text)}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitRating}
          >
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const Rating = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const PackageWidth1 = screenWidth * 0.72;
  const [isExpanded, setIsExpanded] = useState(false);

  const scaleValue = new Animated.Value(0);

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.timing(scaleValue, {
      toValue,
      duration: 0,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleMenuItemPress = (menuItem) => {
    if (menuItem === "Home") {
      navigation.navigate("Discover");
    } else if (menuItem === "Profile") {
      navigation.navigate("TouristProfile");
    } else if (menuItem === "Booking") {
      navigation.navigate("CreatePackage");
    } else if (menuItem === "Itinerary") {
      navigation.navigate("Itinerary");
    }
    toggleMenu();
  };

  const navigateToPlacesInfo = (selectedPlace) => {
    navigation.navigate("PlacesInfo", { place: selectedPlace });
  };

  const [places, setPlaces] = useState([]);
  const [TopPlaces, setTopPlaces] = useState([]);

  useEffect(() => {
    fetchData();
    fetchTopData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      const response = await axios.get(
        "http://192.168.100.18:8000/api/routes/tourist-unrated-packages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTopData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      const response = await axios.get(
        "http://192.168.100.18:8000/api/routes/tourist-rated-packages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopPlaces(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      {isExpanded && (
        <View style={[styles.expandedMenu, { width: PackageWidth1 }]}>
          <TouchableOpacity
            style={[styles.expandedMenuItem, { bottom: 140, left: -80 }]}
            onPress={() => handleMenuItemPress("Home")}
          >
            <Image
              source={require("../../assets/Home.png")}
              style={[{ width: 30, height: 30 }]}
            />
            <Text style={styles.expandedMenuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.expandedMenuItem, { bottom: 120, left: -70 }]}
            onPress={() => handleMenuItemPress("Profile")}
          >
            <Image
              source={require("../../assets/account-circle-black.png")}
              style={[{ width: 30, height: 30 }]}
            />
            <Text style={styles.expandedMenuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.expandedMenuItem, { bottom: 65, left: -75 }]}
            onPress={() => handleMenuItemPress("Booking")}
          >
            <Image
              source={require("../../assets/booking.png")}
              style={[{ width: 30, height: 30 }]}
            />
            <Text style={styles.expandedMenuItemText}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.expandedMenuItem, { bottom: -15, left: -120 }]}
            onPress={() => handleMenuItemPress("Itinerary")}
          >
            <Image
              source={require("../../assets/itenerary.png")}
              style={[{ width: 30, height: 30 }]}
            />
            <Text style={styles.expandedMenuItemText}>Itinerary</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.HomeButton}
        onPress={toggleMenu}
        activeOpacity={0.5}
      >
        {isExpanded ? (
          <Image
            source={require("../../assets/WhiteClose.png")}
            style={[{ width: 30, height: 30 }]}
          />
        ) : (
          <Image
            source={require("../../assets/ViewMore.png")}
            style={[{ width: 35, height: 35 }]}
          />
        )}
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.text}>
          Un
          <Text style={[styles.text, { color: "#2D78A2" }]}>
            Rated Packages
          </Text>
        </Text>
        <FlatList
          data={places}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard item={item} onPress={navigateToPlacesInfo} isUnrated={true}/>
          )}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.text}>Rated Pacakges</Text>
        <FlatList
          data={TopPlaces}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard item={item} onPress={navigateToPlacesInfo} />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#cee7fa",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  header: {
    height: 140,
    backgroundColor: "#1a1a1a",
    shadowColor: "black",
    elevation: 20,
    zIndex: -1,
  },
  searchBar: {
    height: 60,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    fontFamily: "Poppins-Regular",
    marginBottom: 25,
    width: 300,
    alignSelf: "center",
  },
  headerText: {
    textAlign: "center",
    top: 60,
    fontSize: 30,
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  text: {
    width: "75%",
    fontSize: 30,
    padding: 30,
    color: "#1f4084",
    fontFamily: "Poppins-Bold",
  },
  buttonContainer: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    flexDirection: "row",
  },
  card: {
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 30,
    flexDirection: "column",
    width: 340,
    height: 600,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    height: 200,
    width: 280,
    resizeMode: "contain",
  },
  contentContainer: {
    top: 150,
  },
  content: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 340,
    height: 600,
    top: -100,
    zIndex: -1,
  },
  title: {
    paddingLeft: 18,
    fontSize: 20,
    color: "black",
    fontFamily: "Poppins-SemiBold",
  },
  subdescription: {
    fontSize: 14,
    paddingLeft: 18,
    color: "#777",
    fontFamily: "Poppins-Regular",
  },
  description: {
    fontSize: 14,
    color: "#2B2D2D",
    paddingLeft: 18,
    paddingTop: 20,
    fontFamily: "Poppins-Medium",
  },
  ratingContainer: {
    position: "absolute",
    top: 10, // Adjust top position as needed
    left: 10, // Adjust left position as needed
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  ratingValue: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  iconStar: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  Cardbutton: {
    backgroundColor: "#071B26",
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  CardbuttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
  CardbuttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  HomeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 80, // Adjust the width as needed
    height: 80,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 2,
  },
  expandedMenu: {
    position: "absolute",
    bottom: 20,
    left: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 3,
  },
  expandedMenuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "black",
  },
  expandedMenuItemText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 10,
  },
});

export default Rating;
