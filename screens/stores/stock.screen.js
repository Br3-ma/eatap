import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
    Modal,
    ActivityIndicator,
    Alert,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

// Import controllers
import {
    getStoreIdFromStorage,
    fetchProducts,
    updateProduct,
    getStatusColor,
    filterProducts
} from '../../controllers/productController';

const { width, height } = Dimensions.get('window');

const Stock = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

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
            console.log('✅ Store ID loaded for stock:', id);
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
            console.log(`🔄 Fetching stock products for store ${storeId}, page ${page}`);

            const result = await fetchProducts(storeId, page);
            console.log(`✅ Fetched ${result.products.length} stock products`);

            if (page === 1 || isRefresh) {
                setProducts(result.products);
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }

            setCurrentPage(page);
            setHasMorePages(result.pagination.has_more_pages);

        } catch (err) {
            console.error('Error loading stock products:', err);
            setError(err.message);
            Alert.alert('Error', 'Failed to load stock products. Please try again.');
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

    // Handle edit form changes
    const handleEditChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle variant stock change
    const handleVariantStockChange = (variantIndex, newStock) => {
        setEditForm(prev => {
            const updatedVariants = [...(prev.variants || selectedProduct.variants)];
            if (updatedVariants[variantIndex]) {
                updatedVariants[variantIndex] = {
                    ...updatedVariants[variantIndex],
                    stock: { ...updatedVariants[variantIndex].stock, qty_in_store: parseInt(newStock) || 0 }
                };
            }
            return { ...prev, variants: updatedVariants };
        });
    };

    // Toggle editing mode
    const toggleEditing = () => {
        if (!isEditing && selectedProduct) {
            // Initialize edit form with current product data
            setEditForm({
                name: selectedProduct.name || '',
                description: selectedProduct.description || '',
                price: selectedProduct.price?.toString() || '',
                stock: selectedProduct.stock?.toString() || '0',
                variants: selectedProduct.variants || []
            });
        }
        setIsEditing(!isEditing);
    };

    // Save product changes
    const handleProductSave = async () => {
        try {
            // Prepare the update data
            const updateData = {
                name: editForm.name,
                description: editForm.description,
                price: parseFloat(editForm.price) || 0,
                variants: editForm.variants
            };

            await updateProduct(selectedProduct.id, updateData);
            Alert.alert('Success', 'Stock updated successfully!');
            setIsEditing(false);

            // Refresh the product list to show updated data
            onRefresh();

        } catch (error) {
            console.error('Error saving stock:', error);
            Alert.alert('Error', 'Failed to update stock. Please try again.');
        }
    };

    // Cancel editing
    const cancelEditing = () => {
        setIsEditing(false);
        setEditForm({});
    };

    // Open product details modal
    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setIsEditing(false);
        setEditForm({});
        setIsDetailModalVisible(true);
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
            console.log('🚀 Loading initial stock products for store:', storeId);
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
                    {searchQuery ? 'No products found matching your search.' : 'No stock products available.'}
                </Text>
            </View>
        );
    };

    // Render product item
    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => openProductDetails(item)}
        >
            <View style={styles.productItemContent}>
                <View style={[
                    styles.productStatusIndicator,
                    { backgroundColor: getStatusColor(item.status) }
                ]} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productSku}>SKU: {item.sku}</Text>
                    <View style={styles.productStockInfo}>
                        <Text style={styles.productStock}>
                            Stock: {item.stock}
                        </Text>
                        <Text
                            style={[
                                styles.productStatus,
                                { color: getStatusColor(item.status) }
                            ]}
                        >
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // Product Details Modal
    const ProductDetailsModal = () => {
        if (!selectedProduct) return null;

        const renderField = (label, value, fieldName, multiline = false) => {
            if (isEditing) {
                return (
                    <View style={styles.editFieldContainer}>
                        <Text style={styles.editFieldLabel}>{label}</Text>
                        <TextInput
                            style={[styles.editInput, multiline && styles.editTextArea]}
                            value={editForm[fieldName] || value || ''}
                            onChangeText={(text) => handleEditChange(fieldName, text)}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            placeholderTextColor="#9ca3af"
                            multiline={multiline}
                            numberOfLines={multiline ? 3 : 1}
                        />
                    </View>
                );
            }

            return (
                <View style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailLabel}>{label}</Text>
                    <Text style={styles.modalDetailValue}>{value || 'N/A'}</Text>
                </View>
            );
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDetailModalVisible}
                onRequestClose={() => setIsDetailModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <Animatable.View
                        animation="fadeInUp"
                        style={styles.modalContainer}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                            <TouchableOpacity onPress={() => setIsDetailModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#1f2937" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Product Details</Text>
                                {renderField('SKU', selectedProduct.sku, 'sku')}
                                {renderField('Category', selectedProduct.category, 'category')}
                                {renderField('Price', `$${selectedProduct.price.toFixed(2)}`, 'price')}
                                {renderField('Total Stock', selectedProduct.stock.toString(), 'stock')}
                                {renderField('Description', selectedProduct.description, 'description', true)}
                            </View>

                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Stock Variants</Text>
                                {selectedProduct.variants && selectedProduct.variants.length > 0 ? (
                                    selectedProduct.variants.map((variant, index) => (
                                        <View key={index} style={styles.variantRow}>
                                            <View style={styles.variantInfo}>
                                                <Text style={styles.variantType}>
                                                    {variant.variant?.name || 'Variant'}: {variant.value}
                                                </Text>
                                                {isEditing ? (
                                                    <TextInput
                                                        style={styles.stockInput}
                                                        value={editForm.variants?.[index]?.stock?.qty_in_store?.toString() || variant.stock?.qty_in_store?.toString() || '0'}
                                                        onChangeText={(text) => handleVariantStockChange(index, text)}
                                                        placeholder="Stock"
                                                        keyboardType="numeric"
                                                    />
                                                ) : (
                                                    <Text style={styles.variantStock}>
                                                        {variant.stock?.qty_in_store || 0} units
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.noVariantsText}>No variants available</Text>
                                )}
                            </View>

                            {selectedProduct.categories && selectedProduct.categories.length > 0 && (
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitle}>Categories</Text>
                                    <View style={styles.categoriesContainer}>
                                        {selectedProduct.categories.map((category, index) => (
                                            <View key={index} style={styles.categoryTag}>
                                                <Text style={styles.categoryTagText}>{category}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </ScrollView>

                        <View style={styles.modalActions}>
                            {isEditing ? (
                                <>
                                    <TouchableOpacity style={styles.modalActionButton} onPress={cancelEditing}>
                                        <Text style={styles.modalActionButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <LinearGradient
                                        colors={['#059669', '#10b981']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.modalPrimaryAction}
                                    >
                                        <TouchableOpacity onPress={handleProductSave}>
                                            <Text style={styles.modalPrimaryActionText}>Save Changes</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity style={styles.modalActionButton} onPress={toggleEditing}>
                                        <Text style={styles.modalActionButtonText}>Edit Stock</Text>
                                    </TouchableOpacity>
                                    <LinearGradient
                                        colors={['#1e40af', '#3b82f6']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.modalPrimaryAction}
                                    >
                                        <TouchableOpacity>
                                            <Text style={styles.modalPrimaryActionText}>Adjust Inventory</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </>
                            )}
                        </View>
                    </Animatable.View>
                </View>
            </Modal>
        );
    };

    if (storeLoading || (loading && products.length === 0)) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Inventory Management</Text>
                    <View style={styles.headerButton} />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text style={styles.loadingText}>
                        {storeLoading ? 'Loading store details...' : 'Loading stock products...'}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inventory Management</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="filter-outline" size={20} color="#1f2937" />
                </TouchableOpacity>
            </View>

            {/* Search and Quick Actions */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search products by name or SKU..."
                    placeholderTextColor="#64748b"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.quickActionButton}>
                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Product List */}
            <FlatList
                ref={flatListRef}
                data={searchQuery ? filteredProducts : products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
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
            <ProductDetailsModal />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    headerButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#1f2937',
    },
    productItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    productItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    productStatusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    productSku: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 4,
    },
    productStockInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productStock: {
        fontSize: 12,
        color: '#64748b',
    },
    productStatus: {
        fontSize: 12,
        fontWeight: '600',
    },
    productPriceContainer: {
        alignItems: 'flex-end',
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2563eb',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: height * 0.85,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    modalContent: {
        marginBottom: 20,
    },
    modalSection: {
        marginBottom: 20,
    },
    modalSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 10,
    },
    modalDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    modalDetailLabel: {
        fontSize: 13,
        color: '#64748b',
    },
    modalDetailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
    },
    variantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    variantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    variantType: {
        flex: 1,
        fontSize: 13,
    },
    variantStock: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748b',
    },
    noVariantsText: {
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
    sizesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sizeTag: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 4,
    },
    sizeTagText: {
        fontSize: 12,
        color: '#1f2937',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalActionButton: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        paddingVertical: 12,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    modalActionButtonText: {
        color: '#1f2937',
        fontWeight: '600',
    },
    modalPrimaryAction: {
        flex: 1,
        borderRadius: 10,
    },
    modalPrimaryActionText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 12,
    },
    loadingMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    loadingMoreText: {
        fontSize: 13,
        color: '#64748b',
        marginLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 10,
    },
    editFieldContainer: {
        marginBottom: 10,
    },
    editFieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
    },
    editInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    editTextArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    stockInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryTag: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 4,
    },
    categoryTagText: {
        fontSize: 12,
        color: '#1f2937',
    },
    quickActionButton: {
        backgroundColor: '#3b82f6',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8,
    },
    productList: {
        padding: 16,
    },
});

export default Stock;