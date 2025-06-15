import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../../screens/stores/store-create.styles';

const BasicInformationStep = ({ storeDetails, setStoreDetails, errors, setErrors, categories, handleCategoryToggle }) => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Basic Information</Text>
        <TextInput
            mode="outlined"
            label="Store Name"
            value={storeDetails.name}
            onChangeText={(text) => {
                setStoreDetails({ ...storeDetails, name: text });
                if (errors.name) setErrors({ ...errors, name: null });
            }}
            style={styles.paperInput}
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
            style={[styles.paperInput, { height: 100 }]}
            theme={{ colors: { primary: '#FF6B35' } }}
            error={!!errors.description}
        />
        <HelperText type="error" visible={!!errors.description}>
            {errors.description}
        </HelperText>
        <HelperText type="info" visible={true}>
            Describe your store and what makes it unique
        </HelperText>
    </View>
);

export default BasicInformationStep; 