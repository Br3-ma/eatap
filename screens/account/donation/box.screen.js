// BoxScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserInfo } from '../../../utils/userInfo';
import { useIsFocused } from '@react-navigation/native';
import DonationShimmerEffect from '../../../components/shimmer-donations';
import styles from '../../../assets/css/donations.css'; // Import styles from the separate file

const BoxScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUser = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

  // Simulate loading state
  const isLoading = !userInfo;

  return (
    <View style={styles.container}>
      {/* Put a horizontal smooth soft scroller of Donation Boxes (Donation Groups cards of where you are donating to)*/}
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
                colors={['#fff', '#fff']}
                style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isLoading ? (
                  <DonationShimmerEffect /> // Show shimmer effect while loading
                ) : (
                  <>
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
                          <Text style={styles.centeredItemValue}>{userInfo?.user?.name || userInfo?.fullname || userInfo?.name || 'Guest'}</Text>
                        </View>
                        <View style={styles.centeredItemDivider} />
                        <View style={styles.centeredItem}>
                          <Text style={styles.centeredItemLabel}>Expires</Text>
                          <Text style={styles.centeredItemValue}>12/31/2026</Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BoxScreen;