import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderIcons = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [pressedSearch, setPressedSearch] = useState(false);
  const [pressedCart, setPressedCart] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cartItems');
        if (cartItems) {
          const parsedCartItems = JSON.parse(cartItems);
          const count = parsedCartItems.length;
          setCartCount(count);
          animateCartCount();
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    fetchCartCount();
  }, []);

  const animateCartCount = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        friction: 3,
        tension: 40,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
        tension: 40,
      }),
    ]).start();
  };

  const navigateToCart = () => {
    setPressedCart(true);
    setTimeout(() => setPressedCart(false), 200);
    navigation.navigate('Cart');
  };

  const navigateToSearch = () => {
    setPressedSearch(true);
    setTimeout(() => setPressedSearch(false), 200);
    navigation.navigate('Search');
  };

  const renderIconButton = (iconName, onPress, isPressed, badge = null) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.iconWrapper}
    >
      <LinearGradient
        colors={isPressed ? ['#FFC107', '#FFB300'] : ['#FFB300', '#FFC107']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.iconGradient,
          isPressed && styles.iconPressed,
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color="#704214"
          style={styles.icon}
        />
        {badge}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['transparent', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
        </View>
        <View style={styles.iconsContainer}>
          {renderIconButton(
            "magnify",
            navigateToSearch,
            pressedSearch
          )}
          {renderIconButton(
            "cart-outline",
            navigateToCart,
            pressedCart,
            cartCount > 0 && (
              <Animated.View
                style={[
                  styles.badge,
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <Text style={styles.badgeText}>{cartCount}</Text>
              </Animated.View>
            )
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : 8,
    paddingBottom: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    fontSize: 24,
    fontWeight: '800',
    color: '#704214',
    letterSpacing: 0.5,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  iconWrapper: {
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#704214',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconGradient: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  iconPressed: {
    transform: [{ scale: 0.95 }],
  },
  icon: {
    transform: [{ scale: 1.1 }],
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HeaderIcons;