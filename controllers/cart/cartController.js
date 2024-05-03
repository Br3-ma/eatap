import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost/eatapp/eat-server/api/products');
    // You may want to handle or log the response data differently based on your application's needs
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const addToCart = async (item) => {
  try {
    let cartItems = [];
    const existingItems = await AsyncStorage.getItem('cartItems');
    if (existingItems) {
      cartItems = JSON.parse(existingItems);
    }
    cartItems.push(item);
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    return await getCartTotal();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return 0;
  }
};

export const getCartTotal = async () => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItems');
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      return parsedCartItems.reduce((acc, item) => acc + item.price, 0);
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error getting cart total:', error);
    return 0;
  }
};
