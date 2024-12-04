import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BoxScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Recent Donations</Text>
        <View style={styles.boxContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.boxWrapper}
              activeOpacity={0.95}
            >
              <LinearGradient
                colors={['#FFFFF', '#FFFFF']}
                style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >

                <View style={styles.boxHeader}>
                  <View style={styles.headerLeft}>
                    <MaterialCommunityIcons name="package-variant" style={styles.boxIcon} />
                    <Text style={styles.boxHeaderText}>Donation #{index + 1}</Text>
                  </View>
                  <View style={styles.timestampContainer}>
                    <MaterialCommunityIcons name="clock-outline" style={styles.timestampIcon} />
                    <Text style={styles.timestampText}>10 mins ago</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.boxContent}>
                  <View style={styles.boxDetails}>
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="map-marker" style={styles.detailIcon} />
                      <Text style={styles.detailLabel}>Locations:</Text>
                      <Text style={styles.detailValue}>Shoprite, Pick n Pay, A & K Dealers</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="shopping" style={styles.detailIcon} />
                      <Text style={styles.detailLabel}>Contents:</Text>
                      <Text style={styles.detailValue}>Food, Groceries, and Electronics</Text>
                    </View>
                  </View>

                  <View style={styles.centeredItemsContainer}>
                    <View style={styles.centeredItem}>
                      <Text style={styles.centeredItemLabel}>Code</Text>
                      <Text style={styles.centeredItemValue}>3820472</Text>
                    </View>
                    <View style={styles.centeredItemDivider} />
                    <View style={styles.centeredItem}>
                      <Text style={styles.centeredItemLabel}>Donor</Text>
                      <Text style={styles.centeredItemValue}>Bremah Nyeleti</Text>
                    </View>
                    <View style={styles.centeredItemDivider} />
                    <View style={styles.centeredItem}>
                      <Text style={styles.centeredItemLabel}>Expires</Text>
                      <Text style={styles.centeredItemValue}>12/31/2026</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    marginLeft: 4,
  },
  boxContainer: {
    gap: 16,
  },
  boxWrapper: {
    borderRadius: 16,
    shadowColor: '#8FC826',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  box: {
    borderRadius: 16,
    padding: 16,
  },
  statusBadge: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#857b59d9',
    fontSize: 12,
    fontWeight: '600',
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIcon: {
    color: '#8FC826',
    fontSize: 24,
    marginRight: 8,
  },
  boxHeaderText: {
    color: '#8FC826',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  boxContent: {
    gap: 16,
  },
  boxDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    color: '#857b59d9',
    fontSize: 18,
    marginRight: 8,
  },
  detailLabel: {
    color: '#000',
    fontWeight: '600',
    marginRight: 4,
  },
  detailValue: {
    color: '#000',
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timestampIcon: {
    color: '#857b59d9',
    fontSize: 14,
    marginRight: 4,
  },
  timestampText: {
    color: '#857b59d9',
    fontSize: 12,
  },
  centeredItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  centeredItem: {
    flex: 1,
    alignItems: 'center',
  },
  centeredItemDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 10,
    backgroundColor: '#79786ed9',
  },
  centeredItemLabel: {
    color: '#79786ed9',
    fontSize: 9,
    fontWeight: '500',
    opacity: 0.8,
    marginBottom: 4,
  },
  centeredItemValue: {
    color: '#c3c3c3',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BoxScreen;