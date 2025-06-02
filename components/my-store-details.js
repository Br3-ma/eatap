import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const MyStoreDetails = ({ storeDetails }) => {
  // Parse address from JSON string if exists
  const address = storeDetails?.address ? JSON.parse(storeDetails.address) : null;
  
  // Format creation date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <FontAwesome5 name="store" size={16} color="#2563eb" />
          <Text style={styles.cardTitle}>Store Information</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={14} color="#64748b" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Store Name</Text>
          <Text style={styles.infoValue}>{storeDetails?.name || 'Not set'}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Store Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.infoValue}>{storeDetails?.store_code || 'Not set'}</Text>
            <View style={styles.codeBadge}>
              <Text style={styles.codeBadgeText}>ID: {storeDetails?.id || 'N/A'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Description</Text>
          <Text style={styles.infoValue}>{storeDetails?.description || 'No description available'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={16} color="#64748b" />
            </View>
            <Text style={styles.contactText}>{storeDetails?.email || 'No email'}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={16} color="#64748b" />
            </View>
            <Text style={styles.contactText}>{storeDetails?.phone || 'No phone'}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="id-card" size={14} color="#64748b" />
            </View>
            <Text style={styles.contactText}>TPIN: {storeDetails?.tpin || 'Not provided'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Address</Text>
          
          <View style={styles.addressContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={16} color="#64748b" />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressLine}>{address?.street || 'No street address'}</Text>
              <Text style={styles.addressLine}>
                {[
                  address?.city, 
                  address?.state, 
                  address?.postalCode
                ].filter(Boolean).join(', ')}
              </Text>
              <Text style={styles.addressLine}>{address?.country || ''}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footerSection}>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="calendar-clock" size={14} color="#64748b" />
            <Text style={styles.footerText}>Created: {formatDate(storeDetails?.created_at)}</Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="update" size={14} color="#64748b" />
            <Text style={styles.footerText}>Updated: {formatDate(storeDetails?.updated_at)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  editButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  infoSection: {
    gap: 12,
  },
  infoItem: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  codeBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  codeBadgeText: {
    fontSize: 11,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 8,
  },
  contactSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 28,
    height: 28,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#1f2937',
  },
  addressContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addressContent: {
    flex: 1,
  },
  addressLine: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default MyStoreDetails;