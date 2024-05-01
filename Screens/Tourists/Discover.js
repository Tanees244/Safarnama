import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const data = [
  {
    id: "1",
    image: require("../../assets/Place1.jpg"),
    title: "Naran",
    city: "Islamabad",
    description:
      "Naran is a town and popular tourist destination in upper Kaghan Valley in the Mansehra District of the Khyber Pakhtunkhwa province of Pakistan. It is located 119 kilometers from Mansehra city at the altitude of 2,409 meters. It is located about 65 kilometers away from Babusar Top",
    ratings: "4.5/5.0",
  },
  {
    id: "2",
    image: require("../../assets/Place2.jpg"),
    title: "Kalam",
    city: "Islamabad",
    description:
      "Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.",
    ratings: "3.3/5.0",
  },
  {
    id: "3",
    image: require("../../assets/Place3.jpg"),
    title: "Kashmir",
    city: "Islamabad",
    description:
      'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range',
    ratings: "3.9/5.0",
  },
];

const data2 = [
  {
    id: "4",
    image: require("../../assets/Hotel1.jpg"),
    title: "Marriot Hotel",
    city: "Islamabad",
    description:
      "Marriott Hotels & Resorts is Marriott International`s brand of full-service hotels and resorts based in Bethesda, Maryland. As of June 30, 2020, there were 582 hotels and resorts with 205,053 rooms operating under the brand, in addition to 160 hotels with 47,765 rooms planned for development.",
    ratings: "4.5/5.0",
  },
  {
    id: "5",
    image: require("../../assets/Hotel2.jpg"),
    title: "Pearl Continental",
    city: "Islamabad",
    description:
      "Kalam is a valley located 99 kilometres from Mingora in the northern upper section of Swat valley along the banks of the Swat River in the Khyber Pakhtunkhwa province of Pakistan. The Swat River was formed as a result of the confluence of two major tributaries, the Gabral and Ushu river.",
    ratings: "3.3/5.0",
  },
  {
    id: "6",
    image: require("../../assets/Hotel3.jpg"),
    title: "Ramada",
    city: "Islamabad",
    description:
      "Ramada is a large American multinational hotel chain owned by Wyndham Hotels & Resorts. As of December 31, 2022, it operates 851 hotels with 120,3444 rooms across 63 countries under the Ramada brand",
    ratings: "3.9/5.0",
  },
];

const packageData = [
  {
    id: "7",
    image: require("../../assets/Naran1.png"),
    title: "Naran",
    numberOfPeople: "5 Adults, 2 Child",
    preference: "Luxury",
    startDate: "2023-12-01",
    endDate: "2023-12-07",
    price: "$2500",
    ratings: "4.2/5.0",
  },
  {
    id: "8",
    image: require("../../assets/Naran2.png"),
    title: "Kashmir",
    numberOfPeople: "2 Adults, 1 Child",
    preference: "Luxury",
    startDate: "2023-12-01",
    endDate: "2023-12-07",
    price: "$2500",
    ratings: "4.5/5.0",
  },
  {
    id: "9",
    image: require("../../assets/Naran3.png"),
    title: "Naran",
    numberOfPeople: "2 Adults, 1 Child",
    preference: "Luxury",
    startDate: "2023-12-01",
    endDate: "2023-12-07",
    price: "$2500",
    ratings: "3.5/5.0",
  },
  {
    id: "10",
    image: require("../../assets/Naran4.png"),
    title: "Kaghan",
    numberOfPeople: "2 Adults, 1 Child",
    preference: "Luxury",
    startDate: "2023-12-01",
    endDate: "2023-12-07",
    price: "$2500",
    ratings: "4.2/5.0",
  },
];

