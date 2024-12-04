import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Screens
import RegisterByOTPScreen from './screens/auth/otp-register.screen';
import OverviewScreen from './screens/onboarding/overview.screen';
import ContactsPermissions from './screens/onboarding/permissions.screen';
import SplashScreen from './screens/splash.screen';
import MainScreen from './screens/main.screen';
import CartScreen from './screens/cart/my-cart.screen';
import MyStore from './screens/stores/store.screen';
import StoreProducts from './screens/stores/store-products.screen';
import StoreAccounts from './screens/stores/store-accounts.screen';

import QuickSale from './screens/stores/pos.screen';
import StoreMarketing from './screens/stores/store-marketing.screen';
import Stock from './screens/stores/stock.screen';
import AddProduct from './screens/stores/store-add-product.screen';
import StoreCreateScreen from './screens/stores/store-create.screen';
import ProductDetails from './screens/products/product-detail.screen';


import { API_BASE_URL } from './confg/conf';

const Stack = createStackNavigator();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Retrieve the phone number from AsyncStorage
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
      const phoneNumber = userInfo ? userInfo.user.phone : '0'; // Use '0' if no user info is found

      // Make an API request to check if the user is authenticated
      // const response = await axios.post('http://localhost/eatapp/eat-server/api/connectx', {
      const response = await axios.post(`${API_BASE_URL}/connectx`, {
        withCredentials: false, // Include credentials (cookies) in the request
        phone: phoneNumber,
      });

      // If the request is successful, update the authenticated state based on the response
      setAuthenticated(true);
      // setAuthenticated(response.data.status);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setAuthenticated(false);
    }
    setShowSplashScreen(false);
  };

  if (showSplashScreen) {
    return (
      <View style={styles.centered}>
        <SplashScreen/>
        {/* <ActivityIndicator size="large" /> */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authenticated ? (
        <Stack.Navigator initialRouteName="Main" headerMode="none">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="CreateStore" component={StoreCreateScreen} />
          <Stack.Screen name="MyStore" component={MyStore} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="QuickSale" component={QuickSale} />
          <Stack.Screen name="Stock" component={Stock} />
          <Stack.Screen name="Products" component={StoreProducts} />
          <Stack.Screen name="Marketing" component={StoreMarketing} />
          <Stack.Screen name="Accounts" component={StoreAccounts} />
          
        </Stack.Navigator>
      ) : (
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
  container: {
    marginHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
