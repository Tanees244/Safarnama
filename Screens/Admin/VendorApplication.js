import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";

const VendorApplication = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;

  const [activeSection, setActiveSection] = useState("Hotel");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vendorInfo, setVendorInfo] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    fetchVendors();
  }, [activeSection]);

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    toggleModal();
    fetchVendorInfo(vendor.id);
  };

  const fetchVendors = async () => {
    let endpoint;
    switch (activeSection) {
      case "Hotel":
        endpoint = "/api/adminRoutes/hotel_details";
        break;
      case "Airline":
        endpoint = "/api/adminRoutes/airline_details";
        break;
      case "Railway":
        endpoint = "/api/adminRoutes/railway_details";
        break;
      case "Bus":
        endpoint = "/api/adminRoutes/bus_details";
        break;
      default:
        endpoint = "";
    }
    try {
      const response = await axios.get(`http://192.168.100.12:8000${endpoint}`);
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error.response);
    }
  };

  const fetchVendorInfo = async (vendorId) => {
    try {
      const response = await axios.get(`http://192.168.100.12:8000/api/adminRoutes/vendor_info/${vendorId}`);
      setVendorInfo(response.data);
    } catch (error) {
      console.error("Error fetching vendor info:", error.response);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vendor Applications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>Vendor Applications</Text>
        <View style={styles.pagination}>
          {["Hotel", "Airline", "Railway", "Bus"].map((section) => (
            <TouchableOpacity key={section} onPress={() => handleSectionChange(section)}>
              <Text
                style={[
                  styles.sectionText,
                  activeSection === section && styles.activeSection,
                ]}
              >
                {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {vendors.length > 0 ? (
          <ScrollView>
            {vendors.map((vendor) => (
              <TouchableOpacity key={vendor.id} onPress={() => handleVendorClick(vendor)}>
                <View style={[styles.Detail, { width: containerWidth }]}>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={styles.vendorId}>{vendor.id}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={require("../../assets/cross.png")} />
          </TouchableOpacity>
          <Text style={styles.modalHeading}>Vendor Details</Text>
          {vendorInfo && (
            <View style={styles.vendorDetails}>
              <Text style={styles.vendorInfoText}>Email: {vendorInfo.email}</Text>
              <Text style={styles.vendorInfoText}>Contact: {vendorInfo.contact}</Text>
              {/* Render other vendor info here */}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: "#1a1a1a",
    shadowColor: "black",
    elevation: 20,
  },
  headerText: {
    textAlign: "center",
    top: 60,
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  Text: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
    padding: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#333",
  },
  activeSection: {
    fontFamily: "Poppins-SemiBold",
    borderBottomWidth: 4,
    borderBottomColor: "#0B6180",
  },
  Detail: {
    backgroundColor: "#1E3740",
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  vendorName: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 24,
  },
  vendorId: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 18,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#C4C8CB",
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  modalHeading: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  vendorDetails: {
    marginTop: 20,
  },
  vendorInfoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
});

export default VendorApplication;
