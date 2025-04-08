import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHeader = ({ onOpenSidebar }) => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const [headerOpacity] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  
  // Animated values for each icon
  const searchIconAnim = useState(new Animated.Value(1))[0];
  const cartIconAnim = useState(new Animated.Value(1))[0];
  const profileIconAnim = useState(new Animated.Value(1))[0]; // Added for profile icon

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems) {
        const count = JSON.parse(cartItems).length;
        setCartCount(count);
        animateCartCount();
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const animateCartCount = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.4,
        useNativeDriver: true,
        friction: 4,
        tension: 50,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        tension: 50,
      }),
    ]).start();
  };

  const animateIcon = (animValue) => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const navigateWithAnimation = (route, animValue) => {
    animateIcon(animValue);
    navigation.navigate(route);
  };

  // Added handler for profile icon
  const handleProfilePress = () => {
    animateIcon(profileIconAnim);
    onOpenSidebar?.();
  };

  const renderIcon = (iconName, onPress, animValue, badge = null) => (
    <Animated.View style={[styles.iconContainer, { transform: [{ scale: animValue }] }]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <BlurView intensity={80} tint="light" style={styles.iconBlur}>
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color="#704214"
            style={styles.icon}
          />
          {badge}
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
      <BlurView intensity={60} tint="light" style={styles.headerBlur}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            
          </View>
          <View style={styles.iconsContainer}>
            {renderIcon(
              "magnify",
              () => navigateWithAnimation('Search', searchIconAnim),
              searchIconAnim
            )}
            {renderIcon(
              "cart-outline",
              () => navigateWithAnimation('Cart', cartIconAnim),
              cartIconAnim,
              cartCount > 0 && (
                <Animated.View style={[styles.badge, { transform: [{ scale: scaleAnim }] }]}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </Animated.View>
              )
            )}
            {renderIcon( // Added profile icon
              "account-circle-outline",
              handleProfilePress,
              profileIconAnim
            )}
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

// Kept all original styles
const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerBlur: {
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#704214',
    letterSpacing: 0.5,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconButton: {
    width: 48,
    height: 48,
  },
  iconBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  icon: {
    transform: [{ scale: 1.1 }],
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default MainHeader;