import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    TextInput, 
    Modal 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const Stock = ({ navigation }) => {
    const [products, setProducts] = useState([
        { 
            id: 1, 
            name: 'Classic T-Shirt', 
            sku: 'TS001', 
            category: 'Apparel', 
            stock: 50, 
            price: 24.99, 
            status: 'In Stock',
            sizes: ['S', 'M', 'L', 'XL'],
            variants: [
                { color: 'White', stock: 15 },
                { color: 'Black', stock: 20 },
                { color: 'Gray', stock: 15 }
            ]
        },
        { 
            id: 2, 
            name: 'Denim Jeans', 
            sku: 'DN002', 
            category: 'Bottoms', 
            stock: 30, 
            price: 59.99, 
            status: 'Low Stock',
            sizes: ['30', '32', '34', '36'],
            variants: [
                { color: 'Blue', stock: 10 },
                { color: 'Black', stock: 20 }
            ]
        },
        { 
            id: 3, 
            name: 'Leather Jacket', 
            sku: 'JK003', 
            category: 'Outerwear', 
            stock: 15, 
            price: 129.99, 
            status: 'Critical',
            sizes: ['S', 'M', 'L'],
            variants: [
                { color: 'Brown', stock: 5 },
                { color: 'Black', stock: 10 }
            ]
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    // Search and filter products
    useEffect(() => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    // Get status color
    const getStatusColor = (status) => {
        switch(status) {
            case 'In Stock': return '#059669';
            case 'Low Stock': return '#f97316';
            case 'Critical': return '#ef4444';
            default: return '#64748b';
        }
    };

    // Open product details modal
    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailModalVisible(true);
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

                        <View style={styles.modalContent}>
                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Product Details</Text>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>SKU</Text>
                                    <Text style={styles.modalDetailValue}>{selectedProduct.sku}</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Category</Text>
                                    <Text style={styles.modalDetailValue}>{selectedProduct.category}</Text>
                                </View>
                                <View style={styles.modalDetailRow}>
                                    <Text style={styles.modalDetailLabel}>Price</Text>
                                    <Text style={styles.modalDetailValue}>${selectedProduct.price.toFixed(2)}</Text>
                                </View>
                            </View>

                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Stock Variants</Text>
                                {selectedProduct.variants.map((variant, index) => (
                                    <View key={index} style={styles.variantRow}>
                                        <View style={[
                                            styles.colorSwatch, 
                                            { backgroundColor: variant.color.toLowerCase() }
                                        ]} />
                                        <Text style={styles.variantColor}>{variant.color}</Text>
                                        <Text style={styles.variantStock}>{variant.stock} units</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>Available Sizes</Text>
                                <View style={styles.sizesContainer}>
                                    {selectedProduct.sizes.map((size, index) => (
                                        <View key={index} style={styles.sizeTag}>
                                            <Text style={styles.sizeTagText}>{size}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalActionButton}>
                                <Text style={styles.modalActionButtonText}>Edit Product</Text>
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
                        </View>
                    </Animatable.View>
                </View>
            </Modal>
        );
    };

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
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productList}
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
    colorSwatch: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    variantColor: {
        flex: 1,
        fontSize: 13,
    },
    variantStock: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748b',
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
});

export default Stock;