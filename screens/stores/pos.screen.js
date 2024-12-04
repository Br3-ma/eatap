import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const QuickSale = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products] = useState([
        { id: 1, name: 'Classic T-Shirt', price: 24.99, stock: 50, category: 'Apparel', image: null },
        { id: 2, name: 'Denim Jeans', price: 59.99, stock: 30, category: 'Apparel', image: null },
        { id: 3, name: 'Leather Jacket', price: 129.99, stock: 15, category: 'Outerwear', image: null },
        { id: 4, name: 'Sneakers', price: 79.99, stock: 25, category: 'Footwear', image: null },
        { id: 5, name: 'Baseball Cap', price: 19.99, stock: 40, category: 'Accessories', image: null }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Calculate total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Add to cart
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem.quantity > 1) {
            setCartItems(cartItems.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            ));
        } else {
            setCartItems(cartItems.filter(item => item.id !== productId));
        }
    };

    // Search products
    useEffect(() => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    // Render cart item
    const renderCartItem = ({ item }) => (
        <Animatable.View 
            animation="fadeIn" 
            style={styles.cartItemContainer}
        >
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <View style={styles.cartItemQuantityControl}>
                    <TouchableOpacity 
                        onPress={() => removeFromCart(item.id)}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="remove" size={16} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                        onPress={() => addToCart(item)}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="add" size={16} color="#1f2937" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        </Animatable.View>
    );

    // Render product item
    const renderProductItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.productItem}
            onPress={() => addToCart(item)}
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
                    <Text style={styles.productStock}>Stock: {item.stock}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                        data={filteredProducts}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.productListColumn}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* Cart Section */}
                <View style={styles.cartSection}>
                    {/* Cart Header */}
                    <View style={styles.cartHeader}>
                        <Text style={styles.cartHeaderTitle}>Cart</Text>
                        <TouchableOpacity>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>

                    {/* Cart Items */}
                    <FlatList 
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyCartContainer}>
                                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                            </View>
                        }
                    />

                    {/* Total and Checkout */}
                    {cartItems.length > 0 && (
                        <LinearGradient
                            colors={['#1e40af', '#3b82f6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.checkoutButton}
                        >
                            <View style={styles.checkoutContent}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalAmount}>${calculateTotal()}</Text>
                                <TouchableOpacity style={styles.checkoutTouch}>
                                    <Text style={styles.checkoutText}>Checkout</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )}
                </View>
            </View>
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
        flexDirection: 'row',
    },
    productList: {
        flex: 2,
        paddingHorizontal: 8,
    },
    productListColumn: {
        justifyContent: 'space-between',
    },
    productItem: {
        width: (width * 0.6) / 2 - 16,
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
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 13,
        color: '#2563eb',
        fontWeight: '600',
    },
    productStock: {
        fontSize: 11,
        color: '#64748b',
    },
    cartSection: {
        flex: 1,
        backgroundColor: '#fff',
        borderLeftWidth: 1,
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
        alignItems: 'center',
    },
    cartItemName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
    },
    cartItemQuantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
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
    checkoutButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 12,
        padding: 16,
        margin: 16,
    },
    checkoutContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: '#fff',
        fontSize: 13,
        opacity: 0.8,
    },
    totalAmount: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    checkoutTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    checkoutText: {
        color: '#fff',
        fontWeight: '600',
        marginRight: 8,
    },
});

export default QuickSale;