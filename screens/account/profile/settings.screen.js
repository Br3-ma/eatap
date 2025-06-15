import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SettingsScreen = ({ navigation }) => {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        locationServices: true,
        emailNotifications: true,
        pushNotifications: true,
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const renderSettingItem = (icon, title, description, value, onToggle) => (
        <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <MaterialCommunityIcons name={icon} size={24} color="#FF6B35" />
            </View>
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingDescription}>{description}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#E0E0E0', true: '#FF6B35' }}
                thumbColor="#fff"
            />
        </View>
    );

    const renderSectionHeader = (title) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

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
                <Text style={styles.headerTitle}>Settings</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                {renderSectionHeader('Notifications')}
                {renderSettingItem(
                    'bell',
                    'Push Notifications',
                    'Receive notifications about donations and activities',
                    settings.pushNotifications,
                    () => toggleSetting('pushNotifications')
                )}
                {renderSettingItem(
                    'email',
                    'Email Notifications',
                    'Receive email updates about your account',
                    settings.emailNotifications,
                    () => toggleSetting('emailNotifications')
                )}

                {renderSectionHeader('Appearance')}
                {renderSettingItem(
                    'theme-light-dark',
                    'Dark Mode',
                    'Switch between light and dark theme',
                    settings.darkMode,
                    () => toggleSetting('darkMode')
                )}

                {renderSectionHeader('Location')}
                {renderSettingItem(
                    'map-marker',
                    'Location Services',
                    'Allow app to access your location',
                    settings.locationServices,
                    () => toggleSetting('locationServices')
                )}

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.settingIcon}>
                        <MaterialCommunityIcons name="shield-account" size={24} color="#FF6B35" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>Privacy Policy</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.settingIcon}>
                        <MaterialCommunityIcons name="file-document" size={24} color="#FF6B35" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>Terms of Service</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.settingIcon}>
                        <MaterialCommunityIcons name="help-circle" size={24} color="#FF6B35" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>Help & Support</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
                    <View style={styles.settingIcon}>
                        <MaterialCommunityIcons name="logout" size={24} color="#F44336" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={[styles.settingTitle, styles.logoutText]}>Log Out</Text>
                    </View>
                </TouchableOpacity>
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
    sectionHeader: {
        padding: 16,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#666',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    logoutButton: {
        marginTop: 20,
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#F44336',
    },
});

export default SettingsScreen; 