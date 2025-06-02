// MeScreen.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../assets/css/me.css'; // Import styles from a separate file
import { UserContext } from '../../../data/helpers/UserContext';

// Side Menu Component
const SideMenu = ({ navigation, closeMenu }) => {
  const menuItems = [
    { icon: 'home', title: 'Home', screen: 'Home' },
    { icon: 'store', title: 'My Store', screen: 'MyStore' },
    { icon: 'account', title: 'Profile', screen: 'Me' },
    { icon: 'shield-lock', title: 'Security', screen: 'Security' },
    { icon: 'cog', title: 'Settings', screen: 'Settings' },
    { icon: 'help-circle', title: 'Help & Support', screen: 'Support' },
  ];

  return (
    <View style={styles.sideMenuContainer}>
      <View style={styles.menuHeader}>
        <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              navigation.navigate(item.screen);
            }}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#FF6B6B" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.menuFooter}>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="#FF6B6B" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MeScreen = ({ navigation }) => {
  const { userInfo } = useContext(UserContext); // Fetch userInfo from context
  const [menuOpen, setMenuOpen] = useState(false);
  const menuSlide = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

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

  // Close menu when clicking outside
  const handleOverlayPress = () => {
    if (menuOpen) {
      closeMenu();
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Overlay to close the menu when clicking outside */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={handleOverlayPress}
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

      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.coverPhoto}>
            <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
              <MaterialCommunityIcons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
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
    </View>
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
  sideMenuContainer: {
    flex: 1,
    padding: 0,
  },
  menuHeader: {
    padding: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 5,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  menuItems: {
    padding: 15,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  menuFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
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