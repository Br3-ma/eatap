// MeScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import { getUserInfo } from '../../../utils/userInfo';
import { useIsFocused } from '@react-navigation/native';
import SideMenu from '../../../components/profile-sidemenu';
import styles from '../../../assets/css/me.css';
import DonationShimmerEffect from '../../../components/shimmer-donations';

const MeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuSlide = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchUser = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Profile Header Card */}
        <Animatable.View animation="fadeInDown" duration={800} style={[styles.profileCard, { marginTop: 32, marginHorizontal: 20, paddingBottom: 0 }]}>
          <LinearGradient colors={["#FF6B35", "#FFB385"]} style={styles.profileHeader}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={require('../../../assets/img/1.png')}
                style={styles.profilePicture}
              />
              <View style={styles.badgeContainer}>
                <MaterialCommunityIcons name="check-decagram" size={24} color="#FF6B35" />
              </View>
            </View>
            <Text style={[styles.profileName, { color: '#fff', marginBottom: 4 }]}>{userInfo?.user?.name || userInfo?.fullname || userInfo?.name || 'Guest'}</Text>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#FF6B35" />
              <Text style={styles.verifiedText}>Verified Donor</Text>
            </View>
            <Text style={[styles.profileBio, { color: '#fff', marginTop: 8 }]}>{userInfo?.user?.bio || userInfo?.bio || 'Helping reduce food waste and hunger'}</Text>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#fff" />
              <Text style={[styles.locationText, { color: '#fff' }]}>{userInfo?.user?.location || userInfo?.location || 'New York, USA'}</Text>
            </View>
            {/* Floating Menu Button */}
            <TouchableOpacity
              style={[styles.menuButton, { right: 20, top: 20, left: undefined, backgroundColor: 'rgba(255,255,255,0.15)' }]}
              onPress={openMenu}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>

        {/* Stats Card */}
        <Animatable.View animation="fadeInUp" delay={100} style={[styles.sectionContainer, { marginTop: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <StatItem value={donationStats.totalDonations} label="Donations" icon="gift" />
            <StatItem value={donationStats.foodItemsShared} label="Items Shared" icon="food" />
            <StatItem value={donationStats.peopleHelped} label="People Helped" icon="account-group" />
            <StatItem value={donationStats.activeListings} label="Active Listings" icon="clipboard-list" />
          </View>
        </Animatable.View>

        {/* Quick Actions Card */}
        <Animatable.View animation="fadeInUp" delay={200} style={[styles.sectionContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 }]}>
          <ActionButton icon="food-apple" label="Share Food" />
          <ActionButton icon="hand-heart" label="Donate" />
          <ActionButton icon="history" label="History" />
        </Animatable.View>

        {/* Recent Activity Card */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.sectionContainer}>
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

        {/* Contact Info Card */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <DetailItem
            icon="map-marker"
            label="Location"
            value={userInfo?.user?.location || userInfo?.location || 'New York, USA'}
          />
          <DetailItem
            icon="email"
            label="Email"
            value={userInfo?.user?.email || userInfo?.email || 'john.doe@example.com'}
          />
          <DetailItem
            icon="phone"
            label="Phone"
            value={userInfo?.user?.phone || userInfo?.phone || '+1 (555) 123-4567'}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const StatItem = ({ value, label, icon }) => (
  <View style={{ alignItems: 'center', flex: 1 }}>
    <MaterialCommunityIcons name={icon} size={28} color="#FF6B35" style={{ marginBottom: 4 }} />
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{value}</Text>
    <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{label}</Text>
  </View>
);

const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
    <MaterialCommunityIcons name={icon} size={24} color="#fff" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
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

export default MeScreen;