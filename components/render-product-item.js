import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, Dimensions, Animated } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { addToCart } from '../controllers/cart/cartController';

const RenderProductItem = ({ item, navigation }) => {
    const [liked, setLiked] = useState(false);
    const [scaleValue] = useState(new Animated.Value(1));

    const handlePress = () => {
        // Animate press
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
        
        navigation.navigate('ProductDetails', { product: item });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<MaterialIcons key={`star-${i}`} name="star" size={16} color="#FFD700" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<MaterialIcons key={`star-${i}`} name="star-half" size={16} color="#FFD700" />);
            } else {
                stars.push(<MaterialIcons key={`star-${i}`} name="star-outline" size={16} color="#FFD700" />);
            }
        }
        return stars;
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
            <TouchableOpacity 
                style={styles.productContainer} 
                onPress={handlePress}
                activeOpacity={0.9}
            >
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: item.image }} 
                        style={styles.productImage} 
                        resizeMode="cover"
                    />
                    {item.discount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{item.discount}% OFF</Text>
                        </View>
                    )}
                    <TouchableOpacity 
                        style={styles.favoriteButton}
                        onPress={() => setLiked(!liked)}
                    >
                        <AntDesign 
                            name={liked ? "heart" : "hearto"} 
                            size={20} 
                            color={liked ? "#FF4B4B" : "#fff"} 
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                    </Text>

                    <View style={styles.ratingContainer}>
                        <View style={styles.stars}>
                            {renderStars(item.rating)}
                        </View>
                        <Text style={styles.reviewCount}>({item.reviews} reviews)</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>K{item.price}</Text>
                        {item.oldPrice && (
                            <Text style={styles.oldPrice}>K{item.oldPrice}</Text>
                        )}
                    </View>

                    {item.stock < 10 && (
                        <Text style={styles.stockWarning}>
                            Only {item.stock} left in stock
                        </Text>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.addToCartButton} 
                            onPress={() => addToCart(item)}
                        >
                            <Ionicons name="cart" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Pick</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton}>
                            <AntDesign name="sharealt" size={20} color="#6F8D80" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        margin: 2,
        width: '50%',
    },
    productContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    imageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: width * 0.45,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    discountBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FF4B4B',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    detailsContainer: {
        padding: 12,
    },
    categoryBadge: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    categoryText: {
        color: '#666',
        fontSize: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    stars: {
        flexDirection: 'row',
        marginRight: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#25C480',
        marginRight: 8,
    },
    oldPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    stockWarning: {
        fontSize: 12,
        color: '#FF4B4B',
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addToCartButton: {
        flex: 0.85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25C480',
        paddingVertical: 10,
        borderRadius: 25,
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    shareButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
});

export default RenderProductItem;