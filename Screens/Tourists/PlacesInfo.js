import React, { useState } from "react";
import {
  View,
  Text,
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
import MapView, { Marker } from "react-native-maps";
import ImageViewer from 'react-native-image-zoom-viewer';

const MAX_TEXT_LENGTH = 200;


const GalleryList = ({ gallery }) => {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleGalleryButtonClick = (index) => {
    setSelectedImageIndex(index);
    setIsGalleryVisible(true);
  };

  const closeGallery = () => {
    setIsGalleryVisible(false);
  };

  return (
    <View style={styles.Container}>
      <FlatList
        data={gallery}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.galleryItem}>
            <TouchableOpacity
              style={styles.facilityButton}
              onPress={() => handleGalleryButtonClick(index)}
            >
              <Image source={{ uri: item }} style={styles.galleryImage} />
            </TouchableOpacity>
          </View>
        )}
      />

<Modal visible={isGalleryVisible} transparent={true}>
  <View style={styles.imageViewerContainer}>
    <ImageViewer
      imageUrls={gallery.map((imageUri) => ({ url: imageUri }))}
      index={selectedImageIndex}
      onCancel={closeGallery}
      enableSwipeDown={true}
      onSwipeDown={closeGallery}
      renderIndicator={() => null} // Hide indicator
      swipeDownThreshold={50} // Adjust swipe down threshold
      renderImage={(props) => (
        <Image
          {...props}
          resizeMode="contain"
          style={styles.imageViewerImage} // Style the individual images
        />
      )}
    />
  </View>
</Modal>
    </View>
  );
};

const PlacesInfo = () => {
  const route = useRoute();
  const { place } = route.params;

  const screenWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

  const [showFullText, setShowFullText] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  const reviewText = `Visited Saif-ul-Muluk Lake in August 2022. I was staying in Naran and rented a jeep to the lake, which cost about 4000pkr for a round trip staying there for 1.5 hours. The journey up to the lake was thrilling and stunning as it took us about 45 minutes to get there. The mountains, clouds, and the lake itself is just stunning.`;

  const truncatedText = showFullText
    ? reviewText
    : reviewText.slice(0, MAX_TEXT_LENGTH);

  const handleDiscoverPress = () => {
    navigation.navigate("Discover");
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
        <TouchableOpacity
          style={styles.MapButton}
          onPress={() => setIsMapVisible(true)}
          activeOpacity={0.7}
        >
          <Image
            source={require("../../assets/map.png")}
            style={[{ width: 30, height: 30 }]}
          />
        </TouchableOpacity>
        <Image
          style={styles.Image}
          source={{uri: `data:image/jpeg;base64,${place.images}`}}
        />
        <View style={styles.ContentContainer}>
          <View style={styles.TextContainer}>
            <View style={styles.RightText}>
              <Text style={styles.Title}>{place.name}</Text>
              <Text style={styles.subDescription}>{place.city}</Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/star.png")}
                  style={styles.iconStar}
                />
                <Text style={styles.ratingValue}>{place.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Gallery</Text>
            {place && <GalleryList gallery={place.gallery} />}
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Description</Text>
            <Text style={styles.Description}>{place.description}</Text>
          </View>
          <View style={styles.FacilityContainer}>
            <Text style={styles.FacilityText}>Reviews</Text>

            <View style={styles.ReviewsContainer1}>
              <View style={styles.ReviewsContainer}>
                <Image
                  source={require("../../assets/avatar.png")}
                  style={styles.ReviewImage}
                />
                <Text style={styles.ReviewText}>
                  {truncatedText}
                  {showFullText && reviewText.length > MAX_TEXT_LENGTH && (
                    <TouchableOpacity onPress={toggleReadMore}>
                      <Text
                        style={{
                          color: "#54aaec",
                          fontFamily: "Poppins-Bold",
                          fontSize: 18,
                        }}
                      >
                        {" "}
                        Read Less
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!showFullText && reviewText.length > MAX_TEXT_LENGTH && (
                    <TouchableOpacity onPress={toggleReadMore}>
                      <Text
                        style={{
                          color: "#54aaec",
                          fontFamily: "Poppins-Bold",
                          fontSize: 18,
                        }}
                      >
                        {" "}
                        Read More
                      </Text>
                    </TouchableOpacity>
                  )}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/star.png")}
                  style={styles.iconStar}
                />
                <Text style={styles.ratingValue}>4.5</Text>
              </View>
            </View>

            <View style={styles.ReviewsContainer1}>
              <View style={styles.ReviewsContainer}>
                <Image
                  source={require("../../assets/avatar.png")}
                  style={styles.ReviewImage}
                />
                <Text style={styles.ReviewText}>
                  {truncatedText}
                  {showFullText && reviewText.length > MAX_TEXT_LENGTH && (
                    <TouchableOpacity onPress={toggleReadMore}>
                      <Text
                        style={{
                          color: "#54aaec",
                          fontFamily: "Poppins-Bold",
                          fontSize: 18,
                        }}
                      >
                        {" "}
                        Read Less
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!showFullText && reviewText.length > MAX_TEXT_LENGTH && (
                    <TouchableOpacity onPress={toggleReadMore}>
                      <Text
                        style={{
                          color: "#54aaec",
                          fontFamily: "Poppins-Bold",
                          fontSize: 18,
                        }}
                      >
                        {" "}
                        Read More
                      </Text>
                    </TouchableOpacity>
                  )}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/star.png")}
                  style={styles.iconStar}
                />
                <Text style={styles.ratingValue}>4.9</Text>
              </View>
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Cardbutton}>
              <Text style={styles.CardbuttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={isMapVisible}
          onBackdropPress={() => setIsMapVisible(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 34.9093,
                longitude: 73.6507,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 34.9093,
                  longitude: 73.6507,
                }}
                title={place.name}
                description={place.city}
              />
            </MapView>
            <TouchableOpacity
              onPress={() => setIsMapVisible(false)}
              style={styles.closeIconContainer}
            >
              <Image
                style={styles.closeIcon}
                source={require("../../assets/cross.png")}
              />
            </TouchableOpacity>
          </View>
        </Modal>
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
    width:'100%',
    height:'100%',
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

  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'black', 
    
  },
  imageViewerImage: {
    width: '100%', // Width of the image
    height: '100%', // Height of the image
  },

  TextContainer: {
    flexDirection: "row",
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
    fontSize: 14,
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
    marginRight: 20,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#D9D9D9",
    borderRadius: 60,
    width: 75,
    height: 75,
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
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  galleryItem: {
    alignItems: "center",
    justifyContent: 'space-evenly',
    width: 120,
    height: 120,
  },

  facilityButton: {
    width: 100,
    height: 100,
    alignItems: "center",
  },

  popupGalleryImage: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 1,
  },
 
  blurBackground: {
    backgroundColor: "rgba(0, 0, 0.9, 0.95)",
    // Adjust the alpha value for the blur effect
  },
  popupContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
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
    borderRadius: 40,
    padding: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  ReviewsContainer1: {
    backgroundColor: "grey",
    borderRadius: 40,
    padding: 10,
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
});

export default PlacesInfo;
