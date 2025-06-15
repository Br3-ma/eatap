import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const PhotosStep = ({ storeDetails, pickImage, errors }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Photos</Text>
            <View style={styles.photoGrid}>
                {[['storefront', 'Store Front'], ['passport', 'Passport Photo'], ['logo', 'Store Logo']].map(([key, label]) => (
                    <TouchableOpacity key={key} style={styles.photoUpload} onPress={() => pickImage(key)}>
                        {storeDetails.photos[key] ? (
                            <Image source={{ uri: storeDetails.photos[key] }} style={styles.uploadedImage} />
                        ) : (
                            <>
                                <FontAwesome5 name="image" size={24} color="#FF6B35" />
                                <Text style={styles.photoUploadText}>{label}</Text>
                            </>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {Object.keys(errors).map(key => {
                if (['storefront', 'passport', 'logo'].includes(key)) {
                    return (
                        <HelperText key={key} type="error" visible={true}>
                            {errors[key]}
                        </HelperText>
                    );
                }
                return null;
            })}
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
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    photoUpload: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    photoUploadText: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});

export default PhotosStep; 