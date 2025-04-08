// models/ProductModel.js

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Nishma - Beef Stew & Creamy Samp',
        price: 299.99,
        rating: 4.8,
        images: [
            'https://www.woolworths.co.za/images/elasticera/products/hero/2024-07-31/6009233274145_hero.jpg', 
            'url2', 
            'url'
        ],
        tags: ['New', 'Featured'],
        store_id: '1'
    },
    {
        id: '2',
        name: 'Shawama Buddy Pack',
        price: 120.30,
        rating: 4.8,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxNaR6B0PFNcs_caX6h5CJP5UIh_l2ThCyQ&s', 
            'url2', 
            'url3'
        ],
        tags: ['New', 'Featured'],
        store_id: '2'
    },
    {
        id: '3',
        name: 'Chicken Sharwama Platter',
        price: 240.04,
        rating: 4.8,
        images: [
            'https://fornopiombo.com/cdn/shop/articles/Delicious-Italian-Style-Menu-Items-To-Serve-At-Your-Dream-Restaurant.jpg?v=1658443933', 
            'url2', 
            'url3'
        ],
        tags: ['New', 'Featured'],
        store_id: '1'
    },
];

/**
 * Get all products for a given store
 * 
 * @param {string} store_id - The store ID to filter products by
 * @returns {Array} - List of products for the given store
 */
export const getStoreProducts = (store_id) => {
    return MOCK_PRODUCTS.filter(product => product.store_id === store_id);
};
