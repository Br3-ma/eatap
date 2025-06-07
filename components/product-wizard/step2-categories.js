import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const MOCK_CATEGORIES = ['Groceries', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys', 'Books'];
const MOCK_TYPES = ['New', 'Used', 'Refurbished', 'Vintage', 'Limited Edition', 'Seasonal'];
const MOCK_TAGS = ['Popular', 'Sale', 'Featured', 'Best Seller', 'Trending', 'New Arrival', 'Clearance'];

const Step2Categories = ({ form, setForm }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <View style={styles.categorySection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
                    {MOCK_CATEGORIES.map((cat, i) => (
                        <Chip
                            key={i}
                            style={[styles.chip, form.categories.includes(cat) && styles.selectedChip]}
                            onPress={() => {
                                if (form.categories.includes(cat)) {
                                    setForm(prev => ({
                                        ...prev,
                                        categories: prev.categories.filter(c => c !== cat)
                                    }));
                                } else {
                                    setForm(prev => ({
                                        ...prev,
                                        categories: [...prev.categories, cat]
                                    }));
                                }
                            }}
                        >
                            {cat}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.categorySection}>
                <Text style={styles.sectionTitle}>Types</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
                    {MOCK_TYPES.map((type, i) => (
                        <Chip
                            key={i}
                            style={[styles.chip, form.types.includes(type) && styles.selectedChip]}
                            onPress={() => {
                                if (form.types.includes(type)) {
                                    setForm(prev => ({
                                        ...prev,
                                        types: prev.types.filter(t => t !== type)
                                    }));
                                } else {
                                    setForm(prev => ({
                                        ...prev,
                                        types: [...prev.types, type]
                                    }));
                                }
                            }}
                        >
                            {type}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.categorySection}>
                <Text style={styles.sectionTitle}>Tags</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
                    {MOCK_TAGS.map((tag, i) => (
                        <Chip
                            key={i}
                            style={[styles.chip, form.tags.includes(tag) && styles.selectedChip]}
                            onPress={() => {
                                if (form.tags.includes(tag)) {
                                    setForm(prev => ({
                                        ...prev,
                                        tags: prev.tags.filter(t => t !== tag)
                                    }));
                                } else {
                                    setForm(prev => ({
                                        ...prev,
                                        tags: [...prev.tags, tag]
                                    }));
                                }
                            }}
                        >
                            {tag}
                        </Chip>
                    ))}
                </ScrollView>
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        marginBottom: 20,
    },
    categorySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 10,
    },
    chipContainer: {
        marginTop: 10,
    },
    chip: {
        marginRight: 10,
        backgroundColor: '#e0f2fe',
    },
    selectedChip: {
        backgroundColor: '#059669',
    },
});

export default Step2Categories; 