import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// General
import SplashScreen from './screens/splash.screen';
import HomeScreen from './screens/home.screen';

// Products
import ProductDetailsScreen from './screens/products/product-detail.screen';

// Profile
import MeScreen from './screens/account/profile/me.screen';

// Donation
import BoxScreen from './screens/account/donation/box.screen';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000); // Display splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Box"
          component={BoxStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="package" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
