import React, { useState, useCallback, useMemo } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    TextInput, 
    Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const MOCK_STORES = [
    {
        id: '1',
        name: 'Urban Outfitters Inc',
        category: 'Fashion',
        rating: 4.5,
        distance: '0.8km',
        image: 'https://img.freepik.com/premium-photo/fresh-meat-steak-butcher-shopping-supermarket-food-store-raw-market-beef_163305-281151.jpg',
        featured: true
    },
    {
        id: '2',
        name: 'Ab Cafe',
        category: 'Productivity',
        rating: 6.5,
        distance: '2.8km',
        image: 'https://picdn.gomaji.com/uploads/stores/773/169773/339953/DSC00006.jpg',
        featured: true
    },
    {
        id: '3',
        name: 'Six Fire',
        category: 'Productivity',
        rating: 3.5,
        distance: '2.8km',
        image: 'https://picdn.gomaji.com/uploads/stores/773/169773/339953/DSC00006.jpg',
        featured: true
    },
];

const StoreSearch = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const categories = useMemo(() => ['All', 'Fashion', 'Food', 'Electronics', 'Books'], []);
    
    const filteredStores = useMemo(() => 
        MOCK_STORES.filter(store => 
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            (selectedCategory === 'All' || store.category === selectedCategory)
        ), [searchQuery, selectedCategory]
    );

    const renderSearchBar = useCallback(() => (
        <Animatable.View animation="slideInDown" style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <Ionicons name="search" size={24} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search stores..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    accessible
                    accessibilityLabel="Search Input"
                />
            </View>
        </Animatable.View>
    ), [searchQuery]);

    const renderToolbar = () => (
        <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolbarButton1} onPress={() => navigation.navigate('StoreCreate')}>
                <Text style={styles.toolbarButtonText1}>Create Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={() => alert('Report Store')}>
                <Text style={styles.toolbarButtonText}>Report Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={() => alert('Favorite Store')}>
                <Text style={styles.toolbarButtonText}>Favorite Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={() => alert('Store Location Map')}>
                <Text style={styles.toolbarButtonText}>Location Map</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCategoryItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item)}
            accessible
            accessibilityLabel={`Category: ${item}`}
        >
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
                {item}
            </Text>
        </TouchableOpacity>
    ), [selectedCategory]);

    const renderStoreItem = useCallback(({ item }) => (
        <Animatable.View animation="fadeInUp" style={styles.storeCard}>
            <TouchableOpacity onPress={() => navigation.navigate('StoreDetail', { store: item })} accessible accessibilityLabel={`Store: ${item.name}`}>
                <Image source={{ uri: item.image }} style={styles.storeImage} />
                <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{item.name}</Text>
                    <View style={styles.storeMetaInfo}>
                        <View style={styles.ratingContainer}>
                            <FontAwesome5 name="star" size={12} color="#FFD700" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.distanceText}>{item.distance}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    ), [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {renderToolbar()}
            {renderSearchBar()}
            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item}
                style={styles.categoriesList}
                showsHorizontalScrollIndicator={false}
            />
            {/* Promo Banner */}
            <View style={styles.promoBanner}>
                <Text style={styles.promoText}>🎉 Special Offer! Get 20% off on your first order! 🎉</Text>
            </View>
            <FlatList
                data={filteredStores}
                renderItem={renderStoreItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.storeGrid}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    searchContainer: {
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toolbarButton1: {
       paddingVertical : 10 ,
       paddingHorizontal : 15 ,
       borderRadius : 20 ,
       backgroundColor : '#000' ,
       marginHorizontal : 5 ,
       alignItems : 'center' ,
       justifyContent : 'center' ,
   },
   toolbarButtonText1:{
       fontSize : 14 ,
       color : '#fff' ,
   },
   toolbarButton: {
      paddingVertical : 10 ,
      paddingHorizontal : 15 ,
      borderRadius : 20 ,
      backgroundColor : '#f0f0f0' ,
      marginHorizontal : 5 ,
      alignItems : 'center' ,
      justifyContent : 'center' ,
  },
   toolbarButtonText:{
       fontSize : 14 ,
       color : '#333' ,
   },
   categoriesList:{
       paddingVertical : 15 ,
       paddingHorizontal : 5 ,
       marginBottom :10 ,
   },
   categoryItem:{
       paddingHorizontal : 20 ,
       paddingVertical : 10 ,
       marginHorizontal : 5 ,
       borderRadius : 20 ,
       backgroundColor : '#f0f0f0' 
   },
   selectedCategory:{
       backgroundColor:'#000'
   },
   categoryText:{
       fontSize :16 ,
       color:'#666'
   },
   selectedCategoryText:{
       color:'#fff'
   },
   storeGrid:{
       padding :10
   },
   storeCard:{
       flex :1 ,
       margin :8 ,
       borderRadius :16 ,
       overflow:'hidden' ,
       height :200
   },
   storeImage:{
       width:'100%' ,
       height:'100%'
   },
   storeInfo:{
       padding :10 ,
   },
   storeName:{
       fontSize :16 ,
       fontWeight :'bold'
   },
   storeMetaInfo:{
      flexDirection :'row' ,
      justifyContent :'space-between' 
   },
   ratingContainer:{
      flexDirection :'row' ,
      alignItems :'center' 
   },
   ratingText:{
      color :'#666' ,
      fontSize :12 
   },
   distanceText:{
      color :'#666' ,
      fontSize :12 
   },
   promoBanner:{
      backgroundColor:'#ffeb3b', // Bright background for visibility
      paddingVertical :10,
      paddingHorizontal :15,
      borderRadius :10,
      marginVertical :10,
      alignItems :'center'
   },
   promoText:{
      fontSize :16,
      fontWeight:'bold',
      color:'#000' // Black text for contrast
   }
});

export default StoreSearch;