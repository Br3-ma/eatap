import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MyFoodScreen = () => {
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
        colors={['#8FC826', '#ffffff']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Purchases</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>Total</Text>
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
              colors={index % 2 === 0 ? ['#FFFFF', '#FFFFF'] : ['#FFFFF', '#FFFFF']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 
                    name={renderTransactionIcon(index)} 
                    size={20} 
                    color="#8FC826" 
                  />
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View> */}

              <View style={styles.mainContent}>
                <Text style={styles.transactionMessage}>
                  You have received <Text style={styles.highlightText}>Food, Groceries, and Electronics for K390.39 </Text>from
                  <Text style={styles.highlightText}> Bremah Nyeleti</Text>, please visit each stores to collect your items.
                </Text>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={16} color="#8FC826" />
                    <Text style={styles.detailText}>0772147755</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#8FC826" />
                    <Text style={styles.detailText}>Expires: 12/31/2026</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="receipt-outline" size={16} color="#8FC826" />
                    <Text style={styles.detailText}>Transaction #3820472</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.timestampContainer}>
                  <MaterialCommunityIcons 
                    name="clock-outline" 
                    size={14} 
                    color="#ffffff" 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 15,
  },
  header: {
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: '#FFB300',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#8FC826',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#EAECEE',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  transactionCard: {
    borderRadius: 16,
    shadowColor: '#7F8C8D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainContent: {
    gap: 16,
  },
  transactionMessage: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
  },
  highlightText: {
    fontWeight: '700',
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestampText: {
    color: '#7F8C8D',
    fontSize: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#8FC826',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MyFoodScreen;