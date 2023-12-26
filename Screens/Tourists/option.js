import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,Image, Dimensions, ScrollView} from 'react-native';
import TransportList from './TransportLists';
import GuideList from './GuideLists';


const Option = ({ navigation }) => {
  
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  

  const handleTransportRental = () => {
    setModalVisible(true);
  };

  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
    setModalVisible(false);
  };
  const handleGuidelist = () => {
    setModalVisible1(true);
  };

  const handleGuidetSelect = (guide) => {
    setSelectedGuide(guide);
    setModalVisible1(false);
  };

  const navigateToPaymentgateway = () => {
    navigation.navigate('PaymentGateway');
  };
  
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 1;
  const inputWidth = containerWidth * 0.6;

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Safarnama</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} >

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleTransportRental}
          >
          <Text style={styles.buttonText}>Transport Rental Service</Text>
          <Image style={styles.closeIcon} source={require('../../assets/plus.png')} />
        </TouchableOpacity>

        <Text style={styles.header1}>Selected Transport : </Text>
        {selectedTransport && (
          <View style={styles.transportContainer}>
            <Image source={selectedTransport.image} style={{width:50,height:50}} />
            <Text style={styles.transportTitle}>{selectedTransport.title}</Text>
            <Text style={styles.transportDescription}>{selectedTransport.Make}</Text>
            <Text style={styles.transportDescription}>{selectedTransport.description}</Text>
            <Text style={styles.transportDescription}>{selectedTransport.description2}</Text>
            <Text style={styles.transportDescription}>{selectedTransport.description3}</Text>
          </View>
        )}
     
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleGuidelist}
        >
          <Text style={styles.buttonText}>Do You Want Guide?</Text>
          <Image style={styles.closeIcon} source={require('../../assets/plus.png')} />
        </TouchableOpacity>

        <Text style={styles.header1}>Selected Transport : </Text>
        {selectedGuide && (
          <View style={styles.transportContainer}>
            <Image source={selectedGuide.image} style={{width:50,height:50}} />
            <Text style={styles.transportTitle}>{selectedGuide.title}</Text>
            <Text style={styles.transportDescription}>{selectedGuide.Make}</Text>
            <Text style={styles.transportDescription}>{selectedGuide.description3}</Text>
            <Text style={styles.transportDescription}>{selectedGuide.description4}</Text>
          </View>
        )}

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <TransportList onTransportSelect={handleTransportSelect} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={isModalVisible1} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <GuideList onGuideSelect={handleGuidetSelect} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible1(false)}>
            <Image style={styles.closeIcon} source={require('../../assets/cross.png')} />
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity 
          activeOpacity={0.5} 
          onPress={navigateToPaymentgateway}
          style={[styles.buttonText2, { width: inputWidth }]}
        >
          <Text style={styles.TextDesign}>NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: '#cee7fa',
    flex: 1,
  },
  container: {
    flexGrow:1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#032844',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginTop: 40,
  },
  buttonText2: {
    margin: 20,
    flexDirection: 'row',
    borderRadius: 38,
    backgroundColor: '#54aaec',
    justifyContent: 'center',
    alignContent: 'center',
  },
  TextDesign: {
    fontSize: 24,
    padding: 10,
    color: '#092547',
    fontFamily: 'Poppins-ExtraBold',
  },
  header1: {
    fontSize: 24,
    fontFamily:'Poppins-Bold',
    marginBottom: 20,
    color:'#032844',
  },
  transportContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#54aaec',
    marginBottom: 20,
  },
  transportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transportDescription: {
    fontSize: 16,
    color: '#777',
  },
  button: {
    backgroundColor: '#071B26',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    flexDirection:'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Poppins-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 700,
    right: 160,
    backgroundColor: '#C4C8CB',
    borderRadius: 60,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Option;
