import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import HomeScreen from './home.screen';
import MyFoodScreen from './account/food/my-food.screen';
import BoxScreen from './account/donation/box.screen';
import StoreCreateScreen from './stores/store-create.screen';
import MeScreen from './account/profile/me.screen';
import SearchScreen from '../components/main-search-modal';  // Import your SearchScreen
import HeaderIcons from '../components/main-header-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props) => {
  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons {...props} />
    </View>
  );
};

// Create a function to combine Tab Navigator and Stack Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: styles.header,
      headerBackground: () => <BlurView intensity={50} style={StyleSheet.absoluteFill} />,
      headerRight: () => <HeaderIcons />,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Eatapp':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'My Food':
            iconName = focused ? 'food' : 'food-outline';
            break;
          case 'Donate':
            iconName = focused ? 'gift' : 'gift-outline';
            break;
          case 'Store':
            iconName = focused ? 'store' : 'store-outline';
            break;
          case 'You':
            iconName = focused ? 'account' : 'account-outline';
            break;
        }
        return <TabBarIcon name={iconName} size={focused ? 26 : 22} color={color} />;
      },
      tabBarActiveTintColor: '#ff9b00', // Deep yellow for active tab
      tabBarInactiveTintColor: '#857b59d9', // Gray for inactive tabs
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
      tabBarBackground: () => <BlurView intensity={50} style={StyleSheet.absoluteFill} />,
    })}
  >
    <Tab.Screen name="Eatapp" component={HomeScreen} />
    <Tab.Screen name="My Food" component={MyFoodScreen} />
    <Tab.Screen name="Donate" component={BoxScreen} />
    <Tab.Screen name="Store" component={StoreCreateScreen} />
    {/* <Tab.Screen name="Store" component={StoreScreen} /> */}
    <Tab.Screen name="You" component={MeScreen} />
  </Tab.Navigator>
);
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="MainTab">
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background for overall app
  },
  header: {
    backgroundColor: '#2ecc71', // Vibrant green for header
    height: 100, // Increased height
    borderBottomWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    paddingTop: 40, // Safe area adjustment
  },
  headerBackground: {
    backgroundColor: 'rgba(46, 204, 113, 0.4)', // Semi-transparent green
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 50, // Rounded icon containers
  },
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // white-tinted transparent
    borderTopWidth: 0,
    height: 70,
    borderRadius: 20, // Rounded tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 8,
    overflow: 'hidden',
    paddingBottom: 5,
  },
  tabLabel: {
    paddingBottom: 2,
    fontSize: 2,
    fontWeight: '600', // Slightly bolder label
    color: 'rgba(46, 204, 113, 0.9)', // White label for contrast
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  headerIcon: {
    marginLeft: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle white overlay
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Highlight for active tab
    borderRadius: 20,
  }
});

export default MainScreen;