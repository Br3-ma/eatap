import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CategoryItem = ({ item, selectedCategory, onPress }) => {
    const isSelected = selectedCategory === item.id;

    return (
        <TouchableOpacity
            style={[styles.categoryItem, isSelected && styles.selectedCategory]}
            onPress={() => onPress(item.id)}
            accessible
            accessibilityLabel={`Category: ${item.name}`}
        >
            <MaterialIcons
                name={item.icon}
                size={16}
                color={isSelected ? '#fff' : '#666'}
            />
            <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        marginRight: 10
    },
    selectedCategory: {
        backgroundColor: '#007bff'
    },
    categoryText: {
        marginLeft: 6,
        color: '#666',
        fontSize: 13,
        fontWeight: '500'
    },
    selectedCategoryText: {
        color: '#fff'
    }
});

export default CategoryItem;
