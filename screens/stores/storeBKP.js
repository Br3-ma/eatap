import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const MyStore = ({ navigation }) => {
    const [quickActions] = useState([
        { name: 'Add\nProduct', icon: 'plus-circle', color: '#059669', onPress: () => navigation.navigate('AddProduct'), type: 'Feather' },
        { name: 'Quick\nSale', icon: 'cash-fast', color: '#2563eb', onPress: () => navigation.navigate('QuickSale'), type: 'MaterialCommunityIcons' },
        { name: 'Inventory', icon: 'warehouse', color: '#7c3aed', onPress: () => navigation.navigate('Stock'), type: 'FontAwesome5' }
    ]);

    const menuItems = [
        { name: 'Products', icon: 'box', color: '#059669', onPress: () => navigation.navigate('Products'), stats: '52 Items' },
        { name: 'Stock', icon: 'warehouse', color: '#ea580c', onPress: () => navigation.navigate('Stock'), stats: '73% In Stock' },
        { name: 'Accounts', icon: 'money-bill', color: '#0d9488', onPress: () => navigation.navigate('Accounts'), stats: '$24,560' },
        { name: 'Marketing', icon: 'bullhorn', color: '#7c3aed', onPress: () => navigation.navigate('Marketing'), stats: '3 Campaigns' }
    ];

    const renderIcon = (item) => {
        switch(item.type) {
            case 'Feather':
                return <Feather name={item.icon} size={24} color="#fff" />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />;
            default:
                return <FontAwesome5 name={item.icon} size={24} color="#fff" />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Modern Header with Logo */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logoContainer}>
                        <FontAwesome5 name="shopping-bag" size={18} color="#2563eb" />
                        <Text style={styles.headerTitle}>StoreHub</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Feather name="search" size={20} color="#1f2937" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="bar-chart-outline" size={20} color="#1f2937" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialCommunityIcons name="help-circle-outline" size={20} color="#1f2937" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={20} color="#1f2937" />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="settings-outline" size={20} color="#1f2937" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                {/* Performance Card */}
                <LinearGradient
                    colors={['#1e40af', '#3b82f6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.performanceCard}
                >
                    <View style={styles.performanceHeader}>
                        <View>
                            <Text style={styles.performanceLabel}>Revenue</Text>
                            <Text style={styles.performanceValue}>$24,560</Text>
                        </View>
                        <View style={styles.performanceBadge}>
                            <Text style={styles.performanceBadgeText}>+12.5%</Text>
                        </View>
                    </View>
                    <View style={styles.performanceFooter}>
                        <View style={styles.performanceMetric}>
                            <Text style={styles.metricValue}>3,245</Text>
                            <Text style={styles.metricLabel}>Visitors</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.performanceMetric}>
                            <Text style={styles.metricValue}>486</Text>
                            <Text style={styles.metricLabel}>Orders</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        {quickActions.map((action, index) => (
                            <Animatable.View 
                                key={index}
                                animation="fadeIn"
                                duration={500}
                                delay={index * 100}
                                style={styles.quickActionWrapper}
                            >
                                <TouchableOpacity
                                    onPress={action.onPress}
                                    style={[styles.quickActionItem, { backgroundColor: action.color }]}
                                >
                                    {renderIcon(action)}
                                    <Text style={styles.quickActionText}>{action.name}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))}
                    </View>
                </View>

                {/* Menu Grid */}
                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Store Management</Text>
                    <View style={styles.menuGrid}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={item.onPress}
                                style={styles.menuItem}
                            >
                                <View style={[styles.menuItemIcon, { backgroundColor: item.color }]}>
                                    <FontAwesome5 name={item.icon} size={18} color="#fff" />
                                </View>
                                <Text style={styles.menuItemTitle}>{item.name}</Text>
                                <Text style={styles.menuItemStats}>{item.stats}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.activityContainer}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    {[
                        { title: 'New Product Added', detail: 'Summer Collection Shirt', time: '2h ago', icon: 'shirt-outline', color: '#059669' },
                        { title: 'Sale Completed', detail: 'Order #5672', time: '4h ago', icon: 'cart-outline', color: '#2563eb' },
                        { title: 'Stock Alert', detail: 'Low on XL Sizes', time: '6h ago', icon: 'alert-circle-outline', color: '#ea580c' }
                    ].map((activity, index) => (
                        <Animatable.View
                            key={index}
                            animation="fadeInUp"
                            duration={500}
                            delay={index * 100}
                        >
                            <TouchableOpacity style={styles.activityItem}>
                                <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                                    <MaterialCommunityIcons name={activity.icon} size={18} color="#fff" />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityTitle}>{activity.title}</Text>
                                    <Text style={styles.activityDetail}>{activity.detail}</Text>
                                </View>
                                <Text style={styles.activityTime}>{activity.time}</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginLeft: 4,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    notificationButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ef4444',
    },
    content: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 20,
    },
    performanceCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    performanceLabel: {
        fontSize: 13,
        color: '#fff',
        opacity: 0.9,
    },
    performanceValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginTop: 2,
    },
    performanceBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    performanceBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    performanceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    performanceMetric: {
        flex: 1,
        alignItems: 'center',
    },
    metricValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    metricLabel: {
        color: '#fff',
        opacity: 0.9,
        fontSize: 11,
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 12,
    },
    quickActionsContainer: {
        marginBottom: 16,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    quickActionWrapper: {
        flex: 1,
    },
    quickActionItem: {
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
    },
    quickActionText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '500',
        marginTop: 6,
        textAlign: 'center',
    },
    menuContainer: {
        marginBottom: 16,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    menuItem: {
        width: (width - 32) / 2 - 4,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    menuItemIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    menuItemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    menuItemStats: {
        fontSize: 12,
        color: '#64748b',
    },
    activityContainer: {
        marginBottom: 16,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    activityIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityContent: {
        flex: 1,
        marginLeft: 10,
    },
    activityTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1f2937',
    },
    activityDetail: {
        fontSize: 11,
        color: '#64748b',
        marginTop: 1,
    },
    activityTime: {
        fontSize: 12,
        color: '#94a3b8',
        marginLeft: 8,
    },
});

export default MyStore;