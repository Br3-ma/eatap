import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip, Portal, Modal } from 'react-native-paper';

const MOCK_VARIANT_TYPES = ['Color', 'Size', 'Brand', 'Material', 'Style', 'Pattern', 'Weight', 'Length', 'Width', 'Height'];

const VariantModal = ({ visible, onDismiss, currentVariant, setCurrentVariant, handleVariantAdd }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
            >
                <Text style={styles.modalTitle}>Add Variant</Text>
                <View style={styles.variantTypeContainer}>
                    <Text style={styles.variantTypeLabel}>Variant Type</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantTypeChips}>
                        {MOCK_VARIANT_TYPES.map((type, i) => (
                            <Chip
                                key={i}
                                style={[styles.chip, currentVariant.type === type && styles.selectedChip]}
                                onPress={() => setCurrentVariant(prev => ({ ...prev, type }))}
                            >
                                {type}
                            </Chip>
                        ))}
                    </ScrollView>
                </View>
                <TextInput
                    label="Variant Name"
                    value={currentVariant.name}
                    onChangeText={(text) => setCurrentVariant(prev => ({ ...prev, name: text }))}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Price"
                    value={currentVariant.price}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9.]/g, '');
                        const parts = numericValue.split('.');
                        if (parts.length > 2) return;
                        if (parts[1] && parts[1].length > 2) return;
                        setCurrentVariant(prev => ({ ...prev, price: numericValue }));
                    }}
                    keyboardType="decimal-pad"
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Affix text="$" />}
                />
                <TextInput
                    label="Stock"
                    value={currentVariant.stock}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        setCurrentVariant(prev => ({ ...prev, stock: numericValue }));
                    }}
                    keyboardType="number-pad"
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.modalButtons}>
                    <Button
                        mode="outlined"
                        onPress={onDismiss}
                        style={styles.modalButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleVariantAdd}
                        style={styles.modalButton}
                    >
                        Add
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    variantTypeContainer: {
        marginBottom: 15,
    },
    variantTypeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 10,
    },
    variantTypeChips: {
        marginBottom: 10,
    },
    chip: {
        marginRight: 10,
        backgroundColor: '#e0f2fe',
    },
    selectedChip: {
        backgroundColor: '#059669',
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    modalButton: {
        minWidth: 100,
    },
});

export default VariantModal; 