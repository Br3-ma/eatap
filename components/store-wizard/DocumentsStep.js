import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../screens/stores/store-create.styles';

const DocumentsStep = ({
    storeDetails,
    setStoreDetails,
    errors,
    setErrors,
    handleDocumentUpload
}) => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Documents</Text>

        <View style={styles.row}>
            <TouchableOpacity
                style={styles.photoUpload}
                onPress={() => handleDocumentUpload('businessLicense')}
            >
                {storeDetails.documents.businessLicense ? (
                    <Image
                        source={{ uri: storeDetails.documents.businessLicense }}
                        style={styles.uploadPreview}
                    />
                ) : (
                    <View style={styles.uploadPlaceholder}>
                        <Ionicons name="document-text-outline" size={32} color="#FF6B35" />
                        <Text style={styles.uploadText}>Business License</Text>
                    </View>
                )}
            </TouchableOpacity>
            {errors.businessLicense && (
                <HelperText type="error" visible={true}>
                    {errors.businessLicense}
                </HelperText>
            )}
            <HelperText type="info" visible={true}>
                Upload your business license document
            </HelperText>

            <TouchableOpacity
                style={styles.photoUpload}
                onPress={() => handleDocumentUpload('taxClearance')}
            >
                {storeDetails.documents.taxClearance ? (
                    <Image
                        source={{ uri: storeDetails.documents.taxClearance }}
                        style={styles.uploadPreview}
                    />
                ) : (
                    <View style={styles.uploadPlaceholder}>
                        <Ionicons name="document-text-outline" size={32} color="#FF6B35" />
                        <Text style={styles.uploadText}>Tax Clearance</Text>
                    </View>
                )}
            </TouchableOpacity>
            {errors.taxClearance && (
                <HelperText type="error" visible={true}>
                    {errors.taxClearance}
                </HelperText>
            )}
            <HelperText type="info" visible={true}>
                Upload your tax clearance certificate
            </HelperText>
        </View>
    </View>
);

export default DocumentsStep; 