import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList ,TextInput, Button, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Flight = () => {
    const screenWidth = Dimensions.get('window').width;
    const containerWidth = screenWidth * 1;
    const [tickets, setTickets] = useState([
        {
          id: '1',
          arrivalPlace: 'Lahore',
          destinationPlace: 'Islamabad',
          departureTime: '12:00 PM',
          arrivalTime: '02:00 PM',
          ticketNumber: 'PK-123',
          Duration: '8h 30m',
          classType: 'Economy',
          totalSeats: 0,
          Departuredate: '8-12-2023',
          Arrivaledate: '9-12-2023',
          image: require('../../assets/serene.png'),
          logo: require('../../assets/flight.png'),
          type: 'Flight',
        },
        {
          id: '2',
          arrivalPlace: 'Karachi',
          destinationPlace: 'Islamabad',
          departureTime: '10:00 AM',
          arrivalTime: '02:00 PM',
          ticketNumber: 'PK-045',
          Duration: '8h 30m',
          flightType: 'Business',
          totalSeats: 0,
          Departuredate: '8-12-2023',
          Arrivaledate: '9-12-2023',
          image: require('../../assets/serene.png'),
          logo: require('../../assets/flight.png'),
          type: 'Flight',
        },
        // Add more flight ticket data as needed
      ]);
    
      const [railwayTickets, setRailwayTickets] = useState([
        {
          id: '3',
          arrivalPlace: 'Karachi',
          destinationPlace: 'Islamabad',
          departureTime: '08:00 AM',
          arrivalTime: '10:00 AM',
          ticketNumber: 'TN-123',
          Duration: '2h 20m',
          classType: 'Sleeper',
          totalSeats: 0,
          Departuredate: '8-12-2023',
          Arrivaledate: '9-12-2023',
          image: require('../../assets/greenline.png'),
          logo: require('../../assets/whitetrain.png'),
          type: 'Train',
        },
        {
            id: '4',
            arrivalPlace: 'Quetta',
            destinationPlace: 'Islamabad',
            departureTime: '08:00 AM',
            arrivalTime: '10:00 AM',
            ticketNumber: 'TN-123',
            Duration: '2h 20m',
            classType: 'Sleeper',
            totalSeats: 0,
            Departuredate: '8-12-2023',
            Arrivaledate: '9-12-2023',
            image: require('../../assets/greenline.png'),
            logo: require('../../assets/whitetrain.png'),
            type: 'Train',
          },
          {
            id: '5',
            arrivalPlace: 'lahore',
            destinationPlace: 'Islamabad',
            departureTime: '08:00 AM',
            arrivalTime: '10:00 AM',
            ticketNumber: 'TN-123',
            Duration: '2h 20m',
            classType: 'Sleeper',
            totalSeats: 0,
            Departuredate: '8-12-2023',
            Arrivaledate: '9-12-2023',
            image: require('../../assets/greenline.png'),
            logo: require('../../assets/whitetrain.png'),
            type: 'Train',
          },
        // Add more train ticket data as needed
      ]);
    
      const [busTickets, setBusTickets] = useState([
        {
          id: '6',
          arrivalPlace: 'Karachi',
          destinationPlace: 'Islamabad',
          departureTime: '09:00 AM',
          arrivalTime: '01:00 PM',
          ticketNumber: 'BX-567',
          Duration: '4h 45m',
          classType: 'AC',
          totalSeats: 0,
          Departuredate: '8-12-2023',
          Arrivaledate: '9-12-2023',
          image: require('../../assets/faisalmover.png'),
          logo: require('../../assets/whitebus.png'),
          type: 'Bus',
        },
        {
            id: '7',
            arrivalPlace: 'Hyderabad',
            destinationPlace: 'Islamabad',
            departureTime: '09:00 AM',
            arrivalTime: '01:00 PM',
            ticketNumber: 'BX-567',
            Duration: '4h 45m',
            classType: 'AC',
            totalSeats: 0,
            Departuredate: '6-12-2023',
            Arrivaledate: '12-12-2023',
            image: require('../../assets/faisalmover.png'),
            logo: require('../../assets/whitebus.png'),
            type: 'Bus',
          },
          {
            id: '8',
            arrivalPlace: 'Lahore',
            destinationPlace: 'Islamabad',
            departureTime: '09:00 AM',
            arrivalTime: '01:00 PM',
            ticketNumber: 'BX-567',
            Duration: '4h 45m',
            classType: 'AC',
            totalSeats: 0,
            Departuredate: '15-12-2023',
            Arrivaledate: '20-12-2023',
            image: require('../../assets/faisalmover.png'),
            logo: require('../../assets/whitebus.png'),
            type: 'Bus',
          },
        // Add more bus ticket data as needed
      ]);
    
      const [filteredTickets, setFilteredTickets] = useState([]);

      const [searchInput, setSearchInput] = useState({
        destinationPlace: '',
        arrivalPlace: '',
        departureDate: '',
        returnDate: '',
      });
    
      const handleSearch = () => {
        const lowerCaseDestinationPlace = searchInput.destinationPlace.toLowerCase();
    const lowerCaseArrivalPlace = searchInput.arrivalPlace.toLowerCase();
    const lowerCaseDepartureDate = searchInput.departureDate.toLowerCase();
    const lowerCaseReturnDate = searchInput.returnDate.toLowerCase();

    // Filter tickets based on the non-empty search criteria
    const filteredFlightTickets = tickets.filter(
        (ticket) =>
            (!lowerCaseDestinationPlace || ticket.destinationPlace.toLowerCase().includes(lowerCaseDestinationPlace)) &&
            (!lowerCaseArrivalPlace || ticket.arrivalPlace.toLowerCase().includes(lowerCaseArrivalPlace)) &&
            (!lowerCaseDepartureDate || ticket.Departuredate.toLowerCase().includes(lowerCaseDepartureDate)) &&
            (!lowerCaseReturnDate || ticket.Arrivaledate.toLowerCase().includes(lowerCaseReturnDate))
    );

    const filteredRailwayTickets = railwayTickets.filter(
        (ticket) =>
            (!lowerCaseDestinationPlace || ticket.destinationPlace.toLowerCase().includes(lowerCaseDestinationPlace)) &&
            (!lowerCaseArrivalPlace || ticket.arrivalPlace.toLowerCase().includes(lowerCaseArrivalPlace)) &&
            (!lowerCaseDepartureDate || ticket.Departuredate.toLowerCase().includes(lowerCaseDepartureDate)) &&
            (!lowerCaseReturnDate || ticket.Arrivaledate.toLowerCase().includes(lowerCaseReturnDate))
    );

    const filteredBusTickets = busTickets.filter(
        (ticket) =>
            (!lowerCaseDestinationPlace || ticket.destinationPlace.toLowerCase().includes(lowerCaseDestinationPlace)) &&
            (!lowerCaseArrivalPlace || ticket.arrivalPlace.toLowerCase().includes(lowerCaseArrivalPlace)) &&
            (!lowerCaseDepartureDate || ticket.Departuredate.toLowerCase().includes(lowerCaseDepartureDate)) &&
            (!lowerCaseReturnDate || ticket.Arrivaledate.toLowerCase().includes(lowerCaseReturnDate))
    );

    // Update state with filtered results
    setFilteredTickets([...filteredFlightTickets, ...filteredRailwayTickets, ...filteredBusTickets]);
      };
      
      const handleClear = () => {
        // Clear search input and filtered results
        setSearchInput({
          destinationPlace: '',
          arrivalPlace: '',
          departureDate: '',
          returnDate: '',
        });
        setFilteredTickets([]);
      };

    const handleIncrement = (ticketId) => {
        setTickets((prevTickets) =>
            prevTickets.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, totalSeats: ticket.totalSeats + 1 } : ticket
            )
        );
    };

    const handleDecrement = (ticketId) => {
        setTickets((prevTickets) =>
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
                    <Text>.................................................................................</Text>
                    <View style={styles.circle2} />
                </View>

                <View style={styles.ticketDetails}>
                    <View style={styles.CityContainer}>
                        <Text style={styles.placeText}>{item.arrivalPlace}</Text>
                        <Image style={styles.flightImage} source={item.logo} />
                        <Text style={styles.placeText}>{item.destinationPlace}</Text>
                    </View>


                    <View style={styles.Time}>
                        <View style={styles.DTime}>
                            <Text style={styles.title2}>Departure Date : </Text>
                            <Text style={styles.ticketText2}>
                                {item.Departuredate}
                            </Text>
                            <Text style={styles.title2}>Departure Time : </Text>
                            <Text style={styles.ticketText2}>
                                {item.departureTime}
                            </Text>
                        </View>
                        <View style={styles.ATime}>
                            <Text style={styles.title2}>Arrival Date : </Text>
                            <Text style={styles.ticketText2}>
                                {item.Arrivaledate}
                            </Text>
                            <Text style={styles.title2}>Arrival Time : </Text>
                            <Text style={styles.ticketText2}>
                                {item.arrivalTime}
                            </Text>
                        </View>
                    </View>
              
                    <View style={styles.Time1}>
                        <View style={styles.DTime1}>
                            <Text style={styles.title2}>Flight # : </Text>
                            <Text style={styles.ticketText2}>
                                {item.ticketNumber}
                            </Text>
                        </View>
                        <View style={styles.DTime1}>
                            <Text style={styles.title2}>Type  : </Text>
                            <Text style={styles.ticketText2}>
                                {item.classType}
                            </Text>
                        </View>
                        <View style={styles.DTime1}>
                            <Text style={styles.title2}>Duration  : </Text>
                            <Text style={styles.ticketText2}>
                                {item.Duration}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.seatsContainer}>
                        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                            <Ionicons name="remove-circle" size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.seatsText}>{item.totalSeats}</Text>
                        <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                            <Ionicons name="add-circle" size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.labelText}>Seats</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container} >
          <View style={styles.header}>
          <ImageBackground style={styles.Rectangle} source={require("../../assets/blackp.png")}>
                <Text style={styles.headerText}> safarnama</Text>

            </ImageBackground>
            </View>
    
            <View style={[styles.ProfileContainer, { width: containerWidth }]}>
          <View style={styles.searchInputs}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Destination City"
            value={searchInput.destinationPlace}
            onChangeText={(text) => setSearchInput({ ...searchInput, destinationPlace: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Arrival City"
            value={searchInput.arrivalPlace}
            onChangeText={(text) => setSearchInput({ ...searchInput, arrivalPlace: text })}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Departure Date"
            value={searchInput.departureDate}
            onChangeText={(text) => setSearchInput({ ...searchInput, departureDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Return Date"
            value={searchInput.returnDate}
            onChangeText={(text) => setSearchInput({ ...searchInput, returnDate: text })}
          />
        </View>
        <View style={styles.searchButtons}>
        <TouchableOpacity onPress={handleSearch} style={styles.searchbutton}><Text style={styles.placeText}>Search</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleClear} style={styles.searchbutton}><Text style={styles.placeText}>Clear</Text></TouchableOpacity>

      </View>
      </View>

      {/* Search Buttons */}
     
      </View>

      {/* Display Filtered Results */}
      {filteredTickets.length > 0 && (
        <View style={styles.filteredResults}>
          <FlatList
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
              data={tickets}
              keyExtractor={(item) => item.id}
              renderItem={renderTicketCard}
              contentContainerStyle={styles.ticketList}
            />
          </View>
    
          {/* Railway Tickets */}
          <View style={styles.ticketCategory}>
            <Text style={styles.categoryHeading}>Railway Tickets</Text>
            <FlatList
              horizontal
              data={railwayTickets}
              keyExtractor={(item) => item.id}
              renderItem={renderTicketCard}
              contentContainerStyle={styles.ticketList}
            />
          </View>
    
          {/* Bus Tickets */}
          <View style={styles.ticketCategory}>
            <Text style={styles.categoryHeading}>Bus Tickets</Text>
            <FlatList
              horizontal
              data={busTickets}
              keyExtractor={(item) => item.id}
              renderItem={renderTicketCard}
              contentContainerStyle={styles.ticketList}
            />
          </View>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor: 'white',
    },
    Rectangle: {
        backgroundColor: 'linear-gradient(190deg, rgb(3, 16, 69), rgb(3, 16, 69))',
        borderRadius: 80,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
      
    },
    ProfileContainer: {
        backgroundColor: 'white',
        borderRadius: 28,
        marginTop: 100,
        height: 100,
    },
    header: {
        height: 140,
        backgroundColor: '#032844',
        shadowColor: 'black',
        elevation: 20,
        zIndex: -1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    headerText: {
        textAlign: 'center',
        top: 60,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },
    Time: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    Time1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        color: '#73777B',
        fontSize: 16,
    },
    ticketTitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-Bold',
    },
    title2: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 10,
    },

    ticketText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        marginBottom: 10,
    },
    ticketText2: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
    },
    dottedLine: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        borderStyle: 'dashed',
        marginBottom: 50,
    },
    circle1: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        bottom: 10,
        left: -30,
    },
    circle2: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        bottom: 10,
        right: -30,
    },
    ticketList: {
        padding: 10,
    },
    Viewticket: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketCard: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'black',
        overflow: 'hidden',
        width: '90%',
        height:550,
    },
    ATime: {
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 25,
        padding: 10,
        width: 115,
    },
    DTime: {
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 25,
        marginRight: 0,
        padding: 10,
        width: 115,
    },
    DTime1: {
        borderColor: 'white',
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
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center',
        top:10,
    },
    CityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    flightImage: {
        width: 50,
        height: 50,
    },
    timeText: {
        fontSize: 14,
        color: 'white',
    },
    routeIcon: {
        alignSelf: 'center',
        marginVertical: 5,
    },
    flightDetails: {
        fontSize: 14,
        color: 'white',
    },
    flightTypeContainer: {
        backgroundColor: '#3498db',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    flightTypeText: {
        fontSize: 12,
        color: 'white',
    },
    flightInfoContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    infoBoxLabel: {
        fontSize: 12,
        color: 'white',
    },
    infoBoxValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
    },
    dateText: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
    seatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        margin: 10,
        borderWidth:3,
        borderColor:'white',
        borderRadius:50,
        width:150,
        height:50,
        alignSelf:'center',
    },
    icon: {
        marginHorizontal: 5,
        color: 'white',
    },
    seatsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    labelText: {
        marginLeft: 5,
        color: 'white',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f2f2f2',
      },
      searchInputs: {
        paddingHorizontal: 10,
        margin:20,
        backgroundColor:'white',
        top:-120,
        borderRadius:40,
        padding:20,
      },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginRight: 10,
      },
      searchButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
      },
      searchbutton:{
        backgroundColor:'black',
        width:130,
        height:50,
      },
      filteredResults: {
        marginTop: 10,
      },
    
      ticketCategory: {
        marginVertical: 10,
      },
      categoryHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
      },
});

export default Flight;
