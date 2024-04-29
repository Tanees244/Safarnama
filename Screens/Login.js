import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Vector } from "../assets";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.82;

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Category");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.18:8000/api/authRoutes/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
  
      const token = data.token;
      await AsyncStorage.setItem("authToken", token);
      console.log("Auth Token : ", token);
  
      if (data.isAdmin) {
        navigation.navigate("AdminDashboard");
      } else if (data.user.user_type === "Tourist") {
        navigation.navigate("Discover");
      } else if (data.user.user_type === "Guide") {
        navigation.navigate("GuideHomeScreen");
      } else if (data.user.user_type === "Vendor") {
        if (data.isHotel) {
          navigation.navigate("HotelDashboard");
        } else if (data.transportType === "Airline") {
          navigation.navigate("AirlineDashboard");
        } else if (data.transportType === "Railway") {
          navigation.navigate("RailwayDashboard");
        } else if (data.transportType === "Bus") {
          navigation.navigate("BusDashboard");
        } else {
          navigation.navigate("TransportDashboard");
        }
      } else {
        navigation.navigate("AirlineDashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Use 'height' for Android
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/p11.jpg")}
      >
        <View style={styles.contentContainer}>
          <View style={styles.Textcontainer}>
            <Image style={styles.vector} source={Vector} />
            <Text style={styles.text}>Safarnama</Text>
            <View style={[styles.ButtonContainer, { width: containerWidth }]}>
              <View style={styles.InputContainer}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.Input}
                />
                <View style={styles.PasswordInputContainer}>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!passwordVisible} // Conditionally set secureTextEntry
                    style={styles.PasswordInput}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.PasswordVisibilityButton}
                    onPress={togglePasswordVisibility}
                  >
                    <MaterialIcons
                      name={passwordVisible ? "visibility" : "visibility-off"}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.LoginButton}
                onPress={handleSignIn}
              >
                <Text style={styles.LoginText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.Signup}>
                <Text style={styles.text2}>DONT HAVE AN ACCOUNT</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={handleRegister}>
                  <Text style={styles.boldText}> SIGN UP !</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  Textcontainer: {
    flex: 1,
    top: 140,
    alignItems: "center",
  },
  vector: {
    top: 20,
    right: 150,
  },
  text: {
    fontSize: 45,
    fontFamily: "Poppins-Bold",
    color: "white",
    elevation: 50,
    shadowColor: "black",
  },
  ButtonContainer: {
    padding: 20,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  InputContainer: {
    width: "100%",
  },
  Input: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
  },
  PasswordButton: {
    alignItems: "stretch",
    marginLeft: 160,
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  PasswordText: {
    fontStyle: "italic",
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  LoginButton: {
    justifyContent: "center",
    backgroundColor: "#092547",
    width: "80%",
    height: 56,
    borderRadius: 20,
    marginTop: 25,
    elevation: 5,
  },
  LoginText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  Signup: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  text2: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  boldText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "white",
    bottom: 2,
  },
  PasswordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  PasswordInput: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: "Poppins-SemiBold",
    flex: 1, // Fill available space in the row
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
  },
  PasswordVisibilityButton: {
    padding: 10,
  },
});

export default Login;
