import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, Animated, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { fetchProducts, getCartTotal } from '../controllers/cart/cartController';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RenderShimmerProductItem from '../components/render-shimmer';
import HeroBanner from '../components/home-banner';
import RenderProductItem from '../components/render-product-item';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const categories = [
    { name: 'Groceries', image: require('../assets/a.jpg'), icon: 'food-apple' },
    { name: 'Office', image: require('../assets/b.jpg'), icon: 'briefcase' },
    { name: 'Medicine', image: require('../assets/c.webp'), icon: 'medical-bag' },
    { name: 'Fast Foods', image: require('../assets/d.jpg'), icon: 'hamburger' },
    { name: 'Fruits', image: require('../assets/e.jpg'), icon: 'fruit-watermelon' },
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
    const interval = setInterval(() => {
      Animated.spring(scrollX, {
        toValue: scrollX._value >= width * 2 ? 0 : scrollX._value + width,
        useNativeDriver: false,
      }).start();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderDot = (index) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[styles.dot, { transform: [{ scale }], opacity }]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#9ACD32" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryTab}>
                <View style={styles.categoryIconContainer}>
                  <MaterialCommunityIcons name={category.icon} size={24} color="#556B2F" />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Most Popular Section */}
        <View style={styles.mostPopular}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <FlatList
              data={[1, 2, 3, 4]}
              numColumns={2}
              renderItem={() => <RenderShimmerProductItem />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.productList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={products}
              numColumns={2}
              renderItem={({ item }) => <RenderProductItem item={item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.productList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(154, 205, 50, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#9ACD32',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  heroBannerWrapper: {
    marginBottom: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  mostPopular: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingRight:10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#556B2F',
    marginLeft: 16,
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
    color: '#9ACD32',
    fontWeight: '600',
  },

});

export default HomeScreen;