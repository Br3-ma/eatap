import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, StackActions } from '@react-navigation/native'; // Import useNavigation hook and StackActions
import { TextInput, Button, useTheme } from 'react-native-paper';
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
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

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

    //Remove this
    const navigateToSearch = () => {
      // Navigate to the search screen
    };

    const openSearchModal = () => {
      setSearchModalVisible(true);
    };

    const handleSearch = () => {
      console.log('Search for:', searchQuery);
      // setSearchModalVisible(false); // Close the modal after search
    };

    return (
      <View style={styles.headerIconsContainer}>

          <TouchableOpacity onPress={openSearchModal} style={styles.headerIcon}>
              <Ionicons name="search-outline" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToCart} style={styles.headerIcon}>
              <Ionicons name="cart-outline" size={24} color="green" />
              {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
          </TouchableOpacity>k


        <Modal
          animationType="fade"
          transparent={true}
          visible={searchModalVisible}
          onRequestClose={() => setSearchModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                mode="outlined"
                label="Search"
                placeholder="Type here..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.textInput}
                right={<TextInput.Icon name="magnify" onPress={handleSearch} />}
                autoFocus
              />
              <Button
                mode="contained"
                icon="arrow-right"
                onPress={handleSearch}
                style={styles.button}
              >Find Stuffs
              </Button>
            </View>
          </View>
        </Modal>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 50, // adjust according to your status bar + header height
  },
  headerIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: 300,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor:'green',
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
