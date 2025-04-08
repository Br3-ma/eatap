import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RenderCategory = ({ item, activeCategory, setActiveCategory }) => {
    return (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    activeCategory === item && styles.activeCategoryText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 3,
        marginRight: 10,
        borderRadius: 25, // Increased radius for a smoother shape
        backgroundColor: '#f0f0f0',
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    activeCategoryButton: {
        backgroundColor: '#000',
    },
    categoryText: {
        fontSize: 16, // Slightly larger font size for better readability
        color: '#666',
        fontWeight: '500', // Use a medium weight for better emphasis
    },
    activeCategoryText: {
        color: '#fff',
    },
});

export default RenderCategory;