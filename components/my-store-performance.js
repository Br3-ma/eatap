import React from 'react';
import { View, Dimensions, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PerformanceCard = ({ storeDetails }) => {
  // Parse store address from JSON string if it exists
  const address = storeDetails?.address ? JSON.parse(storeDetails.address) : null;
  const cityDisplay = address?.city || 'Location not set';
  
  // Parse store hours from JSON string if it exists
  const hours = storeDetails?.hours ? JSON.parse(storeDetails.hours) : null;
  const storeHours = hours ? `${hours.opening}:00 - ${hours.closing}:00` : 'Hours not set';

  return (
    <LinearGradient
      colors={['#1e40af', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.performanceCard}
    >
      <View style={styles.storeInfoSection}>
        {storeDetails?.logo ? (
          <Image 
            source={{ uri: storeDetails.logo }} 
            style={styles.storeLogo} 
            resizeMode="contain"
          />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Ionicons name="storefront-outline" size={32} color="#fff" />
          </View>
        )}
        <View style={styles.storeDetails}>
          <Text style={styles.storeName}>{storeDetails?.name || 'Store Name'}</Text>
          <View style={styles.storeMetaContainer}>
            <View style={styles.storeMetaItem}>
              <Ionicons name="location-outline" size={12} color="#fff" />
              <Text style={styles.storeMetaText}>{cityDisplay}</Text>
            </View>
            <View style={styles.storeMetaItem}>
              <Ionicons name="time-outline" size={12} color="#fff" />
              <Text style={styles.storeMetaText}>{storeHours}</Text>
            </View>
            <View style={styles.storeMetaItem}>
              <Ionicons name="code-outline" size={12} color="#fff" />
              <Text style={styles.storeMetaText}>{storeDetails?.store_code || 'No code'}</Text>
            </View>
          </View>
        </View>
      </View>

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
  );
};

const styles = StyleSheet.create({
  performanceCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  storeInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeDetails: {
    marginLeft: 12,
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  storeMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  storeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  storeMetaText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 3,
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
});

export default PerformanceCard;