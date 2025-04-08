import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  FlatList,
  Keyboard,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  const data = [
    { id: 1, name: 'Classic T-Shirt', category: 'Apparel' },
    { id: 2, name: 'Denim Jeans', category: 'Apparel' },
    { id: 3, name: 'Leather Jacket', category: 'Outerwear' },
    { id: 4, name: 'Sneakers', category: 'Footwear' },
  ];

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const results = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (filterOption === 'All' || item.category === filterOption)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
    setLoading(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      const timer = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, filterOption]);

  const renderItem = ({ item, index }) => {
    const itemFade = new Animated.Value(0);
    const itemSlide = new Animated.Value(50);

    useEffect(() => {
      Animated.parallel([
        Animated.timing(itemFade, {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(itemSlide, {
          toValue: 0,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.resultItem,
          {
            opacity: itemFade,
            transform: [{ translateY: itemSlide }],
          },
        ]}
      >
        <View style={styles.resultContent}>
          <Text style={styles.resultText}>{item.name}</Text>
          <Text style={styles.resultCategory}>{item.category}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#9ca3af" />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BlurView intensity={90} tint="light" style={styles.blurContainer}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Header */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1f2937" />
          </TouchableOpacity>

          {/* Search Input */}
          <TextInput
            mode="outlined"
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            outlineColor="#e5e7eb"
            activeOutlineColor="#3b82f6"
            right={
              searchQuery ? (
                <TextInput.Icon
                  name="close"
                  color="#9ca3af"
                  onPress={() => setSearchQuery('')}
                />
              ) : (
                <TextInput.Icon name="magnify" color="#9ca3af" />
              )
            }
            theme={{
              colors: {
                placeholder: '#9ca3af',
                text: '#1f2937',
                primary: '#3b82f6',
                background: 'white',
              },
            }}
          />

          {/* Filter Pills */}
          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={['All', 'Apparel', 'Outerwear', 'Footwear']}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setFilterOption(item)}
                  style={[
                    styles.filterPill,
                    filterOption === item && styles.activeFilterPill,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filterOption === item && styles.activeFilterText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.filterList}
            />
          </View>

          {/* Loading State */}
          {loading && (
            <ActivityIndicator
              size="small"
              color="#3b82f6"
              style={styles.loader}
            />
          )}

          {/* Results */}
          <FlatList
            data={filteredResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  blurContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchInput: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterContainer: {
    marginVertical: 16,
  },
  filterList: {
    paddingHorizontal: 4,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  activeFilterPill: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  activeFilterText: {
    color: 'white',
  },
  loader: {
    marginVertical: 20,
  },
  resultsList: {
    paddingBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultContent: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default SearchScreen;