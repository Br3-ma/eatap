import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Tooltip } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Step1BasicInfo = ({ form, handleInputChange }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <Tooltip title="Enter your product name">
                <TextInput
                    label="Product Name"
                    value={form.name}
                    onChangeText={v => handleInputChange('name', v)}
                    mode="outlined"
                    style={styles.input}
                    right={<TextInput.Icon icon="information" />}
                />
            </Tooltip>
            <TextInput
                label="Description"
                value={form.description}
                onChangeText={v => handleInputChange('description', v)}
                multiline
                mode="outlined"
                style={styles.input}
                numberOfLines={4}
            />
            <View style={styles.priceContainer}>
                <TextInput
                    label="Price"
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
                    left={<TextInput.Affix text="$" />}
                />
                <TextInput
                    label="Stock"
                    value={form.stock}
                    onChangeText={v => {
                        const numericValue = v.replace(/[^0-9]/g, '');
                        handleInputChange('stock', numericValue);
                    }}
                    keyboardType="number-pad"
                    mode="outlined"
                    style={[styles.input, styles.stockInput]}
                />
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    priceContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    priceInput: {
        flex: 2,
    },
    stockInput: {
        flex: 1,
    },
});

export default Step1BasicInfo; 