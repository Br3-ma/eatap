import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { API_BASE_URL } from '../../confg/conf';
import { getUserInfo } from '../../utils/userInfo';
import { useIsFocused } from '@react-navigation/native';

// Import step components
import BasicInformationStep from '../../components/store-wizard/basic-information-step';
import ContactLocationStep from '../../components/store-wizard/contact-location-step';
import BusinessDetailsStep from '../../components/store-wizard/business-details-step';
import DocumentsStep from '../../components/store-wizard/documents-step';
import PhotosStep from '../../components/store-wizard/photos-step';


const StoreCreateScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [storeDetails, setStoreDetails] = useState({
        name: '',
        category: [],
        description: '',
        address: { street: '', city: '', state: '', postalCode: '', country: '' },
        tpin: '',
        email: '',
        phone: '',
        businessHours: { opening: '', closing: '' },
        documents: { legalDoc: null, nrcDoc: null },
        photos: { storefront: null, passport: null, logo: null },
        userId: null,
    });

    const [showOpeningTimePicker, setShowOpeningTimePicker] = useState(false);
    const [showClosingTimePicker, setShowClosingTimePicker] = useState(false);

    const TOTAL_STEPS = 5;
    const categories = [
        { id: 'groceries', name: 'Groceries', icon: 'shopping-basket' },
        { id: 'electronics', name: 'Electronics', icon: 'laptop' },
        { id: 'fashion', name: 'Fashion', icon: 'tshirt' },
        { id: 'home', name: 'Home & Kitchen', icon: 'home' },
        { id: 'beauty', name: 'Health & Beauty', icon: 'spa' },
        { id: 'sports', name: 'Sports & Outdoors', icon: 'running' },
        { id: 'books', name: 'Books', icon: 'book' },
        { id: 'toys', name: 'Toys & Games', icon: 'gamepad' },
        { id: 'auto', name: 'Automotive', icon: 'car' },
        { id: 'pets', name: 'Pet Supplies', icon: 'paw' },
        { id: 'jewelry', name: 'Jewelry', icon: 'gem' },
        { id: 'crafts', name: 'Art & Crafts', icon: 'paint-brush' },
        { id: 'music', name: 'Music', icon: 'music' },
        { id: 'movies', name: 'Movies', icon: 'film' },
        { id: 'software', name: 'Software', icon: 'code' },
        { id: 'other', name: 'Other', icon: 'ellipsis-h' }
    ];
    const MAX_CATEGORIES_SELECTED = 4;

    // Animation refs
    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const isFocused = useIsFocused();

    // Always mount userInfo in real time from storage
    useEffect(() => {
        const fetchUser = async () => {
            const info = await getUserInfo();
            setUserInfo(info);
            if (info && info.user) {
                setStoreDetails(prev => ({
                    ...prev,
                    userId: info.user.id || info.user._id,
                    email: info.user.email || prev.email,
                    phone: info.user.phone || prev.phone,
                }));
            }
        };
        fetchUser();
    }, [isFocused]);

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

    const handleCategoryToggle = (category) => {
        setStoreDetails(prevDetails => {
            const currentCategories = prevDetails.category;
            if (currentCategories.includes(category.id)) {
                return {
                    ...prevDetails,
                    category: currentCategories.filter(cat => cat !== category.id),
                };
            } else {
                if (currentCategories.length < MAX_CATEGORIES_SELECTED) {
                    return {
                        ...prevDetails,
                        category: [...currentCategories, category.id],
                    };
                } else {
                    Alert.alert('Limit Reached', `You can select up to ${MAX_CATEGORIES_SELECTED} categories.`);
                    return prevDetails;
                }
            }
        });
    };

    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 1:
                if (!storeDetails.name.trim()) {
                    newErrors.name = 'Store name is required';
                }
                if (storeDetails.category.length === 0) {
                    newErrors.category = 'Please select at least one category';
                }
                if (!storeDetails.description.trim()) {
                    newErrors.description = 'Store description is required';
                }
                break;
            case 2:
                if (!storeDetails.address.street.trim()) {
                    newErrors.street = 'Street address is required';
                }
                if (!storeDetails.address.city.trim()) {
                    newErrors.city = 'City is required';
                }
                if (!storeDetails.address.postalCode.trim()) {
                    newErrors.postalCode = 'Postal code is required';
                }
                if (!storeDetails.phone.trim()) {
                    newErrors.phone = 'Phone number is required';
                } else if (!/^\+?[0-9]{10,15}$/.test(storeDetails.phone)) {
                    newErrors.phone = 'Please enter a valid phone number';
                }
                if (!storeDetails.email.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(storeDetails.email)) {
                    newErrors.email = 'Please enter a valid email address';
                }
                break;
            case 3:
                if (!storeDetails.tpin.trim()) {
                    newErrors.tpin = 'TPIN number is required';
                } else if (!/^[0-9]{8,12}$/.test(storeDetails.tpin)) {
                    newErrors.tpin = 'TPIN must be 8-12 digits';
                }
                break;
            case 4:
                break;
            case 5:
                if (!storeDetails.photos.storefront) {
                    newErrors.storefront = 'Store front photo is required';
                }
                if (!storeDetails.photos.passport) {
                    newErrors.passport = 'Passport photo is required';
                }
                if (!storeDetails.photos.logo) {
                    newErrors.logo = 'Store logo is required';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const animateStepTransition = (direction) => {
        fadeAnim.setValue(0);
        slideAnim.setValue(direction === 'next' ? 50 : -50);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleNext = async () => {
        // Always fetch latest user info before proceeding
        const latestUserInfo = await getUserInfo();
        setUserInfo(latestUserInfo);
        console.log('User ID creating store is:', latestUserInfo);
        if (!validateStep(currentStep)) {
            Alert.alert('Validation Error', 'Please fill in all required fields correctly');
            return;
        }

        if (currentStep === TOTAL_STEPS) {
            try {
                if (!latestUserInfo) {
                    Alert.alert('Error', 'User information is missing. Please try again.');
                    return;
                }
                const userId = latestUserInfo.id;
                if (!userId) {
                    Alert.alert('Error', 'User ID is missing. Please try again.');
                    return;
                }
                // Create payload with user_id
                const payload = {
                    ...storeDetails,
                    userId: userId
                };
                const response = await fetch(`${API_BASE_URL}/stores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                if (response.ok) {
                    await AsyncStorage.setItem('storeDetails', JSON.stringify(data));
                    Alert.alert('Success', 'Store created successfully!');
                    // Pass storeId and storeDetails to MyStore
                    const storeData = data.data || data;
                    navigation.navigate('MyStore', {
                        storeId: storeData.id,
                        storeDetails: storeData
                    });
                } else {
                    Alert.alert('Error', data.message || 'Failed to create store.');
                }
            } catch (error) {
                console.error('Error creating store:', error);
                Alert.alert('Error', 'Failed to save store details.');
            }
        } else {
            animateStepTransition('next');
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            animateStepTransition('prev');
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <View key={index} style={styles.progressStep}>
                    <View style={[styles.progressDot, { backgroundColor: index < currentStep ? '#FF6B35' : '#E5E7EB' }]} />
                    {index < TOTAL_STEPS - 1 && (
                        <View style={[styles.progressLine, { backgroundColor: index < currentStep - 1 ? '#FF6B35' : '#E5E7EB' }]} />
                    )}
                </View>
            ))}
        </View>
    );

    const handleTimeChange = (event, selectedTime, type) => {
        if (type === 'opening') {
            setShowOpeningTimePicker(false);
            if (selectedTime) {
                const hours = selectedTime.getHours().toString().padStart(2, '0');
                const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                setStoreDetails(prev => ({
                    ...prev,
                    businessHours: { ...prev.businessHours, opening: `${hours}:${minutes}` }
                }));
            }
        } else if (type === 'closing') {
            setShowClosingTimePicker(false);
            if (selectedTime) {
                const hours = selectedTime.getHours().toString().padStart(2, '0');
                const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                setStoreDetails(prev => ({
                    ...prev,
                    businessHours: { ...prev.businessHours, closing: `${hours}:${minutes}` }
                }));
            }
        }
    };

    const renderStepContent = () => {
        const content = (() => {
            switch (currentStep) {
                case 1:
                    return (
                        <BasicInformationStep
                            storeDetails={storeDetails}
                            setStoreDetails={setStoreDetails}
                            errors={errors}
                            setErrors={setErrors}
                            categories={categories}
                            handleCategoryToggle={handleCategoryToggle}
                        />
                    );
                case 2:
                    return (
                        <ContactLocationStep
                            storeDetails={storeDetails}
                            setStoreDetails={setStoreDetails}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    );
                case 3:
                    return (
                        <BusinessDetailsStep
                            storeDetails={storeDetails}
                            setStoreDetails={setStoreDetails}
                            errors={errors}
                            setErrors={setErrors}
                            showOpeningTimePicker={showOpeningTimePicker}
                            setShowOpeningTimePicker={setShowOpeningTimePicker}
                            showClosingTimePicker={showClosingTimePicker}
                            setShowClosingTimePicker={setShowClosingTimePicker}
                            handleTimeChange={handleTimeChange}
                        />
                    );
                case 4:
                    return (
                        <DocumentsStep
                            storeDetails={storeDetails}
                            pickDocument={pickDocument}
                            errors={errors}
                        />
                    );
                case 5:
                    return (
                        <PhotosStep
                            storeDetails={storeDetails}
                            pickImage={pickImage}
                            errors={errors}
                        />
                    );
                default:
                    return null;
            }
        })();

        return (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateX: slideAnim }],
                }}
            >
                <Animated.ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    {content}
                </Animated.ScrollView>
            </Animated.View>
        );
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
                {renderStepContent()}
                <View style={[styles.footer]}>
                    {currentStep > 1 && (
                        <TouchableOpacity style={[styles.buttonSecondary]} onPress={handleBack}>
                            <LinearGradient colors={['#D1D5DB', '#FF6B35']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} style={[styles.buttonGradient]}>
                                <Text style={[styles.buttonSecondaryText]}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={[styles.button]} onPress={handleNext}>
                        <LinearGradient colors={['#FF6B35', '#FF8C00']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} style={[styles.buttonGradient]}>
                            <Text style={[styles.buttonText]}>{currentStep === TOTAL_STEPS ? 'Create Store' : 'Next'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 15,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    progressStep: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 4,
    },
    progressLine: {
        width: 40,
        height: 2,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 40,
        backgroundColor: 'transparent',
        minHeight: 90,
        zIndex: 10,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginLeft: 10,
    },
    buttonSecondary: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
    },
    buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSecondaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
export default StoreCreateScreen;