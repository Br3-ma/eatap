// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import axios from 'axios';

// Auth
import RegisterByOTPScreen from './screens/auth/otp-register.screen';
import OverviewScreen from './screens/onboarding/overview.screen';
import ContactsPermissions from './screens/onboarding/permissions.screen';

// Main App
import SplashScreen from './screens/splash.screen';
import MainScreen from './screens/main.screen';
import CartScreen from './screens/cart/my-cart.screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
    return () => clearTimeout(timer);
  }, []);

  const checkAuthentication = async () => {
    try {
      // Make an API request to check if the user is authenticated
      const response = await axios.post('http://localhost:8000/api/connectx', {
        withCredentials: false, // Include credentials (cookies) in the request
        phone: '0772147755', //use token & sqlite_db in the future
      });
      // If the request is successful, set the authenticated state to true
      setAuthenticated(false);
      // setAuthenticated(response.data.status);
      setShowSplashScreen(false);
    } catch (error) {
      // If there's an error (e.g., user not authenticated), set the authenticated state to false
      setAuthenticated(false);
      setShowSplashScreen(false);
    }
  };

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer style={styles.container}>
      {authenticated ? (
          // If authenticated, render the Stack Navigator with MainScreen
        <Stack.Navigator initialRouteName="Main" headerMode="none">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      ) : (
        // If not authenticated, render the Register by OTP stack
        <Stack.Navigator initialRouteName="RegisterByOTP" headerMode="none">
          <Stack.Screen name="RegisterByOTP" component={RegisterByOTPScreen} />
          <Stack.Screen name="Overview" component={OverviewScreen} />
          <Stack.Screen name="ContactsPermissions" component={ContactsPermissions} />
          <Stack.Screen name="Main" component={MainScreen} />
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
