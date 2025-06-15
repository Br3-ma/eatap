import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for activities
const mockActivities = [
    {
        id: '1',
        type: 'donation',
        title: 'Food Donation',
        description: 'Donated 5 boxes of canned goods',
        date: '2024-03-15',
        status: 'completed',
        icon: 'gift',
    },
    {
        id: '2',
        type: 'shared',
        title: 'Food Sharing',
        description: 'Shared fresh vegetables with local community',
        date: '2024-03-10',
        status: 'completed',
        icon: 'food-apple',
    },
    {
        id: '3',
        type: 'received',
        title: 'Received Donation',
        description: 'Received 3 bags of rice from local store',
        date: '2024-03-05',
        status: 'completed',
        icon: 'handshake',
    },
    {
        id: '4',
        type: 'donation',
        title: 'Food Donation',
        description: 'Donated 2 boxes of pasta',
        date: '2024-03-01',
        status: 'completed',
        icon: 'gift',
    },
];

const ActivityHistoryScreen = ({ navigation }) => {
    const [activities] = useState(mockActivities);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return '#4CAF50';
            case 'pending':
                return '#FFC107';
            case 'cancelled':
                return '#F44336';
            default:
                return '#757575';
        }
    };

    const renderActivityItem = ({ item }) => (
        <TouchableOpacity style={styles.activityItem}>
            <View style={styles.activityIcon}>
                <MaterialCommunityIcons name={item.icon} size={24} color="#FF6B35" />
            </View>
            <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDescription}>{item.description}</Text>
                <View style={styles.activityFooter}>
                    <Text style={styles.activityDate}>{item.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                </View>
            </View>
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
                <Text style={styles.headerTitle}>Activity History</Text>
            </LinearGradient>

            <FlatList
                data={activities}
                renderItem={renderActivityItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
    listContainer: {
        padding: 16,
    },
    activityItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    activityIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    activityDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    activityFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityDate: {
        fontSize: 12,
        color: '#999',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#fff',
        textTransform: 'capitalize',
    },
});

export default ActivityHistoryScreen; 