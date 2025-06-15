import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreListScreen = ({ navigation, route }) => {
    const { stores } = route.params;

    const handleStoreSelect = async (store) => {
        try {
            // Save the selected store to AsyncStorage
            await AsyncStorage.setItem('storeDetails', JSON.stringify({
                status: 'success',
                data: store
            }));

            // Navigate to MyStore with the store details
            navigation.navigate('MyStore', {
                storeId: store.id,
                storeDetails: store
            });
        } catch (error) {
            console.error('Error saving store details:', error);
        }
    };

    const renderStoreItem = ({ item }) => {
        // Parse the address JSON string
        const address = JSON.parse(item.address || '{}');
        const hours = JSON.parse(item.hours || '{}');

        return (
            <TouchableOpacity
                style={styles.storeCard}
                onPress={() => handleStoreSelect(item)}
            >
                <View style={styles.storeHeader}>
                    <FontAwesome5 name="store" size={24} color="#FF6B35" />
                    <View style={styles.storeTitleContainer}>
                        <Text style={styles.storeName}>{item.name}</Text>
                        <Text style={styles.storeCode}>Code: {item.store_code}</Text>
                    </View>
                </View>
                <View style={styles.storeDetails}>
                    <Text style={styles.storeDescription} numberOfLines={2}>
                        {item.description || 'No description available'}
                    </Text>
                    <View style={styles.locationContainer}>
                        <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                        <Text style={styles.storeLocation}>
                            {address.street}, {address.city}
                            {address.postalCode ? `, ${address.postalCode}` : ''}
                        </Text>
                    </View>
                </View>
                <View style={styles.storeStats}>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="phone" size={16} color="#666" />
                        <Text style={styles.statText}>{item.phone}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="email" size={16} color="#666" />
                        <Text style={styles.statText}>{item.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Stores</Text>
            </View>

            <FlatList
                data={stores}
                renderItem={renderStoreItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No stores found</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateStore')}
            >
                <MaterialCommunityIcons name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
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
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    listContainer: {
        padding: 16,
    },
    storeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    storeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    storeTitleContainer: {
        marginLeft: 12,
        flex: 1,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    storeCode: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    storeDetails: {
        marginBottom: 12,
    },
    storeDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeLocation: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    storeStats: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#FF6B35',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});

export default StoreListScreen; 