import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const BasicInformationStep = ({ storeDetails, setStoreDetails, errors, setErrors, categories, handleCategoryToggle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Basic Information</Text>
            <TextInput
                mode="outlined"
                label="Store Name"
                value={storeDetails.name}
                onChangeText={(text) => {
                    setStoreDetails({ ...storeDetails, name: text });
                    if (errors.name) setErrors({ ...errors, name: null });
                }}
                style={styles.input}
                theme={{ colors: { primary: '#FF6B35' } }}
                error={!!errors.name}
            />
            <HelperText type="error" visible={!!errors.name}>
                {errors.name}
            </HelperText>
            <HelperText type="info" visible={true}>
                Enter a unique name for your store
            </HelperText>

            <Text style={styles.categoryTitle}>Select Categories (up to 4)</Text>
            <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            storeDetails.category.includes(category.id) && styles.categoryButtonSelected,
                        ]}
                        onPress={() => handleCategoryToggle(category)}
                    >
                        <FontAwesome5
                            name={category.icon}
                            size={20}
                            color={storeDetails.category.includes(category.id) ? '#FFFFFF' : '#FF6B35'}
                            style={styles.categoryIcon}
                        />
                        <Text
                            style={[
                                styles.categoryButtonText,
                                storeDetails.category.includes(category.id) && styles.categoryButtonTextSelected,
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {errors.category && (
                <HelperText type="error" visible={true}>
                    {errors.category}
                </HelperText>
            )}

            <TextInput
                mode="outlined"
                label="Store Description"
                value={storeDetails.description}
                onChangeText={(text) => {
                    setStoreDetails({ ...storeDetails, description: text });
                    if (errors.description) setErrors({ ...errors, description: null });
                }}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.descriptionInput]}
                theme={{ colors: { primary: '#FF6B35' } }}
                error={!!errors.description}
            />
            <HelperText type="error" visible={!!errors.description}>
                {errors.description}
            </HelperText>
            <HelperText type="info" visible={true}>
                Describe your store and what makes it unique.
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
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryButton: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryButtonSelected: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    categoryIcon: {
        marginRight: 8,
    },
    categoryButtonText: {
        fontSize: 14,
        color: '#333',
    },
    categoryButtonTextSelected: {
        color: '#FFFFFF',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default BasicInformationStep; 