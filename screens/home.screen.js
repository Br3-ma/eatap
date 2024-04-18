import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCartTotal = async () => {
      const total = await getCartTotal();
      setCartTotal(total);
    };

    updateCartTotal();
  }, []);

  const addToCart = async (item) => {
    try {
      let cartItems = [];
      const existingItems = await AsyncStorage.getItem('cartItems');
      if (existingItems) {
        cartItems = JSON.parse(existingItems);
      }
      cartItems.push(item);
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
        const total = parsedCartItems.reduce((acc, item) => acc + item.price, 0);
        return total;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error getting cart total:', error);
      return 0;
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = cartPosition.x;
      context.startY = cartPosition.y;
    },
    onActive: (event, context) => {
      setCartPosition({
        x: context.startX + event.translationX,
        y: context.startY + event.translationY,
      });
    },
  });

  const cartStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(cartPosition.x) },
        { translateY: withSpring(cartPosition.y) },
      ],
    };
  }, [cartPosition]); // Specify cartPosition as a dependency

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>K{item.price}</Text>
      <View style={styles.iconButtonsContainer}>
        <TouchableOpacity style={styles.iconButtonAdd} onPress={() => addToCart(item)}>
          <AntDesign name="shoppingcart" size={18} color="white" />
        </TouchableOpacity>
        <View style={styles.iconGap} />
        <View style={styles.iconGap} />
        <TouchableOpacity style={styles.iconButtonShare} onPress={() => {/* Handle share */}}>
          <AntDesign name="sharealt" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderShimmerProductItem = () => (
    <View style={styles.productContainer}>
      <ShimmerPlaceholder style={styles.productImage} />
      <ShimmerPlaceholder style={[styles.productName, { marginTop: 8, marginBottom: 4 }]} />
      <ShimmerPlaceholder style={styles.productPrice} />
    </View>
  );

  const categories = [
    { name: 'Groceries', image: require('../assets/a.jpg') },
    { name: 'Office', image: require('../assets/b.jpg') },
    { name: 'Medicine', image: require('../assets/c.webp') },
    { name: 'Fast Foods', image: require('../assets/d.jpg') },
    { name: 'Fruits', image: require('../assets/e.jpg') },
    { name: 'Medicine', image: require('../assets/c.webp') },
    { name: 'Fast Foods', image: require('../assets/d.jpg') },
    { name: 'Fruits', image: require('../assets/e.jpg') },
    { name: 'Medicine', image: require('../assets/c.webp') },
    { name: 'Fast Foods', image: require('../assets/d.jpg') },
    { name: 'Fruits', image: require('../assets/e.jpg') },
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryTab}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.heroBanner}>
        <Image source={require('../assets/welcome-banner.jpg')} style={styles.heroBannerImage} />
        <Text style={styles.heroBannerText}>Special Promo Today!</Text>
        <TouchableOpacity style={styles.heroBannerButton}>
          <Text style={styles.heroBannerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mostPop}>
        <Text style={styles.headerText1}> Most Popular </Text>
        {loading ? (
          <FlatList
            data={[1, 2, 3, 4]} // Dummy data for shimmer effect
            numColumns={2}
            renderItem={renderShimmerProductItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.cartPreview, cartStyle]}>
          <Text>Cart Total: {cartTotal}</Text>
        </Animated.View>
      </PanGestureHandler>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 4,
    flex: 1,
    overflow: 'hidden',
  },
  categoriesContainer: {
    marginTop: 4,
    marginBottom: 16,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  categoryTab: {
    marginRight: 16,
    alignItems: 'center',
    paddingBottom: 50,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  productList: {
    justifyContent: 'center',
    marginTop: 16,
  },
  productContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    margin: 4,
    padding: 4,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  productImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginBottom: 8,
  },
  productName: {
    fontSize: 15,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  mostPop:{
    borderRadius: 10,
    backgroundColor: 'white',
  },
  heroBanner: {
    marginTop: 0,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  heroBannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  heroBannerText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#ffffff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  heroBannerButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#bc2900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  heroBannerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText1: {
    position: 'relative',
    top: 20,
    left: 10,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal:20,
    color: 'green',
    fontWeight: 'bold',
  },
  iconGap: {
    width: 10,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButtonAdd: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#25C480',
    backgroundColor:'#00FF92',
  },
  iconButtonShare: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8AEAC0',
    backgroundColor:'#6F8D80',
  },
  cartPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 5,
    zIndex: 999,
  },
});

export default HomeScreen;
