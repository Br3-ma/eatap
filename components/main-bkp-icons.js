import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHeader = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const [cartScale] = useState(new Animated.Value(1));
  const [searchPressed, setSearchPressed] = useState(false);
  const [cartPressed, setCartPressed] = useState(false);

  useEffect(() => {
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItems');
      if (items) {
        const count = JSON.parse(items).length;
        setCartCount(count);
        animateCart();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const animateCart = () => {
    Animated.spring(cartScale, {
      toValue: 1.2,
      tension: 40,
      friction: 3,
      useNativeDriver: true
    }).start(() => {
      Animated.spring(cartScale, {
        toValue: 1,
        tension: 40,
        friction: 5,
        useNativeDriver: true
      }).start();
    });
  };

  const handleIconPress = (route, setPressed) => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    navigation.navigate(route);
  };

  return (
    <BlurView intensity={65} tint="light" style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>eatapp</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => handleIconPress('Search', setSearchPressed)}
            style={[styles.iconButton, searchPressed && styles.iconPressed]}
          >
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <MaterialCommunityIcons name="magnify" size={24} color="#594A3C" />
            </BlurView>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleIconPress('Cart', setCartPressed)}
            style={[styles.iconButton, cartPressed && styles.iconPressed]}
          >
            <BlurView intensity={80} tint="light" style={styles.iconBlur}>
              <MaterialCommunityIcons name="cart-outline" size={24} color="#594A3C" />
              {cartCount > 0 && (
                <Animated.View style={[styles.badge, { transform: [{ scale: cartScale }] }]}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </Animated.View>
              )}
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

const TabBar = ({ state, descriptors, navigation }) => {
  const [indicator] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(indicator, {
      toValue: state.index,
      tension: 40,
      friction: 5,
      useNativeDriver: true
    }).start();
  }, [state.index]);

  return (
    <BlurView intensity={75} tint="light" style={styles.tabBar}>
      <Animated.View 
        style={[
          styles.indicator,
          {
            transform: [{
              translateX: indicator.interpolate({
                inputRange: [0, state.routes.length - 1],
                outputRange: [0, (state.routes.length - 1) * 75]
              })
            }]
          }
        ]} 
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const getIcon = () => {
          switch (route.name) {
            case 'Home': return isFocused ? 'home' : 'home-outline';
            case 'Food': return isFocused ? 'food' : 'food-outline';
            case 'Donate': return isFocused ? 'gift' : 'gift-outline';
            case 'Store': return isFocused ? 'store' : 'store-outline';
            case 'Profile': return isFocused ? 'account' : 'account-outline';
            default: return 'circle';
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Animated.View style={[
              styles.tabContent,
              { transform: [{ scale: isFocused ? 1.1 : 1 }] }
            ]}>
              <MaterialCommunityIcons
                name={getIcon()}
                size={24}
                color={isFocused ? '#FF8C00' : '#857b59'}
              />
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#FF8C00' : '#857b59' }
              ]}>
                {route.name}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#594A3C',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconPressed: {
    transform: [{ scale: 0.95 }],
  },
  iconBlur: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 0,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 75,
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    width: 75,
    height: 3,
    backgroundColor: '#FF8C00',
    bottom: 0,
    borderRadius: 1.5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  }
});

export default { MainHeader, TabBar };