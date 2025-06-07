// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PaperProvider } from 'react-native-paper';

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
import StoreDetail from './screens/stores/store-details.screen';
import StoreProductDetailScreen from './screens/stores/store-product-detail.screen';

import { API_BASE_URL } from './confg/conf';
import { UserProvider } from './data/helpers/UserContext';

const Stack = createStackNavigator();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
      const phoneNumber = userInfo ? userInfo.user.phone : '0';

      const response = await axios.post(`${API_BASE_URL}/connectx`, {
        withCredentials: false,
        phone: phoneNumber,
      });

      setAuthenticated(response.data.status);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setAuthenticated(false);
    }
    setShowSplashScreen(false);
  };

  if (showSplashScreen) {
    return (
      <PaperProvider>
        <View style={styles.centered}>
          <SplashScreen />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <UserProvider>
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
              <Stack.Screen name="StoreDetail" component={StoreDetail} />
              <Stack.Screen name="StoreCreate" component={StoreCreateScreen} />
              <Stack.Screen name="StoreProductDetailScreen" component={StoreProductDetailScreen} />
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
      </UserProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;