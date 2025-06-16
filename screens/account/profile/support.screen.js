import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock FAQ data
const faqData = [
    {
        id: '1',
        question: 'How do I donate food?',
        answer: 'To donate food, go to the "Donate" tab, select the items you want to donate, and follow the instructions to schedule a pickup or drop-off.',
    },
    {
        id: '2',
        question: 'What types of food can I donate?',
        answer: 'You can donate non-perishable items, canned goods, and fresh produce that is still in good condition. Please ensure all items are properly sealed and within their expiration date.',
    },
    {
        id: '3',
        question: 'How do I track my donations?',
        answer: 'You can track your donations in the "Activity History" section of your profile. This shows all your past donations and their status.',
    },
];

const SupportScreen = ({ navigation }) => {
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [message, setMessage] = useState('');

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const renderFaqItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.faqItem}
            onPress={() => toggleFaq(item.id)}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <MaterialCommunityIcons
                    name={expandedFaq === item.id ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#666"
                />
            </View>
            {expandedFaq === item.id && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
            )}
        </TouchableOpacity>
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
                <Text style={styles.headerTitle}>Support</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.contactSection}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <View style={styles.contactOptions}>
                        <TouchableOpacity style={styles.contactItem}>
                            <View style={styles.contactIcon}>
                                <MaterialCommunityIcons name="email" size={24} color="#FF6B35" />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Email</Text>
                                <Text style={styles.contactValue}>support@eatapplite.com</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem}>
                            <View style={styles.contactIcon}>
                                <MaterialCommunityIcons name="phone" size={24} color="#FF6B35" />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Phone</Text>
                                <Text style={styles.contactValue}>+260 (775) 214-7755</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem}>
                            <View style={styles.contactIcon}>
                                <MaterialCommunityIcons name="chat" size={24} color="#FF6B35" />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Live Chat</Text>
                                <Text style={styles.contactValue}>Available 24/7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.messageSection}>
                    <Text style={styles.sectionTitle}>Send us a Message</Text>
                    <TextInput
                        style={styles.messageInput}
                        placeholder="Type your message here..."
                        multiline
                        numberOfLines={4}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send Message</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {faqData.map(renderFaqItem)}
                </View>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    contactSection: {
        marginTop: 20,
    },
    contactOptions: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    contactIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    messageSection: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    messageInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        height: 120,
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sendButton: {
        backgroundColor: '#FF6B35',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    faqSection: {
        marginTop: 24,
        marginBottom: 24,
    },
    faqItem: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
        marginRight: 16,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
        marginTop: 12,
        lineHeight: 20,
    },
});

export default SupportScreen; 