const HorizontalCard = ({ item, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const containerHeight = screenHeight * 0.8;
  const containerWidth = screenWidth * 0.8;

  return (
    <View
      style={[styles.card, { width: containerWidth, height: containerHeight }]}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: `data:image/jpeg;base64,${item.images}` }}
          style={styles.image}
          borderRadius={20}
        >
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../assets/star.png")}
              style={styles.iconStar}
            />
            <Text style={styles.ratingValue}>{item.rating}</Text>
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
        <TouchableOpacity style={styles.Cardbutton} onPress={onPress}>
          <Text style={styles.CardbuttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const VerticalCard = ({ item }) => {
  
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const containerHeight = screenHeight * 0.5;
  const containerWidth = screenWidth * 0.8;
  const navigation = useNavigation();
  
  const navigatetopackages = () => {
    navigation.navigate("Packages");
  };

  return (
    <View
      style={[
        styles.verticalCard,
        { width: containerWidth, height: containerHeight },
      ]}
    >
      <ImageBackground source={item.image} style={styles.verticalImage}>
        <View style={styles.blurContainer}>
          <View style={styles.cardContent}>
            <Text style={styles.packageDetail}>{item.destination}</Text>
            <Text style={styles.packageDetail}>{item.numberOfPeople}</Text>
            <Text style={styles.packageDetail}>{item.preference}</Text>
            <Text
              style={styles.packageDetail}
            >{`${item.startDate} - ${item.endDate}`}</Text>
            <Text style={styles.packageDetail}>{item.price}</Text>
            <Text style={styles.packageDetail}>{item.ratings}</Text>
          <TouchableOpacity style={styles.arrowbutton}
          onPress={navigatetopackages}
          >
          <Image
          style={styles.arrow}
          source={require("../../assets/arrow-4.png")}
        />
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};


const Discover = () => {

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth;
  const PackageWidth = screenWidth * 0.8;
  const PackageWidth1 = screenWidth * 0.72;
  const buttonWidth = containerWidth * 0.22;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      return authToken !== null;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = await checkAuthentication();
      setIsAuthenticated(authenticated);
    };

    checkAuthStatus();
  }, []);

  const handleProfilePress = () => {
    if (isAuthenticated) {
      navigation.navigate("TouristProfile");
    } else {
      Alert.alert(
        "Sign In Required",
        "Please sign in to view your profile.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Sign In", onPress: () => navigation.navigate("Login") },
        ],
        { cancelable: false }
      );
    }
  };

  const handleBookingPress = () => {
    if (isAuthenticated) {
      navigation.navigate("CreatePackage");
    } else {
      Alert.alert(
        "Sign In Required",
        "Please sign in to view your profile.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Sign In", onPress: () => navigation.navigate("Login") },
        ],
        { cancelable: false }
      );
    }
  };

  const scaleValue = new Animated.Value(0);

  const navigateToHotelsInfo = () => {
    navigation.navigate("CreatePackage2");
  };
  const navigateToPlaceLists = () => {
    navigation.navigate("PlaceLists");
  };
  const navigateToFlight = () => {
    navigation.navigate("Flight");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    // Fetch place data
    fetchPlaceData();

    // Fetch hotel data
    fetchHotelData();
  }, []);

  const combinedData = [...placeData, ...hotelData];

  const filteredData = combinedData.map(item => {
    if (item.hasOwnProperty("gallery")) {
      return { ...item, type: "place" };
    } else {
      return { ...item, type: "hotel" };
    }
  }).filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  

  const fetchPlaceData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.12:8000/api/routes/places"
      );
      setPlaceData(response.data);
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  const fetchHotelData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.12:8000/api/routes/hotel-details"
      );
      setHotelData(response.data);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };


  const handleItemPress = (item) => {
    if (item.type === "place") {
      // Navigate to place info screen
      navigation.navigate("PlacesInfo", { place: item });
    } else if (item.type === "hotel") {
      // Navigate to hotel info screen
      navigation.navigate("HotelsInfo", { Hotel: item });
    }
    setSearchQuery(""); // Clear search query after navigation
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
    } else if (menuItem === "Itinerary") {
      navigation.navigate("Itinerary");
    }
    toggleMenu();
  };

  return (
    <View style={styles.container}>
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
            onPress={handleProfilePress}
          >
            <Image
              source={require("../../assets/account-circle-black.png")}
              style={[{ width: 30, height: 30 }]}
            />
            <Text style={styles.expandedMenuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.expandedMenuItem, { bottom: 65, left: -75 }]}
            onPress={handleBookingPress}
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
        <View style={styles.quote}>
          <Text style={styles.quotetext}>
            Let's find your best{"\n"}
            <Text style={{ color: "#c7f3ff" }}>Travel plans ?</Text>
          </Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search places and hotels"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <View style={styles.searchResults}>
          {searchQuery.length > 0 && (
            <View>
              <FlatList
                horizontal
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                      <View style={styles.resultItem}>
                        <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.itemImage} />
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.rating}>{item.rating}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>

        <Text style={styles.text}>Popular Categories</Text>
        <View style={[styles.buttonContainer, { width: containerWidth }]}>
          <TouchableOpacity
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToFlight}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/plane.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Flights</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToHotelsInfo}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/hotell.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Hotels</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToPlaceLists}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/placess.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Places</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { width: buttonWidth }]}
            onPress={navigateToHotelsInfo}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/deal.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Deals</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Packages</Text>
        <FlatList
          data={packageData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <VerticalCard item={item} />}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.PackageContainer}>
          <TouchableOpacity
            onPress={handleBookingPress}
            style={[styles.Package, { width: PackageWidth }]}
          >
            <Text style={styles.PackageText}>Create Your Package !</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Places</Text>
        <FlatList
          data={placeData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard
              item={item}
              onPress={() => navigateToPlaceLists()}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.text}>Hotels</Text>
        <FlatList
          data={hotelData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalCard
              item={item}
              onPress={() => navigateToHotelsInfo()}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041c23",
    flex: 1,
  },
  arrow: {
    height: 30,
    width: "30%",
    position: 'absolute',
  },
  arrowbutton: {
    backgroundColor:" rgba(0, 0, 0, 0.6)",
    height:40,
    width:150,
    borderRadius: 40,
    justifyContent:'center',
    alignItems:'center',

  },
  home: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
    color: "white",
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  itemTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  searchInput: {
    height: 60,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  searchContainer: {
    backgroundColor: "#2a9d8f",
    marginLeft: 20,
    marginRight: 0,
    padding: 20,
    borderRadius: 25,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
    marginLeft: 15,
  },
  rating: {
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  resultItem: {},
  backgroundImage: {
    position: "relative",
  },
  quote: {
    padding: 20,
  },
  quotetext: {
    fontSize: 25,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  ButtonContainer1: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#092547",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
    zIndex: 2,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 230,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    backgroundColor: "#22333b",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  text: {
    fontSize: 22,
    paddingVertical: 20,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  buttonContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttons: {
    backgroundColor: "#669bbc",
    borderRadius: 30,
    height: 90,
    justifyContent: "center",
  },
  buttonContent: {
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    top: 5,
  },
  verticalCard: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  verticalImage: {
    flex: 1,
    width: "100%",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardContent: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  packageDetail: {
    fontFamily: "Poppins-SemiBold",
    color: "black",
    fontSize: 14,
  },
  icon: {
    width: 30,
    height: 25,
    padding: 15,
    resizeMode: "contain",
    alignItems: "center",
  },
  PackageContainer: {
    alignItems: "center",
  },
  Package: {
    backgroundColor: "#092547",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
  },
  PackageText: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: "white",
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 80,
    marginTop: 15,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    height: 220,
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
    borderRadius: 30,
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
    backgroundColor: "rgba(0,0,0,0.5)", // Background color with opacity
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

export default Discover;
