import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import axios from "axios";

const CreatePackage2 = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 1.05;
  const inputWidth = containerWidth * 0.75;

  const navigation = useNavigation();
  const route = useRoute();

  const [flightSelected, setFlightSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { ticketId } = route.params ?? { ticketId: null };

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.169.72:8000/api/routes/airline-packages/${ticketId}`
        );
        setTicketDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  useEffect(() => {
    console.log(ticketDetails); // Log ticketDetails after it has been updated
  }, [ticketDetails]);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleCreatePackage3 = () => {
    if (!isChecked && !flightSelected) {
      alert("Please select a transportation option or skip this part.");
      return;
    }
    navigation.navigate("CreatePackage3");
  };

  const handleFlight = () => {
    setFlightSelected(true);
    navigation.navigate("Flight", { ticketId });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.RegisterContainer, { width: RegisterContainer }]}>
          <Text style={styles.transportText}>Transport To Islamabad</Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionHeading}>Select Mode Of Transport</Text>
          <TouchableOpacity
            style={[
              styles.transportOption,
              flightSelected && styles.selectedOption,
            ]}
            onPress={handleFlight}
          >
            <Text style={styles.optionText}>Choose Transport</Text>
          </TouchableOpacity>

          <CheckBox
            title="Skip transport"
            checked={isChecked}
            onPress={handleCheckBox}
            textStyle={styles.checkboxText}
            containerStyle={styles.checkboxContainer}
          />
        </View>

        <View style={styles.ticketDetailsContainer}>
          <Text style={styles.ticketHeading}>Selected Ticket Details</Text>
          <TouchableOpacity
            style={styles.ticketDetailsButton}
            onPress={toggleModal}
          >
            <Text style={styles.ticketDetailsButtonText}>Ticket Details</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleCreatePackage3}
          style={[styles.nextButton, { width: inputWidth }]}
          disabled={!isChecked && !flightSelected}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Ticket Details</Text>

              <Text style={styles.modalText}>
                Departure City: {ticketDetails.departure_city}
              </Text>
              <Text style={styles.modalText}>
                Arrival City: {ticketDetails.arrival_city}
              </Text>
              <Text style={styles.modalText}>
                Departure Date: {ticketDetails.departure_date}
              </Text>
              <Text style={styles.modalText}>
                Return Date: {ticketDetails.arrival_date}
              </Text>
              <Text style={styles.modalText}>
                Seat Type: {ticketDetails.seat_type}
              </Text>
              <Text style={styles.modalText}>
                Ticket Price: {ticketDetails.ticket_price}
              </Text>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    backgroundColor: "#032844",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  contentContainer: {
    flexGrow: 1,
  },
  RegisterContainer: {
    backgroundColor: "#092547",
    marginHorizontal: 10,
    height: 150,
    borderRadius: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  transportText: {
    fontSize: 22,
    color: "#54aaec",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  optionContainer: {
    marginTop: 20,
    backgroundColor: "#264769",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  optionHeading: {
    fontFamily: "Poppins-Bold",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  transportOption: {
    backgroundColor: "#092547",
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    height: 60,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  selectedOption: {
    backgroundColor: "#54aaec",
  },
  checkboxText: {
    fontSize: 14,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  checkboxContainer: {
    backgroundColor: "#EEEDEB",
    opacity: 0.9,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 20,
  },
  ticketDetailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  ticketHeading: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "#264769",
  },
  ticketText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    color: "#264769",
  },
  ticketDetailsButton: {
    backgroundColor: "#54aaec",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    width: "50%",
  },
  ticketDetailsButtonText: {
    color: "#082847",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
  },
  nextButton: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#54aaec",
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  nextButtonText: {
    fontSize: 20,
    padding: 10,
    color: "#082847",
    fontFamily: "Poppins-Bold",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "#264769",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    color: "#264769",
  },
  closeButton: {
    backgroundColor: "#54aaec",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#082847",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CreatePackage2;
