import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const ProductDetailsModal = ({
    selectedProduct,
    isVisible,
    onClose,
    onSave,
    getStatusColor
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleEditChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleEditing = () => {
        if (!isEditing && selectedProduct) {
            // Initialize edit form with current product data
            setEditForm({
                name: selectedProduct.name || '',
                description: selectedProduct.description || '',
                price: selectedProduct.price?.toString() || '',
                categories: Array.isArray(selectedProduct.categories) ? selectedProduct.categories.join(', ') : '',
                types: Array.isArray(selectedProduct.types) ? selectedProduct.types.join(', ') : '',
                tags: Array.isArray(selectedProduct.tags) ? selectedProduct.tags.join(', ') : ''
            });
        }
        setIsEditing(!isEditing);
    };

    const saveProductChanges = async () => {
        try {
            await onSave(editForm);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditForm({});
    };

    const renderField = (label, value, fieldName, multiline = false) => {
        if (isEditing) {
            return (
                <View style={styles.editFieldContainer}>
                    <Text style={styles.editFieldLabel}>{label}</Text>
                    <TextInput
                        style={[styles.editInput, multiline && styles.editTextArea]}
                        value={editForm[fieldName] || ''}
                        onChangeText={(text) => handleEditChange(fieldName, text)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        placeholderTextColor="#9ca3af"
                        multiline={multiline}
                        numberOfLines={multiline ? 3 : 1}
                    />
                </View>
            );
        }

        return (
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}:</Text>
                <Text style={styles.detailValue}>{value || 'N/A'}</Text>
            </View>
        );
    };

    const renderArrayField = (label, array, fieldName) => {
        if (isEditing) {
            const displayValue = Array.isArray(array) ? array.join(', ') : '';
            return (
                <View style={styles.editFieldContainer}>
                    <Text style={styles.editFieldLabel}>{label}</Text>
                    <TextInput
                        style={styles.editInput}
                        value={editForm[fieldName] || displayValue}
                        onChangeText={(text) => handleEditChange(fieldName, text)}
                        placeholder={`Enter ${label.toLowerCase()} (comma separated)`}
                        placeholderTextColor="#9ca3af"
                    />
                </View>
            );
        }

        const displayValue = Array.isArray(array) && array.length > 0
            ? array.join(', ')
            : 'None';

        return (
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}:</Text>
                <Text style={styles.detailValue}>{displayValue}</Text>
            </View>
        );
    };

    if (!selectedProduct) return null;

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <Animatable.View animation="fadeInUp" style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedProduct.status) }]}>
                                <Text style={styles.statusBadgeText}>{selectedProduct.status}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScrollView}>
                            {/* Basic Information Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Basic Information</Text>
                                {renderField('Product Name', selectedProduct.name, 'name')}
                                {renderField('SKU', selectedProduct.sku, 'sku')}
                                {renderField('Description', selectedProduct.description, 'description', true)}
                                {renderField('Price', `$${selectedProduct.price.toFixed(2)}`, 'price')}
                                {renderField('Stock Quantity', selectedProduct.stock.toString(), 'stock')}
                            </View>

                            {/* Categories & Tags Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Categories & Tags</Text>
                                {renderArrayField('Categories', selectedProduct.categories, 'categories')}
                                {renderArrayField('Types', selectedProduct.types, 'types')}
                                {renderArrayField('Tags', selectedProduct.tags, 'tags')}
                            </View>

                            {/* Variants Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Variants & Stock</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Total Variants:</Text>
                                    <Text style={styles.detailValue}>{selectedProduct.variants.length}</Text>
                                </View>
                                {selectedProduct.variants.length > 0 && (
                                    <View style={styles.variantsContainer}>
                                        {selectedProduct.variants.map((variant, index) => (
                                            <View key={index} style={styles.variantItem}>
                                                <Text style={styles.variantTitle}>{variant.variant?.name || 'Variant'}: {variant.value}</Text>
                                                <Text style={styles.variantStock}>Stock: {variant.stock?.qty_in_store || 0}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* Timestamps Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Timestamps</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Created:</Text>
                                    <Text style={styles.detailValue}>{formatDate(selectedProduct.created_at)}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Last Updated:</Text>
                                    <Text style={styles.detailValue}>{formatDate(selectedProduct.updated_at)}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.modalActions}>
                        {isEditing ? (
                            <View style={styles.editActions}>
                                <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveButton} onPress={saveProductChanges}>
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.viewActions}>
                                <TouchableOpacity style={styles.editToggleButton} onPress={toggleEditing}>
                                    <Ionicons name="create-outline" size={20} color="#3b82f6" />
                                    <Text style={styles.editToggleButtonText}>Edit Product</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </Animatable.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '90%'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    closeButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    modalContent: {
        flex: 1,
    },
    modalScrollView: {
        paddingHorizontal: 16,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingVertical: 4,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: '#6b7280',
        flex: 2,
        textAlign: 'right',
    },
    editFieldContainer: {
        marginBottom: 16,
    },
    editFieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: '#1f2937',
        backgroundColor: '#fff',
    },
    editTextArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    variantsContainer: {
        marginTop: 8,
    },
    variantItem: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    variantTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    variantStock: {
        fontSize: 12,
        color: '#64748b',
    },
    modalActions: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 16,
        marginTop: 16,
    },
    editActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    saveButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    viewActions: {
        width: '100%',
        alignItems: 'center',
    },
    editToggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eff6ff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#3b82f6',
    },
    editToggleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b82f6',
        marginLeft: 8,
    },
});

export default ProductDetailsModal; 