import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../../assets/a.jpg');

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsJson = await AsyncStorage.getItem('cartItems');
        if (cartItemsJson) {
          const parsedCartItems = JSON.parse(cartItemsJson);
          setCartItems(parsedCartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateCartItems = async (updatedCartItems) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart items:', error);
    }
  };

  const handleNext = async () => {
    navigation.navigate('ContactsPermissions');
  };

  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity++;
    updateCartItems(newCartItems);
  };

  const decreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      updateCartItems(newCartItems);
    }
  };

  const deleteItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    updateCartItems(newCartItems);
  };

  // Calculate total price and service fee only if cartItems is not empty
  const totalPrice = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const serviceFee = cartItems.length > 0 ? 0.05 * totalPrice : 0; // Assuming 5% service fee

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="angle-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                  <FontAwesome name="minus-circle" size={24} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(index)}>
                  <FontAwesome name="plus-circle" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <FontAwesome name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyCart}>Your cart is empty</Text>}
        />
        <View style={styles.bottomToolbar}>
          <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          <Text style={styles.serviceFee}>Service Fee: ${serviceFee.toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleNext}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 51, 0, 0.7)', // Greenish dark overlay
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: 'white',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10,
  },
  emptyCart: {
    fontSize: 16,
    color: 'white',
  },
  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 26,
    margin:6,
    borderRadius:4,
  },
  total: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  serviceFee: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  buyNowButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buyNowText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default CartScreen;
