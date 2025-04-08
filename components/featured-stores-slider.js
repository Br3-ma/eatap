import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import featuredStores from '../data/models/FeaturedStoresModel';

const { width } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 180;

const FeaturedStoresCarousel = ({ stores = featuredStores }) => { // Use MOCK_STORES as default
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % stores.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => console.log('Store pressed:', item.id)}
    >
      <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
      <View style={styles.carouselContent}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        <Text style={styles.carouselStatus}>
          Status: {item.status} | Rating: {item.rating} ⭐
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={stores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.pagination}>
        {stores.map((_, index) => (
          <MaterialCommunityIcons
            key={index}
            name={index === currentIndex ? 'circle' : 'circle-outline'}
            size={10}
            color={index === currentIndex ? '#FF6B6B' : '#ccc'}
            style={styles.paginationDot}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: CAROUSEL_HEIGHT,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselItem: {
    width: width - 40,
    height: CAROUSEL_HEIGHT,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  carouselTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ca700d',
  },
  carouselSubtitle: {
    fontSize: 16,
    color: '#ff8700',
  },
  carouselStatus: {
    fontSize: 14,
    color: '#97b62c',
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    marginHorizontal: 4,
  },
});

export default FeaturedStoresCarousel;