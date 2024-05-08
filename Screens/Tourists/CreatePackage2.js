import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import axios from "axios";

const CreatePackage2 = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;
  const RegisterContainer = containerWidth * 1.05;
  const inputWidth = containerWidth * 0.75;
  const RWidth = containerWidth * 0.9;

  const navigation = useNavigation();
  const route = useRoute();

  const [flightSelected, setFlightSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketId, setTicketId] = useState(null);
  const [transportType, setTransportType] = useState("");
  const [package_id, setPackageId] = useState(null);

  useEffect(() => {
    if (route.params && route.params.ticketId && route.params.transportType) {
      setTicketId(route.params.ticketId);
      setTransportType(route.params.transportType);
    }
  
    if (route.params && route.params.package_id) {
      setPackageId(route.params.package_id);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        let endpoint = "";

        if (route.params && route.params.transportType) {
          const { transportType } = route.params;
          console.log(transportType);
          const baseEndpoint = "http://192.168.100.18:8000/api/routes";

          switch (transportType) {
            case "airline":
              endpoint = `${baseEndpoint}/airline-packages/${ticketId}`;
              break;
            case "bus":
              endpoint = `${baseEndpoint}/bus-packages/${ticketId}`;
              break;
            case "railway":
            default:
              endpoint = `${baseEndpoint}/railway-packages/${ticketId}`;
              break;
          }

          const response = await axios.get(endpoint);
          console.log(response.data);
          if (Array.isArray(response.data) && response.data.length > 0) {
            setTicketDetails(response.data[0]);
          }
        }

        setLoading(false);
        console.log(package_id);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [route.params, ticketId, package_id]); 

  const handleCheckBox = () => {
    setIsChecked(isChecked);
    if (!isChecked) {
      setFlightSelected(true);
    }
  };
  

  const handleCreatePackage3 = async () => {

    if (!isChecked && !flightSelected) {
      alert("Please select a transportation option or skip this part.");
      return;
    }

    if (route.params && route.params.transportType) {
      const { transportType } = route.params;
      console.log(transportType);
      
      if (transportType === "airline") {
        try {
          const response = await axios.post(
            `http://192.168.100.18:8000/api/routes/add-airline-package-details/${ticketId}`, { package_id }
          );
          alert("Ticket data inserted successfully for airline!");
          console.log(response.data);
          navigation.navigate("CreatePackage3", { package_id });
        } catch (error) {
          console.error("Error inserting ticket data for airline:", error);
          alert("Failed to insert ticket data for airline");
        }
      } else if (transportType === "bus") {
        try {
          const response = await axios.post(
            `http://192.168.100.18:8000/api/routes/add-bus-package-details/${ticketId}`, { package_id }
          );
          alert("Ticket data inserted successfully for bus!");
          navigation.navigate("CreatePackage3", { package_id });
        } catch (error) {
          console.error("Error inserting ticket data for bus:", error);
          alert("Failed to insert ticket data for bus");
        }
      } else if (transportType === "railway") {
        try {
          const response = await axios.post(
            `http://192.168.100.18:8000/api/routes/add-railway-package-details/${ticketId}`, { package_id }
          );
          alert("Ticket data inserted successfully for railway!");
          navigation.navigate("CreatePackage3", { package_id });
        } catch (error) {
          console.error("Error inserting ticket data for railway:", error);
          alert("Failed to insert ticket data for railway");
        }
      } else {
        alert("Invalid transport type!");
      }
    }

    navigation.navigate("CreatePackage3", { package_id });
    
  };

  const handleFlight = () => {
    setFlightSelected(true);
    navigation.navigate("Flight", { ticketId: "your_ticket_id_here", package_id });
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

        {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} />
        ) : ticketDetails ? (
          <View style={styles.ticketDetailsContainer}>
            <Text style={styles.ticketHeading}>Selected Ticket Details</Text>
            <Text style={styles.ticketText}>
              Departure City: {ticketDetails.departure_city}
            </Text>
            <Text style={styles.ticketText}>
              Arrival City: {ticketDetails.arrival_city}
            </Text>
            <Text style={styles.ticketText}>
              Departure Date: {ticketDetails.departure_date}
            </Text>
            <Text style={styles.ticketText}>
              Return Date: {ticketDetails.arrival_date}
            </Text>
            <Text style={styles.ticketText}>
              Seat Type: {ticketDetails.seat_type}
            </Text>
            <Text style={styles.ticketText}>
              Ticket Price: {ticketDetails.ticket_price}
            </Text>
          </View>
        ) : (
          <View style={styles.ticketDetailsContainer}>
            <Text style={styles.ticketText}>No ticket details available</Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleCreatePackage3}
          style={[styles.nextButton, { width: inputWidth }]}
          disabled={!isChecked && !flightSelected}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
});

export default CreatePackage2;
