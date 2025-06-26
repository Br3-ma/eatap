import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    Animated,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../confg/conf';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getUserInfo } from '../../utils/userInfo';

const { width, height } = Dimensions.get('window');

const OTPInput = ({ value, onChangeText, length = 6, autoFocus = false }) => {
    const inputRefs = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const handleChangeText = (text, index) => {
        const newValue = value.split('');
        newValue[index] = text;
        const finalValue = newValue.join('');
        onChangeText(finalValue);

        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setFocusedIndex(index + 1);
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
        }
    };

    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    return (
        <View style={styles.otpContainer}>
            {Array.from({ length }).map((_, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                        styles.otpInput,
                        focusedIndex === index && styles.otpInputFocused,
                        value[index] && styles.otpInputFilled
                    ]}
                    value={value[index] || ''}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => handleFocus(index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                />
            ))}
        </View>
    );
};

const OTPSigninScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [userData, setUserData] = useState(null);
    const [resendTimer, setResendTimer] = useState(0);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    // Resend timer effect
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Animate content on step change
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, [step]);

    useEffect(() => {
        const fetchUser = async () => {
            const info = await getUserInfo();
            setUserInfo(info);
        };
        fetchUser();
    }, []);

    const resetAnimation = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(30);
        scaleAnim.setValue(0.9);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const validateOTP = (otp) => {
        return otp.length === 6;
    };

    const formatPhoneNumber = (text) => {
        const cleaned = text.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]} ${match[2]} ${match[3]}`;
        }
        return cleaned;
    };

    const saveUserToStorage = async (userInfo) => {
        try {
            // Ensure we have a consistent user data structure
            const userDataWithTimestamp = {
                ...userInfo,
                phone: userInfo.phone || userInfo.phoneNumber,
                phoneNumber: userInfo.phone || userInfo.phoneNumber,
                fullname: userInfo.fullname || userInfo.name,
                lastLogin: new Date().toISOString(),
                isAuthenticated: true,
                token: userInfo.token || 'temp_token'
            };

            await AsyncStorage.setItem('userInfo', JSON.stringify(userDataWithTimestamp));
            await AsyncStorage.setItem('authToken', userDataWithTimestamp.token);
            await AsyncStorage.setItem('isLoggedIn', 'true');

            console.log('User data saved successfully:', userDataWithTimestamp);
        } catch (error) {
            console.error('Error saving user data:', error);
            throw new Error('Failed to save user data');
        }
    };

    const handleRequestOTP = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const cleanPhone = phoneNumber.replace(/\s/g, '');
            const response = await axios.post(`${API_BASE_URL}/signup/request-otp`, {
                phoneNumber: cleanPhone
            });
            console.log('OTP Request Response:', JSON.stringify(response, null, 2));

            if (response.data.userExists) {
                setIsExistingUser(true);
                setUserData(response.data.user || { phone: cleanPhone });
                Alert.alert(
                    'Welcome Back!',
                    'This phone number is already registered. Please enter the verification code to sign in.',
                    [{ text: 'OK' }]
                );
            } else {
                setIsExistingUser(false);
                Alert.alert(
                    'Verification Code Sent',
                    'We\'ve sent a verification code to your phone number.',
                    [{ text: 'OK' }]
                );
            }

            setResendTimer(60);
            resetAnimation();
            setStep(2);
        } catch (error) {
            console.error('Request OTP Error:', error);
            setError(error.response?.data?.message || 'Failed to send verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!validateOTP(otp)) {
            setError('Please enter the complete 6-digit verification code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const cleanPhone = phoneNumber.replace(/\s/g, '');
            const response = await axios.post(`${API_BASE_URL}/signup/verify-otp`, {
                otp,
                phoneNumber: cleanPhone
            });
            console.log('OTP Verification Response:', JSON.stringify(response, null, 2));
            // Handle the backend response structure
            if (response.data.is_valid) {
                if (isExistingUser) {
                    // For existing users, create user info from stored data
                    const userInfo = {
                        phone: cleanPhone,
                        phoneNumber: cleanPhone,
                        fullname: userData?.fullname || userData?.name || 'User',
                        isExistingUser: true,
                        token: response.data.token || 'temp_token',
                        // Include any additional user data from the backend
                        ...(response.data.user && { ...response.data.user })
                    };
                    await saveUserToStorage(userInfo);
                    navigation.navigate('Main');
                } else {
                    // For new users, proceed to name input
                    resetAnimation();
                    setStep(3);
                }
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (error) {
            console.error('Verify OTP Error:', error);
            setError(error.response?.data?.message || 'Invalid verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteRegistration = async () => {
        if (!name.trim()) {
            setError('Please enter your full name');
            return;
        }
        if (!dob.trim()) {
            setError('Please enter your date of birth');
            return;
        }
        if (!gender.trim()) {
            setError('Please enter your gender');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const cleanPhone = phoneNumber.replace(/\s/g, '');
            const response = await axios.post(`${API_BASE_URL}/signup/user-info`, {
                fullname: name.trim(),
                phoneNumber: cleanPhone,
                dob: dob.trim(),
                gender: gender.trim(),
            });
            console.log('User Info Response:', response.data);
            const userInfo = {
                ...response.data.user,
                phone: cleanPhone,
                fullname: name.trim(),
                dob: dob.trim(),
                gender: gender.trim(),
                isExistingUser: false,
                token: response.data.token || 'temp_token'
            };
            await saveUserToStorage(userInfo);
            //Goto EatappLite Overview
            navigation.navigate('Overview')
        } catch (error) {
            console.error('Save User Info Error:', error);
            setError(error.response?.data?.message || 'Failed to complete registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        switch (step) {
            case 1:
                handleRequestOTP();
                break;
            case 2:
                handleVerifyOTP();
                break;
            case 3:
                handleCompleteRegistration();
                break;
            default:
                break;
        }
    };

    const handleBack = () => {
        if (step > 1) {
            resetAnimation();
            setStep(step - 1);
            setError('');
            if (step === 2) {
                setOTP('');
            }
        }
    };

    const handleResendOTP = () => {
        if (resendTimer === 0) {
            handleRequestOTP();
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconBackground}>
                                <Ionicons name="phone-portrait" size={32} color="#6366f1" />
                            </View>
                        </View>
                        <Text style={styles.title}>Enter Your Phone Number</Text>
                        <Text style={styles.subtitle}>We'll send you a verification code to get started</Text>

                        <View style={styles.inputContainer}>
                            <MaterialIcons name="phone" size={20} color="#6b7280" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChangeText={(text) => {
                                    setPhoneNumber(formatPhoneNumber(text));
                                    setError('');
                                }}
                                keyboardType="phone-pad"
                                maxLength={12}
                                autoFocus
                            />
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </Animated.View>
                );

            case 2:
                return (
                    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconBackground}>
                                <Ionicons name="shield-checkmark" size={32} color="#6366f1" />
                            </View>
                        </View>
                        <Text style={styles.title}>Enter Verification Code</Text>
                        <Text style={styles.subtitle}>
                            {isExistingUser
                                ? 'Enter the code sent to your phone to sign in'
                                : 'Check your SMS messages for the verification code'
                            }
                        </Text>

                        <OTPInput
                            value={otp}
                            onChangeText={(text) => {
                                setOTP(text);
                                setError('');
                            }}
                            length={6}
                            autoFocus
                        />

                        <View style={styles.resendContainer}>
                            <TouchableOpacity
                                style={[styles.resendButton, resendTimer > 0 && styles.resendButtonDisabled]}
                                onPress={handleResendOTP}
                                disabled={resendTimer > 0 || loading}
                            >
                                <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
                                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </Animated.View>
                );

            case 3:
                return (
                    <Animated.View style={[styles.stepContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconBackground}>
                                <Ionicons name="person" size={32} color="#6366f1" />
                            </View>
                        </View>
                        <Text style={styles.title}>Complete Your Profile</Text>
                        <Text style={styles.subtitle}>Tell us your name to complete registration</Text>

                        <View style={styles.inputContainer}>
                            <MaterialIcons name="person-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                    setError('');
                                }}
                                autoFocus
                            />
                        </View>
                        <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
                            <MaterialIcons name="calendar-today" size={20} color="#6b7280" style={styles.inputIcon} />
                            <Text style={[styles.input, { color: dob ? '#1f2937' : '#9ca3af' }]}>
                                {dob ? dob : 'Select Date of Birth'}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={dob ? new Date(dob) : new Date(2000, 0, 1)}
                                mode="date"
                                display="default"
                                maximumDate={new Date()}
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) {
                                        // Format as YYYY-MM-DD
                                        const year = selectedDate.getFullYear();
                                        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                                        const day = String(selectedDate.getDate()).padStart(2, '0');
                                        setDob(`${year}-${month}-${day}`);
                                        setError('');
                                    }
                                }}
                            />
                        )}
                        <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <MaterialIcons name="wc" size={20} color="#6b7280" style={styles.inputIcon} />
                            {['Male', 'Female', 'Other'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[styles.genderButton, gender === option && styles.genderButtonSelected]}
                                    onPress={() => {
                                        setGender(option);
                                        setError('');
                                    }}
                                >
                                    <Text style={[styles.genderButtonText, gender === option && styles.genderButtonTextSelected]}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </Animated.View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {renderStepContent()}

                        <View style={styles.buttonContainer}>
                            {step > 1 && (
                                <TouchableOpacity
                                    style={[styles.button, styles.backButton]}
                                    onPress={handleBack}
                                    disabled={loading}
                                >
                                    <Ionicons name="arrow-back" size={24} color="#6366f1" />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[styles.button, styles.nextButton, loading && styles.buttonDisabled]}
                                onPress={handleNext}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Ionicons
                                        name={step >= 3 ? "checkmark" : "arrow-forward"}
                                        size={24}
                                        color="#fff"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.stepIndicator}>
                            {[1, 2, 3].map((stepNumber) => (
                                <View
                                    key={stepNumber}
                                    style={[
                                        styles.stepDot,
                                        stepNumber === step && styles.activeStepDot,
                                        stepNumber < step && styles.completedStepDot
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    stepContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        marginBottom: 24,
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e0e7ff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        color: '#1f2937',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
        width: '100%',
        borderWidth: 2,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 16,
        color: '#1f2937',
        fontWeight: '500',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#1f2937',
    },
    otpInputFocused: {
        borderColor: '#6366f1',
        backgroundColor: '#f8fafc',
    },
    otpInputFilled: {
        borderColor: '#6366f1',
        backgroundColor: '#e0e7ff',
    },
    resendContainer: {
        marginBottom: 20,
    },
    resendButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    resendButtonDisabled: {
        opacity: 0.5,
    },
    resendText: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    resendTextDisabled: {
        color: '#9ca3af',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 32,
    },
    button: {
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        minWidth: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    nextButton: {
        backgroundColor: '#6366f1',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d1d5db',
        marginHorizontal: 4,
    },
    activeStepDot: {
        backgroundColor: '#6366f1',
        transform: [{ scale: 1.2 }],
    },
    completedStepDot: {
        backgroundColor: '#6366f1',
    },
    genderButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
    genderButtonSelected: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    genderButtonText: {
        color: '#1f2937',
        fontWeight: '500',
    },
    genderButtonTextSelected: {
        color: '#fff',
    },
});

export default OTPSigninScreen;