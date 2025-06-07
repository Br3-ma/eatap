import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Step5Review = ({ form }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <Text style={styles.reviewTitle}>Review Your Product</Text>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Name:</Text>
                <Text style={styles.reviewValue}>{form.name}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Price:</Text>
                <Text style={styles.reviewValue}>${form.price}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Stock:</Text>
                <Text style={styles.reviewValue}>{form.stock}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Description:</Text>
                <Text style={styles.reviewValue}>{form.description}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Categories:</Text>
                <Text style={styles.reviewValue}>{form.categories.join(', ') || 'None'}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Types:</Text>
                <Text style={styles.reviewValue}>{form.types.join(', ') || 'None'}</Text>
            </View>
            <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Tags:</Text>
                <Text style={styles.reviewValue}>{form.tags.join(', ') || 'None'}</Text>
            </View>
            {form.variants.length > 0 && (
                <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Variants:</Text>
                    {form.variants.map((variant, index) => (
                        <Text key={index} style={styles.variantReview}>
                            {variant.name} - ${variant.price} (Stock: {variant.stock})
                        </Text>
                    ))}
                </View>
            )}
            {form.images.length > 0 && (
                <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Images:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewMediaContainer}>
                        {form.images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image.uri }}
                                style={styles.reviewMedia}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
            {form.videos.length > 0 && (
                <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Videos:</Text>
                    <Text style={styles.reviewValue}>{form.videos.length} video(s) selected</Text>
                </View>
            )}
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        marginBottom: 20,
    },
    reviewTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    reviewItem: {
        marginBottom: 15,
    },
    reviewLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 5,
    },
    reviewValue: {
        fontSize: 16,
        color: '#6B7280',
    },
    variantReview: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 5,
    },
    reviewMediaContainer: {
        marginTop: 10,
    },
    reviewMedia: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
});

export default Step5Review; 