import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../../data/helpers/UserContext';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: userInfo?.user?.name || '',
        email: userInfo?.user?.email || '',
        phone: userInfo?.user?.phone || '',
        bio: userInfo?.user?.bio || '',
        location: userInfo?.user?.location || '',
    });
    const [profileImage, setProfileImage] = useState(userInfo?.user?.profileImage || null);
    const [errors, setErrors] = useState({});

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Mock API call
            const updatedUserInfo = {
                ...userInfo,
                user: {
                    ...userInfo.user,
                    ...formData,
                    profileImage,
                },
            };
            setUserInfo(updatedUserInfo);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#FF8C42']}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.imageSection}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={profileImage ? { uri: profileImage } : require('../../../assets/img/1.png')}
                            style={styles.profileImage}
                        />
                        <View style={styles.editImageButton}>
                            <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.formSection}>
                    <TextInput
                        label="Full Name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        style={styles.input}
                        error={!!errors.name}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <TextInput
                        label="Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        style={styles.input}
                        keyboardType="email-address"
                        error={!!errors.email}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TextInput
                        label="Phone"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        style={styles.input}
                        keyboardType="phone-pad"
                        error={!!errors.phone}
                    />
                    {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                    <TextInput
                        label="Location"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        style={styles.input}
                    />

                    <TextInput
                        label="Bio"
                        value={formData.bio}
                        onChangeText={(text) => setFormData({ ...formData, bio: text })}
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.saveButton}
                    labelStyle={styles.saveButtonLabel}
                >
                    Save Changes
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40,
        zIndex: 1,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    imageSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FF6B35',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FF6B35',
        borderRadius: 20,
        padding: 8,
    },
    formSection: {
        padding: 20,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    errorText: {
        color: '#FF6B35',
        fontSize: 12,
        marginTop: -12,
        marginBottom: 12,
        marginLeft: 4,
    },
    saveButton: {
        margin: 20,
        backgroundColor: '#FF6B35',
        paddingVertical: 8,
    },
    saveButtonLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen; 