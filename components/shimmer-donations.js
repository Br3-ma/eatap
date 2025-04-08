// ShimmerEffect.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Animated } from 'react-native';

const DonationShimmerEffect = () => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateShimmer = () => {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    };
    animateShimmer();
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.shimmerContainer}>
      <Animated.View
        style={[
          styles.shimmer,
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

const styles = StyleSheet.create({
  shimmerContainer: {
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  shimmer: {
    width: '100%',
    height: '100%',
  },
});

export default DonationShimmerEffect;