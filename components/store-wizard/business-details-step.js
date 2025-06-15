import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';

const BusinessDetailsStep = ({ storeDetails, setStoreDetails, errors, setErrors, setShowOpeningTimePicker, setShowClosingTimePicker }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Details</Text>
            <TextInput
                mode="outlined"
                label="TPIN Number"
                value={storeDetails.tpin}
                onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setStoreDetails({ ...storeDetails, tpin: numericText });
                    if (errors.tpin) setErrors({ ...errors, tpin: null });
                }}
                keyboardType="numeric"
                style={styles.input}
                theme={{ colors: { primary: '#FF6B35' } }}
                error={!!errors.tpin}
                placeholder="Numeric only"
            />
            <HelperText type="error" visible={!!errors.tpin}>
                {errors.tpin}
            </HelperText>
            <HelperText type="info" visible={true}>
                Enter your Tax Payer Identification Number
            </HelperText>

            <View style={styles.row}>
                <View style={styles.column}>
                    <TouchableOpacity
                        onPress={() => setShowOpeningTimePicker(true)}
                        style={[
                            styles.timeInput,
                            errors.opening && styles.timeInputError
                        ]}
                    >
                        <Text style={[
                            styles.timeInputText,
                            errors.opening && styles.timeInputTextError
                        ]}>
                            {storeDetails.businessHours.opening || "Opening Time (HH:MM)"}
                        </Text>
                    </TouchableOpacity>
                    {errors.opening && (
                        <HelperText type="error" visible={true}>
                            {errors.opening}
                        </HelperText>
                    )}
                </View>
                <View style={styles.column}>
                    <TouchableOpacity
                        onPress={() => setShowClosingTimePicker(true)}
                        style={[
                            styles.timeInput,
                            errors.closing && styles.timeInputError
                        ]}
                    >
                        <Text style={[
                            styles.timeInputText,
                            errors.closing && styles.timeInputTextError
                        ]}>
                            {storeDetails.businessHours.closing || "Closing Time (HH:MM)"}
                        </Text>
                    </TouchableOpacity>
                    {errors.closing && (
                        <HelperText type="error" visible={true}>
                            {errors.closing}
                        </HelperText>
                    )}
                </View>
            </View>
            <HelperText type="info" visible={true}>
                Set your store's operating hours
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        flex: 1,
        marginRight: 8,
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
    },
    timeInputError: {
        borderColor: '#EF4444',
    },
    timeInputText: {
        fontSize: 16,
        color: '#333',
    },
    timeInputTextError: {
        color: '#EF4444',
    },
});

export default BusinessDetailsStep; 