import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock team data
const teamData = [
    {
        id: '1',
        name: 'Bremah Nyeleti',
        role: 'Founder & CEO',
        image: require('../../../assets/img/1.png'),
    },
    {
        id: '2',
        name: 'Bremah Nyeleti',
        role: 'Head of Operations',
        image: require('../../../assets/img/1.png'),
    },
    {
        id: '3',
        name: 'Bremah Nyeleti',
        role: 'Lead Developer',
        image: require('../../../assets/img/1.png'),
    },
];

const AboutScreen = ({ navigation }) => {
    const handleSocialLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
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
                <Text style={styles.headerTitle}>About</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.appInfo}>
                    <Image
                        source={require('../../../assets/img/1.png')}
                        style={styles.appLogo}
                    />
                    <Text style={styles.appName}>EatappLite</Text>
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                    <Text style={styles.appDescription}>
                    EatappLite is a platform dedicated to reducing food waste and helping those in need by connecting food donors with recipients in a simple and efficient way.
                    </Text>
                </View>

                <View style={styles.socialLinks}>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLink('https://twitter.com/eatapp')}
                    >
                        <MaterialCommunityIcons name="twitter" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLink('https://facebook.com/eatapp')}
                    >
                        <MaterialCommunityIcons name="facebook" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLink('https://instagram.com/eatapp')}
                    >
                        <MaterialCommunityIcons name="instagram" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                </View>

                <View style={styles.teamSection}>
                    <Text style={styles.sectionTitle}>Our Team</Text>
                    {teamData.map((member) => (
                        <View key={member.id} style={styles.teamMember}>
                            <Image source={member.image} style={styles.memberImage} />
                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberRole}>{member.role}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.missionSection}>
                    <Text style={styles.sectionTitle}>Our Mission</Text>
                    <Text style={styles.missionText}>
                        We believe that no one should go hungry while food is being wasted. Our mission is to create a sustainable ecosystem where surplus food reaches those who need it most, reducing food waste and fighting hunger in our communities.
                    </Text>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <TouchableOpacity style={styles.contactItem}>
                        <MaterialCommunityIcons name="email" size={20} color="#FF6B35" />
                        <Text style={styles.contactText}>contact@eatapplite.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactItem}>
                        <MaterialCommunityIcons name="phone" size={20} color="#FF6B35" />
                        <Text style={styles.contactText}>+260 (775) 214-7755</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactItem}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#FF6B35" />
                        <Text style={styles.contactText}>123 Real Street, City, Country</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.copyright}>
                    © 2024 EatappLite. All rights reserved.
                </Text>
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
    appInfo: {
        alignItems: 'center',
        padding: 24,
    },
    appLogo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 16,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    appVersion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    appDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    socialButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    teamSection: {
        marginBottom: 32,
    },
    teamMember: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    memberImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    memberRole: {
        fontSize: 14,
        color: '#666',
    },
    missionSection: {
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    missionText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    contactSection: {
        marginBottom: 32,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    contactText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    copyright: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 32,
    },
});

export default AboutScreen; 