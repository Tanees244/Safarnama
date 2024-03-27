import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Flight = () => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 1;
  const [airline, setAirline] = useState([]);
  const [railway, setRailway] = useState([]);
  const [bus, setBus] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

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
          "http://192.168.100.12:8000/api/routes/railway-packages/"
        );
        const response2 = await axios.get(
          "http://192.168.100.12:8000/api/routes/airline-packages/"
        );
        const response3 = await axios.get(
          "http://192.168.100.12:8000/api/routes/bus-packages/"
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

    // Set the state with the combined filtered results
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
    <View style={styles.Viewticket}>
      <View style={styles.ticketCard}>
        <Image source={item.image} style={styles.ticketImage} />
        <View style={styles.dottedLine}>
          <View style={styles.circle1} />
          <Text>
            .................................................................................
          </Text>
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
              <Text style={styles.title2}>Flight # : </Text>
              <Text style={styles.ticketText2}>
                {item.train_number || item.bus_number || item.flight_number}
              </Text>
            </View>
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
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.Rectangle}
          source={require("../../assets/blackp.png")}
        >
          <Text style={styles.headerText}> safarnama</Text>
        </ImageBackground>
      </View>
      <View style={[styles.ProfileContainer, { width: containerWidth }]}>
        <View style={styles.searchInputs}>
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
            <TouchableOpacity onPress={handleClear} style={styles.searchbutton}>
              <Text style={styles.placeText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Display Filtered Results */}
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

      {/* Flight Tickets */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  Rectangle: {
    backgroundColor: "linear-gradient(190deg, rgb(3, 16, 69), rgb(3, 16, 69))",
    borderRadius: 80,
    height: 320,
    top: -10,
    width: "100%",
    position: "absolute",
    flex: 1,
    alignItems: "center",
  },
  ProfileContainer: {
    backgroundColor: "white",
    borderRadius: 28,
    marginTop: 100,
    height: 100,
  },
  header: {
    height: 140,
    backgroundColor: "#032844",
    shadowColor: "black",
    elevation: 20,
    zIndex: -1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerText: {
    textAlign: "center",
    top: 60,
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
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
  dottedLine: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
    borderStyle: "dashed",
    marginBottom: 50,
  },
  circle1: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    top: 10,
    bottom: 10,
    left: -30,
  },
  circle2: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    top: 10,
    bottom: 10,
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
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    top: 10,
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
    borderRadius: 40,
    padding: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 10,
  },
  searchButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  searchbutton: {
    backgroundColor: "black",
    width: 130,
    height: 50,
  },
  filteredResults: {
    marginTop: 10,
  },

  ticketCategory: {
    marginVertical: 10,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Flight;
