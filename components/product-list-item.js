import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductListItem = ({ product, onPress, getStatusColor }) => {
    return (
        <TouchableOpacity style={styles.productItem} onPress={() => onPress(product)}>
            <View style={styles.productItemContent}>
                <View style={[styles.productStatusIndicator, { backgroundColor: getStatusColor(product.status) }]} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productSku}>SKU: {product.sku}</Text>
                    <Text style={styles.productStock}>
                        Stock: {product.stock} - <Text style={{ color: getStatusColor(product.status) }}>{product.status}</Text>
                    </Text>
                </View>
                <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
    productStock: {
        fontSize: 12,
        color: '#64748b',
    },
    productPriceContainer: {
        alignItems: 'flex-end'
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2563eb'
    }
});

export default ProductListItem; 