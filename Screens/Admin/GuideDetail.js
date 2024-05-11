import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuideDetail = () => {
  
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const [guideDetails, setGuideDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    fetchGuideDetails();
  }, []);

  const fetchGuideDetails = async () => {
    try {
      const response = await fetch('http://192.168.100.12:8000/api/adminRoutes/guide-details');
      if (!response.ok) {
        throw new Error('Failed to fetch guide details');
      }
      const data = await response.json();
      console.log("Fetched Guide Details:", data);
      const groupedGuides = data.reduce((acc, curr) => {
        if (acc[curr.guide_id]) {
          acc[curr.guide_id].packages.push({
            package_id: curr.package_id,
            destination: curr.destination,
            preferences: curr.preferences,
            price: curr.price,
          });
        } else {
          acc[curr.guide_id] = {
            guide_id: curr.guide_id,
            name: curr.name,
            packages: [{
              package_id: curr.package_id,
              destination: curr.destination,
              preferences: curr.preferences,
              price: curr.price,
            }],
          };
        }
        return acc;
      }, {});
      const guides = Object.values(groupedGuides);
      setGuideDetails(guides);
    } catch (error) {
      console.error('Error fetching guide details:', error);
    }
  };

  const rejectGuide = async (guideId) => {
    console.log('Rejecting guide with ID:', guideId);
    try {
      const response = await fetch(`http://192.168.100.12:8000/api/adminRoutes/guide/${guideId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to reject guide');
      }
      fetchGuideDetails();
    } catch (error) {
      console.error('Error rejecting guide:', error);
    }
  };

  const openModal = (guide) => {
    console.log("Selected Guide:", guide);
    setSelectedGuide(guide);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Guides</Text>
        <View style={styles.ButtonContainer}>
          {guideDetails.map((guide, index) => (
            <View key={index} style={[styles.detailContainer, { width: containerWidth }]}>
              <View style={styles.user}>
                <Image style={styles.userImage} source={require("../../assets/ellipse.png")} />
                <Text style={styles.userName}>{guide.name}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userDetailsText}>Id # : {guide.guide_id}</Text>
                <Text style={styles.userDetailsText}>Number of Packages : {guide.packages.length}</Text>
                <TouchableOpacity style={styles.packageButton} onPress={() => openModal(guide)}>
                  <Text style={styles.packageButtonText}>View Package Details</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => rejectGuide(guide.guide_id)} // Pass the guide ID to rejectGuide function
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>

              </View>
            </View>
          ))}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Package Details</Text>
              {selectedGuide && selectedGuide.packages.length > 0 ? (
                <View>
                  {selectedGuide.packages.map((packageItem, index) => (
                    <View key={index} style={styles.packageDetails}>
                      <Text>Package Destination: {packageItem.destination}</Text>
                      <Text>Description: {packageItem.preferences}</Text>
                      <Text>Price: {packageItem.price}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text>No packages served</Text>
              )}
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
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  packageDetails: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#007bff',
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
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#C8F2F5',
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
    padding: 20,
  },
  detailContainer: {
    backgroundColor: '#1E3740',
    borderRadius: 50,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImage: {
    width: 90,
    height: 90,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 24,
    marginLeft: 20,
  },
  userDetails: {
    backgroundColor: '#C1D8EA',
    width: '90%',
    marginTop: 20,
    padding: 20,
    borderRadius: 30,
  },
  userDetailsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#CE1B2E',
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  packageButton: {
    backgroundColor: '#007bff',
    width: 200,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    marginTop: 10,
  },
  packageButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default GuideDetail;
