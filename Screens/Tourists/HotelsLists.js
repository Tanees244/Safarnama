import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HorizontalCard = ({ item, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const containerHeight = screenHeight * 0.8;
  const containerWidth = screenWidth * 0.9;

  return (
    <View
      style={[styles.card, { width: containerWidth, height: containerHeight }]}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: `data:image/jpeg;base64,${item.image}` }}
          style={styles.image}
          borderRadius={20}
        >
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../assets/star.png")}
              style={styles.iconStar}
            />
            <Text style={styles.ratingValue}>{item.ratings}</Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.content,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subdescription}>{item.city}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.CardbuttonContainer}>
        <TouchableOpacity style={styles.Cardbutton} onPress={() => onPress(item)}>
          <Text style={styles.CardbuttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HotelsLists = () => {

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const PackageWidth1 = screenWidth * 0.72;
  const [isExpanded, setIsExpanded] = useState(false);
  const scaleValue = new Animated.Value(0);

  const navigateToHotesInfo = () => {
    navigation.navigate("HotelsInfo");
  };

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

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 4],
  });

  const navigateToHotelsInfo = (selectedHotel) => {
    navigation.navigate('HotelsInfo', { Hotel: selectedHotel });
  };

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.100.12:8000/api/routes/hotel-details/");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.error(error.response.data);
      console.error(error.response.status);
    }
  }

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
          Top{" "}
          <Text style={[styles.text, { color: "#2D78A2" }]}>Rated Hotels</Text>
        </Text>
        <FlatList
          data={hotels}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard item={item} onPress={navigateToHotelsInfo} />
          )}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.text}>Hotels</Text>
        <FlatList
          data={hotels}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard item={item} onPress={navigateToHotelsInfo} />
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
  header: {
    height: 140,
    backgroundColor: "#1a1a1a",
    shadowColor: "black",
    elevation: 20,
    zIndex: -1,
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
    marginLeft: 20,
    marginRight: 20,
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
    shadowColor: "black",
    elevation: 20,
  },
  contentContainer: {
    top: 130,
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

export default HotelsLists;
