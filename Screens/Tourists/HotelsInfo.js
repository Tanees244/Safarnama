import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    id: "1",
    image: require("../../assets/F1.png"),
    title: "WiFi",
  },
  {
    id: "2",
    image: require("../../assets/F2.png"),
    title: "Breakfast",
  },
  {
    id: "3",
    image: require("../../assets/F3.png"),
    title: "Gym",
  },
  {
    id: "4",
    image: require("../../assets/F4.png"),
    title: "Parking",
  },
  {
    id: "5",
    image: require("../../assets/F5.png"),
    title: "Parking",
  },
  {
    id: "6",
    image: require("../../assets/F6.png"),
    title: "Parking",
  },

];

const ReservationSection = ({ room }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(1);
  const [Name, setName] = useState(1);
  const [Price, setPrice] = useState(1);
  const [children, setChildren] = useState(0);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [rooms, setRooms] = useState(SelectedRoomDetails ? SelectedRoomDetails.rooms : 1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [SelectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Id, setID] = useState('');
  const navigation = useNavigation();



  const toggleCheckInPicker = () => {
    setShowCheckInPicker(!showCheckInPicker);
  };

  const toggleCheckOutPicker = () => {
    setShowCheckOutPicker(!showCheckOutPicker);
  };

  const handleCheckInChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || checkInDate;
      setCheckInDate(currentDate);
      toggleCheckInPicker();
    } else {
      toggleCheckInPicker();
    }
  };

  const handleCheckOutChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || checkOutDate;
      setCheckOutDate(currentDate);
      toggleCheckOutPicker();
    } else {
      toggleCheckOutPicker();
    }
  };

  const toggleGuestModal = () => {
    setShowGuestModal(!showGuestModal);
  };

  const toggleRoomModal = () => {
    setShowRoomModal(!showRoomModal);
  };

  const handleGuestsConfirm = () => {
    setGuests(adults + children);
    toggleGuestModal();
  };

  const incrementAdults = () => {
    if (adults < 4) {
      setAdults(adults + 1);
    }
  };

  const decrementAdults = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };

  const incrementChildren = () => {
    if (children < 4 && adults + children < 4) {
      setChildren(children + 1);
    }
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const closePopup = () => {
    setShowGuestModal(false);
  };

  const closePopuproom = () => {
    setShowRoomModal(false);
  };

  const incrementRooms = (availableRooms) => {
    if (rooms < availableRooms) {
      setRooms(rooms => rooms + 1);
    } else {
      alert("You cannot add more rooms than available.");
    }
  };

  const decrementRooms = () => {
    if (rooms > 1) {
      setRooms(rooms - 1);
    }
  };

  const handleClear = () => {
    setSelectedRoom(null);
    setSelectedRoomDetails(null);
  };

  const handleBook = () => {
    setShowRoomModal(false);
    setSelectedRoomDetails({
      name: Name,
      price: Price,
      adults: adults,
      children: children,
      rooms: rooms,
      checkInDate: checkInDate.toLocaleDateString(),
      checkOutDate: checkOutDate.toLocaleDateString(),
      hotel_details_id: Id,
    });
  };

  const checkAuthentication = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      return authToken !== null;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = await checkAuthentication();
      setIsAuthenticated(authenticated);
    };

    checkAuthStatus();
  }, []);

  const handleBookNow = async () => {
    if (isAuthenticated) {
      if (SelectedRoomDetails) {
        const token = await AsyncStorage.getItem("authToken");
        axios.post("http://192.168.100.12:8000/api/VendorsRoutes/hotel-booking", SelectedRoomDetails, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response.data);
            handleClear();
            Alert.alert(
              "Room Reserved",
              "Your room has been reserved. Do you want to add more rooms?",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
            // Navigate to the next screen or perform other actions
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    } else {
      Alert.alert(
        "Sign In Required",
        "Please sign in to view your profile.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Sign In", onPress: () => navigation.navigate("Login") },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Reservation</Text>
      <View style={styles.dateSelection}>
        <View >
          <TouchableOpacity onPress={toggleRoomModal} style={styles.button}>
            <Text style={styles.buttonText1}>Add A Room</Text>
          </TouchableOpacity>
        </View>
      </View>
      {SelectedRoomDetails && (
        <View style={styles.selectedRoomContainer}>
          <Text style={styles.selectedRoomText}>
            Selected Room: {SelectedRoomDetails.name}
          </Text>
          <Text style={styles.selectedRoomText}>
            Price: {SelectedRoomDetails.price * SelectedRoomDetails.rooms} pkr/night
          </Text>
          <Text style={styles.selectedRoomText}>
            Adults: {SelectedRoomDetails.adults}
          </Text>
          <Text style={styles.selectedRoomText}>
            Children: {SelectedRoomDetails.children}
          </Text>
          <Text style={styles.selectedRoomText}>
            Rooms: {SelectedRoomDetails.rooms}
          </Text>
          <Text style={styles.selectedRoomText}>
            Check-in Date: {SelectedRoomDetails.checkInDate}
          </Text>
          <Text style={styles.selectedRoomText}>
            Check-out Date: {SelectedRoomDetails.checkOutDate}
          </Text>
          <Text style={styles.selectedRoomText}>
            ID: {SelectedRoomDetails.hotel_details_id}
          </Text>
          <View style={styles.confirmbutton}>
            <TouchableOpacity onPress={handleBookNow} style={styles.confirm}>
              <Text style={styles.clearButton}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClear} style={styles.clear}>
              <Text style={styles.clearButton}>CLEAR</Text>
            </TouchableOpacity>
          </View>
        </View>

      )}

      <Modal visible={showRoomModal} animationType="slide"
        animationOut="slideOutDown"
        onBackdropPress={closePopuproom}
      >
        <View style={styles.popupContent1}>
          <TouchableOpacity
            onPress={closePopuproom}
            style={styles.closeIconContainer}
          >
            <Image
              style={styles.closeIcon}
              source={require("../../assets/cross.png")}
            />
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.roomCard}>
              <Text style={styles.roomCardTitle}>Single Bed Room</Text>
              <Text style={styles.roomCardPrice} >{room.price_single_bed} pkr/night</Text>
              <Text>Number Of Rooms Available : {room.rooms_single_bed}</Text>
              <View style={styles.controlsContainer}>
                <Text style={styles.label}>Adults:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementAdults}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{adults}</Text>
                  <TouchableOpacity onPress={incrementAdults}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Children:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementChildren}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{children}</Text>
                  <TouchableOpacity onPress={incrementChildren}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Number of Rooms:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementRooms}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{rooms}</Text>
                  <TouchableOpacity onPress={() => incrementRooms(room.rooms_single_bed)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-in Date:</Text>
                  <TouchableOpacity onPress={toggleCheckInPicker}>
                    <Text style={styles.dateText}>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckInPicker && (
                    <DateTimePicker
                      value={checkInDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckInChange}
                    />
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-out Date:</Text>
                  <TouchableOpacity onPress={toggleCheckOutPicker}>
                    <Text style={styles.dateText}>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckOutPicker && (
                    <DateTimePicker
                      value={checkOutDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckOutChange}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                setSelectedRoom({ name: "Single Bed Room", price: room.price_single_bed });
                setName("Single Bed Room");
                setPrice(room.price_single_bed);
                setID(room.hotel_details_id);
                handleBook();
              }}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.roomCard} >
              <Text style={styles.roomCardTitle}>Double Bed Room</Text>
              <Text style={styles.roomCardPrice}>{room.price_double_bed} pkr/night</Text>
              <Text>Number Of Rooms Available : {room.rooms_double_bed}</Text>
              <View style={styles.controlsContainer}>
                <Text style={styles.label}>Adults:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementAdults}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{adults}</Text>
                  <TouchableOpacity onPress={incrementAdults}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Children:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementChildren}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{children}</Text>
                  <TouchableOpacity onPress={incrementChildren}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Number of Rooms:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementRooms}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{rooms}</Text>
                  <TouchableOpacity onPress={() => incrementRooms(room.rooms_double_bed)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-in Date:</Text>
                  <TouchableOpacity onPress={toggleCheckInPicker}>
                    <Text style={styles.dateText}>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckInPicker && (
                    <DateTimePicker
                      value={checkInDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckInChange}
                    />
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-out Date:</Text>
                  <TouchableOpacity onPress={toggleCheckOutPicker}>
                    <Text style={styles.dateText}>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckOutPicker && (
                    <DateTimePicker
                      value={checkOutDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckOutChange}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                setName("Double Bed Room");
                setPrice(room.price_double_bed);
                setID(room.hotel_details_id);
                handleBook();
              }}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.roomCard}>
              <Text style={styles.roomCardTitle}>Standard Room</Text>
              <Text style={styles.roomCardPrice}>{room.price_standard} pkr/night</Text>
              <Text>Number Of Rooms Available : {room.rooms_standard}</Text>
              <View style={styles.controlsContainer}>
                <Text style={styles.label}>Adults:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementAdults}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{adults}</Text>
                  <TouchableOpacity onPress={incrementAdults}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Children:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementChildren}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{children}</Text>
                  <TouchableOpacity onPress={incrementChildren}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Number of Rooms:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementRooms}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{rooms}</Text>
                  <TouchableOpacity onPress={() => incrementRooms(room.rooms_standard)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-in Date:</Text>
                  <TouchableOpacity onPress={toggleCheckInPicker}>
                    <Text style={styles.dateText}>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckInPicker && (
                    <DateTimePicker
                      value={checkInDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckInChange}
                    />
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-out Date:</Text>
                  <TouchableOpacity onPress={toggleCheckOutPicker}>
                    <Text style={styles.dateText}>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckOutPicker && (
                    <DateTimePicker
                      value={checkOutDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckOutChange}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                setName("Standard Room");
                setPrice(room.price_standard);
                setID(room.hotel_details_id);
                handleBook();
              }}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.roomCard}>
              <Text style={styles.roomCardTitle}>Executive Room</Text>
              <Text style={styles.roomCardPrice}>{room.price_executive} pkr/nightt</Text>
              <Text>Number Of Rooms Available : {room.rooms_executive}</Text>
              <View style={styles.controlsContainer}>
                <Text style={styles.label}>Adults:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementAdults}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{adults}</Text>
                  <TouchableOpacity onPress={incrementAdults}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Children:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementChildren}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{children}</Text>
                  <TouchableOpacity onPress={incrementChildren}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Number of Rooms:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={decrementRooms}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{rooms}</Text>
                  <TouchableOpacity onPress={() => incrementRooms(room.rooms_executive)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-in Date:</Text>
                  <TouchableOpacity onPress={toggleCheckInPicker}>
                    <Text style={styles.dateText}>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckInPicker && (
                    <DateTimePicker
                      value={checkInDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckInChange}
                    />
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Check-out Date:</Text>
                  <TouchableOpacity onPress={toggleCheckOutPicker}>
                    <Text style={styles.dateText}>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckOutPicker && (
                    <DateTimePicker
                      value={checkOutDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleCheckOutChange}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                setSelectedRoom({ name: "Executive Room", price: room.price_executive, });
                setName("Executive Room");
                setPrice(room.price_executive);
                setID(room.hotel_details_id);
                handleBook();
              }}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </Modal>

    </View>
  );
};

