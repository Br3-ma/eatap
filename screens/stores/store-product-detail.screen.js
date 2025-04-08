import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel-v4';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const StoreProductDetailScreen = ({ route, navigation }) => {
    const { store_id, product_id } = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Mock data - replace with actual API calls
    const product = {
        id: product_id,
        name: "Premium Product",
        price: 99.99,
        description: "High-quality premium product with excellent features and finishing.",
        rating: 4.8,
        reviews: 128,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#000000", "#3B82F6", "#EF4444", "#10B981"],
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRu3ABzrvs1TsGdVPiJGNPL6ZUXJqr-1gePjRl3JshzsBVKLJxhtRFRGkrkFI3aJogDzQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVyS3ID8IEOCiGGLQlOaovtE0O-ILv1-XPrBUl9xjLunudqyMKNR3EuwZiJTCfkBYlC8&usqp=CAU",
            "https://assets.woolworthsstatic.co.za/Beef-Biryani-1-kg-6009223179122.jpg?V=0QSX&o=eyJidWNrZXQiOiJ3dy1vbmxpbmUtaW1hZ2UtcmVzaXplIiwia2V5IjoiaW1hZ2VzL2VsYXN0aWNlcmEvcHJvZHVjdHMvaGVyby8yMDIxLTA0LTMwLzYwMDkyMjMxNzkxMjJfaGVyby5qcGcifQ&"
        ],
        features: [
            "Premium Quality",
            "Durable Material",
            "Comfortable Fit",
            "Easy Maintenance"
        ]
    };

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const shareProduct = async () => {
        try {
            await Share.share({
                message: `Check out ${product.name} on our store!`,
                url: `store://${store_id}/products/${product_id}`
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderImage = ({ item }) => (
        <Image
            source={{ uri: item }}
            style={styles.carouselImage}
            resizeMode="cover"
        />
    );

    const handleAddToCart = () => {
        // Implement add to cart functionality
        // Show success animation
        // Navigate to cart or show confirmation
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
                <TouchableOpacity onPress={shareProduct} style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color="#000" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                {/* Image Carousel */}
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={product.images}
                        renderItem={renderImage}
                        sliderWidth={width}
                        itemWidth={width}
                        loop
                        autoplay
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)']}
                        style={styles.gradient}
                    />
                </View>

                {/* Product Info */}
                <Animatable.View 
                    animation="fadeInUp" 
                    duration={800} 
                    style={styles.productInfo}
                >
                    <View style={styles.basicInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.price}>${product.price}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <FontAwesome5 name="star" solid size={16} color="#FFD700" />
                        <Text style={styles.rating}>{product.rating}</Text>
                        <Text style={styles.reviews}>({product.reviews} reviews)</Text>
                    </View>

                    {/* Size Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Size</Text>
                        <View style={styles.sizesContainer}>
                            {product.sizes.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeButton,
                                        selectedSize === size && styles.selectedSize
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text style={[
                                        styles.sizeText,
                                        selectedSize === size && styles.selectedSizeText
                                    ]}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Color Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Color</Text>
                        <View style={styles.colorsContainer}>
                            {product.colors.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorButton,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.selectedColor
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Quantity Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quantity</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity 
                                style={styles.quantityButton}
                                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                            >
                                <MaterialCommunityIcons name="minus" size={20} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity 
                                style={styles.quantityButton}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <MaterialCommunityIcons name="plus" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Product Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Features</Text>
                        <View style={styles.featuresContainer}>
                            {product.features.map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </Animatable.View>
            </Animated.ScrollView>

            {/* Bottom Action Bar */}
            <Animatable.View 
                animation="slideInUp" 
                duration={800} 
                style={styles.bottomBar}
            >
                <TouchableOpacity style={styles.wishlistButton}>
                    <Ionicons name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        zIndex: 1000
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    scrollView: {
        flex: 1
    },
    carouselContainer: {
        height: height * 0.5,
        backgroundColor: '#f5f5f5'
    },
    carouselImage: {
        width: width,
        height: '100%'
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100
    },
    productInfo: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30
    },
    basicInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B82F6'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5
    },
    reviews: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    sizesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    sizeButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    selectedSize: {
        backgroundColor: '#000'
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '500'
    },
    selectedSizeText: {
        color: '#fff'
    },
    colorsContainer: {
        flexDirection: 'row',
        gap: 15
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent'
    },
    selectedColor: {
        borderColor: '#000'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity: {
        fontSize: 18,
        fontWeight: '600'
    },
    featuresContainer: {
        gap: 10
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    featureText: {
        fontSize: 16,
        color: '#333'
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666'
    },
    bottomBar: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },
    wishlistButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    addToCartButton: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default StoreProductDetailScreen;