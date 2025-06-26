import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  InteractionManager
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
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
import LiquidLoading from '../components/liquid-loading';
import LiquidError from '../components/liquid-error';
import LiquidHeader from '../components/liquid-header';
import { useAppState, useErrorHandler, usePerformanceOptimizer } from '../utils/useAppState';
import CartScreen from './cart/my-cart.screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Enhanced loading indicator with liquid animation
const LiquidLoadingIndicator = ({ focused, color = '#FF8C00' }) => {
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      animation.setValue(0);
      scaleAnimation.setValue(0.8);
    }
  }, [focused, animation, scaleAnimation]);

  return (
    <Animated.View
      style={[
        styles.liquidIndicator,
        {
          opacity: animation,
          transform: [{ scale: scaleAnimation }],
          backgroundColor: color,
        },
      ]}
    />
  );
};

// Enhanced tab bar icon with liquid effects
const LiquidTabBarIcon = ({ name = 'circle', size = 24, color = '#FF8C00', focused = false, onPress, routeName = 'Unknown' }) => {
  const [pressAnimation] = useState(new Animated.Value(1));
  const [rippleAnimation] = useState(new Animated.Value(0));
  const [rippleScale] = useState(new Animated.Value(0));

  const handlePress = useCallback(async () => {
    try {
      // Haptic feedback
      if (Platform.OS === 'ios') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Press animation
      Animated.sequence([
        Animated.timing(pressAnimation, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Ripple effect
      rippleScale.setValue(0);
      rippleAnimation.setValue(1);

      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      // Execute onPress after animation
      InteractionManager.runAfterInteractions(() => {
        onPress && onPress();
      });
    } catch (error) {
      console.warn('Tab press error:', error);
    }
  }, [onPress, pressAnimation, rippleScale, rippleAnimation]);

  // Ensure name is a valid string
  const iconName = typeof name === 'string' ? name : 'circle';
  const iconSize = typeof size === 'number' ? size : 24;
  const iconColor = typeof color === 'string' ? color : '#FF8C00';

  return (
    <TouchableOpacity
      style={styles.liquidIconContainer}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* Ripple effect */}
      <Animated.View
        style={[
          styles.rippleEffect,
          {
            transform: [{ scale: rippleScale }],
            opacity: rippleAnimation,
            backgroundColor: iconColor,
          },
        ]}
      />

      {/* Liquid loading indicator */}
      <LiquidLoadingIndicator focused={focused} color={iconColor} />

      {/* Icon with press animation */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            transform: [{ scale: pressAnimation }],
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={focused ? iconSize + 2 : iconSize}
          color={iconColor}
          style={[
            styles.liquidIcon,
            focused && styles.liquidIconFocused,
          ]}
        />
      </Animated.View>

      {/* Glow effect for focused state */}
      {focused && (
        <Animated.View
          style={[
            styles.glowEffect,
            {
              backgroundColor: iconColor,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

// Enhanced main tab navigator with error handling
const MainTabNavigator = () => {
  const { error, handleError } = useErrorHandler();
  const [showCartLoading, setShowCartLoading] = useState(false);

  const handleTabPress = useCallback((routeName) => {
    try {
      // Analytics or tracking could go here
      console.log(`Navigated to: ${routeName}`);
    } catch (error) {
      console.error('Tab navigation error:', error);
      handleError(error, 'Navigation');
    }
  }, [handleError]);

  const handleHeaderPress = useCallback((navigation) => {
    setShowCartLoading(true);
    setTimeout(() => {
      setShowCartLoading(false);
      navigation.navigate('Cart');
    }, 900);
  }, []);

  const screenOptions = useMemo(() => ({
    headerShown: true,
    header: ({ route, navigation }) => {
      // Add null checking for route parameter
      const routeName = route?.name || 'Unknown';
      const title = routeName === 'Chat' ? '🍽️ Chat' :
        routeName === 'My Box' ? '📦 My Box' :
          routeName === 'Donate' ? '🎁 Donate' :
            routeName === 'Explore' ? '🔍 Explore' :
              routeName === 'You' ? '👤 You' : routeName;

      return (
        <LiquidHeader
          title={title}
          onRightPress={() => handleHeaderPress(navigation)}
          rightIcon="cart-outline"
          showBlur={true}
        />
      );
    },
    tabBarIcon: ({ focused, color, size, route }) => {
      // Add null checking for route parameter
      if (!route || !route.name) {
        return (
          <LiquidTabBarIcon
            name="circle"
            size={focused ? 26 : 22}
            color={color}
            focused={focused}
            onPress={() => handleTabPress('Unknown')}
            routeName="Unknown"
          />
        );
      }

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
        default:
          iconName = 'circle';
      }

      return (
        <LiquidTabBarIcon
          name={iconName}
          size={focused ? 26 : 22}
          color={color}
          focused={focused}
          onPress={() => handleTabPress(route.name)}
          routeName={route.name}
        />
      );
    },
    tabBarActiveTintColor: '#FF8C00',
    tabBarInactiveTintColor: 'rgba(133, 123, 89, 0.7)',
    tabBarStyle: styles.enhancedTabBar,
    tabBarLabelStyle: styles.enhancedTabLabel,
    tabBarBackground: () => (
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
    ),
    tabBarItemStyle: styles.tabBarItem,
  }), [handleTabPress, handleHeaderPress]);

  if (error) {
    return (
      <LiquidError
        title="Navigation Error"
        message={error}
        onRetry={() => handleError(null)}
        retryText="Retry Navigation"
      />
    );
  }

  return (
    <>
      {showCartLoading && (
        <View style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 9999,
          backgroundColor: 'rgb(255, 166, 0)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <LiquidLoading message="Loading your cart..." />
        </View>
      )}
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Chat"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="My Box"
          component={MyFoodScreen}
          options={{
            tabBarLabel: 'My Box',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name={focused ? 'food' : 'food-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Donate"
          component={BoxScreen}
          options={{
            tabBarLabel: 'Donate',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name={focused ? 'gift' : 'gift-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={StoreSearch}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name={focused ? 'store' : 'store-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="You"
          component={MeScreen}
          options={{
            tabBarLabel: 'You',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

// Enhanced main screen with SafeArea and error handling
const MainScreen = () => {
  const { isReady, error, isLoading, retryInitialization } = useAppState();
  const { optimizePerformance } = usePerformanceOptimizer();

  useEffect(() => {
    if (isReady) {
      optimizePerformance();
    }
  }, [isReady, optimizePerformance]);

  if (error) {
    return (
      <SafeAreaView style={styles.errorSafeArea}>
        <LiquidError
          title="Oops! Something went wrong"
          message={error}
          onRetry={retryInitialization}
          retryText="Try Again"
        />
      </SafeAreaView>
    );
  }

  if (isLoading || !isReady) {
    return (
      <SafeAreaView style={styles.loadingSafeArea}>
        <LiquidLoading message="Loading your delicious experience..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName="MainTab"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: ({ current, layouts }) => ({
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              }),
            }}
          >
            <Stack.Screen
              name="MainTab"
              component={MainTabNavigator}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
            />
            <Stack.Screen
              name="StoreList"
              component={StoreListScreen}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // SafeArea styles
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(234, 239, 196, 0.05)',
  },
  loadingSafeArea: {
    flex: 1,
    backgroundColor: '#FFB300',
  },
  errorSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Container styles
  container: {
    flex: 1,
    backgroundColor: 'rgba(234, 239, 196, 0.05)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB300',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Loading styles
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#fff',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  // Error styles
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Enhanced header styles
  enhancedHeader: {
    backgroundColor: 'transparent',
    height: Platform.OS === 'ios' ? 100 : 80,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  // Enhanced tab bar styles
  enhancedTabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0,
    height: 80,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 20,
    overflow: 'hidden',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  enhancedTabLabel: {
    paddingBottom: 4,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 4,
  },

  // Liquid icon styles
  liquidIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    position: 'relative',
    borderRadius: 20,
    minWidth: 50,
    minHeight: 50,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  liquidIcon: {
    transform: [{ scale: 1 }],
  },
  liquidIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  liquidIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    zIndex: 1,
  },
  rippleEffect: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 0,
  },
  glowEffect: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.3,
    zIndex: -1,
  },
});

export default MainScreen;