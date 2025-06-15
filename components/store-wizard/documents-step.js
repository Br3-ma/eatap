import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const DocumentsStep = ({ storeDetails, pickDocument, errors }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Documents</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('legalDoc')}>
                <FontAwesome5 name="file-upload" size={20} color="#FF6B35" />
                <Text style={styles.uploadButtonText}>
                    {storeDetails.documents.legalDoc ? 'Legal Document ✓' : 'Upload Legal Document'}
                </Text>
            </TouchableOpacity>
            {errors.legalDoc && (
                <HelperText type="error" visible={true}>
                    {errors.legalDoc}
                </HelperText>
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('nrcDoc')}>
                <FontAwesome5 name="id-card" size={20} color="#FF6B35" />
                <Text style={styles.uploadButtonText}>
                    {storeDetails.documents.nrcDoc ? 'NRC Document ✓' : 'Upload NRC Document'}
                </Text>
            </TouchableOpacity>
            {errors.nrcDoc && (
                <HelperText type="error" visible={true}>
                    {errors.nrcDoc}
                </HelperText>
            )}
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginBottom: 15,
    },
    uploadButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default DocumentsStep; 