import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;

  // Dummy data placeholder (replace with actual data fetching logic)
  const productDetails = {
    id: productId,
    name: 'Pizza',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod urna ac lacus interdum, a varius massa dictum.',
    price: 99.99,
    address: '123 Main Street, City ville',
    rating: 4.5,
    image: require('../../assets/pizza.jpg'), // Replace with the correct path
    // Add more details as needed
  };

  const [quantity, setQuantity] = useState(1);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
    console.log(`Added ${quantity} ${productDetails.name} to cart`);
  };

  const handleAddToDonationBox = () => {
    // Implement logic to add the product to the donation box
    console.log(`Added ${quantity} ${productDetails.name} to donation box`);
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
      <Image source={productDetails.image} style={styles.productImage} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{productDetails.name}</Text>
        <Text style={styles.productDescription}>{productDetails.description}</Text>
        <Text style={styles.productPrice}>Price: K{productDetails.price.toFixed(2)}</Text>
        <Text style={styles.productAddress}>Address: {productDetails.address}</Text>
        <Text style={styles.productRating}>Rating: {productDetails.rating} stars</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.addButton, { opacity: animatedValue }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleAddToDonationBox}>
            <Text style={styles.buttonText}>Add to Donation Box</Text>
          </TouchableOpacity>
        </Animated.View>
        {/* Add more details as needed */}
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
  // Add more styles as needed
});

export default ProductDetailsScreen;
