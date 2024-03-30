import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

import ProductDetailsScreen from './products/product-detail.screen';
import BoxScreen from './account/donation/box.screen';
import MyFoodScreen from './account/food/my-food.screen';
import MeScreen from './account/profile/me.screen';
import HomeScreen from './home.screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home 
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);
// Home 
const MyFoodStack = () => (
  <Stack.Navigator initialRouteName="MyFood" headerMode="none">
    <Stack.Screen name="MyFood" component={MyFoodScreen} />
  </Stack.Navigator>
);
// User Profile
const MeStack = () => (
  <Stack.Navigator initialRouteName="Me" headerMode="none">
    <Stack.Screen name="Me" component={MeScreen} />
  </Stack.Navigator>
);
// Donation Box
const BoxStack = () => (
  <Stack.Navigator initialRouteName="Box" headerMode="none">
    <Stack.Screen name="Box" component={BoxScreen} />
  </Stack.Navigator>
);

const MainScreen = () => {
  return (    
    <Tab.Navigator style={styles.bottomNav}>
      <Tab.Screen
        name="Eatapp"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Food"
        component={MyFoodStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Donate"
        component={BoxStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="package" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="You"
        component={MeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 4,
    flex: 1,
    overflow: 'hidden', // Add this line to hide the scrollbar
  },
  categoriesContainer: {
    marginTop: 4,
    marginBottom: 16,
    paddingBottom: 0,
    flexDirection: 'row', // Set the direction to row for horizontal scroll
  },
  categoryTab: {
    marginRight: 16,
    alignItems: 'center',
    paddingBottom: 50,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  productList: {
    justifyContent: 'center',
    marginTop: 16,
  },
  productContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    margin: 4,
    padding: 5,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android
    backgroundColor: '#fff', // Set a background color to see the shadow
    borderRadius: 3, // Add border radius for a card-like appearance
  },
  productImage: {
    width: 160,
    height: 160,
    // borderRadius: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 15,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },

  // Hero banner
  heroBanner: {
    marginTop: 0,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // Ensure the border-radius works as expected
  },

  heroBannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  heroBannerText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#ffffff',
    fontSize: 27,
    fontWeight: 'bold',
  },

  heroBannerButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#bc2900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  heroBannerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerText1: {
    position: 'relative',
    top: 20,
    left: 2,
    color: '#000000ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Bottom App NavBar
  bottomNav:{
    borderRadius:8,
    backgroundColor: 'green',
  }
});

export default MainScreen;
