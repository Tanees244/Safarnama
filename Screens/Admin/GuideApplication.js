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

const GuideApplication = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;

  const [activeSection, setActiveSection] = useState("Active");
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    fetchUsers();
  }, [activeSection]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(
        `http://192.168.100.18:8000/api/guideRoutes/update_guide_status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update guide status");
      }

      // Reload the guide applications after status update
      handleSectionChange(activeSection);
    } catch (error) {
      console.error("Error updating guide status:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.18:8000/api/guideRoutes/guide_applications?status=${activeSection}`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>Guide Applications</Text>
        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => handleSectionChange("Active")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Active" && styles.activeSection,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSectionChange("Pending")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Pending" && styles.activeSection,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSectionChange("Rejected")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Rejected" && styles.activeSection,
              ]}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
        {Object.keys(users).length > 0 ? (
          <ScrollView>
            {Object.values(users).map((user) => (
              <View style={[styles.Detail, { width: containerWidth }]}>
                <Image
                  style={styles.UserImage}
                  source={require("../../assets/ellipse.png")}
                />
                <View style={styles.UserDetail}>
                  <View style={styles.UserName}>
                    <Text style={styles.UserNameText}>{user.guide_name}</Text>
                    <TouchableOpacity
                      style={styles.ReadMoreButton}
                      onPress={() => handleUserClick(user)}
                    >
                      <Text style={styles.ReadMoreText}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Buttons}>
                    {user.status === "active" ? null : (
                      <TouchableOpacity
                        style={styles.ApproveButton}
                        onPress={() =>
                          handleStatusUpdate(user.guide_id, "active")
                        }
                      >
                        <Text style={styles.ButtonText}>Approve</Text>
                      </TouchableOpacity>
                    )}
                    {user.status === "rejected" ? null : (
                      <TouchableOpacity
                        style={styles.RejectButton}
                        onPress={() =>
                          handleStatusUpdate(user.guide_id, "rejected")
                        }
                      >
                        <Text style={styles.ButtonText}>Reject</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
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

          <ScrollView>
            <View style={styles.modalDetails}>
              <Text
                style={[
                  styles.ModalDetailHeading,
                  { color: "black", fontSize: 20 },
                ]}
              >
                {selectedUser?.guide_name}
              </Text>
              <Text style={styles.ModalDetailHeading}>Motivation </Text>
              <Text style={styles.ModalDetailText}>
                {selectedUser?.motivation}
              </Text>
              <Text style={styles.ModalDetailHeading}>Past Experience</Text>
              <Text style={styles.ModalDetailText}>
                {selectedUser?.past_experience}
              </Text>
              <Text style={styles.ModalDetailHeading}>Q1 Answer</Text>
              <Text style={styles.ModalDetailText}>
                {selectedUser?.guide_q1}
              </Text>
              <Text style={styles.ModalDetailHeading}>Q2 Answer</Text>
              <Text style={styles.ModalDetailText}>
                {selectedUser?.guide_q2}
              </Text>
              <Text style={styles.ModalDetailHeading}>Q3 Answer</Text>
              <Text style={styles.ModalDetailText}>
                {selectedUser?.guide_q3}
              </Text>
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
          </ScrollView>
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
    justifyContent: 'space-between',
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
  ModalDetailHeading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#787473",
  },
  ModalDetailText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "white",
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
  noDataText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default GuideApplication;
