import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const MOCK_CATEGORIES = ['Groceries', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys', 'Books'];
const MOCK_TYPES = ['New', 'Used', 'Refurbished', 'Vintage', 'Limited Edition', 'Seasonal'];
const MOCK_TAGS = ['Popular', 'Sale', 'Featured', 'Best Seller', 'Trending', 'New Arrival', 'Clearance'];

const Step2Categories = ({ form, setForm }) => {
    const renderChipSection = (title, data, formKey, icon, description, animationDelay) => (
        <Animatable.View animation="fadeInUp" delay={animationDelay} style={styles.categorySection}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                    <MaterialCommunityIcons name={icon} size={24} color="#FF6B35" />
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <Text style={styles.sectionDescription}>{description}</Text>
            </View>
            
            <View style={styles.selectedCountContainer}>
                <Text style={styles.selectedCountText}>
                    {form[formKey].length} selected
                </Text>
            </View>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.chipContainer}
                contentContainerStyle={styles.chipContentContainer}
            >
                {data.map((item, i) => {
                    const isSelected = form[formKey].includes(item);
                    return (
                        <Chip
                            key={i}
                            style={[
                                styles.chip,
                                isSelected && styles.selectedChip
                            ]}
                            textStyle={[
                                styles.chipText,
                                isSelected && styles.selectedChipText
                            ]}
                            onPress={() => {
                                if (isSelected) {
                                    setForm(prev => ({
                                        ...prev,
                                        [formKey]: prev[formKey].filter(c => c !== item)
                                    }));
                                } else {
                                    setForm(prev => ({
                                        ...prev,
                                        [formKey]: [...prev[formKey], item]
                                    }));
                                }
                            }}
                            icon={isSelected ? "check-circle" : undefined}
                        >
                            {item}
                        </Chip>
                    );
                })}
            </ScrollView>
        </Animatable.View>
    );

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" duration={600} style={styles.headerSection}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="tag-multiple" size={28} color="#FF6B35" />
                </View>
                <Text style={styles.stepTitle}>Categories & Tags</Text>
                <Text style={styles.stepSubtitle}>
                    Organize your product to help customers find it easily
                </Text>
            </Animatable.View>

            <View style={styles.formSection}>
                {renderChipSection(
                    'Categories',
                    MOCK_CATEGORIES,
                    'categories',
                    'folder-multiple',
                    'Choose the main categories that best describe your product',
                    200
                )}

                {renderChipSection(
                    'Product Types',
                    MOCK_TYPES,
                    'types',
                    'package-variant-closed',
                    'Specify the condition or type of your product',
                    300
                )}

                {renderChipSection(
                    'Tags',
                    MOCK_TAGS,
                    'tags',
                    'tag-multiple',
                    'Add relevant tags to improve product discoverability',
                    400
                )}
            </View>

            <Animatable.View animation="fadeInUp" delay={500} style={styles.summaryContainer}>
                <View style={styles.summaryHeader}>
                    <MaterialCommunityIcons name="clipboard-list" size={20} color="#FF6B35" />
                    <Text style={styles.summaryTitle}>Selection Summary</Text>
                </View>
                <View style={styles.summaryContent}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Categories:</Text>
                        <Text style={styles.summaryValue}>
                            {form.categories.length > 0 ? form.categories.join(', ') : 'None selected'}
                        </Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Types:</Text>
                        <Text style={styles.summaryValue}>
                            {form.types.length > 0 ? form.types.join(', ') : 'None selected'}
                        </Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Tags:</Text>
                        <Text style={styles.summaryValue}>
                            {form.tags.length > 0 ? form.tags.join(', ') : 'None selected'}
                        </Text>
                    </View>
                </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.tipContainer}>
                <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#F59E0B" />
                <Text style={styles.tipText}>
                    <Text style={styles.tipBold}>Pro Tip:</Text> Select multiple categories and tags to maximize your product's visibility in search results
                </Text>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    stepSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    formSection: {
        marginBottom: 24,
    },
    categorySection: {
        marginBottom: 32,
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginLeft: 32,
    },
    selectedCountContainer: {
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    selectedCountText: {
        fontSize: 12,
        color: '#FF6B35',
        fontWeight: '600',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    chipContainer: {
        marginTop: 8,
    },
    chipContentContainer: {
        paddingRight: 20,
    },
    chip: {
        marginRight: 12,
        marginBottom: 8,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedChip: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    chipText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedChipText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    summaryContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 8,
    },
    summaryContent: {
        gap: 8,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        width: 80,
        flexShrink: 0,
    },
    summaryValue: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
        lineHeight: 20,
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FEF3C7',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: '#92400E',
        lineHeight: 20,
        marginLeft: 12,
    },
    tipBold: {
        fontWeight: '600',
    },
});

export default Step2Categories;