// MeScreen.js
import React, { useContext, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import { UserContext } from '../../../data/helpers/UserContext';
import SideMenu from '../../../components/profile-sidemenu';
import styles from '../../../assets/css/me.css';

const MeScreen = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuSlide = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

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

  // Toggle menu functions
  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(menuSlide, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuSlide, {
      toValue: -Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuOpen(false);
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* Overlay to close the menu when clicking outside */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        />
      )}

      {/* Sliding Side Menu */}
      <Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuSlide }] }
        ]}
      >
        <SideMenu navigation={navigation} closeMenu={closeMenu} />
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animatable.View animation="fadeInUp" duration={800} style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
                <MaterialCommunityIcons name="menu" size={24} color="#333" />
              </TouchableOpacity>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={require('../../../assets/img/1.png')}
                  style={styles.profilePicture}
                />
                <View style={styles.badgeContainer}>
                  <MaterialCommunityIcons name="check-decagram" size={24} color="#FF6B35" />
                </View>
              </View>
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>47</Text>
                  <Text style={styles.statLabel}>Donations</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>156</Text>
                  <Text style={styles.statLabel}>Items</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>235</Text>
                  <Text style={styles.statLabel}>Helped</Text>
                </View>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{userInfo?.user?.name || 'Guest'}</Text>
                <View style={styles.verifiedBadge}>
                  <MaterialCommunityIcons name="shield-check" size={16} color="#FF6B35" />
                  <Text style={styles.verifiedText}>Verified Donor</Text>
                </View>
              </View>
              <Text style={styles.profileBio}>{userInfo?.user?.bio || 'Helping reduce food waste and hunger'}</Text>
              <View style={styles.locationContainer}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                <Text style={styles.locationText}>{userInfo?.user?.location || 'New York, USA'}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.quickActions}>
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
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.statsContainer}>
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
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity, index) => (
            <Animatable.View
              key={index}
              animation="fadeInRight"
              delay={index * 100}
              style={styles.activityItem}
            >
              <MaterialCommunityIcons
                name={activity.type === 'donation' ? 'gift' : 'food-apple'}
                size={24}
                color="#FF6B35"
              />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.item}</Text>
                <Text style={styles.activityMeta}>
                  {activity.quantity} • {activity.date}
                </Text>
              </View>
            </Animatable.View>
          ))}
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={800} style={styles.sectionContainer}>
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
        </Animatable.View>
      </Animated.ScrollView>
    </View>
  );
};

const StatItem = ({ value, label, icon }) => (
  <Animatable.View animation="pulse" iterationCount="infinite" duration={2000} style={styles.statItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#FF6B35" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Animatable.View>
);

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <MaterialCommunityIcons name={icon} size={20} color="#FF6B35" />
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

// Additional styles needed for the drawer menu
const additionalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    left: 15,
    top: 40,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
});

// Merge your existing styles with additional styles
Object.assign(styles, additionalStyles);

export default MeScreen;