import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const Flight = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;
  const [airline, setAirline] = useState([]);
  const [railway, setRailway] = useState([]);
  const [bus, setBus] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const route = useRoute();
  const package_id = route.params?.package_id;

  const handleBookNow = (item) => {
    let transportType = "";
    let ticketId = "";

    if (item.train_number) {
      transportType = "railway";
      ticketId = item.train_number;
    } else if (item.bus_number) {
      transportType = "bus";
      ticketId = item.bus_number;
    } else if (item.flight_number) {
      transportType = "airline";
      ticketId = item.flight_number;
    }

    console.log(
      "Book Now clicked for ticketId:",
      ticketId,
      "and transportType:",
      transportType
    );
    navigation.navigate("CreatePackage2", {
      ticketId,
      transportType,
      package_id,
    });
  };

  const [searchInput, setSearchInput] = useState({
    departure_city: "",
    arrival_city: "",
    departure_date: "",
    returnDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.18:8000/api/routes/railway-packages/"
        );
        const response2 = await axios.get(
          "http://192.168.100.18:8000/api/routes/airline-packages/"
        );
        const response3 = await axios.get(
          "http://192.168.100.18:8000/api/routes/bus-packages/"
        );

        setAirline(response2.data);
        setRailway(response.data);
        setBus(response3.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const lowerCaseDepartureCity = searchInput.departure_city.toLowerCase();
    const lowerCaseArrivalCity = searchInput.arrival_city.toLowerCase();
    const lowerCaseDepartureDate = searchInput.departure_date.toLowerCase();
    const lowerCaseReturnDate = searchInput.returnDate.toLowerCase();

    const filteredRailwayTickets = railway.filter(
      (ticket) =>
        (!lowerCaseDepartureCity ||
          ticket.departure_city
            .toLowerCase()
            .includes(lowerCaseDepartureCity)) &&
        (!lowerCaseArrivalCity ||
          ticket.arrival_city.toLowerCase().includes(lowerCaseArrivalCity)) &&
        (!lowerCaseDepartureDate ||
          ticket.departure_date
            .toLowerCase()
            .includes(lowerCaseDepartureDate)) &&
        (!lowerCaseReturnDate ||
          ticket.arrival_date.toLowerCase().includes(lowerCaseReturnDate))
    );
    const filteredFlightTickets = airline.filter(
      (ticket) =>
        (!lowerCaseDepartureCity ||
          ticket.departure_city
            .toLowerCase()
            .includes(lowerCaseDepartureCity)) &&
        (!lowerCaseArrivalCity ||
          ticket.arrival_city.toLowerCase().includes(lowerCaseArrivalCity)) &&
        (!lowerCaseDepartureDate ||
          ticket.departure_date
            .toLowerCase()
            .includes(lowerCaseDepartureDate)) &&
        (!lowerCaseReturnDate ||
          ticket.arrival_date.toLowerCase().includes(lowerCaseReturnDate))
    );
    const filteredBusTickets = bus.filter(
      (ticket) =>
        (!lowerCaseDepartureCity ||
          ticket.departure_city
            .toLowerCase()
            .includes(lowerCaseDepartureCity)) &&
        (!lowerCaseArrivalCity ||
          ticket.arrival_city.toLowerCase().includes(lowerCaseArrivalCity)) &&
        (!lowerCaseDepartureDate ||
          ticket.departure_date
            .toLowerCase()
            .includes(lowerCaseDepartureDate)) &&
        (!lowerCaseReturnDate ||
          ticket.arrival_date.toLowerCase().includes(lowerCaseReturnDate))
    );

    const combinedFilteredTickets = [
      ...filteredFlightTickets.map((item) => ({
        ...item,
        id: `flight_${item.airline_operations_id}`,
      })),
      ...filteredRailwayTickets.map((item) => ({
        ...item,
        id: `train_${item.railway_package_id}`,
      })),
      ...filteredBusTickets.map((item) => ({
        ...item,
        id: `bus_${item.bus_ticket_id}`,
      })),
    ];

    setFilteredTickets(combinedFilteredTickets);
  };

  const handleClear = () => {
    setSearchInput({
      departure_city: "",
      arrival_city: "",
      departure_date: "",
      returnDate: "",
    });
    setFilteredTickets([]);
  };

  const handleIncrement = (ticketId) => {
    setAirline((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, totalSeats: ticket.totalSeats + 1 }
          : ticket
      )
    );
  };

  const handleDecrement = (ticketId) => {
    setAirline((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId && ticket.totalSeats > 0
          ? { ...ticket, totalSeats: ticket.totalSeats - 1 }
          : ticket
      )
    );
  };

  const renderTicketCard = ({ item }) => (
    <View style={[styles.activeTicketContainer, { width: containerWidth }]}>
      <Text
        style={[
          styles.ticketNumber,
          {
            backgroundColor: "#A5A5AA",
            width: "50%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 20,
          },
        ]}
      >
        Ticket # {item.train_number || item.bus_number || item.flight_number}
      </Text>

      <View style={styles.dottedLine}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <View style={styles.ticketDetails}>
        <View style={styles.CityContainer}>
          <Text style={styles.placeText}>{item.departure_city}</Text>
          <Image
            style={styles.flightImage}
            source={require("../../assets/whitetrain.png")}
          />
          <Text style={styles.placeText}>{item.arrival_city}</Text>
        </View>

        <View style={styles.Time}>
          <View style={styles.DTime}>
            <Text style={styles.title2}>Departure Date : </Text>
            <Text style={styles.ticketText2}>{item.departure_date}</Text>
            <Text style={styles.title2}>Departure Time : </Text>
            <Text style={styles.ticketText2}>{item.departure_time}</Text>
          </View>
          <View style={styles.ATime}>
            <Text style={styles.title2}>Arrival Date : </Text>
            <Text style={styles.ticketText2}>{item.arrival_date}</Text>
            <Text style={styles.title2}>Arrival Time : </Text>
            <Text style={styles.ticketText2}>{item.arrival_time}</Text>
          </View>
        </View>

        <View style={styles.Time1}>
          <View style={styles.DTime1}>
            <Text style={styles.title2}>Type : </Text>
            <Text style={styles.ticketText2}>{item.seat_type}</Text>
          </View>
          <View style={styles.DTime1}>
            <Text style={styles.title2}>Duration : </Text>
            <Text style={styles.ticketText2}>
              {item.journey_duration || item.flight_duration}
            </Text>
          </View>
        </View>

        <View style={styles.seatsContainer}>
          <TouchableOpacity onPress={() => handleDecrement(item.id)}>
            <Ionicons
              name="remove-circle"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.seatsText}>{item.totalSeats}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)}>
            <Ionicons
              name="add-circle"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>Seats</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleBookNow(item)}
          style={styles.bookNowButton}
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>

      <ScrollView contentContainerStyle={styles.Container}>
        <View style={[styles.ProfileContainer, { width: containerWidth }]}>
          {/* <View style={styles.searchInputs}> */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Departure City"
              value={searchInput.departure_city}
              onChangeText={(text) =>
                setSearchInput({ ...searchInput, departure_city: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Arrival City"
              value={searchInput.arrival_city}
              onChangeText={(text) =>
                setSearchInput({ ...searchInput, arrival_city: text })
              }
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Departure Date"
              value={searchInput.departure_date}
              onChangeText={(text) =>
                setSearchInput({ ...searchInput, departure_date: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Return Date"
              value={searchInput.returnDate}
              onChangeText={(text) =>
                setSearchInput({ ...searchInput, returnDate: text })
              }
            />
          </View>
          <View style={styles.searchButtons}>
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchbutton}
            >
              <Text style={styles.placeText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClear}
              style={styles.searchbutton2}
            >
              <Text style={styles.placeText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>

        {filteredTickets.length > 0 && (
          <View style={styles.filteredResults}>
            <FlatList
              horizontal
              data={filteredTickets}
              keyExtractor={(item) => item.id}
              renderItem={renderTicketCard}
              contentContainerStyle={styles.ticketList}
            />
          </View>
        )}

        <View style={styles.ticketCategory}>
          <Text style={styles.categoryHeading}>Flight Tickets</Text>
          <FlatList
            horizontal
            data={airline}
            keyExtractor={(item) => item.airline_operations_id}
            renderItem={renderTicketCard}
            contentContainerStyle={styles.ticketList}
          />
        </View>
        <View style={styles.ticketCategory}>
          <Text style={styles.categoryHeading}>Railway Tickets</Text>
          <FlatList
            horizontal
            data={railway}
            keyExtractor={(item) => item.railway_package_id}
            renderItem={renderTicketCard}
            contentContainerStyle={styles.ticketList}
          />
        </View>
        <View style={styles.ticketCategory}>
          <Text style={styles.categoryHeading}>Bus Tickets</Text>
          <FlatList
            horizontal
            data={bus}
            keyExtractor={(item) => item.bus_ticket_id}
            renderItem={renderTicketCard}
            contentContainerStyle={styles.ticketList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  Container: {
    alignContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    backgroundColor: "#20262E",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  ProfileContainer: {
    backgroundColor: "white",
    marginTop: 40,
    // height: 100,
    alignSelf: "center",
  },
  Time: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  Time1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontFamily: "Poppins-Bold",
    color: "#73777B",
    fontSize: 16,
  },
  ticketTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  title2: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 10,
  },
  ticketText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  ticketText2: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10,
  },
  activeTicketContainer: {
    backgroundColor: "#393646",
    borderRadius: 15,
    padding: 20,
    marginRight: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  dottedLine: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
    borderStyle: "dashed",
    marginBottom: 30,
  },
  circle1: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    top: -10,
    left: -30,
  },
  circle2: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    top: -10,
    right: -30,
  },
  ticketList: {
    padding: 10,
  },
  Viewticket: {
    alignItems: "center",
    justifyContent: "center",
  },
  ticketCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "black",
    overflow: "hidden",
    width: "90%",
    height: 550,
  },
  ATime: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
    width: 115,
  },
  DTime: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 25,
    marginRight: 0,
    padding: 10,
    width: 115,
  },
  DTime1: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 25,
    marginRight: 0,
    padding: 10,
    width: 95,
    marginRight: 10,
  },
  ticketImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  ticketDetails: {
    flex: 1,
    marginLeft: 10,
  },
  placeText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  CityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flightImage: {
    width: 50,
    height: 50,
  },
  timeText: {
    fontSize: 14,
    color: "white",
  },
  routeIcon: {
    alignSelf: "center",
    marginVertical: 5,
  },
  flightDetails: {
    fontSize: 14,
    color: "white",
  },
  flightTypeContainer: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  flightTypeText: {
    fontSize: 12,
    color: "white",
  },
  flightInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: "white",
  },
  infoBoxValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
  seatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    width: 150,
    height: 50,
    alignSelf: "center",
  },
  icon: {
    marginHorizontal: 5,
    color: "white",
  },
  seatsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  labelText: {
    marginLeft: 5,
    color: "white",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  searchInputs: {
    paddingHorizontal: 10,
    margin: 20,
    backgroundColor: "white",
    top: -120,
    // borderRadius: 40,
    padding: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 10,
  },
  searchButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 15,
  },
  searchbutton: {
    backgroundColor: "green",
    width: 110,
    height: 50,
    justifyContent: "center",
  },
  searchbutton2: {
    backgroundColor: "red",
    width: 110,
    height: 50,
    justifyContent: "center",
  },
  filteredResults: {
    marginTop: 10,
  },

  ticketCategory: {
    marginVertical: 10,
  },
  categoryHeading: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    marginLeft: 15,
  },
  bookNowButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  bookNowText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});

export default Flight;
