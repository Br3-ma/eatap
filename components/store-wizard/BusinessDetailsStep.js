import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../screens/stores/store-create.styles';

const BusinessDetailsStep = ({
    storeDetails,
    setStoreDetails,
    errors,
    setErrors,
    showOpeningTimePicker,
    setShowOpeningTimePicker,
    showClosingTimePicker,
    setShowClosingTimePicker,
    handleTimeChange
}) => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Business Details</Text>
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
            style={styles.paperInput}
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
            <View style={{ flex: 1, marginRight: 8 }}>
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
                {showOpeningTimePicker && (
                    <DateTimePicker
                        value={storeDetails.businessHours.opening ? new Date(`2000-01-01T${storeDetails.businessHours.opening}:00`) : new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'opening')}
                    />
                )}
            </View>
            <View style={{ flex: 1 }}>
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
                {showClosingTimePicker && (
                    <DateTimePicker
                        value={storeDetails.businessHours.closing ? new Date(`2000-01-01T${storeDetails.businessHours.closing}:00`) : new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'closing')}
                    />
                )}
            </View>
        </View>
        <HelperText type="info" visible={true}>
            Set your store's operating hours
        </HelperText>
    </View>
);

export default BusinessDetailsStep; 