import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './home.screen';
import MyFoodScreen from './account/food/my-food.screen';
import BoxScreen from './account/donation/box.screen';
import StoreScreen from './stores/store.screen';
import MeScreen from './account/profile/me.screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <MaterialCommunityIcons {...props} />
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      const timer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const closeModal = () => {
    navigation.goBack();
  };

return (
  <ImageBackground source={require('https://img.freepik.com/premium-photo/platform-podium-with-natural-light-green-background-product-display-sustainability-concept_494516-2236.jpg')} style={styles.backgroundImage}>
  {/* <BlurView intensity={100} style={styles.centeredView}> */}
    <View style={styles.modalView}>
      <TouchableOpacity onPress={closeModal} style={styles.backArrow}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
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
      {loading && <ActivityIndicator size="large" color="green" />}
      <Button
        mode="contained"
        icon="arrow-right"
        onPress={handleSearch}
        style={styles.button}
      >
        Find Stuffs
      </Button>
    </View>
    {/* </BlurView> */}
  </ImageBackground>
  );
};

const HeaderIcons = () => {
  const navigation = useNavigation();
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

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.headerIconsContainer}>
      <TouchableOpacity onPress={navigateToSearch} style={styles.headerIcon}>
        <MaterialCommunityIcons name="magnify" size={30} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToCart} style={styles.headerIcon}>
        <MaterialCommunityIcons name="cart-outline" size={30} color="green" />
        {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerBackground: () => (
            <BlurView intensity={50} style={StyleSheet.absoluteFill} />
          ),
          headerRight: () => <HeaderIcons />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Eatapp') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'My Food') {
              iconName = focused ? 'food' : 'food-outline';
            } else if (route.name === 'Donate') {
              iconName = focused ? 'gift' : 'gift-outline';
            } else if (route.name === 'Store') {
              iconName = focused ? 'store' : 'store-outline';
            } else if (route.name === 'You') {
              iconName = focused ? 'account' : 'account-outline';
            }
            return <TabBarIcon name={iconName} size={focused ? 26 : 22} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'rgba(113, 189, 57, 0.7)', // Semi-transparent background
            borderTopWidth: 0,
            height: 70,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10,
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 8,
            overflow: 'hidden',
          },
          tabBarLabelStyle: {
            paddingBottom: 5,
            fontSize: 14,
          },
          tabBarBackground: () => (
            <BlurView intensity={50} style={StyleSheet.absoluteFill} />
          ),
        })}
      >
        <Tab.Screen
          name="Eatapp"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
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
              <MaterialCommunityIcons name="gift" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Store"
          component={StoreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="store" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="You"
          component={MeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>

  );
};

const MainStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(113, 189, 57, 0.7)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    overflow: 'hidden',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
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
    marginHorizontal: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: 'green',
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

export default MainStackScreen;
