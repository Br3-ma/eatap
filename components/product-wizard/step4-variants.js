import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Step4Variants = ({ form, handleVariantRemove, setShowVariantModal }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <View style={styles.variantsSection}>
                <Text style={styles.sectionTitle}>Product Variants</Text>
                <Text style={styles.sectionHint}>Create different variations of your product (sizes, colors, etc.)</Text>
                <Button
                    mode="contained"
                    onPress={() => setShowVariantModal(true)}
                    style={styles.addButton}
                    labelStyle={styles.buttonLabel}
                    icon="plus"
                    buttonColor="#FF6B35"
                    textColor="#FFFFFF"
                >
                    Add Variant
                </Button>
                
                {form.variants.length > 0 && (
                    <View style={styles.variantsContainer}>
                        <Text style={styles.variantsCountText}>
                            {form.variants.length} variant{form.variants.length !== 1 ? 's' : ''} added
                        </Text>
                        {form.variants.map((variant, index) => (
                            <Animatable.View 
                                key={index} 
                                animation="fadeInUp"
                                delay={index * 100}
                                style={styles.variantItem}
                            >
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantName}>{variant.name}</Text>
                                    <View style={styles.variantDetailsContainer}>
                                        <View style={styles.variantDetailItem}>
                                            <Text style={styles.variantDetailLabel}>Type:</Text>
                                            <Text style={styles.variantDetailValue}>{variant.type}</Text>
                                        </View>
                                        <View style={styles.variantDetailItem}>
                                            <Text style={styles.variantDetailLabel}>Price:</Text>
                                            <Text style={styles.variantDetailValue}>${variant.price}</Text>
                                        </View>
                                        <View style={styles.variantDetailItem}>
                                            <Text style={styles.variantDetailLabel}>Stock:</Text>
                                            <Text style={styles.variantDetailValue}>{variant.stock}</Text>
                                        </View>
                                    </View>
                                </View>
                                <IconButton
                                    icon="delete"
                                    size={24}
                                    iconColor="#FF6B35"
                                    style={styles.deleteButton}
                                    onPress={() => handleVariantRemove(index)}
                                />
                            </Animatable.View>
                        ))}
                    </View>
                )}
                
                {form.variants.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No variants added yet</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Add variants to offer different options like sizes, colors, or styles
                        </Text>
                    </View>
                )}
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        backgroundColor: '#FF8C42',
        minHeight: '100%',
        paddingVertical: 20,
    },
    variantsSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    sectionHint: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 20,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    addButton: {
        marginBottom: 25,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    variantsContainer: {
        marginTop: 10,
    },
    variantsCountText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
        opacity: 0.9,
    },
    variantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
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
    variantInfo: {
        flex: 1,
    },
    variantName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF6B35',
        marginBottom: 10,
    },
    variantDetailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    variantDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '30%',
    },
    variantDetailLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginRight: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    variantDetailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 12,
        elevation: 2,
    },
    emptyState: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 25,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderStyle: 'dashed',
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: 20,
        fontStyle: 'italic',
    },
});

export default Step4Variants;