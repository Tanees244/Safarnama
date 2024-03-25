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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const GuideApplication = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Active");
  const [users, setUsers] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    fetchUsers();
  }, [activeSection]); // Fetch data when activeSection changes

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.105/api/guideRoutes/guide_details?status=${activeSection}`
      );
      // const data = await response.json();
      const data = await response.json(); // Parse the JSON response
      console.log(data); // Check the structure of the response
      setUsers(data.Results);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Guide Applications</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeSection === "Active" && styles.activeTab,
            ]}
            onPress={() => handleSectionChange("Active")}
          >
            <Text style={styles.tabText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeSection === "Pending" && styles.activeTab,
            ]}
            onPress={() => handleSectionChange("Pending")}
          >
            <Text style={styles.tabText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeSection === "Rejected" && styles.activeTab,
            ]}
            onPress={() => handleSectionChange("Rejected")}
          >
            <Text style={styles.tabText}>Rejected</Text>
          </TouchableOpacity>
        </View>
        {users < 0 ? (
          <ScrollView>
            {users.map((user, index) => (
              <TouchableOpacity
                key={index}
                style={styles.userItem}
                onPress={toggleModal}
              >
                <Text style={styles.userName}>{user.guide_id}</Text>
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
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.closeIconContainer}
          >
            <Image
              style={styles.closeIcon}
              source={require("../../assets/cross.png")}
            />
          </TouchableOpacity>

          <Text style={styles.modalHeading}>Guide Details</Text>
          <View style={styles.modalDetails}>
            <Text style={styles.ModalDetailText}>Name :</Text>
            <Text style={styles.ModalDetailText}>Details :</Text>
          </View>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>CNIC-Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>CNIC-Front</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Tour Guide License</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#C8F2F5",
  },
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
    borderBottomColor: "#0B6180", // Change this color as needed
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 42,
  },
  Text: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
    padding: 20,
  },
  ButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  Detail: {
    backgroundColor: "#1E3740",
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  UserImage: {
    width: 90,
    height: 90,
  },
  UserDetail: {
    padding: 15,
  },
  MoreButton: {
    height: 35,
    width: 35,
  },
  UserName: {
    alignItems: "center",
  },
  UserNameText: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 24,
  },
  ReadMoreText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "white",
  },
  ReadMoreButton: {
    backgroundColor: "#4391F3",
    padding: 15,
    borderRadius: 30,
  },
  Buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  ButtonText: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  ApproveButton: {
    backgroundColor: "#47B2F5",
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
  },
  RejectButton: {
    backgroundColor: "#CE1B2E",
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    marginLeft: 20,
  },
  modalContainer: {
    backgroundColor: "white",
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
  modalButton: {
    backgroundColor: "#47B2F5",
    padding: 15,
    width: 300,
    borderRadius: 30,
    marginBottom: 10,
  },
  modalButtonText: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalDetails: {
    backgroundColor: "#C4C8CA",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    marginBottom: 20,
  },
  ModalDetailText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "white",
  },
});

export default GuideApplication;
