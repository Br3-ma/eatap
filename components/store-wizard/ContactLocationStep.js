import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import styles from '../../screens/stores/store-create.styles';

const ContactLocationStep = ({ storeDetails, setStoreDetails, errors, setErrors }) => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Contact & Location</Text>
        <TextInput
            mode="outlined"
            label="Street Address"
            value={storeDetails.address.street}
            onChangeText={(text) => {
                setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, street: text } });
                if (errors.street) setErrors({ ...errors, street: null });
            }}
            style={styles.paperInput}
            theme={{ colors: { primary: '#FF6B35' } }}
            error={!!errors.street}
        />
        <HelperText type="error" visible={!!errors.street}>
            {errors.street}
        </HelperText>

        <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
                <TextInput
                    mode="outlined"
                    label="City"
                    value={storeDetails.address.city}
                    onChangeText={(text) => {
                        setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, city: text } });
                        if (errors.city) setErrors({ ...errors, city: null });
                    }}
                    style={styles.paperInput}
                    theme={{ colors: { primary: '#FF6B35' } }}
                    error={!!errors.city}
                />
                <HelperText type="error" visible={!!errors.city}>
                    {errors.city}
                </HelperText>
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    mode="outlined"
                    label="Postal Code"
                    value={storeDetails.address.postalCode}
                    onChangeText={(text) => {
                        setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, postalCode: text } });
                        if (errors.postalCode) setErrors({ ...errors, postalCode: null });
                    }}
                    style={styles.paperInput}
                    theme={{ colors: { primary: '#FF6B35' } }}
                    error={!!errors.postalCode}
                />
                <HelperText type="error" visible={!!errors.postalCode}>
                    {errors.postalCode}
                </HelperText>
            </View>
        </View>

        <TextInput
            mode="outlined"
            label="Phone Number"
            value={storeDetails.phone}
            onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '');
                setStoreDetails({ ...storeDetails, phone: numericText });
                if (errors.phone) setErrors({ ...errors, phone: null });
            }}
            keyboardType="numeric"
            style={styles.paperInput}
            theme={{ colors: { primary: '#FF6B35' } }}
            error={!!errors.phone}
            placeholder="e.g., +1234567890"
        />
        <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
        </HelperText>
        <HelperText type="info" visible={true}>
            Enter a valid phone number with country code
        </HelperText>

        <TextInput
            mode="outlined"
            label="Email Address"
            value={storeDetails.email}
            onChangeText={(text) => {
                setStoreDetails({ ...storeDetails, email: text });
                if (errors.email) setErrors({ ...errors, email: null });
            }}
            keyboardType="email-address"
            style={styles.paperInput}
            theme={{ colors: { primary: '#FF6B35' } }}
            error={!!errors.email}
        />
        <HelperText type="error" visible={!!errors.email}>
            {errors.email}
        </HelperText>
        <HelperText type="info" visible={true}>
            This will be used for store notifications
        </HelperText>
    </View>
);

export default ContactLocationStep; 