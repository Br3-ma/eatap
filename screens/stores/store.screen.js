import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const backgroundImage = require('../../assets/a.jpg');

const StoreScreen = ({ navigation }) => {
  const hasStore = true; // Set to true if user has a store

  return (
    <SafeAreaView style={styles.container}>
      {!hasStore ? (
        // Landing Screen
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Welcome to My Store</Text>
            <TouchableOpacity style={styles.createStoreButton} onPress={() => navigation.navigate('CreateStore')}>
              <FontAwesome name="plus-circle" size={24} color="white" />
              <Text style={styles.buttonText}>Create Store</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        // Store Screen
        <View style={styles.storeContainer}>
          {/* Add a banner here */}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Special Offers</Text>
          </View>

          {/* Horizontal auto-scroll view */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
            <Card style={styles.card}>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Content>
                <Title>Product Name</Title>
                <Paragraph>Description of the product goes here.</Paragraph>
                <Text style={styles.price}>$19.99</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => navigation.navigate('ProductDetails')}>View Details</Button>
              </Card.Actions>
            </Card>
            {/* Add more products here */}
          </ScrollView>

          {/* Add a horizontal scroll of banners here */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScrollView}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>New Arrivals</Text>
            </View>
            {/* Add more banners here */}
          </ScrollView>

          {/* Add a grid of icon button options */}
          <View style={styles.iconGrid}>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <FontAwesome name="shopping-bag" size={40} color="#007bff" />
              <Text style={styles.iconText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <FontAwesome name="heart" size={40} color="#007bff" />
              <Text style={styles.iconText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <FontAwesome name="cog" size={40} color="#007bff" />
              <Text style={styles.iconText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
  },
  createStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  },
  storeContainer: {
    flex: 1,
    padding: 20,
  },
  banner: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalScrollView: {
    marginBottom: 20,
  },
  card: {
    marginRight: 10,
    width: 250,
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerScrollView: {
    marginBottom: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default StoreScreen;
