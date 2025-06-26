// ShimmerEffect.js
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';

const ShimmerBar = ({ style }) => {
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <View style={[styles.shimmerBar, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const DonationShimmerEffect = () => {
  return (
    <View style={styles.skeletonBox}>
      {/* Header */}
      <View style={styles.headerRow}>
        <ShimmerBar style={styles.iconCircle} />
        <ShimmerBar style={styles.headerText} />
        <View style={{ flex: 1 }} />
        <ShimmerBar style={styles.timestamp} />
      </View>
      {/* Divider */}
      <ShimmerBar style={styles.divider} />
      {/* Details */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <ShimmerBar style={styles.detailIcon} />
          <ShimmerBar style={styles.detailLabel} />
          <ShimmerBar style={styles.detailValue} />
        </View>
        <View style={styles.detailRow}>
          <ShimmerBar style={styles.detailIcon} />
          <ShimmerBar style={styles.detailLabel} />
          <ShimmerBar style={styles.detailValue} />
        </View>
      </View>
      {/* Centered Items */}
      <View style={styles.centeredItemsContainer}>
        <View style={styles.centeredItem}>
          <ShimmerBar style={styles.centeredItemLabel} />
          <ShimmerBar style={styles.centeredItemValue} />
        </View>
        <View style={styles.centeredItemDivider} />
        <View style={styles.centeredItem}>
          <ShimmerBar style={styles.centeredItemLabel} />
          <ShimmerBar style={styles.centeredItemValue} />
        </View>
        <View style={styles.centeredItemDivider} />
        <View style={styles.centeredItem}>
          <ShimmerBar style={styles.centeredItemLabel} />
          <ShimmerBar style={styles.centeredItemValue} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    minHeight: 180,
    justifyContent: 'center',
  },
  shimmerBar: {
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    borderRadius: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  headerText: {
    width: 100,
    height: 16,
    borderRadius: 8,
  },
  timestamp: {
    width: 60,
    height: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  divider: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginVertical: 10,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 8,
  },
  detailLabel: {
    width: 60,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  detailValue: {
    width: 120,
    height: 12,
    borderRadius: 6,
  },
  centeredItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  centeredItem: {
    alignItems: 'center',
    flex: 1,
  },
  centeredItemLabel: {
    width: 40,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  centeredItemValue: {
    width: 60,
    height: 14,
    borderRadius: 7,
  },
  centeredItemDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
    borderRadius: 1,
  },
});

export default DonationShimmerEffect;