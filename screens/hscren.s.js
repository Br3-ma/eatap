// LandingScreen.js
import React from 'react';
// ------ Components ----
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ------ Icons ----------
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const LandingScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToOtherScreen = () => {
    navigation.navigate('OtherScreen');
  };

  return (
    <View style={styles.container}>
        {/* -------Main------- */}
        <View style={styles.mapContainer}>
            <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            />
        </View>


        {/* -------Bottom Controls------- */}
        <View style={styles.controlSection}>
            <TouchableOpacity style={styles.iconButton} onPress={navigateToOtherScreen}>
                <AntDesign name="find" size={24} color="#bc2900" />
                <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={navigateToOtherScreen}>
                <MaterialCommunityIcons  name="car-wrench" size={35} color="#bc2900" />
                <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={navigateToOtherScreen}>
                <Ionicons name="md-car-sport" size={35} color="#bc2900" />
                <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={navigateToLogin}>
                <Entypo name="user" size={24} color="#bc2900" />
                <Text></Text>
            </TouchableOpacity>

            {/* Add other controls or components here */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  controlSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  iconButton: {
    alignItems: 'center',
  },
});

export default LandingScreen;
