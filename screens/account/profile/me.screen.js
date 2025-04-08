// MeScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../assets/css/me.css'; // Import styles from a separate file
import { UserContext } from '../../../data/helpers/UserContext';

const MeScreen = () => {
  const { userInfo } = useContext(UserContext); // Fetch userInfo from context

  // Mock data for donation stats and recent activities
  const donationStats = {
    totalDonations: 47,
    foodItemsShared: 156,
    peopleHelped: 235,
    activeListings: 3,
  };

  const recentActivities = [
    { type: 'donation', item: 'Canned Goods', date: '2 days ago', quantity: '5 boxes' },
    { type: 'shared', item: 'Fresh Vegetables', date: '1 week ago', quantity: '3 bags' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.coverPhoto}>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image 
            source={require('../../../assets/img/1.png')} 
            style={styles.profilePicture} 
          />
          <View style={styles.badgeContainer}>
            <MaterialCommunityIcons name="check-decagram" size={24} color="#FF6B6B" />
          </View>
          <Text style={styles.profileName}>{userInfo?.user?.name || 'Guest'}</Text>
          <Text style={styles.profileBadge}>Verified Donor</Text>
          <Text style={styles.profileBio}>{userInfo?.user?.bio || 'Helping reduce food waste and hunger'}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="food-apple" size={24} color="#fff" />
          <Text style={styles.actionText}>Share Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="hand-heart" size={24} color="#fff" />
          <Text style={styles.actionText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="history" size={24} color="#fff" />
          <Text style={styles.actionText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatItem 
            value={donationStats.totalDonations} 
            label="Donations"
            icon="gift"
          />
          <StatItem 
            value={donationStats.foodItemsShared} 
            label="Items Shared"
            icon="food"
          />
        </View>
        <View style={styles.statsRow}>
          <StatItem 
            value={donationStats.peopleHelped} 
            label="People Helped"
            icon="account-group"
          />
          <StatItem 
            value={donationStats.activeListings} 
            label="Active Listings"
            icon="clipboard-list"
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <MaterialCommunityIcons 
              name={activity.type === 'donation' ? 'gift' : 'food-apple'} 
              size={24} 
              color="#FF6B6B" 
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.item}</Text>
              <Text style={styles.activityMeta}>
                {activity.quantity} • {activity.date}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Contact Information */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <DetailItem 
          icon="map-marker" 
          label="Location" 
          value={userInfo?.user?.location || 'New York, USA'} 
        />
        <DetailItem 
          icon="email" 
          label="Email" 
          value={userInfo?.user?.email || 'john.doe@example.com'} 
        />
        <DetailItem 
          icon="phone" 
          label="Phone" 
          value={userInfo?.user?.phone || '+1 (555) 123-4567'} 
        />
      </View>
    </ScrollView>
  );
};

const StatItem = ({ value, label, icon }) => (
  <View style={styles.statItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#FF6B6B" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <MaterialCommunityIcons name={icon} size={20} color="#FF6B6B" />
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

export default MeScreen;