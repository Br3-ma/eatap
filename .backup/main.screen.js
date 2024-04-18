import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetailsScreen from './products/product-detail.screen';
import BoxScreen from './account/donation/box.screen';
import MyFoodScreen from './account/food/my-food.screen';
import MeScreen from './account/profile/me.screen';
import HomeScreen from './home.screen';

const Tab = createBottomTabNavigator();


const MainScreen = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch cart count from AsyncStorage
    const fetchCartCount = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cartItems');
        if (cartItems) {
          const parsedCartItems = JSON.parse(cartItems);
          const count = parsedCartItems.length;
          setCartCount(count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, []);

  const CartIcon = ({ onPress, count }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.cartIconContainer}>
        <Ionicons name="cart-outline" size={24} color="green" />
        {count > 0 && <Text style={styles.cartCount}>{count}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={StyleSheet.absoluteFill}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#71BD39',
              borderTopWidth: 0,
              elevation: 0,
            },
            headerRight: () => {
              // if (route.name === 'Eatapp') {
                return (
                  <CartIcon
                    onPress={() => navigation.navigate('Cart')}
                    count={cartCount}
                  />
                );
              // } else {
              //   return null;
              // }
            },
          })}
        >
          <Tab.Screen
            name="Eatapp"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="My Food"
            component={MyFoodScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Donate"
            component={BoxScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="package" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="You"
            component={MeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </BlurView>
    </View>
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
    backgroundColor: 'green', // Set the background color of the tabBar
  },
  container: {
    flex: 1,
    marginHorizontal: 10, // Add horizontal margins to the container View
  },
  cartIconContainer: {
    marginRight: 16,
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});

export default MainScreen;
