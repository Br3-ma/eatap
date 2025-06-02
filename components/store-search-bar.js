import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <Animatable.View animation="slideInDown" style={styles.searchContainer}>
    <View style={styles.searchWrapper}>
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search stores, cuisines, or brands..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
        accessible
        accessibilityLabel="Search Input"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  </Animatable.View>
);

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
});
