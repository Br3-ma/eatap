import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, Dimensions, Animated, Pressable } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { addToCart } from '../controllers/cart/cartController';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.465;

const RenderProductItem = ({ item, navigation }) => {
    const [liked, setLiked] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const likeScale = useRef(new Animated.Value(1)).current;

    const animatePress = (scale) => {
        Animated.spring(scaleAnim, {
            toValue: scale,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const animateLike = () => {
        setLiked(!liked);
        Animated.sequence([
            Animated.spring(likeScale, {
                toValue: 1.3,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(likeScale, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <MaterialIcons key={`star-${i}`} name="star" size={12} color="#FFB800" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <MaterialIcons key={`star-${i}`} name="star-half" size={12} color="#FFB800" />
                );
            } else {
                stars.push(
                    <MaterialIcons key={`star-${i}`} name="star-outline" size={12} color="#FFB800" />
                );
            }
        }
        return stars;
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPressIn={() => animatePress(0.97)}
                onPressOut={() => animatePress(1)}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                style={styles.productContainer}
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                        resizeMode="cover"
                    />
                    <Animated.View 
                        style={[
                            styles.favoriteButton,
                            { transform: [{ scale: likeScale }] }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={animateLike}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <AntDesign
                                name={liked ? "heart" : "hearto"}
                                size={18}
                                color={liked ? "#FF3B30" : "#666"}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    {item.discount > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{item.discount}%</Text>
                        </View>
                    )}
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.categoryRow}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        {item.stock < 10 && (
                            <Text style={styles.stockText}>{item.stock} left</Text>
                        )}
                    </View>

                    <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                    </Text>

                    <View style={styles.ratingRow}>
                        <View style={styles.stars}>
                            {renderStars(item.rating)}
                        </View>
                        <Text style={styles.reviewCount}>
                            {item.reviews}
                        </Text>
                    </View>

                    <View style={styles.priceRow}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>K{item.price}</Text>
                            {item.oldPrice && (
                                <Text style={styles.oldPrice}>K{item.oldPrice}</Text>
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addToCart(item)}
                        >
                            <Ionicons name="add" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = {
    container: {
        width: ITEM_WIDTH,
        margin: width * 0.0175,
    },
    productContainer: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
        backgroundColor: '#F8F8F8',
    },
    productImage: {
        width: '100%',
        height: ITEM_WIDTH,
        backgroundColor: '#F8F8F8',
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFF',
        padding: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    discountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    discountText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    detailsContainer: {
        padding: 12,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    categoryText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    stockText: {
        fontSize: 11,
        color: '#FF3B30',
        fontWeight: '500',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 6,
        lineHeight: 20,
    },
    ratingRow: {
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
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    oldPrice: {
        fontSize: 13,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    addButton: {
        backgroundColor: '#007AFF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default RenderProductItem;