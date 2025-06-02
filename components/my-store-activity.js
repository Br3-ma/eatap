import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const RecentActivity = () => {
  const activities = [
    { title: 'New Product Added', detail: 'Summer Collection Shirt', time: '2h ago', icon: 'shirt-outline', color: '#059669' },
    { title: 'Sale Completed', detail: 'Order #5672', time: '4h ago', icon: 'cart-outline', color: '#2563eb' },
    { title: 'Stock Alert', detail: 'Low on XL Sizes', time: '6h ago', icon: 'alert-circle-outline', color: '#ea580c' }
  ];

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {activities.map((activity, index) => (
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
export default RecentActivity;
