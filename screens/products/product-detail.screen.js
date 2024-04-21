import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [cartTotal, setCartTotal] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [animatedValue] = useState(new Animated.Value(0));

  const addToCart = async (item) => {
    try {
      let cartItems = [];
      const existingItems = await AsyncStorage.getItem('cartItems');
      if (existingItems) {
        cartItems = JSON.parse(existingItems);
      }
      cartItems.push({...item, quantity: quantity}); // Ensure you add the item along with its quantity
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      const total = await getCartTotal();
      setCartTotal(total);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const getCartTotal = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        const total = parsedCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return total;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error getting cart total:', error);
      return 0;
    }
  };

  const fadeIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  fadeIn();

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: product.image}} style={styles.productImage} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="angle-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>Price: K{product.price}</Text>
        <Text style={styles.productAddress}>Address: {product.address}</Text>
        <Text style={styles.productRating}>Rating: {product.rating} stars</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <FontAwesome name="minus" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[styles.addButton, { opacity: animatedValue }]}
        >
          <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const themeColors = {
  primary: '#2E7D32', // Green
  secondary: '#FF5722', // Orange
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: -50,
    left: 20,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.primary,
    marginBottom: 8,
  },
  productAddress: {
    fontSize: 16,
    marginBottom: 8,
  },
  productRating: {
    fontSize: 16,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  addButton: {
    marginTop: 16,
    opacity: 0,
  },
  button: {
    backgroundColor: themeColors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
