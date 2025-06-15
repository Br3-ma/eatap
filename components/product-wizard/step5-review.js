import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Step5Review = ({ form }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <View style={styles.headerContainer}>
                <Text style={styles.reviewTitle}>Review Your Product</Text>
                <Text style={styles.reviewSubtitle}>Double-check all details before publishing</Text>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Animatable.View animation="fadeInUp" delay={100} style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Product Name</Text>
                            <Text style={styles.reviewValue}>{form.name}</Text>
                        </View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Price</Text>
                            <Text style={styles.reviewValue}>${form.price}</Text>
                        </View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Stock Quantity</Text>
                            <Text style={styles.reviewValue}>{form.stock}</Text>
                        </View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Description</Text>
                            <Text style={styles.reviewValueDescription}>{form.description}</Text>
                        </View>
                    </View>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
                    <Text style={styles.sectionTitle}>Classification</Text>
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Categories</Text>
                            <Text style={styles.reviewValue}>{form.categories.join(', ') || 'None selected'}</Text>
                        </View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Types</Text>
                            <Text style={styles.reviewValue}>{form.types.join(', ') || 'None selected'}</Text>
                        </View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewLabel}>Tags</Text>
                            <Text style={styles.reviewValue}>{form.tags.join(', ') || 'None selected'}</Text>
                        </View>
                    </View>
                </Animatable.View>

                {form.variants.length > 0 && (
                    <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Variants</Text>
                        <View style={styles.reviewCard}>
                            <Text style={styles.variantCount}>{form.variants.length} variant{form.variants.length !== 1 ? 's' : ''} added</Text>
                            {form.variants.map((variant, index) => (
                                <View key={index} style={styles.variantItem}>
                                    <Text style={styles.variantName}>{variant.name}</Text>
                                    <View style={styles.variantDetails}>
                                        <Text style={styles.variantDetail}>Type: {variant.type}</Text>
                                        <Text style={styles.variantDetail}>Price: ${variant.price}</Text>
                                        <Text style={styles.variantDetail}>Stock: {variant.stock}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Animatable.View>
                )}

                {(form.images.length > 0 || form.videos.length > 0) && (
                    <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
                        <Text style={styles.sectionTitle}>Media</Text>
                        <View style={styles.reviewCard}>
                            {form.images.length > 0 && (
                                <View style={styles.mediaSection}>
                                    <Text style={styles.mediaTitle}>Product Images ({form.images.length})</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewMediaContainer}>
                                        {form.images.map((image, index) => (
                                            <View key={index} style={styles.mediaItemContainer}>
                                                <Image
                                                    source={{ uri: image.uri }}
                                                    style={styles.reviewMedia}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                            {form.videos.length > 0 && (
                                <View style={styles.mediaSection}>
                                    <Text style={styles.mediaTitle}>Product Videos</Text>
                                    <Text style={styles.videoCount}>{form.videos.length} video{form.videos.length !== 1 ? 's' : ''} selected</Text>
                                </View>
                            )}
                        </View>
                    </Animatable.View>
                )}
            </ScrollView>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        backgroundColor: '#FF8C42',
        minHeight: '100%',
        paddingVertical: 20,
    },
    headerContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    reviewTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    reviewSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic',
        lineHeight: 20,
    },
    contentContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 12,
        paddingHorizontal: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    reviewCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    reviewItem: {
        marginBottom: 15,
    },
    reviewLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    reviewValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        lineHeight: 22,
    },
    reviewValueDescription: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    variantCount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B35',
        marginBottom: 15,
        textAlign: 'center',
    },
    variantItem: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B35',
    },
    variantName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B35',
        marginBottom: 8,
    },
    variantDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    variantDetail: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    mediaSection: {
        marginBottom: 15,
    },
    mediaTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B35',
        marginBottom: 10,
    },
    reviewMediaContainer: {
        paddingLeft: 5,
    },
    mediaItemContainer: {
        marginRight: 12,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    reviewMedia: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    videoCount: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        fontStyle: 'italic',
    },
});

export default Step5Review;