import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Alert,
    RefreshControl,
    Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { API_BASE_URL } from '../../confg/conf';
import StoreSearchHeader from '../../components/store-search-header';
import SearchBar from '../../components/store-search-bar';
import StoreToolbar from '../../components/store-catalog-toolbar';
import CategoryItem from '../../components/store-catalog-categories';
import StoreItem from '../../components/store-catalog-stores';

const { width } = Dimensions.get('window');

const StoreSearch = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [stores, setStores] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [totalStores, setTotalStores] = useState(0);
    const [error, setError] = useState(null);

    // Scroll animation states
    const scrollY = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);
    const headerTranslateY = useRef(new Animated.Value(0)).current;
    const headerScale = useRef(new Animated.Value(1)).current;
    const headerOpacity = useRef(new Animated.Value(1)).current;
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [visibleElements, setVisibleElements] = useState({
        searchBar: true,
        toolbar: true,
        categories: true,
        promoBanner: true
    });
    
    // Animation refs for each element
    const searchBarAnim = useRef(new Animated.Value(1)).current;
    const toolbarAnim = useRef(new Animated.Value(1)).current;
    const categoriesAnim = useRef(new Animated.Value(1)).current;
    const promoBannerAnim = useRef(new Animated.Value(1)).current;

    const categories = useMemo(() => [
        { id: 'All', name: 'All', icon: 'apps' },
        { id: 'Fashion', name: 'Fashion', icon: 'shirt' },
        { id: 'Food', name: 'Food', icon: 'restaurant' },
        { id: 'Electronics', name: 'Electronics', icon: 'devices' },
        { id: 'Books', name: 'Books', icon: 'book' }
    ], []);

    const fetchStores = useCallback(async (pageToFetch = 1, refreshing = false) => {
        if (isLoading && !refreshing) return;

        setIsLoading(true);
        setError(null);

        try {
            const categoryQuery = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
            const searchQueryParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '';
            const url = `${API_BASE_URL}/available-stores?page=${pageToFetch}${categoryQuery}${searchQueryParam}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const newStores = data.data || [];

            if (refreshing || pageToFetch === 1) {
                setStores(newStores);
            } else {
                setStores(prev => [...prev, ...newStores]);
            }

            setHasMore(data.current_page < data.last_page);
            setTotalStores(data.total || 0);

        } catch (error) {
            console.error('Failed to fetch stores:', error);
            setError(error.message);
            Alert.alert('Error', 'Failed to load stores. Please try again.');
        } finally {
            setIsLoading(false);
            if (refreshing) setIsRefreshing(false);
        }
    }, [searchQuery, selectedCategory, isLoading]);

    useEffect(() => {
        setPage(1);
        setStores([]);
        fetchStores(1, true);
    }, [searchQuery, selectedCategory]);


    // Animation configuration
    const animateElement = (animValue, toValue, duration = 300) => {
        return Animated.timing(animValue, {
            toValue,
            duration,
            useNativeDriver: true,
        });
    };

    // Sequential hide animation (removes elements one by one)
    const hideElementsSequentially = useCallback(() => {
        const hideSequence = [
            { anim: promoBannerAnim, key: 'promoBanner', delay: 0 },
            { anim: categoriesAnim, key: 'categories', delay: 100 },
            { anim: toolbarAnim, key: 'toolbar', delay: 200 },
            { anim: searchBarAnim, key: 'searchBar', delay: 300 }
        ];

        hideSequence.forEach(({ anim, key, delay }) => {
            setTimeout(() => {
                animateElement(anim, 0, 200).start(() => {
                    setVisibleElements(prev => ({ ...prev, [key]: false }));
                });
            }, delay);
        });
    }, [promoBannerAnim, categoriesAnim, toolbarAnim, searchBarAnim]);

    // Sequential show animation (appends elements one by one)
    const showElementsSequentially = useCallback(() => {
        const showSequence = [
            { anim: searchBarAnim, key: 'searchBar', delay: 0 },
            { anim: toolbarAnim, key: 'toolbar', delay: 100 },
            { anim: categoriesAnim, key: 'categories', delay: 200 },
            { anim: promoBannerAnim, key: 'promoBanner', delay: 300 }
        ];

        showSequence.forEach(({ anim, key, delay }) => {
            setTimeout(() => {
                setVisibleElements(prev => ({ ...prev, [key]: true }));
                animateElement(anim, 1, 200).start();
            }, delay);
        });
    }, [searchBarAnim, toolbarAnim, categoriesAnim, promoBannerAnim]);

    // Updated handleScroll function
    const handleScroll = useCallback((event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDifference = currentScrollY - lastScrollY.current;
        const threshold = 10; // Minimum scroll distance to trigger animation

        if (Math.abs(scrollDifference) < threshold) {
            return;
        }

        if (scrollDifference > 0 && currentScrollY > 50) {
            // Scrolling down - remove elements
            if (isHeaderVisible) {
                setIsHeaderVisible(false);
                hideElementsSequentially();
            }
        } else if (scrollDifference < 0) {
            // Scrolling up - append elements
            if (!isHeaderVisible) {
                setIsHeaderVisible(true);
                showElementsSequentially();
            }
        }

        lastScrollY.current = currentScrollY;
    }, [isHeaderVisible, hideElementsSequentially, showElementsSequentially]);

    // Animated component wrapper
    const AnimatedElement = ({ children, animValue, visible, style = {} }) => {
        if (!visible) return null;
        
        return (
            <Animated.View
                style={[
                    style,
                    {
                        opacity: animValue,
                        transform: [
                            {
                                translateY: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-20, 0] // Slide in from top
                                })
                            },
                            {
                                scale: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1] // Scale animation
                                })
                            }
                        ]
                    }
                ]}
            >
                {children}
            </Animated.View>
        );
    };
    // Reset header visibility when refreshing
    const handleRefresh = () => {
        setIsRefreshing(true);
        setPage(1);
        setStores([]);
        fetchStores(1, true);

        // Show header when refreshing
        if (!isHeaderVisible) {
            setIsHeaderVisible(true);
            Animated.parallel([
                Animated.timing(headerTranslateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(headerScale, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(headerOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    };

    const handleLoadMore = () => {
        if (hasMore && !isLoading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchStores(nextPage);
        }
    };

    const handleStorePress = (store) => {
        navigation.navigate('StoreDetail', { store });
    };

    const handleToolbarAction = (action) => {
        switch (action) {
            case 'create':
                navigation.navigate('StoreCreate');
                break;
            case 'report':
                Alert.alert('Report Store', 'Select a store to report');
                break;
            case 'favorites':
                navigation.navigate('FavoriteStores');
                break;
            case 'map':
                navigation.navigate('StoreMap', { stores });
                break;
            default:
                break;
        }
    };

    const renderCategoryItem = ({ item }) => (
        <CategoryItem
            item={item}
            selectedCategory={selectedCategory}
            onPress={setSelectedCategory}
        />
    );

    const renderStoreItem = ({ item, index }) => (
        <StoreItem item={item} index={index} onPress={handleStorePress} />
    );

    const renderPromoBanner = () => (
        <Animatable.View animation="pulse" iterationCount="infinite" style={styles.promoBanner}>
            <MaterialIcons name="local-offer" size={20} color="#ff6b35" />
            <Text style={styles.promoText}>🎉 Special Offer! Get 20% off on your first order!</Text>
        </Animatable.View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <MaterialIcons name="store" size={80} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No stores found</Text>
            <Text style={styles.emptyStateSubtitle}>
                Try adjusting your search or category filter
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => handleRefresh()}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color="#007bff" />
                <Text style={styles.loadingText}>Loading more stores...</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StoreSearchHeader
                totalStores={totalStores}
                onFilterPress={() => Alert.alert('Filters', 'Filter options coming soon!')}
            />

            <View style={styles.headerContainer}>
                <AnimatedElement 
                    animValue={searchBarAnim} 
                    visible={visibleElements.searchBar}
                    style={styles.headerElement}
                >
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </AnimatedElement>

                <AnimatedElement 
                    animValue={toolbarAnim} 
                    visible={visibleElements.toolbar}
                    style={styles.headerElement}
                >
                    <StoreToolbar onAction={handleToolbarAction} />
                </AnimatedElement>

                <AnimatedElement 
                    animValue={categoriesAnim} 
                    visible={visibleElements.categories}
                    style={styles.headerElement}
                >
                    <FlatList
                        horizontal
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        style={styles.categoriesList}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContent}
                    />
                </AnimatedElement>

                <AnimatedElement 
                    animValue={promoBannerAnim} 
                    visible={visibleElements.promoBanner}
                    style={styles.headerElement}
                >
                    {renderPromoBanner()}
                </AnimatedElement>
            </View>

            <View style={styles.storeContainer}>
                <FlatList
                    data={stores}
                    renderItem={renderStoreItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={[
                        styles.storeGrid,
                        stores.length === 0 && styles.storeGridEmpty
                    ]}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.3}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={['#007bff']}
                            tintColor="#007bff"
                        />
                    }
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={!isLoading && stores.length === 0 ? renderEmptyState : null}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    // Container for the store list to take up remaining space
    storeContainer: {
        flex: 1,
    },
  
    promoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff3cd',
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginHorizontal: 15,
      marginVertical: 10,
      borderRadius: 10,
      borderLeftWidth: 4,
      borderLeftColor: '#ff6b35',
    },
    promoText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#856404',
      marginLeft: 10,
      flex: 1,
    },
  
    categoriesList: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    categoriesContent: {
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
  
    storeGrid: {
      padding: 15,
    },
    storeGridEmpty: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  
    loadingFooter: {
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#007bff',
    },
  
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyStateTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#ccc',
      marginTop: 20,
    },
    emptyStateSubtitle: {
      fontSize: 16,
      color: '#aaa',
      marginTop: 10,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 20,
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    retryButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
});  

export default StoreSearch;