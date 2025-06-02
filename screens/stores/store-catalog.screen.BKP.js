import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Alert,
    RefreshControl
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

    const handleLoadMore = () => {
        if (hasMore && !isLoading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchStores(nextPage);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setPage(1);
        setStores([]);
        fetchStores(1, true);
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

            {/* Hide this renderSearchBar() & renderToolbar()
            when user is scrolling down then show/unhide it when they are scrolling up */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <StoreToolbar onAction={handleToolbarAction} />

            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                style={styles.categoriesList}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
            />

            {renderPromoBanner()}

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
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