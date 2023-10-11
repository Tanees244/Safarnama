import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const GuideHome = () => {
  
    return (
        <View style={styles.Container}>
          <View style={styles.Rectangle}/>
          <View style={styles.InfoContainer}>
            <Text style={styles.GuideName}>GUIDE'S NAME</Text>
            <Text style={styles.GuideId}>GUIDE'S ID</Text>
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
            activeOpacity={0.9} 
            style={styles.Buttons}
            >
              <Text style={styles.ButtonText}>Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.Buttons}
            >
              <Text style={styles.ButtonText}>Experience</Text>
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.Buttons}
            >
              <Text style={styles.ButtonText}>Bank Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.5} 
            style={styles.Buttons}
            >
              <Text style={styles.ButtonText}>Questionnaire</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      Container: {
        backgroundColor: '#A4B0B2',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Rectangle: {
        backgroundColor: '#A5A2D8',
        borderRadius: 46,
        height: 320,
        top: -10,
        width: '100%',
        position: 'absolute',
      },
      InfoContainer: {
        backgroundColor: 'white',
        width: '80%',
        height: 280,
        alignItems: 'center',
        position: 'absolute',
        top: 120,
        borderRadius: 40,
      }, 
      GuideImage: {
        top: 30,
      },
      GuideName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 50,
      },
      GuideId: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 5,
      },
      ButtonContainer: {
        width: '90%',
        backgroundColor: '#D9D9D9',
        borderRadius: 33,
        marginTop: 360,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
      },
      Buttons: {
        backgroundColor: 'white',
        width: '80%',
        height: 70,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      ButtonText: {
        fontSize: 18,
        fontWeight: '600',
      },
    });

export default GuideHome;
