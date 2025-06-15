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
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add Product Variant</Text>
                    <Text style={styles.modalSubtitle}>Create a new variation of your product</Text>
                </View>

                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.variantTypeContainer}>
                        <Text style={styles.variantTypeLabel}>Select Variant Type</Text>
                        <Text style={styles.variantTypeHint}>Choose what makes this variant different</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantTypeChips}>
                            {MOCK_VARIANT_TYPES.map((type, i) => (
                                <Chip
                                    key={i}
                                    style={[styles.chip, currentVariant.type === type && styles.selectedChip]}
                                    textStyle={[styles.chipText, currentVariant.type === type && styles.selectedChipText]}
                                    onPress={() => setCurrentVariant(prev => ({ ...prev, type }))}
                                >
                                    {type}
                                </Chip>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.inputSection}>
                        <Text style={styles.sectionTitle}>Variant Details</Text>
                        <TextInput
                            label="Variant Name"
                            placeholder="e.g., Red, Large, Cotton blend"
                            value={currentVariant.name}
                            onChangeText={(text) => setCurrentVariant(prev => ({ ...prev, name: text }))}
                            mode="outlined"
                            style={styles.input}
                            outlineColor="rgba(255, 107, 53, 0.3)"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                }
                            }}
                        />
                        <TextInput
                            label="Price"
                            placeholder="0.00"
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
                            outlineColor="rgba(255, 107, 53, 0.3)"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                }
                            }}
                        />
                        <TextInput
                            label="Stock Quantity"
                            placeholder="0"
                            value={currentVariant.stock}
                            onChangeText={(text) => {
                                const numericValue = text.replace(/[^0-9]/g, '');
                                setCurrentVariant(prev => ({ ...prev, stock: numericValue }));
                            }}
                            keyboardType="number-pad"
                            mode="outlined"
                            style={styles.input}
                            outlineColor="rgba(255, 107, 53, 0.3)"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                }
                            }}
                        />
                    </View>
                </ScrollView>

                <View style={styles.modalButtons}>
                    <Button
                        mode="outlined"
                        onPress={onDismiss}
                        style={styles.cancelButton}
                        labelStyle={styles.cancelButtonLabel}
                        buttonColor="transparent"
                        textColor="#FF6B35"
                    >
                        Cancel
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleVariantAdd}
                        style={styles.addButton}
                        labelStyle={styles.addButtonLabel}
                        buttonColor="#FF6B35"
                        textColor="#FFFFFF"
                    >
                        Add Variant
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FF8C42',
        margin: 15,
        borderRadius: 16,
        maxHeight: '90%',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    modalHeader: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    modalSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic',
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    variantTypeContainer: {
        marginBottom: 25,
    },
    variantTypeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    variantTypeHint: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    variantTypeChips: {
        paddingVertical: 5,
    },
    chip: {
        marginRight: 10,
        marginBottom: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    chipText: {
        color: '#666',
        fontWeight: '500',
    },
    selectedChip: {
        backgroundColor: '#FF6B35',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    selectedChipText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    inputSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 2,
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 5,
    },
    cancelButtonLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    addButton: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 5,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButtonLabel: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default VariantModal;