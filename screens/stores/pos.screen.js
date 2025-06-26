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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import controllers
import {
    getStoreIdFromStorage,
    fetchProducts,
    getStatusColor,
    filterProducts
} from '../../controllers/productController';

const { width, height } = Dimensions.get('window');

const QuickSale = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);

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

    // Sales computations
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    // Refs
    const flatListRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Load store ID from AsyncStorage
    const loadStoreId = async () => {
        try {
            setStoreLoading(true);
            const id = await getStoreIdFromStorage();
            setStoreId(id);
            console.log('✅ Store ID loaded for POS:', id);
        } catch (error) {
            console.error('Error loading store:', error);
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
            console.log(`🔄 Fetching POS products for store ${storeId}, page ${page}`);

            const result = await fetchProducts(storeId, page);
            console.log(`✅ Fetched ${result.products.length} POS products`);

            if (page === 1 || isRefresh) {
                setProducts(result.products);
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }

            setCurrentPage(page);
            setHasMorePages(result.pagination.has_more_pages);

        } catch (err) {
            console.error('Error loading POS products:', err);
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

    // Calculate sales totals
    const calculateTotals = () => {
        const newSubtotal = cartItems.reduce((sum, item) => {
            const itemTotal = item.itemPrice * item.quantity;
            return sum + itemTotal;
        }, 0);

        const newTax = newSubtotal * 0.08; // 8% tax
        const newTotal = newSubtotal + newTax - discount;

        setSubtotal(newSubtotal);
        setTax(newTax);
        setTotal(newTotal);
    };

    // Add to cart with variant selection
    const addToCart = (product, selectedVariant = null) => {
        const cartItemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
        const existingItem = cartItems.find(item => item.cartItemId === cartItemId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            const newItem = {
                ...product,
                cartItemId,
                quantity: 1,
                selectedVariant,
                itemPrice: selectedVariant ? selectedVariant.price : product.price,
                itemStock: selectedVariant ? selectedVariant.stock?.qty_in_store : product.stock
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    // Remove from cart
    const removeFromCart = (cartItemId) => {
        const existingItem = cartItems.find(item => item.cartItemId === cartItemId);
        if (existingItem.quantity > 1) {
            setCartItems(cartItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
        }
    };

    // Clear cart
    const clearCart = () => {
        Alert.alert(
            'Clear Cart',
            'Are you sure you want to clear the cart?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => setCartItems([]) }
            ]
        );
    };

    // Open product details modal
    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setIsProductModalVisible(true);
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

    // Calculate totals when cart changes
    useEffect(() => {
        calculateTotals();
    }, [cartItems, discount]);

    // Load store ID on component mount
    useEffect(() => {
        loadStoreId();
    }, []);

    // Load products when store ID is available
    useEffect(() => {
        if (storeId && !storeLoading) {
            console.log('🚀 Loading initial POS products for store:', storeId);
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

    // Render cart item
    const renderCartItem = ({ item }) => (
        <Animatable.View
            animation="fadeIn"
            style={styles.cartItemContainer}
        >
            <View style={styles.cartItemDetails}>
                <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    {item.selectedVariant && (
                        <Text style={styles.cartItemVariant}>
                            {item.selectedVariant.variant?.name}: {item.selectedVariant.value}
                        </Text>
                    )}
                    <Text style={styles.cartItemStock}>
                        Stock: {item.itemStock} | ${item.itemPrice.toFixed(2)} each
                    </Text>
                </View>
                <View style={styles.cartItemControls}>
                    <View style={styles.cartItemQuantityControl}>
                        <TouchableOpacity
                            onPress={() => removeFromCart(item.cartItemId)}
                            style={styles.quantityButton}
                        >
                            <Ionicons name="remove" size={16} color="#1f2937" />
                        </TouchableOpacity>
                        <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() => addToCart(item, item.selectedVariant)}
                            style={styles.quantityButton}
                        >
                            <Ionicons name="add" size={16} color="#1f2937" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.cartItemPrice}>${(item.itemPrice * item.quantity).toFixed(2)}</Text>
                </View>
            </View>
        </Animatable.View>
    );

    // Render product item
    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => openProductDetails(item)}
        >
            <View style={styles.productItemContent}>
                <View style={styles.productIconContainer}>
                    <FontAwesome5
                        name={
                            item.category === 'Apparel' ? 'tshirt' :
                                item.category === 'Footwear' ? 'shoe-prints' :
                                    item.category === 'Accessories' ? 'hat-cowboy' :
                                        'shopping-bag'
                        }
                        size={24}
                        color="#2563eb"
                    />
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.productStockInfo}>
                        <Text style={styles.productStock}>Stock: {item.stock}</Text>
                        <View style={[styles.stockIndicator, { backgroundColor: getStatusColor(item.status) }]} />
                    </View>
                    {item.variants && item.variants.length > 0 && (
                        <Text style={styles.productVariants}>{item.variants.length} variants</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    // Product Details Modal
    const ProductDetailsModal = () => {
        if (!selectedProduct) return null;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isProductModalVisible}
                onRequestClose={() => setIsProductModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <Animatable.View
                        animation="fadeInUp"
                        style={styles.modalContainer}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                            <TouchableOpacity onPress={() => setIsProductModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#1f2937" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Product Information</Text>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>SKU</Text>
                                    <Text style={styles.modalDetailValue}>{selectedProduct.sku}</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Category</Text>
                                    <Text style={styles.modalDetailValue}>{selectedProduct.category}</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Base Price</Text>
                                    <Text style={styles.modalDetailValue}>${selectedProduct.price.toFixed(2)}</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Total Stock</Text>
                                    <Text style={styles.modalDetailValue}>{selectedProduct.stock} units</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Status</Text>
                                    <Text style={[styles.modalDetailValue, { color: getStatusColor(selectedProduct.status) }]}>
                                        {selectedProduct.status}
                                    </Text>
                                </View>
                            </View>

                            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitle}>Variants</Text>
                                    {selectedProduct.variants.map((variant, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.variantItem}
                                            onPress={() => {
                                                addToCart(selectedProduct, variant);
                                                setIsProductModalVisible(false);
                                            }}
                                        >
                                            <View style={styles.variantInfo}>
                                                <Text style={styles.variantType}>
                                                    {variant.variant?.name || 'Variant'}: {variant.value}
                                                </Text>
                                                <Text style={styles.variantPrice}>
                                                    ${variant.price?.toFixed(2) || selectedProduct.price.toFixed(2)}
                                                </Text>
                                            </View>
                                            <View style={styles.variantStock}>
                                                <Text style={styles.variantStockText}>
                                                    {variant.stock?.qty_in_store || 0} units
                                                </Text>
                                                <TouchableOpacity style={styles.addVariantButton}>
                                                    <Ionicons name="add" size={16} color="#fff" />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {!selectedProduct.variants || selectedProduct.variants.length === 0 && (
                                <View style={styles.modalSection}>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => {
                                            addToCart(selectedProduct);
                                            setIsProductModalVisible(false);
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['#1e40af', '#3b82f6']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.addToCartGradient}
                                        >
                                            <Text style={styles.addToCartText}>Add to Cart</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
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
                    <Text style={styles.headerTitle}>Point of Sale</Text>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color="#1f2937" />
                    </TouchableOpacity>
                </View>
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Point of Sale</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="calendar-clock" size={20} color="#1f2937" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search products..."
                    placeholderTextColor="#64748b"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Product List */}
                <View style={styles.productList}>
                    <FlatList
                        ref={flatListRef}
                        data={searchQuery ? filteredProducts : products}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id.toString()}
                        numColumns={width > 768 ? 3 : 2}
                        columnWrapperStyle={width > 768 ? styles.productListColumnWide : styles.productListColumn}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadMoreProducts}
                        onEndReachedThreshold={0.1}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        ListFooterComponent={renderLoadingMore}
                        ListEmptyComponent={renderEmptyComponent}
                    />
                </View>

                {/* Cart Section */}
                <View style={styles.cartSection}>
                    {/* Cart Header */}
                    <View style={styles.cartHeader}>
                        <Text style={styles.cartHeaderTitle}>Cart ({cartItems.length})</Text>
                        <TouchableOpacity onPress={clearCart}>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>

                    {/* Cart Items */}
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.cartItemId.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyCartContainer}>
                                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                            </View>
                        }
                    />

                    {/* Sales Summary */}
                    {cartItems.length > 0 && (
                        <View style={styles.salesSummary}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Tax (8%)</Text>
                                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                            </View>
                            <View style={styles.discountRow}>
                                <Text style={styles.summaryLabel}>Discount</Text>
                                <View style={styles.discountInputContainer}>
                                    <Text style={styles.discountSymbol}>$</Text>
                                    <TextInput
                                        style={styles.discountInput}
                                        value={discount.toString()}
                                        onChangeText={(text) => setDiscount(parseFloat(text) || 0)}
                                        placeholder="0.00"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    )}

                    {/* Checkout Button */}
                    {cartItems.length > 0 && (
                        <LinearGradient
                            colors={['#1e40af', '#3b82f6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.checkoutButton}
                        >
                            <TouchableOpacity style={styles.checkoutTouch}>
                                <Text style={styles.checkoutText}>Complete Sale</Text>
                                <Ionicons name="arrow-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                </View>
            </View>

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
    mainContent: {
        flex: 1,
        flexDirection: width > 768 ? 'row' : 'column',
    },
    productList: {
        flex: width > 768 ? 2 : 1,
        paddingHorizontal: 8,
    },
    productListColumn: {
        justifyContent: 'space-between',
    },
    productListColumnWide: {
        justifyContent: 'space-between',
    },
    productItem: {
        width: width > 768 ? (width * 0.4) / 3 - 16 : (width * 0.6) / 2 - 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    productItemContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    productIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0f2fe',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    productDetails: {
        alignItems: 'center',
        width: '100%',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 13,
        color: '#2563eb',
        fontWeight: '600',
        marginBottom: 4,
    },
    productStockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    productStock: {
        fontSize: 11,
        color: '#64748b',
        marginRight: 4,
    },
    stockIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    productVariants: {
        fontSize: 10,
        color: '#64748b',
        fontStyle: 'italic',
    },
    cartSection: {
        flex: width > 768 ? 1 : 1,
        backgroundColor: '#fff',
        borderLeftWidth: width > 768 ? 1 : 0,
        borderLeftColor: '#f1f5f9',
        padding: 16,
    },
    cartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cartHeaderTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
    },
    cartItemContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
    },
    cartItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cartItemInfo: {
        flex: 1,
        marginRight: 8,
    },
    cartItemName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    cartItemVariant: {
        fontSize: 11,
        color: '#64748b',
        marginBottom: 2,
    },
    cartItemStock: {
        fontSize: 10,
        color: '#64748b',
    },
    cartItemControls: {
        alignItems: 'flex-end',
    },
    cartItemQuantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    quantityButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        padding: 4,
    },
    cartItemQuantity: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 8,
    },
    cartItemPrice: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563eb',
    },
    emptyCartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyCartText: {
        fontSize: 16,
        color: '#64748b',
    },
    salesSummary: {
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        padding: 16,
        marginTop: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#64748b',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    discountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    discountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#fff',
        minWidth: 80,
    },
    discountSymbol: {
        fontSize: 13,
        color: '#64748b',
        marginRight: 4,
    },
    discountInput: {
        fontSize: 13,
        color: '#1f2937',
        minWidth: 50,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 8,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563eb',
    },
    checkoutButton: {
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    checkoutTouch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginRight: 8,
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
    variantItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    variantInfo: {
        flex: 1,
    },
    variantType: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    variantPrice: {
        fontSize: 12,
        color: '#2563eb',
        fontWeight: '600',
    },
    variantStock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    variantStockText: {
        fontSize: 12,
        color: '#64748b',
        marginRight: 8,
    },
    addVariantButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 20,
        padding: 6,
    },
    addToCartButton: {
        marginTop: 10,
    },
    addToCartGradient: {
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
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
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#64748b',
        marginTop: 12,
    },
});

export default QuickSale;