import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VendorDetail = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;

  const [activeSection, setActiveSection] = useState("Hotel");
  const [hotelVendors, setHotelVendors] = useState([]);
  const [airlineVendors, setAirlineVendors] = useState([]);
  const [busVendors, setBusVendors] = useState([]);
  const [railwayVendors, setRailwayVendors] = useState([]);

  useEffect(() => {
    fetchVendorDetails();
  }, [activeSection]);

  const fetchVendorDetails = async () => {
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
      const response = await axios.get(`http://192.168.100.18:8000${endpoint}`);
      switch (activeSection) {
        case "Hotel":
          setHotelVendors(response.data);
          break;
        case "Airline":
          setAirlineVendors(response.data);
          break;
        case "Railway":
          setRailwayVendors(response.data);
          break;
        case "Bus":
          setBusVendors(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleRemoveairline = async (vendorId) => {
    try {
      await axios.delete(`http://192.168.100.18:8000/api/adminRoutes/vendor/${vendorId}`);
      fetchVendorDetails();
    } catch (error) {
      console.error('Error removing vendor:', error);
    }
  };

  const handleRemovehotel = async (vendorId) => {
    try {
      await axios.delete(`http://192.168.100.18:8000/api/adminRoutes/hotel/${vendorId}`);
      fetchVendorDetails();
    } catch (error) {
      console.error('Error removing vendor:', error);
    }
  };

  const handleRemoverailway = async (vendorId) => {
    try {
      await axios.delete(`http://192.168.100.18:8000/api/adminRoutes/railway/${vendorId}`);
      fetchVendorDetails();
    } catch (error) {
      console.error('Error removing vendor:', error);
    }
  };

  const handleRemoveBus = async (vendorId) => {
    try {
      await axios.delete(`http://192.168.100.18:8000/api/adminRoutes/bus/${vendorId}`);
      fetchVendorDetails();
    } catch (error) {
      console.error('Error removing vendor:', error);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>Vendors</Text>

        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => handleSectionChange("Hotel")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Hotel" && styles.activeSection,
              ]}
            >
              Hotel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSectionChange("Airline")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Airline" && styles.activeSection,
              ]}
            >
              Airline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSectionChange("Railway")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Railway" && styles.activeSection,
              ]}
            >
              Railway
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSectionChange("Bus")}>
            <Text
              style={[
                styles.sectionText,
                activeSection === "Bus" && styles.activeSection,
              ]}
            >
              Bus
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Vendors based on the active section */}
        {activeSection === "Hotel" && (
          <ScrollView>
            {hotelVendors.map((vendor) => (
              <View key={vendor.id} style={[styles.Detail, { width: containerWidth }]}>
                <View style={styles.UserName}>
                  <Image style={styles.UserImage} source={require('../../assets/ellipse.png')} />
                  <Text style={styles.UserNameText}>Name: {vendor.name}</Text>
                </View>
                <View style={styles.UserDetails}>
                  <Text style={styles.UserDetailsText}>ID: {vendor.hotel_id}</Text>
                  <Text style={styles.UserDetailsText}>Contact: {vendor.contact_number}</Text>
                  <Text style={styles.UserDetailsText}>Email: {vendor.email}</Text>
                </View>
                <View style={styles.Buttons}>
                  <TouchableOpacity style={styles.RemoveButton} onPress={() => handleRemovehotel(vendor.hotel_id)}>
                    <Text style={styles.ButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeSection === "Airline" && (
          <ScrollView>
            {airlineVendors.map((vendor) => (
              <View key={vendor.id} style={[styles.Detail, { width: containerWidth }]}>
                <View style={styles.UserName}>
                  <Image style={styles.UserImage} source={require('../../assets/ellipse.png')} />
                  <Text style={styles.UserNameText}>{vendor.name}</Text>
                </View>
                <View style={styles.UserDetails}>
                  <Text style={styles.UserDetailsText}>ID: {vendor.airline_id}</Text>
                  <Text style={styles.UserDetailsText}>Contact: {vendor.contact_number}</Text>
                  <Text style={styles.UserDetailsText}>Email: {vendor.email}</Text>
                </View>
                <View style={styles.Buttons}>
                  <TouchableOpacity style={styles.RemoveButton} onPress={() => handleRemoveairline(vendor.airline_id)}>
                    <Text style={styles.ButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeSection === "Railway" && (
          <ScrollView>
            {railwayVendors.map((vendor) => (
              <View key={vendor.id} style={[styles.Detail, { width: containerWidth }]}>
                <View style={styles.UserName}>
                  <Image style={styles.UserImage} source={require('../../assets/ellipse.png')} />
                  <Text style={styles.UserNameText}>{vendor.name}</Text>
                </View>
                <View style={styles.UserDetails}>
                  <Text style={styles.UserDetailsText}>ID: {vendor.railway_id}</Text>
                  <Text style={styles.UserDetailsText}>Contact: {vendor.contact_number}</Text>
                  <Text style={styles.UserDetailsText}>Email: {vendor.email}</Text>
                </View>
                <View style={styles.Buttons}>
                  <TouchableOpacity style={styles.RemoveButton} onPress={() => handleRemoverailway(vendor.railway_id)}>
                    <Text style={styles.ButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeSection === "Bus" && (
          <ScrollView>
            {busVendors.map((vendor) => (
              <View key={vendor.id} style={[styles.Detail, { width: containerWidth }]}>
                <View style={styles.UserName}>
                  <Image style={styles.UserImage} source={require('../../assets/ellipse.png')} />
                  <Text style={styles.UserNameText}>{vendor.name}</Text>
                </View>
                <View style={styles.UserDetails}>
                  <Text style={styles.UserDetailsText}>ID: {vendor.bus_id}</Text>
                  <Text style={styles.UserDetailsText}>Contact: {vendor.contact_number}</Text>
                  <Text style={styles.UserDetailsText}>Email: {vendor.email}</Text>
                </View>
                <View style={styles.Buttons}>
                  <TouchableOpacity style={styles.RemoveButton} onPress={() => handleRemoveBus(vendor.bus_id)}>
                    <Text style={styles.ButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#C8F2F5',
  },
  Container: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#1a1a1a',
    shadowColor: 'black',
    elevation: 20,
  },
  headerText: {
    textAlign: 'center',
    top: 60,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  Text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
    padding: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#333',
  },
  activeSection: {
    fontFamily: 'Poppins-SemiBold',
    borderBottomWidth: 4,
    borderBottomColor: '#0B6180',
  },
  Detail: {
    backgroundColor: '#1E3740',
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UserImage: {
    width: 90,
    height: 90,
  },
  UserName: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  UserNameText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 24,
    marginLeft: 20,
  },
  UserDetails: {
    backgroundColor: '#C1D8EA',
    width: '90%',
    marginTop: 20,
    padding: 20,
    borderRadius: 30,
  },
  UserDetailsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  Buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  ButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  RemoveButton: {
    backgroundColor: '#CE1B2E',
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
});

export default VendorDetail;
