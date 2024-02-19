import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
// ------ Icons ----------
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API or use dummy data
    // Replace this with your actual data fetching logic
    const dummyData = [
      { id: '1', name: 'Pizza', price: 10, image: require('../assets/pizza.jpg') },
      { id: '2', name: 'Burger', price: 80, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 98, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 80, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 78, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 28, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 83, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 28, image: require('../assets/burger.png') },
      { id: '2', name: 'Burger', price: 18, image: require('../assets/burger.png') },
      // Add more products as needed
    ];

    setProducts(dummyData);
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>K{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
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
  ]; // Replace with your actual categories

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

      {/* Add a hero banner ad here */}
      <View style={styles.heroBanner}>
        <Image source={require('../assets/welcome-banner.jpg')} style={styles.heroBannerImage} />
        <Text style={styles.heroBannerText}>Special Promo Today!</Text>
        <TouchableOpacity style={styles.heroBannerButton}>
          <Text style={styles.heroBannerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText1}> Most Popular </Text>

      <FlatList
      
        data={products}
        numColumns={2} // Set the number of columns for the grid view
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 4,
    flex: 1,
    overflow: 'hidden', // Add this line to hide the scrollbar
  },
  categoriesContainer: {
    marginTop: 4,
    marginBottom: 16,
    paddingBottom: 0,
    flexDirection: 'row', // Set the direction to row for horizontal scroll
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
    padding: 5,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android
    backgroundColor: '#fff', // Set a background color to see the shadow
    borderRadius: 3, // Add border radius for a card-like appearance
  },
  productImage: {
    width: 160,
    height: 160,
    // borderRadius: 100,
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

  // Hero banner
  heroBanner: {
    marginTop: 0,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // Ensure the border-radius works as expected
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
    left: 2,
    color: '#000000ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
