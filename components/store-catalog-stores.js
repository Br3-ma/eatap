import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const StoreItem = ({ item, index, onPress }) => {
    return (
        <Animatable.View
            animation="fadeInUp"
            delay={index * 100}
            style={styles.storeCard}
        >
            <TouchableOpacity
                onPress={() => onPress(item)}
                accessible
                accessibilityLabel={`Store: ${item.name}`}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.storeImage}
                        defaultSource={require('../assets/store.jpg')} // adjust path if needed
                    />
                    <TouchableOpacity style={styles.favoriteButton}>
                        <MaterialIcons name="favorite-border" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.storeInfo}>
                    <Text style={styles.storeName} numberOfLines={1}>{item.name}</Text>

                    <View style={styles.storeMetaInfo}>
                        <View style={styles.ratingContainer}>
                            <FontAwesome5 name="star" size={12} color="#FFD700" solid />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <View style={styles.distanceContainer}>
                            <MaterialIcons name="location-on" size={12} color="#666" />
                            <Text style={styles.distanceText}>{item.distance || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={styles.storeActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>View Menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    storeCard: {
        flex: 1,
        margin: 6,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    imageContainer: {
        position: 'relative',
        height: 140
    },
    storeImage: {
        width: '100%',
        height: '100%'
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 5
    },
    storeInfo: {
        padding: 10
    },
    storeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    storeMetaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#666'
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    distanceText: {
        marginLeft: 2,
        fontSize: 12,
        color: '#666'
    },
    storeActions: {
        marginTop: 10,
        alignItems: 'flex-start'
    },
    actionButton: {
        backgroundColor: '#007bff',
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14
    }
});

export default StoreItem;
