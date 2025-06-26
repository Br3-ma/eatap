import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, TextInput, Modal, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../confg/conf';

// Import components
import ProductDetailsModal from '../../components/product-details-modal';
import ProductListItem from '../../components/product-list-item';
import ProductSearchHeader from '../../components/product-search-header';

// Import controllers
import {
    getStoreIdFromStorage,
    fetchProducts,
    updateProduct,
    getStatusColor,
    filterProducts
} from '../../controllers/productController';

const StoreProducts = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    // API and pagination states
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [error, setError] = useState(null);

    // Store ID state
    const [storeId, setStoreId] = useState(null);
    const [storeLoading, setStoreLoading] = useState(true);

    // Refs
    const flatListRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Load store ID from AsyncStorage
    const loadStoreId = async () => {
        try {
            setStoreLoading(true);
            const id = await getStoreIdFromStorage();
            setStoreId(id);
            console.log('✅ Store ID loaded:', id);
        } catch (error) {
            console.error('Error loading store:', error);
            // Don't navigate back, just use fallback
            setStoreId(24);
            console.log('🔄 Using fallback store ID: 24');
        } finally {
            setStoreLoading(false);
        }
    };

    // Load products from API
    const loadProducts = async (page = 1, isRefresh = false) => {
        if (!storeId) {
            console.log('❌ Store ID not available, skipping fetch');
            return;
        }

        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            setError(null);
            console.log(`🔄 Fetching products for store ${storeId}, page ${page}`);

            const result = await fetchProducts(storeId, page);
            console.log(`✅ Fetched ${result.products.length} products`);

            if (page === 1 || isRefresh) {
                setProducts(result.products);
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }

            setCurrentPage(page);
            setHasMorePages(result.pagination.has_more_pages);

        } catch (err) {
            console.error('Error loading products:', err);
            setError(err.message);
            Alert.alert('Error', 'Failed to load products. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    };

    // Load more products for infinite scroll
    const loadMoreProducts = () => {
        if (!loadingMore && hasMorePages && !loading && storeId) {
            loadProducts(currentPage + 1);
        }
    };

    // Refresh products
    const onRefresh = () => {
        setRefreshing(true);
        loadProducts(1, true);
    };

    // Quick scroll to top
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    // Handle product selection
    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailModalVisible(true);
    };

    // Handle product save
    const handleProductSave = async (editForm) => {
        try {
            await updateProduct(selectedProduct.id, editForm);
            Alert.alert('Success', 'Product updated successfully!');

            // Refresh the product list to show updated data
            onRefresh();

        } catch (error) {
            console.error('Error saving product:', error);
            Alert.alert('Error', 'Failed to update product. Please try again.');
        }
    };

    // Handle search with debouncing
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            const filtered = filterProducts(products, searchQuery);
            setFilteredProducts(filtered);
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, products]);

    // Load store ID on component mount
    useEffect(() => {
        loadStoreId();
    }, []);

    // Load products when store ID is available
    useEffect(() => {
        if (storeId && !storeLoading) {
            console.log('🚀 Loading initial products for store:', storeId);
            loadProducts(1, true);
        }
    }, [storeId, storeLoading]);

    // Render loading more indicator
    const renderLoadingMore = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#3b82f6" />
                <Text style={styles.loadingMoreText}>Loading more products...</Text>
            </View>
        );
    };

    // Render empty state
    const renderEmptyComponent = () => {
        if (loading) return null;
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cube-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>
                    {searchQuery ? 'No products found matching your search.' : 'No products available.'}
                </Text>
            </View>
        );
    };

    // Handle header actions
    const handleBackPress = () => navigation.goBack();
    const handleFilterPress = () => Alert.alert('Filter', 'Filter functionality coming soon!');
    const handleAddPress = () => Alert.alert('Add Product', 'Add product functionality coming soon!');

    if (storeLoading || (loading && products.length === 0)) {
        return (
            <SafeAreaView style={styles.container}>
                <ProductSearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onBackPress={handleBackPress}
                    onFilterPress={handleFilterPress}
                    onAddPress={handleAddPress}
                />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text style={styles.loadingText}>
                        {storeLoading ? 'Loading store details...' : 'Loading products...'}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header and Search */}
            <ProductSearchHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onBackPress={handleBackPress}
                onFilterPress={handleFilterPress}
                onAddPress={handleAddPress}
            />

            {/* Quick Scroll to Top Button */}
            {products.length > 10 && (
                <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
                    <Ionicons name="arrow-up" size={20} color="#fff" />
                </TouchableOpacity>
            )}

            {/* Product List */}
            <FlatList
                ref={flatListRef}
                data={searchQuery ? filteredProducts : products}
                renderItem={({ item }) => (
                    <ProductListItem
                        product={item}
                        onPress={openProductDetails}
                        getStatusColor={getStatusColor}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListFooterComponent={renderLoadingMore}
                ListEmptyComponent={renderEmptyComponent}
            />

            {/* Product Details Modal */}
            <ProductDetailsModal
                selectedProduct={selectedProduct}
                isVisible={isDetailModalVisible}
                onClose={() => setIsDetailModalVisible(false)}
                onSave={handleProductSave}
                getStatusColor={getStatusColor}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#64748b',
    },
    loadingMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    loadingMoreText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#64748b',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    scrollToTopButton: {
        position: 'absolute',
        right: 20,
        bottom: 100,
        backgroundColor: '#3b82f6',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    productList: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
});

export default StoreProducts;