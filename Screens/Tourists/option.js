import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const Option = () => {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [guideData, setGuideData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const [packageId, setPackageId] = useState(route.params.package_id || null);

  useEffect(() => {
    if (route.params && route.params.package_id) {
      setPackageId(route.params.package_id);
    }
  }, [route.params]);

  console.log("package: ", packageId);

  useEffect(() => {
    fetchTransportData();
    fetchGuideData();
  }, []);

  const fetchTransportData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.12:8000/api/routes/car-rental-service/"
      );
      setTransportData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching transport data:", error);
    }
  };

  const fetchGuideData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.12:8000/api/routes/guide-service"
      );
      setGuideData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching guide data:", error);
    }
  };

  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
    setModalVisible(false);
  };

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
    setModalVisible1(false);
  };

  const navigateToPaymentGateway = async () => {
    try {
      const requestData = {
        packageId: packageId, // Provide the selected package detail ID
      };
  
      if (selectedGuide) {
        requestData.guideId = selectedGuide.guide_id;
        requestData.packageId = packageId; // Provide the selected guide ID
      } else {
        requestData.guideId = null;
      }
  
      if (selectedTransport) {
        requestData.carRentalId = selectedTransport.car_rental_id;
        requestData.packageId = packageId; // Provide the selected car rental ID
      } else {
        requestData.carRentalId = null;
      }
  
      const response = await axios.post(
        "http://192.168.100.12:8000/api/routes/update-package-details",
        requestData
      );
      console.log(requestData); // Log success message
      navigation.navigate("PaymentFormModal");
    } catch (error) {
      console.error("Error updating package details:", error);
    }
  };
  

  const renderTransportItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.Picture}` }}
          style={styles.image}
          borderRadius={20}
        />
        <Text style={styles.title}>{item.car_name}</Text>
        <Text style={styles.description}>Make: {item.car_make}</Text>
        <Text style={styles.description}>Model: {item.car_model}</Text>
        <Text style={styles.description}>Driver Name: {item.driver_name}</Text>
        <Text style={styles.description}>
          Contact Number: {item.contact_number}
        </Text>
        <Text style={styles.description}>Price: {item.price}/Day</Text>
        <Text style={styles.description}>Rating: {item.rating}</Text>

        <TouchableOpacity
          onPress={() => handleTransportSelect(item)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGuideItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.picture}` }}
          style={styles.image}
          borderRadius={20}
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>Age: {item.age}</Text>
        <Text style={styles.description}>Email: {item.email}</Text>
        <Text style={styles.description}>
          Contact Number: {item.contact_number}
        </Text>

        <TouchableOpacity
          onPress={() => handleGuideSelect(item)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.header1}>Selected Transport:</Text>
        {selectedTransport && (
          <View style={styles.selectedItemContainer}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${selectedTransport.Picture}`,
              }}
              style={styles.selectedItemImage}
              borderRadius={10}
            />
            <Text style={styles.selectedItemTitle}>
              {selectedTransport.car_name}
            </Text>
            <Text style={styles.selectedItemDescription}>
              Make: {selectedTransport.car_model}
            </Text>
            <Text style={styles.selectedItemDescription}>
              Price: {selectedTransport.price}/Day
            </Text>
            <Text style={styles.selectedItemDescription}>
              Rating: {selectedTransport.rating}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Select Rental Service</Text>
        </TouchableOpacity>

        <Text style={styles.header1}>Selected Guide:</Text>
        {selectedGuide && (
          <View style={styles.selectedItemContainer}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${selectedGuide.picture}`,
              }}
              style={styles.selectedItemImage}
              borderRadius={10}
            />
            <Text style={styles.selectedItemTitle}>{selectedGuide.name}</Text>
            <Text style={styles.selectedItemDescription}>
              Age: {selectedGuide.age} yrs
            </Text>
            <Text style={styles.selectedItemDescription}>
              Contact: {selectedGuide.contact_number}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible1(true)}
        >
          <Text style={styles.buttonText}>Select Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={navigateToPaymentGateway}
          style={styles.buttonText2}
        >
          <Text style={styles.TextDesign}>Confirm</Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={transportData}
              vertical={true}
              renderItem={renderTransportItem}
              keyExtractor={(item) => item.car_rental_id.toString()}
              contentContainerStyle={styles.flatListContainer}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          visible={isModalVisible1}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={guideData}
              renderItem={renderGuideItem}
              keyExtractor={(item) => item.guide_id.toString()}
              vertical={true}
              contentContainerStyle={styles.flatListContainer}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible1(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cee7fa",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  header: {
    height: 120,
    backgroundColor: "#032844",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  button: {
    backgroundColor: "#071B26",
    width: "90%",
    height: 60,
    marginTop: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  header1: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#032844",
  },
  selectedItemContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedItemImage: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  selectedItemTitle: {
    marginTop: 10,
    fontSize: 20,
    color: "black",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  selectedItemDescription: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 5,
  },
  buttonText2: {
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#071B26",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    width: "90%",
  },
  TextDesign: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  flatListContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#BFBFBF",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "black",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#071B26",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});

export default Option;
