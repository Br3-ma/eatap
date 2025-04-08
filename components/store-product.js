import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RenderProductCard = ({ item, index, navigation }) => {
    return (
        <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.productCard}>
            <TouchableOpacity onPress={() => navigation.navigate('StoreProductDetailScreen', { product: item })}>
                <Carousel
                    data={item.images}
                    renderItem={({ item: image }) => (
                        <Image source={{ uri: image }} style={styles.productImage} />
                    )}
                    sliderWidth={width * 0.65}
                    itemWidth={width * 0.65}
                    loop
                    autoplay
                />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.productMeta}>
                        <Text style={styles.productPrice}>${item.price}</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesome5 name="star" size={12} color="#FFD700" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        width: width * 0.65,
        marginRight: 15,
        borderRadius: 16,
        backgroundColor: '#fff',
    },
    productImage: { width: '100%', height: width * 0.65 },
    productInfo: { padding: 15 },
    productName: { fontSize: 16, fontWeight: '600' },
    productMeta: { flexDirection: 'row', justifyContent: 'space-between' },
    productPrice: { fontSize: 18, fontWeight: 'bold' },
    ratingContainer: { flexDirection: 'row', gap: 5 },
    ratingText: { fontSize: 12, color: '#666' },
});

export default RenderProductCard;
