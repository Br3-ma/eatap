import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, StackActions } from '@react-navigation/native'; // Import useNavigation hook and StackActions
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './home.screen';
import MyFoodScreen from './account/food/my-food.screen';
import BoxScreen from './account/donation/box.screen';
import MeScreen from './account/profile/me.screen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
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

  const HeaderIcons = () => {
    const navigation = useNavigation(); // Access the navigation object using useNavigation

    const navigateToCart = () => {
      navigation.navigate('Cart'); // Navigate to the 'CartScreen' stack screen
    };

    const navigateToSearch = () => {
      // Navigate to the search screen
    };

    return (
      <View style={styles.headerIconsContainer}>
        <TouchableOpacity onPress={navigateToSearch} style={styles.headerIcon}>
          <Ionicons name="search-outline" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCart} style={styles.headerIcon}>
          <Ionicons name="cart-outline" size={24} color="green" />
          {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
        </TouchableOpacity>
      </View>
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
            headerRight: () => <HeaderIcons />,
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
                <Ionicons name="fast-food-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Donate"
            component={BoxScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="gift-outline" color={color} size={size} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" color={color} size={size} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="You"
            component={MeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10, // Add horizontal margins to the container View
  },
  headerIconsContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerIcon: {
    marginLeft: 16,
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
