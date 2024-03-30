// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import './styles/tailwind.css';
import axios from 'axios';

// Auth
import RegisterByOTPScreen from './screens/auth/otp-register.screen';
import OverviewScreen from './screens/onboarding/overview.screen';
import ContactsPermissions from './screens/onboarding/permissions.screen';

// Main App
import SplashScreen from './screens/splash.screen';
import MainScreen from './screens/main.screen';

//Main Navigations
import ProductDetailsScreen from './screens/products/product-detail.screen';
import MeScreen from './screens/account/profile/me.screen';
import BoxScreen from './screens/account/donation/box.screen';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={MainScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);
// Me Stack
const MeStack = () => (
  <Stack.Navigator initialRouteName="Me" headerMode="none">
    <Stack.Screen name="Me" component={MeScreen} />
  </Stack.Navigator>
);
// Me Box
const BoxStack = () => (
  <Stack.Navigator initialRouteName="Box" headerMode="none">
    <Stack.Screen name="Box" component={BoxScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Display splash screen for 3 seconds
      setShowSplashScreen(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  const checkAuthentication = async () => {
    try {
      // Make an API request to check if the user is authenticated
      const response = await axios.post('http://localhost:8000/api/connectx', {
        withCredentials: false, // Include credentials (cookies) in the request
        phone: '0772147755', //use token & sqlite_db in the future
      });
      // console.log(response.data.status);
      // If the request is successful, set the authenticated state to true
      setAuthenticated(response.data.status);
      // setAuthenticated(false);
    } catch (error) {
      // If there's an error (e.g., user not authenticated), set the authenticated state to false
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    // Check authentication when the component mounts
    checkAuthentication();
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer style={styles.container}>
      {authenticated ? (
        // If authenticated, render the Tab Navigator with Home, Box, and Me stacks
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
      ) : (
        // If not authenticated, render the Register by OTP stack
        <Stack.Navigator initialRouteName="RegisterByOTP" headerMode="none">
          <Stack.Screen name="RegisterByOTP" component={RegisterByOTPScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Overview" component={OverviewScreen} />
          <Stack.Screen name="ContactsPermissions" component={ContactsPermissions} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container:{
    marginHorizontal:10,
  }
});
export default App;