const FacilityListDetails = ({ details }) => {
  const facilityItems = JSON.parse(details);

  return (
    <View style={styles.facilityDetails}>
      {facilityItems.map((item, index) => (
        <View key={index} style={styles.facilityDetail}>
          <Text style={styles.detailText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};


const FacilitiesList = ({ data }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFacilityButtonClick = () => {
    setIsPopupVisible(true);
  };


  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.facilityItem}>
            {index === data.length - 1 ? (
              <TouchableOpacity
                style={styles.facilityButton}
                onPress={handleFacilityButtonClick}
              >
                <Image source={item.image} style={styles.facilityImage} />
              </TouchableOpacity>
            ) : (
              <View style={styles.facilityBox}>
                <Image source={item.image} style={styles.facilityImage} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const GalleryList = ({ gallery }) => {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  console.log(gallery[0]);

  const handleGalleryButtonClick = (index) => {
    setSelectedImageIndex(index);
    setIsGalleryVisible(true);

  };

  const closeGallery = () => {
    setIsGalleryVisible(false);
  };

  return (
    <View>
      <FlatList
        data={gallery}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.GalleryItem}>
            <TouchableOpacity
              style={styles.facilityButton}
              onPress={() => handleGalleryButtonClick(index)}
            >
              <Image source={{ uri: item }} style={styles.GalleryImage} />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        isVisible={isGalleryVisible}
        onBackdropPress={closeGallery}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ImageBackground
          source={{ uri: gallery[selectedImageIndex] }}
          style={styles.PopupGalleryImage}
          contentFit="cover"
        >
          <TouchableOpacity
            onPress={closeGallery}
            style={styles.closeIconContainer}
          >
            <Image
              style={styles.closeIcon}
              source={require("../../assets/cross.png")}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const HotelsInfo = () => {
  const route = useRoute();
  const { Hotel } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth * 0.9;

  const navigation = useNavigation();

  const handleDiscoverPress = () => {
    navigation.navigate("Discover");
  };

  const navigatetopaymentgateway = () => {
    navigation.navigate("PaymentFormModal");
  };


  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFacilityButtonClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.HomeButton}
        onPress={handleDiscoverPress}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/Home.png")}
          style={[{ width: 30, height: 30 }]}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.Container}>
        <TouchableOpacity style={styles.MapButton} activeOpacity={0.7}>
          <Image
            source={require("../../assets/map.png")}
            style={[{ width: 30, height: 30 }]}
          />
        </TouchableOpacity>
        <Image
          style={styles.Image}
          source={{ uri: `data:image/jpeg;base64,${Hotel.images}` }}
        />
        <View style={styles.ContentContainer}>
          <View style={styles.TextContainer}>
            <View style={styles.RightText}>
              <Text style={styles.Title}>{Hotel.name}</Text>
              <Text style={styles.subDescription}>{Hotel.city}</Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/star.png")}
                  style={styles.iconStar}
                />
                <Text style={styles.ratingValue}>{Hotel.rating}</Text>
              </View>
            </View>
            <View style={styles.LeftText}>
              <Text style={styles.Price}>{Hotel.price_standard} pkr</Text>
            </View>
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Facilities</Text>
            <ScrollView horizontal>
              <View style={styles.faccontainer}>
                <FacilitiesList data={data} />
                <TouchableOpacity
                  style={styles.facilityButton}
                  onPress={handleFacilityButtonClick}
                >
                  <Image source={require("../../assets/plus.png")} style={styles.plus} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <Modal
              isVisible={isPopupVisible}
              onBackdropPress={closePopup}
              animationIn="slideInUp"
              animationOut="slideOutDown"
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  <TouchableOpacity
                    onPress={closePopup}
                    style={styles.closeIconContainer}
                  >
                    <Image
                      style={styles.closeIcon}
                      source={require("../../assets/cross.png")}
                    />
                  </TouchableOpacity>
                  <ScrollView>
                    <Text style={styles.popupTitle}>Facilities And Services</Text>
                    <FacilityListDetails details={Hotel.facilities} />
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Gallery</Text>
            {Hotel && <GalleryList gallery={Hotel.gallery} />}
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Description</Text>
            <Text style={styles.Description}>
              {Hotel.description}
            </Text>
          </View>
          <View style={styles.FacilityContainer}>
            <ReservationSection room={Hotel} />
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Cardbutton} onPress={navigatetopaymentgateway} >
              <Text style={styles.CardbuttonText}>Next</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  Image: {
    flex: 1,
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  faccontainer: {
    flexDirection: 'row',
  },

  plus: {
    height: 70,
    width: 70,
  },
  HomeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 70, // Adjust the width as needed
    height: 70,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 2,
  },
  ContentContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    paddingTop: 10,
    paddingBottom: 100, // Adjust this value as needed
    marginTop: -40, // Adjust this value as needed
  },
  reservationSection: {
    marginTop: 20,
  },

  guestSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  guestControls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  TextContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#353893",
    borderWidth: 5,
    borderColor: "#319BD6",
  },
  RightText: {
    width: "65%",
    paddingLeft: 20,
    paddingTop: 20,
  },
  LeftText: {
    width: "35%",
    paddingTop: 80,
  },
  Price: {
    fontFamily: "Poppins-Bold",
    color: "#319bd6",
    fontSize: 20,
  },
  Title: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
  },
  subDescription: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    bottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingValue: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#ffc107",
  },
  iconStar: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  MapButton: {
    position: "absolute",
    top: 330,
    right: 30,
    width: 80,
    height: 80,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#319BD6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 2,
  },
  FacilityContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  FacilityText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  facilityItem: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#D9D9D9",
    borderRadius: 60,
    width: 75,
    height: 75,
  },
  facilityButton: {
    alignItems: "center",
  },
  facilityBox: {
    alignItems: "center",
  },
  facilityImage: {
    width: 40,
    height: 40,
  },
  facilityButtonText: {
    fontSize: 14,
  },
  GalleryImage: {
    width: 110,
    height: 110,
    borderRadius: 20,
  },
  GalleryItem: {
    alignItems: "center",
    justifyContent: "space-around",
    width: 120,
    height: 120,
  },
  PopupGalleryImage: {
    position: "absolute",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 1,
  },
  blurBackground: {
    backgroundColor: "rgba(0, 0, 0.9, 0.95)",
    // Adjust the alpha value for the blur effect
  },
  popupContent: {
    backgroundColor: '#cee7fa',
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
    height: 400,
    marginBottom: 100,
    marginTop: 100,
  },
  popupContent1: {
    backgroundColor: '#cee7fa',
    borderRadius: 20,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
    height: 600,
    marginBottom: 100,
    marginTop: 100,
  },
  closeIconContainer: {
    position: "absolute",
    top: 10, // Adjust the top position as needed
    right: 10,
    backgroundColor: "#C4C8CB",
    borderRadius: 60,
    zIndex: 2, // Adjust the right position as needed
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  facilityDetails: {
    marginTop: 20,
  },
  facilityDetail: {
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  detailText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: 'black',
  },
  popupTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Black",
    marginBottom: 20,
  },
  Description: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Poppins-Regular",
  },
  ReviewsContainer: {
    backgroundColor: "#D9D9D9",
    height: 150,
    borderRadius: 40,
    padding: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  ReviewImage: {
    height: 90,
    width: 90,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 15,
    justifyContent: "center",
  },
  ReviewText: {
    fontFamily: "Poppins-Regular",
    width: "60%",
    marginTop: 5,
  },
  Cardbutton: {
    backgroundColor: "#071B26",
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  CardbuttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
  ButtonContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-ExtraBold",
    marginBottom: 10,
    textAlign: 'center',
  },
  fieldContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    width: '100%',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  guestControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText1: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginLeft: 10,
    width: 50,
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: 100,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    textAlign: 'center',
  },
  modalInputContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,

  },
  FacilityText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  guestControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#007bff",
  },

  roomCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    width: 280,
  },
  roomCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  roomCardPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  controlsContainer: {
    marginTop: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#007BFF",
    marginHorizontal: 10,
  },
  bookButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  selectedRoomContainer: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: '#cee7fa',
    borderRadius: 20,
  },
  selectedRoomText: {
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },

  clearButton: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
  },

  clear: {
    backgroundColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 20,
  },

  confirm: {
    backgroundColor: 'green',
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 20,
  },

  confirmbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default HotelsInfo;
