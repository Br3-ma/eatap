import React, { useState, useCallback, useMemo } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Leather Jacket',
        price: 299.99,
        rating: 4.8,
        images: ['url1', 'url2', 'url3'],
        tags: ['New', 'Featured']
    },
    // Add more products...
];

const StoreDetail = ({ route, navigation }) => {
    const { store } = route.params;
    const [activeCategory, setActiveCategory] = useState('All');
    
    const categories = useMemo(() => ['All', 'New Arrivals', 'Popular', 'Sale'], []);
    
    const renderHeader = useCallback(() => (
        <Animatable.View animation="fadeIn" style={styles.header}>
            <Image 
                source={{ uri: store.image }}
                style={styles.coverImage}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeName}>{store.name}</Text>
                        <View style={styles.storeMetrics}>
                            <View style={styles.metric}>
                                <FontAwesome5 name="star" size={16} color="#FFD700" />
                                <Text style={styles.metricText}>{store.rating}</Text>
                            </View>
                            <View style={styles.metric}>
                                <Ionicons name="location" size={16} color="#fff" />
                                <Text style={styles.metricText}>{store.distance}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Animatable.View>
    ), [store, navigation]);

    const renderCategory = useCallback(({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(item)}
        >
            <Text style={[
                styles.categoryText,
                activeCategory === item && styles.activeCategoryText
            ]}>
                {item}
            </Text>
        </TouchableOpacity>
    ), [activeCategory]);

    const renderProductCard = useCallback(({ item, index }) => (
        <Animatable.View 
            animation="fadeInUp" 
            delay={index * 100}
            style={styles.productCard}
        >
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                <Carousel
                    data={item.images}
                    renderItem={({ item: image }) => (
                        <Image 
                            source={{ uri: image }}
                            style={styles.productImage}
                        />
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
                    <View style={styles.tagsContainer}>
                        {item.tags.map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    ), [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView style={styles.content}>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item}
                    style={styles.categoriesList}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.productsGrid}>
                    <FlatList
                        data={MOCK_PRODUCTS}
                        renderItem={renderProductCard}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={width * 0.7}
                        decelerationRate="fast"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: height * 0.3,
    },
    coverImage: {
        width: '100%',
        height: '100%'
    },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70%',
        padding: 20
    },
    headerContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    storeInfo: {
        gap: 8
    },
    storeName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    storeMetrics: {
        flexDirection: 'row',
        gap: 15
    },
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    metricText: {
        color: '#fff',
        fontSize: 14
    },
    content: {
        flex: 1
    },
    categoriesList: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0'
    },
    activeCategoryButton: {
        backgroundColor: '#000'
    },
    categoryText: {
        fontSize: 14,
        color: '#666'
    },
    activeCategoryText: {
        color: '#fff'
    },
    productsGrid: {
        paddingHorizontal: 20
    },
    productCard: {
        width: width * 0.65,
        marginRight: 15,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    productImage: {
        width: '100%',
        height: width * 0.65,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    productInfo: {
        padding: 15,
        gap: 8
    },
    productName: {
        fontSize: 16,
        fontWeight: '600'
    },
    productMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    ratingText: {
        fontSize: 12,
        color: '#666'
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 8
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#f0f0f0'
    },
    tagText: {
        fontSize: 12,
        color: '#666'
    }
});

export default StoreDetail;