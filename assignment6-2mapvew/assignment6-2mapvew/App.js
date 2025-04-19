import React from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, ScrollView,
  Alert, TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Alexis Martinez 2025 UAT React Native Assignment6.2
// ====== Sample static park data to display (not based on real location) ======
const staticParks = [
  {
    id: 101,
    name: "Crystal Gardens",
    description: "A hidden oasis with crystal-clear streams and flower meadows.",
    coordinate: { latitude: 33.37738, longitude: -111.976196 },
  },
  {
    id: 102,
    name: "Moonlight Park",
    description: "Best place for stargazing and midnight walks.",
    coordinate: { latitude: 33.3792, longitude: -111.944 },
  },
  {
    id: 103,
    name: "Sunny Paw Playground",
    description: "Dog-friendly park with agility courses and shaded trails.",
    coordinate: { latitude: 33.4223, longitude: -111.822 },
  },
];

// ====== Main App Class Component ======
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Initial state setup
    this.state = {
      userLocation: null,     // Holds current GPS location (if granted)
      favorites: [],          // Stores user's favorite parks
    };
  }

  // ====== Get user location and load favorites when component mounts ======
  async componentDidMount() {
    try {
      // Ask for location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied.');
        return;
      }

      // Get the device's current location
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      // Load any saved favorites from AsyncStorage
      const favoritesJSON = await AsyncStorage.getItem('favorites');
      if (favoritesJSON) {
        this.setState({ favorites: JSON.parse(favoritesJSON) });
      }

    } catch (error) {
      console.error("Location error:", error);  // Catch and log any location-related errors
    }
  }

  // ====== Save selected park to local favorites list ======
  saveToFavorites = async (park) => {
    const { favorites } = this.state;

    // Append new park and update local storage
    const updatedFavorites = [...favorites, park];
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update state and notify user
    this.setState({ favorites: updatedFavorites });
    Alert.alert("Saved!", `${park.name} has been added to your favorites.`);
  }

  // ====== Main UI rendering logic ======
  render() {
    const { userLocation, favorites } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* ========== App Header ========== */}
        <View style={styles.header}>
          <Text style={styles.headerText}>🌳 Explore Nearby Parks</Text>
        </View>

        {/* ========== Map Section (only shows if userLocation is available) ========== */}
        {userLocation && (
          <MapView
            style={styles.map}
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          />
        )}

        {/* ========== Park List (static scrollable section) ========== */}
        <ScrollView style={{ flex: 1, backgroundColor: '#f0fff0', padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Made-up Parks Nearby:
          </Text>

          {/* Loop through fake parks and display them */}
          {staticParks.map((park) => (
            <View key={park.id} style={styles.parkCard}>
              <Text style={styles.calloutTitle}>{park.name}</Text>
              <Text>{park.description}</Text>

              {/* Save to favorites button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => this.saveToFavorites(park)}
              >
                <Text style={styles.saveButtonText}>
                  {favorites.find(fav => fav.id === park.id)
                    ? '✅ Saved'
                    : '❤️ Save to Favorites'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* ========== Footer for extra UI feedback ========== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Scroll to explore parks!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

// ====== Stylesheet for visual formatting ======
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    height: 250, // Limited height so it doesn't overlap scroll view
  },
  parkCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#e0ffe0',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'green',
  },
});
