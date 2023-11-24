import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const ActiveTicket = ({ ticketDetails, ticketNumber }) => {


  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  return (
    <View style={[styles.activeTicketContainer , { width: containerWidth }]}>

        <Text style={[styles.ticketNumber, {backgroundColor: '#A5A5AA', width: '50%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 20,}]}>Ticket #{ticketNumber}</Text>

        <View style={styles.flightInfoContainer}>
            <Text style={styles.flightName}>Serene Airline</Text>
            <Text style={styles.flightNumber}>{ticketDetails.flightNumber}</Text>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.CityContainer}>
            <Text style={styles.ticketText}>{ticketDetails.departureCity}</Text>
            <Image style={styles.flightImage} source={require('../../assets/flight.png')}/>
            <Text style={styles.ticketText}>{ticketDetails.arrivalCity}</Text>
        </View>

        <View style={styles.seatTypeContainer}>
        <View style={[styles.seatTypeOption, ticketDetails.flightType.trim().toLowerCase() === 'first-class' && styles.selectedSeat]}>
            <Text style={styles.seatTypeText}>First Class</Text>
        </View>
        <View style={[styles.seatTypeOption, ticketDetails.flightType.trim().toLowerCase() === 'business' && styles.selectedSeat]}>
            <Text style={styles.seatTypeText}>Business</Text>
        </View>
        <View style={[styles.seatTypeOption, ticketDetails.flightType.trim().toLowerCase() === 'economy' && styles.selectedSeat]}>
            <Text style={styles.seatTypeText}>Economy</Text>
        </View>
        </View>
        
        <View style={styles.ticketInfoContainer}>
            <View style={styles.ticketText}>
                <Text style={styles.ticketText}>Price : {ticketDetails.price} PKR</Text>
            
                <Text style={styles.ticketText}>Departure Date : {ticketDetails.departureDate.toLocaleDateString()}</Text>
                <Text style={styles.ticketText}>Flight Duration : {ticketDetails.flightDuration}</Text>
            </View>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  activeTicketContainer: {
    backgroundColor: '#393646',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  ticketNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  flightInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#1B2430',
    padding: 20,
    marginBottom: 25,
  },
  flightNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  flightName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'right',
  },
  dottedLine: {
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    borderStyle: 'dashed',
    marginBottom: 30,
  },
  CityContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flightImage:{
    width: 50,
    height: 50, 
 },
 seatTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  seatTypeOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  seatTypeText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  selectedSeat: {
    backgroundColor: '#73777B', 
  },
  ticketTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  Duration: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ticketText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketInfo: {
    flex: 1,
  },
});

export default ActiveTicket;
