import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import CartItem from '../../components/cart-item'; // Import the CartItem component
import { API_BASE_URL } from '../../confg/conf';
import styles from '../../assets/css/cart.css'; // Import the styles from a separate file

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems).map(item => ({
          ...item,
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
        }));
        consolidateItems(parsedItems);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const consolidateItems = (items) => {
    const consolidated = items.reduce((acc, item) => {
      const existing = acc.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setCartItems(consolidated);
  };

  const submitCart = async () => {
    try {
      const cartData = new FormData();
      cartData.append('user_id', 2);
      cartData.append('subtotal', totalPrice.toFixed(2));
      cartData.append('service', serviceFee.toFixed(2));
      cartData.append('total', finalTotal.toFixed(2));
      cartData.append('cart_items', JSON.stringify(cartItems));

      const { data } = await axios.post(`${API_BASE_URL}/order-cart`, cartData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const orderId = data?.order?.id;
      if (!orderId) throw new Error('Invalid order ID received');

      cartData.append('order_id', orderId);
      await axios.post(`${API_BASE_URL}/paying-cart`, cartData);

      // Success notification (uncomment if using toast notifications)
      // Toast.show({ type: 'success', text1: 'Order Placed', text2: 'Your order was successfully submitted!' });

    } catch (error) {
      console.error('Submit Cart Error:', error?.response?.data || error.message);
      // Toast.show({ type: 'error', text1: 'Order Failed', text2: 'Unable to submit your order. Try again later!' });
    }
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...cartItems];
    const newQuantity = updatedItems[index].quantity + change;

    if (newQuantity > 0) {
      updatedItems[index].quantity = newQuantity;
    } else {
      updatedItems.splice(index, 1);
    }

    AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    consolidateItems(updatedItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = totalPrice * 0.05;
  const finalTotal = totalPrice + serviceFee;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header with Totals */}
      <Animated.View 
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <Text style={styles.itemCount}>{cartItems.length} items</Text>
          
          <View style={styles.totalsSummary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>K{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Service Fee (5%)</Text>
              <Text style={styles.totalValue}>K{serviceFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.totalRow, styles.finalTotalRow]}>
              <Text style={styles.finalTotalLabel}>Total</Text>
              <Text style={styles.finalTotalValue}>K{finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {cartItems.length > 0 ? (
          <Animated.FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <CartItem 
                item={item}
                index={index}
                handleQuantityChange={handleQuantityChange}
                scrollY={scrollY}
              />
            )}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ 
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  }
              }], 
              { useNativeDriver: true },
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cart-off-outline" size={80} color="#ddd" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>Discover Products</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Floating Checkout Button */}
      {cartItems.length > 0 && (
        <BlurView intensity={100} style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={submitCart}
          >
            <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </SafeAreaView>
  );
};
export default CartScreen;