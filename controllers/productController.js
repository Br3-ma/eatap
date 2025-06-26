import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../confg/conf';

// Get store ID from AsyncStorage
export const getStoreIdFromStorage = async () => {
    try {
        const storeDetailsString = await AsyncStorage.getItem('storeDetails');
        console.log('🔍 Raw storeDetails from AsyncStorage:', storeDetailsString);

        if (storeDetailsString) {
            const storeDetails = JSON.parse(storeDetailsString);
            console.log('📦 Parsed store details from AsyncStorage:', storeDetails);

            if (storeDetails && storeDetails.data && storeDetails.data.id) {
                console.log('✅ Store ID retrieved:', storeDetails.data.id);
                return storeDetails.data.id;
            } else {
                console.log('❌ Store ID not found in storeDetails');
                console.log('🔄 Using fallback store ID: 24');
                return 24; // Fallback for testing
            }
        } else {
            console.log('❌ No storeDetails found in AsyncStorage');
            console.log('🔄 Using fallback store ID: 24');
            return 24; // Fallback for testing
        }
    } catch (error) {
        console.error('❌ Error getting store details from AsyncStorage:', error);
        console.log('🔄 Using fallback store ID: 24');
        return 24; // Fallback for testing
    }
};

// Transform API data to match UI design
export const transformProductData = (apiProduct) => {
    // Parse categories, types, and tags from JSON strings
    let categories = [];
    let types = [];
    let tags = [];

    try {
        if (apiProduct.categories) {
            categories = typeof apiProduct.categories === 'string'
                ? JSON.parse(apiProduct.categories)
                : apiProduct.categories;
        }
        if (apiProduct.types) {
            types = typeof apiProduct.types === 'string'
                ? JSON.parse(apiProduct.types)
                : apiProduct.types;
        }
        if (apiProduct.tags) {
            tags = typeof apiProduct.tags === 'string'
                ? JSON.parse(apiProduct.tags)
                : apiProduct.tags;
        }
    } catch (e) {
        console.log('Error parsing JSON strings:', e);
    }

    // Calculate total stock from variants
    let totalStock = 0;
    let stockStatus = 'Out of Stock';

    if (apiProduct.stocks && apiProduct.stocks.length > 0) {
        totalStock = apiProduct.stocks.reduce((sum, stock) => sum + (stock.qty_in_store || 0), 0);
    } else if (apiProduct.variants && apiProduct.variants.length > 0) {
        totalStock = apiProduct.variants.reduce((sum, variant) => {
            const stock = variant.stock?.qty_in_store || 0;
            return sum + stock;
        }, 0);
    }

    // Determine stock status
    if (totalStock > 50) {
        stockStatus = 'In Stock';
    } else if (totalStock > 10) {
        stockStatus = 'Low Stock';
    } else if (totalStock > 0) {
        stockStatus = 'Critical';
    } else {
        stockStatus = 'Out of Stock';
    }

    // Generate SKU from product ID
    const sku = `PRD${apiProduct.id.toString().padStart(4, '0')}`;

    return {
        id: apiProduct.id,
        name: apiProduct.name,
        sku: sku,
        category: categories.length > 0 ? categories[0] : 'Uncategorized',
        stock: totalStock,
        price: parseFloat(apiProduct.price) || 0,
        status: stockStatus,
        description: apiProduct.description,
        categories: categories,
        types: types,
        tags: tags,
        variants: apiProduct.variants || [],
        stocks: apiProduct.stocks || [],
        image: apiProduct.image,
        created_at: apiProduct.created_at,
        updated_at: apiProduct.updated_at
    };
};

// Fetch products from API
export const fetchProducts = async (storeId, page = 1) => {
    if (!storeId) {
        console.log('❌ Store ID not available, skipping fetch');
        throw new Error('Store ID is required');
    }

    try {
        const url = `${API_BASE_URL}/products/store/${storeId}?page=${page}&per_page=10`;
        console.log(`🌐 Making API call to: ${url}`);

        const response = await fetch(url);
        console.log(`📡 API Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`📦 Raw API response:`, data);
        console.log(`📊 Products count: ${data.products?.length || 0}`);
        console.log(`📄 Pagination info:`, data.pagination);

        const transformedProducts = data.products.map(transformProductData);
        console.log(`✨ Transformed products count: ${transformedProducts.length}`);

        return {
            products: transformedProducts,
            pagination: data.pagination
        };

    } catch (err) {
        console.error('❌ Error fetching products:', err);
        throw err;
    }
};

// Update product
export const updateProduct = async (productId, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
};

// Delete product
export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;

    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};

// Get status color for UI
export const getStatusColor = (status) => {
    switch (status) {
        case 'In Stock': return '#059669';
        case 'Low Stock': return '#f97316';
        case 'Critical': return '#ef4444';
        case 'Out of Stock': return '#64748b';
        default: return '#64748b';
    }
};

// Filter products by search query
export const filterProducts = (products, searchQuery) => {
    if (!searchQuery.trim()) return products;

    return products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
}; 