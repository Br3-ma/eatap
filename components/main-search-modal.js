import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, FlatList, Animated } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  const [fadeAnim] = useState(new Animated.Value(0)); // For animation

  const data = [
    { id: 1, name: 'Classic T-Shirt', category: 'Apparel' },
    { id: 2, name: 'Denim Jeans', category: 'Apparel' },
    { id: 3, name: 'Leather Jacket', category: 'Outerwear' },
    { id: 4, name: 'Sneakers', category: 'Footwear' },
    // Add more items as needed
  ];

  const handleSearch = () => {
    if (searchQuery) {
      const results = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterOption === 'All' || item.category === filterOption)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, filterOption]);

  const closeModal = () => {
    navigation.goBack();
  };

  // Fade in effect for the screen
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BlurView intensity={100} style={styles.blurView}>
        <TouchableOpacity onPress={closeModal} style={styles.backArrow}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        
        <TextInput
          mode="outlined"
          label="Search"
          placeholder="Type here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.textInput}
          right={<TextInput.Icon name="magnify" onPress={handleSearch} />}
          autoFocus
        />
        
        {/* Filter Options */}
        <View style={styles.filterContainer}>
          {['All', 'Apparel', 'Outerwear', 'Footwear'].map(option => (
            <TouchableOpacity 
              key={option}
              style={[styles.filterButton, filterOption === option && styles.activeFilter]} 
              onPress={() => setFilterOption(option)}
            >
              <Text style={styles.filterText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && <ActivityIndicator size="large" color="green" />}
        
        {/* Search Results */}
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.resultCategory}>{item.category}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 10 }}
        />

        <Button
          mode="contained"
          icon="arrow-right"
          onPress={handleSearch}
          style={styles.button}
        >
          Find Stuffs
        </Button>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  backArrow: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    color: '#1f2937',
    fontWeight: '600',
   },
   resultItem:{
     backgroundColor:'#f1f5f9',
     borderRadius :10,
     marginBottom :8,
     padding :12,
     width:'100%',
   },
   resultText:{
     fontSize :16,
     fontWeight :'600',
     color :'#1f2937',
   },
   resultCategory:{
     fontSize :14,
     color :'#64748b',
   },
   button:{
     width:'100%',
     paddingVertical :8,
     backgroundColor :'green',
   }
});

export default SearchScreen;