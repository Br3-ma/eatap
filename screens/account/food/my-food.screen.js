// MyFoodScreen.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../../data/helpers/UserContext'; // Import UserContext
import styles from '../../../assets/css/myfood.css'; // Import styles from the separate file

const MyFoodScreen = () => {
  const { userInfo } = useContext(UserContext); // Fetch userInfo from context

  const renderTransactionIcon = (index) => {
    const icons = [
      'food', 'cart', 'shopping-bag', 'gift', 'package'
    ];
    return icons[index % icons.length];
  };

  const formatTimeAgo = (index) => {
    if (index === 0) return 'Just now';
    if (index === 1) return '5 mins ago';
    if (index < 5) return `${index * 10} mins ago`;
    return `${index} hours ago`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#ffffff']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Purchases</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sent Items</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>Received Items</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.transactionCard}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#fff', '#fff']}
              style={styles.cardGradient}
            >
              <View style={styles.mainContent}>
                <Text style={styles.transactionMessage}>
                  You have received <Text style={styles.highlightText}>Food, Groceries, and Electronics for K390.39 </Text>from
                  <Text style={styles.highlightText}> {userInfo?.user?.name || 'Guest'}</Text>, please visit each store to collect your items.
                </Text>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={16} color="#FF6B6B" />
                    <Text style={styles.detailText}>{userInfo?.user?.phone || '0772147755'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#FF6B6B" />
                    <Text style={styles.detailText}>Expires: 12/31/2026</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="receipt-outline" size={16} color="#FF6B6B" />
                    <Text style={styles.detailText}>Transaction #3820472</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.timestampContainer}>
                  <MaterialCommunityIcons 
                    name="clock-outline" 
                    size={14} 
                    color="#757575" 
                  />
                  <Text style={styles.timestampText}>{formatTimeAgo(index)}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyFoodScreen;