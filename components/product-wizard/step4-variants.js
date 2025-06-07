import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Step4Variants = ({ form, handleVariantRemove, setShowVariantModal }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <View style={styles.variantsSection}>
                <Text style={styles.sectionTitle}>Product Variants</Text>
                <Button
                    mode="contained"
                    onPress={() => setShowVariantModal(true)}
                    style={styles.input}
                    icon="plus"
                >
                    Add Variant
                </Button>
                {form.variants.map((variant, index) => (
                    <View key={index} style={styles.variantItem}>
                        <View style={styles.variantInfo}>
                            <Text style={styles.variantName}>{variant.name}</Text>
                            <Text style={styles.variantDetails}>
                                Type: {variant.type} | Price: ${variant.price} | Stock: {variant.stock}
                            </Text>
                        </View>
                        <IconButton
                            icon="delete"
                            size={24}
                            onPress={() => handleVariantRemove(index)}
                        />
                    </View>
                ))}
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        marginBottom: 20,
    },
    variantsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 10,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    variantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    variantInfo: {
        flex: 1,
    },
    variantName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    variantDetails: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 5,
    },
});

export default Step4Variants; 