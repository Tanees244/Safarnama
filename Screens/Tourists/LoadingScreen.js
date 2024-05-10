import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'


const LoadingScreen = () => {
    const LoadingTexts = [
        "Loading...",
        "Cooking Special Itenary...",
        "Planning your Safarnama...",
        "Get ready to explore..."
    ];
    const [currentText, setCurrentText] = useState(LoadingTexts[0]);

    useEffect(() => {
        const interval = setInterval(()=>{
            setCurrentText((prevText) => {
                const currentIndex = LoadingTexts.indexOf(prevText);
                const nextIndex = (currentIndex + 1) % LoadingTexts.length;
                return LoadingTexts[nextIndex];
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

  return (
    <View style={styles.container}>
    <ActivityIndicator size="large" color="#FF6347" />
    <Text style={styles.text}>{currentText} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize:20,
        marginTop: 20,
        color:'black',
    }
})

export default LoadingScreen
