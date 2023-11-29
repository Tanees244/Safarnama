// ItineraryDay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItineraryDay = ({ day, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dayHeading}>Day {day}</Text>
      <View style={styles.itemContainer1}>
        <Text style={styles.time1}>Time</Text>
        <Text style={styles.detail1}>Place</Text>
        <Text style={styles.detail1}>Transport</Text>
        <Text style={styles.detail1}>Activity</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.detail}>{item.place}</Text>
          <Text style={styles.detail}>{item.transport}</Text>
          <Text style={styles.detail}>{item.activity}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    backgroundColor: '#092547',
    marginBottom: 20,
  },
  dayHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#092547',
    paddingVertical: 5,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    backgroundColor:'#D8D6F4',
    paddingVertical: 5,

  },
  time: {
    width: '20%',
    fontWeight: 'bold',
    borderRightWidth: 1,
    backgroundColor: '#092547',
    textAlign: 'center',
    backgroundColor:'#D8D6F4',
  },
  detail: {
    width: '20%',
    textAlign: 'center',
    backgroundColor:'#D8D6F4',
  },
  itemContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    left: 10,
    backgroundColor: '#092547',
    paddingVertical: 5,
  },
  time1: {
    width: '20%',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: 'white',

  },
  detail1: {
    width: '30%',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default ItineraryDay;
