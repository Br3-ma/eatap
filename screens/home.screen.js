import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchProducts } from '../controllers/cart/cartController';
import RenderShimmerProductItem from '../components/render-shimmer';
import RenderProductItem from '../components/render-product-item';
import FeaturedStoresCarousel from '../components/featured-stores-slider';
import featuredStores from '../data/models/FeaturedStoresModel';
import styles from '../assets/css/home.css';
import { getUserInfo } from '../utils/userInfo';
import { useIsFocused } from '@react-navigation/native';
import DonationShimmerEffect from '../components/shimmer-donations';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userInfo, setUserInfo] = useState(null);
  const isFocused = useIsFocused();

  const categories = [
    {
      id: 'all',
      name: 'All',
      icon: 'apps',
      gradient: ['#FF6B6B', '#FF8E8E']
    },
    {
      id: 'groceries',
      name: 'Groceries',
      icon: 'food-apple',
      gradient: ['#4ECDC4', '#45B7D1']
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: 'medical-bag',
      gradient: ['#96CEB4', '#FFEEAD']
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      icon: 'silverware-fork-knife',
      gradient: ['#FF8C94', '#FFB2B2']
    },
    {
      id: 'convenience',
      name: 'Convenience',
      icon: 'store',
      gradient: ['#87CEEB', '#A6E3E9']
    }
  ];

  const featuredItems = [
    {
      id: 'featured1',
      title: 'Fresh Picks',
      subtitle: 'Daily curated selection',
      image: require('../assets/d.jpg'),
      color: '#FFE5E5'
    },
    {
      id: 'featured2',
      title: 'Quick Delivery',
      subtitle: 'Under 30 minutes',
      image: require('../assets/welcome-banner.jpg'),
      color: '#E5F9FF'
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

  const loadData = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.featuredCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('FeaturedDetails', { item })}
    >
      <Image
        source={item.image}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        navigation.navigate('Explore', { category: item.name });
      }}
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.selectedCategory
      ]}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.categoryIcon}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color="white"
        />
      </LinearGradient>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Feature stores carousel slider Section */}
        <View style={styles.welcomeSection}>
          {loading ? (
            <View style={{ height: 120, justifyContent: 'center' }}>
              <DonationShimmerEffect />
            </View>
          ) : (
            <FeaturedStoresCarousel stores={featuredStores} />
          )}
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured</Text>
          {loading ? (
            <View style={{ flexDirection: 'row' }}>
              {[1, 2].map((_, idx) => (
                <View key={idx} style={{ width: 180, marginRight: 16 }}>
                  <DonationShimmerEffect />
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredItems}
              renderItem={renderFeaturedItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.featuredList}
            />
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {loading ? (
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4].map((_, idx) => (
                <View key={idx} style={{ width: 80, marginRight: 12 }}>
                  <DonationShimmerEffect />
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.categoriesContainer}
            />
          )}
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('AllProducts')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <FlatList
              data={[1, 2, 3, 4]}
              numColumns={2}
              renderItem={() => (
                <View style={{ flex: 1, margin: 8 }}>
                  <DonationShimmerEffect />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.productGrid}
            />
          ) : (
            <FlatList
              data={products}
              numColumns={2}
              renderItem={({ item }) => (
                <RenderProductItem
                  item={item}
                  navigation={navigation}
                  userInfo={userInfo}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.productGrid}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;