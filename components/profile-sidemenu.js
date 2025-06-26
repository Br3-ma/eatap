// SideMenu.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserInfo } from '../utils/userInfo';
import { API_BASE_URL } from '../confg/conf';

const MenuItem = ({ icon, label, onPress, badge }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <MaterialCommunityIcons name={icon} size={22} color="#333" />
      <Text style={styles.menuItemText}>{label}</Text>
    </View>
    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const SideMenu = ({ navigation, closeMenu }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUser();
  }, []);

  const handleStoreNavigation = async () => {
    try {
      const userInfo = await getUserInfo();
      if (!userInfo) {
        navigation.navigate('GetStartedWithStore');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/stores/user/${userInfo.userId}`);
      const data = await response.json();

      if (data.status === 'success' && data.is_found === 'true') {
        if (data.stores_count === 0) {
          navigation.navigate('GetStartedWithStore');
        } else if (data.stores_count === 1) {
          // Navigate to MyStore with the single store's data
          navigation.navigate('MyStore', {
            storeId: data.data[0].id,
            storeDetails: data.data[0]
          });
        } else {
          // Navigate to StoreList with all stores
          navigation.navigate('StoreList', { stores: data.data });
        }
      } else {
        navigation.navigate('GetStartedWithStore');
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      navigation.navigate('GetStartedWithStore');
    }
  };

  const menuItems = [
    { icon: 'account', label: 'Edit Profile', onPress: () => navigation.navigate('EditProfile') },
    { icon: 'store', label: 'My Stores', onPress: handleStoreNavigation },
    { icon: 'history', label: 'Activity History', onPress: () => navigation.navigate('ActivityHistory') },
    { icon: 'cog', label: 'Settings', onPress: () => navigation.navigate('Settings') },
    { icon: 'help-circle', label: 'Help & Support', onPress: () => navigation.navigate('Support') },
    { icon: 'information', label: 'About', onPress: () => navigation.navigate('About') },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#FF8C42']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <Avatar.Image
            size={70}
            source={require('../assets/img/1.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userInfo?.fullname || userInfo?.name || 'User'}</Text>
          <Text style={styles.email}>{userInfo?.email || ' '}</Text>
        </View>
      </LinearGradient>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem {...item} />
            {index < menuItems.length - 1 && <Divider style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <MaterialCommunityIcons name="logout" size={22} color="#FF6B35" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  divider: {
    marginHorizontal: 20,
    backgroundColor: '#F0F0F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  logoutText: {
    fontSize: 15,
    color: '#FF6B35',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default SideMenu;
