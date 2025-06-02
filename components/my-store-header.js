import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Header = ({ storeDetails }) => {
  // Parse store hours from JSON string if it exists
  const hours = storeDetails?.hours ? JSON.parse(storeDetails.hours) : null;
  
  // Format store hours for display
  const storeHours = hours ? `${hours.opening}:00 - ${hours.closing}:00` : 'Hours not set';
  
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.logoContainer}>
          <FontAwesome5 name="shopping-bag" size={18} color="#2563eb" />
          <TouchableOpacity style={styles.storeInfoContainer}>
            <Text style={styles.headerTitle}>
              {storeDetails?.name || 'StoreHub'}
            </Text>
            <View style={styles.storeCodeContainer}>
              <Text style={styles.storeCode}>{storeDetails?.store_code || ''}</Text>
              <Ionicons name="chevron-down" size={14} color="#6b7280" />
            </View>
          </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
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
  storeInfoContainer: {
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  storeCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  storeCode: {
    fontSize: 12,
    color: '#6b7280',
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
});

export default Header;