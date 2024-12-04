import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const StoreCreateScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [storeDetails, setStoreDetails] = useState({
        name: '',
        category: '',
        description: '',
        address: { street: '', city: '', state: '', postalCode: '', country: '' },
        tpin: '',
        email: '',
        phone: '',
        businessHours: { opening: '', closing: '' },
        documents: { legalDoc: null, nrcDoc: null },
        photos: { storefront: null, passport: null, logo: null },
    });

    const TOTAL_STEPS = 5;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('userInfo');
                if (storedUserInfo) {
                    setUserInfo(JSON.parse(storedUserInfo));
                } else {
                    Alert.alert('Error', 'Unable to retrieve user information.');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch user information.');
            }
        };
        fetchUserInfo();
    }, []);

    const pickImage = async (type) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setStoreDetails(prev => ({
                ...prev,
                photos: { ...prev.photos, [type]: result.assets[0].uri },
            }));
        }
    };

    const pickDocument = async (type) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });
            if (result.type === 'success') {
                setStoreDetails(prev => ({
                    ...prev,
                    documents: { ...prev.documents, [type]: result.uri },
                }));
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to pick document');
        }
    };

    const handleNext = async () => {
        if (currentStep === TOTAL_STEPS) {
            try {
                await AsyncStorage.setItem('storeDetails', JSON.stringify(storeDetails));
                Alert.alert('Success', 'Store created successfully!');
                navigation.navigate('MyStore');
            } catch (error) {
                Alert.alert('Error', 'Failed to save store details.');
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <View key={index} style={styles.progressStep}>
                    <View style={[styles.progressDot, { backgroundColor: index < currentStep ? '#8FC826' : '#E5E7EB' }]} />
                    {index < TOTAL_STEPS - 1 && (
                        <View style={[styles.progressLine, { backgroundColor: index < currentStep - 1 ? '#8FC826' : '#E5E7EB' }]} />
                    )}
                </View>
            ))}
        </View>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Basic Information</Text>
                        <TextInput style={styles.input} value={storeDetails.name} onChangeText={(text) => setStoreDetails({ ...storeDetails, name: text })} placeholder="Store Name" />
                        <TextInput style={styles.input} value={storeDetails.category} onChangeText={(text) => setStoreDetails({ ...storeDetails, category: text })} placeholder="Store Category" />
                        <TextInput style={[styles.input, { height: 100 }]} value={storeDetails.description} onChangeText={(text) => setStoreDetails({ ...storeDetails, description: text })} placeholder="Store Description" multiline />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Contact & Location</Text>
                        <TextInput style={styles.input} value={storeDetails.address.street} onChangeText={(text) => setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, street: text } })} placeholder="Street Address" />
                        <View style={styles.row}>
                            <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} value={storeDetails.address.city} onChangeText={(text) => setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, city: text } })} placeholder="City" />
                            <TextInput style={[styles.input, { flex: 1 }]} value={storeDetails.address.postalCode} onChangeText={(text) => setStoreDetails({ ...storeDetails, address: { ...storeDetails.address, postalCode: text } })} placeholder="Postal Code" />
                        </View>
                        <TextInput style={styles.input} value={storeDetails.phone} onChangeText={(text) => setStoreDetails({ ...storeDetails, phone: text })} placeholder="Phone Number" keyboardType="phone-pad" />
                        <TextInput style={styles.input} value={storeDetails.email} onChangeText={(text) => setStoreDetails({ ...storeDetails, email: text })} placeholder="Email Address" keyboardType="email-address" />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Business Details</Text>
                        <TextInput style={styles.input} value={storeDetails.tpin} onChangeText={(text) => setStoreDetails({ ...storeDetails, tpin: text })} placeholder="TPIN Number" />
                        <View style={styles.row}>
                            <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} value={storeDetails.businessHours.opening} onChangeText={(text) => setStoreDetails({ ...storeDetails, businessHours: { ...storeDetails.businessHours, opening: text } })} placeholder="Opening Time" />
                            <TextInput style={[styles.input, { flex: 1 }]} value={storeDetails.businessHours.closing} onChangeText={(text) => setStoreDetails({ ...storeDetails, businessHours: { ...storeDetails.businessHours, closing: text } })} placeholder="Closing Time" />
                        </View>
                    </View>
                );
            case 4:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Documents</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('legalDoc')}>
                            <FontAwesome5 name="file-upload" size={20} color="#8FC826" />
                            <Text style={styles.uploadButtonText}>{storeDetails.documents.legalDoc ? 'Legal Document ✓' : 'Upload Legal Document'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('nrcDoc')}>
                            <FontAwesome5 name="id-card" size={20} color="#8FC826" />
                            <Text style={styles.uploadButtonText}>{storeDetails.documents.nrcDoc ? 'NRC Document ✓' : 'Upload NRC Document'}</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 5:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Photos</Text>
                        <View style={styles.photoGrid}>
                            {[['storefront', 'Store Front'], ['passport', 'Passport Photo'], ['logo', 'Store Logo']].map(([key, label]) => (
                                <TouchableOpacity key={key} style={styles.photoUpload} onPress={() => pickImage(key)}>
                                    {storeDetails.photos[key] ? (
                                        <Image source={{ uri: storeDetails.photos[key] }} style={styles.uploadedImage} />
                                    ) : (
                                        <>
                                            <FontAwesome5 name="image" size={24} color="#8FC826" />
                                            <Text style={styles.photoUploadText}>{label}</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFFFFF', '#D1D5DB']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create Store</Text>
                </View>
                {renderProgressBar()}
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                    {renderStepContent()}
                </ScrollView>
                <View style={[styles.footer]}>
                    {/* Back Button */}
                    {currentStep > 1 && (
                        <TouchableOpacity style={[styles.buttonSecondary]} onPress={() => handleBack()}>
                            <LinearGradient colors={['#D1D5DB', '#8FC826']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} style={[styles.buttonGradient]}>
                                <Text style={[styles.buttonSecondaryText]}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    {/* Next / Submit Button */}
                    <TouchableOpacity style={[styles.button]} onPress={() => handleNext()}>
                        <LinearGradient colors={['#f97316', '#ef4444']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} style={[styles.buttonGradient]}>
                            <Text style={[styles.buttonText]}>{currentStep === TOTAL_STEPS ? 'Create Store' : 'Next'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#8FC826',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    progressStep: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E5E7EB',
    },
    progressLine: {
        width: 30,
        height: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 5,
    },
    stepContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        marginBottom: 15,
    },
    uploadButtonText: {
        fontSize: 16,
        color: '#374151',
        marginLeft: 10,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    photoUpload: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginBottom: 15,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    photoUploadText: {
        marginTop: 5,
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonSecondary: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonGradient: {
        borderRadius: 25,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonSecondaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default StoreCreateScreen;