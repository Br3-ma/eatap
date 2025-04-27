import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Animated, StyleSheet, Dimensions, Platform } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageScale] = useState(new Animated.Value(1));
  const [headerOpacity] = useState(new Animated.Value(0));
  const [detailsTranslateY] = useState(new Animated.Value(100));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(detailsTranslateY, {
        toValue: 0,
        tension: 20,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const addToCart = async (item) => {
    try {
      Animated.sequence([
        Animated.spring(imageScale, {
          toValue: 1.05,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ]).start();

      let cartItems = [];
      const existingItems = await AsyncStorage.getItem('cartItems');
      if (existingItems) {
        cartItems = JSON.parse(existingItems);
      }
      cartItems.push({...item, quantity: quantity});
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
        return parsedCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      }
      return 0;
    } catch (error) {
      console.error('Error getting cart total:', error);
      return 0;
    }
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < Math.floor(rating) ? 'star' : index < rating ? 'star-half-o' : 'star-o'}
        size={16}
        color="#FFD700"
        style={styles.starIcon}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageScale }] }]}>
        <Image source={{uri: product.image}} style={styles.heroImage} />
      </Animated.View>

      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialCommunityIcons name="heart-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.detailsContainer, { transform: [{ translateY: detailsTranslateY }] }]}>
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.productPrice}>K{product.price}</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>{renderRatingStars(product.rating)}</View>
            <Text style={styles.ratingText}>({product.rating} stars)</Text>
          </View>

          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
            <Text style={styles.productAddress}>{product.address}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <MaterialCommunityIcons name="minus" size={20} color={quantity === 1 ? "#999" : "#333"} />
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <MaterialCommunityIcons name="plus" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>K{(product.price * quantity).toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product)}
          >
            <MaterialCommunityIcons name="cart-plus" size={24} color="#FFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.45,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 25,
  },
  mainInfo: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  priceTag: {
    backgroundColor: '#9ACD32',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityButtonDisabled: {
    backgroundColor: '#F5F6F8',
  },
  quantityDisplay: {
    paddingHorizontal: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#556B2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default ProductDetails;