import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const MeScreen = () => {
  const donationStats = {
    totalDonations: 47,
    foodItemsShared: 156,
    peopleHelped: 235,
    activeListings: 3
  };

  const recentActivities = [
    { type: 'donation', item: 'Canned Goods', date: '2 days ago', quantity: '5 boxes' },
    { type: 'shared', item: 'Fresh Vegetables', date: '1 week ago', quantity: '3 bags' }
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
            <MaterialCommunityIcons name="check-decagram" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileBadge}>Verified Donor</Text>
          <Text style={styles.profileBio}>Helping reduce food waste and hunger</Text>
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
              color="#4CAF50" 
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
          value="New York, USA" 
        />
        <DetailItem 
          icon="email" 
          label="Email" 
          value="john.doe@example.com" 
        />
        <DetailItem 
          icon="phone" 
          label="Phone" 
          value="+1 (555) 123-4567" 
        />
      </View>
    </ScrollView>
  );
};

const StatItem = ({ value, label, icon }) => (
  <View style={styles.statItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#4CAF50" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <MaterialCommunityIcons name={icon} size={20} color="#4CAF50" />
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  coverPhoto: {
    height: 150,
    backgroundColor: '#8FC826',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: -50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  badgeContainer: {
    position: 'absolute',
    top: 60,
    right: '35%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileBadge: {
    fontSize: 14,
    color: '#8FC826',
    fontWeight: '600',
    marginTop: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#8FC826',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
  },
  actionText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activityMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailContent: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
});

export default MeScreen;