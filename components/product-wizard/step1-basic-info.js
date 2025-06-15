import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Tooltip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Step1BasicInfo = ({ form, handleInputChange }) => {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" duration={600} style={styles.headerSection}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="package-variant" size={28} color="#FF6B35" />
                </View>
                <Text style={styles.stepTitle}>Basic Information</Text>
                <Text style={styles.stepSubtitle}>
                    Tell us about your product - the essentials that customers need to know
                </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInRight" delay={200} style={styles.formSection}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Product Name *</Text>
                    <Text style={styles.inputHint}>Choose a clear, descriptive name for your product</Text>
                    <Tooltip title="Enter your product name">
                        <TextInput
                            value={form.name}
                            onChangeText={v => handleInputChange('name', v)}
                            mode="outlined"
                            style={styles.input}
                            placeholder="e.g., Wireless Bluetooth Headphones"
                            placeholderTextColor="#9CA3AF"
                            outlineColor="#E5E7EB"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                    onSurfaceVariant: '#6B7280',
                                }
                            }}
                            right={<TextInput.Icon icon="information" iconColor="#FF6B35" />}
                        />
                    </Tooltip>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <Text style={styles.inputHint}>Describe your product's features, benefits, and specifications</Text>
                    <TextInput
                        value={form.description}
                        onChangeText={v => handleInputChange('description', v)}
                        multiline
                        mode="outlined"
                        style={[styles.input, styles.descriptionInput]}
                        numberOfLines={4}
                        placeholder="Detailed description of your product..."
                        placeholderTextColor="#9CA3AF"
                        outlineColor="#E5E7EB"
                        activeOutlineColor="#FF6B35"
                        theme={{
                            colors: {
                                primary: '#FF6B35',
                                onSurfaceVariant: '#6B7280',
                            }
                        }}
                    />
                </View>

                <View style={styles.priceStockContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Price *</Text>
                        <Text style={styles.inputHint}>Set your product price</Text>
                        <TextInput
                            value={form.price}
                            onChangeText={v => {
                                const numericValue = v.replace(/[^0-9.]/g, '');
                                const parts = numericValue.split('.');
                                if (parts.length > 2) return;
                                if (parts[1] && parts[1].length > 2) return;
                                handleInputChange('price', numericValue);
                            }}
                            keyboardType="decimal-pad"
                            mode="outlined"
                            style={[styles.input, styles.priceInput]}
                            placeholder="0.00"
                            placeholderTextColor="#9CA3AF"
                            outlineColor="#E5E7EB"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                    onSurfaceVariant: '#6B7280',
                                }
                            }}
                            left={<TextInput.Affix text="$" textStyle={styles.affixText} />}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Stock *</Text>
                        <Text style={styles.inputHint}>Available quantity</Text>
                        <TextInput
                            value={form.stock}
                            onChangeText={v => {
                                const numericValue = v.replace(/[^0-9]/g, '');
                                handleInputChange('stock', numericValue);
                            }}
                            keyboardType="number-pad"
                            mode="outlined"
                            style={[styles.input, styles.stockInput]}
                            placeholder="0"
                            placeholderTextColor="#9CA3AF"
                            outlineColor="#E5E7EB"
                            activeOutlineColor="#FF6B35"
                            theme={{
                                colors: {
                                    primary: '#FF6B35',
                                    onSurfaceVariant: '#6B7280',
                                }
                            }}
                        />
                    </View>
                </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={400} style={styles.tipContainer}>
                <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#F59E0B" />
                <Text style={styles.tipText}>
                    <Text style={styles.tipBold}>Pro Tip:</Text> Use keywords in your product name to help customers find it easily
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
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    inputHint: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
        lineHeight: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    descriptionInput: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    priceStockContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    priceInput: {
        flex: 2,
    },
    stockInput: {
        flex: 1,
    },
    affixText: {
        color: '#FF6B35',
        fontWeight: '600',
        fontSize: 16,
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FEF3C7',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
        marginTop: 8,
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

export default Step1BasicInfo;