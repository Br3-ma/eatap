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
import Carousel from 'react-native-snap-carousel-v4';
import * as Animatable from 'react-native-animatable';
import RenderProductCard from '../../components/store-product';
import RenderCategory from '../../components/store-category';
import PublicStoreHeader from '../../components/store-header';
import { getStoreProducts } from '../../data/models/StoreProductModel'; // Import ProductModel

const { width, height } = Dimensions.get('window');

const StoreDetail = ({ route, navigation }) => {
    const { store } = route.params;
    const [activeCategory, setActiveCategory] = useState('All');
    
    // Get the products specific to this store
    const products = useMemo(() => getStoreProducts(store.id), [store.id]);

    const categories = useMemo(() => ['All', 'New Arrivals', 'Popular', 'Sale'], []);

    return (
        <SafeAreaView style={styles.container}>
            <PublicStoreHeader store={store} navigation={navigation} />
            <ScrollView style={styles.content}>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={RenderCategory}
                    keyExtractor={item => item}
                    style={styles.categoriesList}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.productsGrid}>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <RenderProductCard item={item} navigation={navigation} />
                        )}
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
