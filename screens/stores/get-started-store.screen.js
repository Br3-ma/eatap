import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserInfo } from '../../utils/userInfo';
import { useIsFocused } from '@react-navigation/native';

const GetStartedWithStore = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchUser = async () => {
            const info = await getUserInfo();
            setUserInfo(info);
        };
        if (isFocused) {
            fetchUser();
        }
    }, [isFocused]);

    const benefits = [
        {
            icon: 'food-apple',
            title: 'Share Food',
            description: 'Connect with your community and share surplus food items'
        },
        {
            icon: 'hand-heart',
            title: 'Help Others',
            description: 'Make a difference by providing food to those in need'
        },
        {
            icon: 'chart-line',
            title: 'Track Impact',
            description: 'Monitor your contributions and see your positive impact'
        },
        {
            icon: 'account-group',
            title: 'Build Community',
            description: 'Connect with like-minded individuals in your area'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Get Started</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <Image
                        source={require('../../assets/img/logo.png')}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.heroTitle}>Start Your Food Sharing Journey</Text>
                    <Text style={styles.heroSubtitle}>
                        Join our community of food sharers and make a difference in your neighborhood
                    </Text>
                </View>

                <View style={styles.benefitsSection}>
                    <Text style={styles.sectionTitle}>Why Create a Store?</Text>
                    {benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                            <View style={styles.benefitIconContainer}>
                                <MaterialCommunityIcons name={benefit.icon} size={24} color="#FF6B6B" />
                            </View>
                            <View style={styles.benefitContent}>
                                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                                <Text style={styles.benefitDescription}>{benefit.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.statsSection}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>10K+</Text>
                        <Text style={styles.statLabel}>Active Users</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>50K+</Text>
                        <Text style={styles.statLabel}>Items Shared</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>100+</Text>
                        <Text style={styles.statLabel}>Cities</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => navigation.navigate('CreateStore')}
                >
                    <Text style={styles.createButtonText}>Create Your Store</Text>
                    <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    content: {
        flex: 1,
    },
    heroSection: {
        padding: 20,
        alignItems: 'center',
    },
    heroImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    heroSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: 20,
    },
    benefitsSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 12,
    },
    benefitIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    benefitContent: {
        flex: 1,
    },
    benefitTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    benefitDescription: {
        fontSize: 14,
        color: '#666',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#f8f8f8',
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    createButton: {
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default GetStartedWithStore; 