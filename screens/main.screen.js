import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import HomeScreen from './home.screen';
import MyFoodScreen from './account/food/my-food.screen';
import BoxScreen from './account/donation/box.screen';
import StoreSearch from './stores/store-catalog.screen';
import MeScreen from './account/profile/me.screen';
import SearchScreen from '../components/main-search-modal';
import MainHeader from '../components/main-header-icons';
import { getUserInfo } from '../utils/userInfo';
import { API_BASE_URL } from '../confg/conf';
import StoreListScreen from './stores/store-list.screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Loading indicator component
const LoadingIndicator = () => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.loadingIndicator,
        {
          opacity: animation,
        },
      ]}
    />
  );
};

const TabBarIcon = ({ name, size, color, focused }) => {
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (focused) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [focused]);

  return (
    <View style={styles.iconContainer}>
      {isLoading && <LoadingIndicator />}
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={[styles.icon, isLoading && styles.iconLoading]}
      />
    </View>
  );
};

const handleStoreNavigation = async (navigation) => {
  try {
    const userInfo = await getUserInfo();
    if (!userInfo) {
      navigation.navigate('GetStartedWithStore');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/stores/user/${userInfo.userId}`);
    const data = await response.json();

    if (!data.stores || data.stores.length === 0) {
      navigation.navigate('GetStartedWithStore');
    } else if (data.stores.length === 1) {
      navigation.navigate('MyStore', { storeId: data.stores[0].id });
    } else {
      navigation.navigate('StoreList', { stores: data.stores });
    }
  } catch (error) {
    console.error('Error fetching stores:', error);
    navigation.navigate('GetStartedWithStore');
  }
};

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: styles.header,
      headerBackground: () => (
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      ),
      headerRight: () => <MainHeader />,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Chat':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'My Box':
            iconName = focused ? 'food' : 'food-outline';
            break;
          case 'Donate':
            iconName = focused ? 'gift' : 'gift-outline';
            break;
          case 'Explore':
            iconName = focused ? 'store' : 'store-outline';
            break;
          case 'You':
            iconName = focused ? 'account' : 'account-outline';
            break;
        }
        return (
          <TabBarIcon
            name={iconName}
            size={focused ? 24 : 20}
            color={color}
            focused={focused}
          />
        );
      },
      tabBarActiveTintColor: '#FF8C00',
      tabBarInactiveTintColor: '#857b59',
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
      tabBarBackground: () => (
        <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
      ),
    })}
  >
    <Tab.Screen name="Chat" component={HomeScreen} />
    <Tab.Screen name="My Box" component={MyFoodScreen} />
    <Tab.Screen name="Donate" component={BoxScreen} />
    <Tab.Screen
      name="Explore"
      component={StoreSearch}
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          handleStoreNavigation(navigation);
        }
      }}
    />
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
        <Stack.Screen
          name="StoreList"
          component={StoreListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(234,239,196,0.05)',
  },
  header: {
    backgroundColor: '#FFB300',
    height: 80, // Slimmer header
    borderBottomWidth: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    position: 'relative',
  },
  icon: {
    transform: [{ scale: 1 }],
  },
  iconLoading: {
    transform: [{ scale: 0.9 }],
  },
  loadingIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFB300',
  },

  tabBar: {
    backgroundColor: 'rgba(255, 32, 32, 0.15)',
    borderTopWidth: 0,
    height: 60,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    overflow: 'hidden',
    paddingBottom: 4,
  },
  tabLabel: {
    paddingBottom: 2,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default MainScreen;