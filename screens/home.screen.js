import React, { useState, useEffect, useRef  } from 'react';
import {  View, Text, FlatList, TouchableOpacity, Image, ScrollView, Animated,  Dimensions} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { AntDesign } from '@expo/vector-icons';
import styles from '../assets/css/home.css';  
import { fetchProducts, addToCart, getCartTotal } from '../controllers/cart/cartController'; 

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    async function loadData() {
      const products = await fetchProducts();
      setProducts(products);
      setLoading(false);
      const total = await getCartTotal();
      setCartTotal(total);
    }
    loadData();
  }, []);

  useEffect(() => {
    const updateCartTotal = async () => {
      const total = await getCartTotal();
      setCartTotal(total);
    };

    updateCartTotal();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.spring(scrollX, {
        toValue: scrollX._value >= width * 2 ? 0 : scrollX._value + width,
        useNativeDriver: false,
      }).start();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
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

  const HeroBanner = ({ image, title, buttonText }) => (
    <View style={styles.heroSlide}>
      <Image source={image} style={styles.heroBannerImage} />
      <View style={styles.overlay}>
        <Text style={styles.heroBannerText}>{title}</Text>
        <TouchableOpacity style={styles.heroBannerButton}>
          <Text style={styles.heroBannerButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Display carousel categories slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryTab}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Display carousel banner auto inifinit slider */}
      <View style={styles.heroBanner}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
          style={styles.heroBannerContainer}
        >
          <HeroBanner image={require('../assets/welcome-banner.jpg')} title="Welcome!" buttonText="Shop Now" />
          <HeroBanner image={require('../assets/welcome-banner2.jpg')} title="New Arrivals" buttonText="View More" />
          <HeroBanner image={require('../assets/welcome-banner3.webp')} title="Special Offers" buttonText="Get Now" />
        </ScrollView>
      </View>

      {/* Display stores here */}

      {/* Display Most Popular Products */}
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


    </ScrollView>
  );
};


export default HomeScreen;
