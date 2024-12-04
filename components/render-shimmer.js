import React from 'react';
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import styles from '../assets/css/home.css';

const RenderShimmerProductItem = () => (
  <View style={styles.productContainer}>
    <ShimmerPlaceholder style={styles.productImage} />
    <ShimmerPlaceholder style={[styles.productName, { marginTop: 8, marginBottom: 4 }]} />
    <ShimmerPlaceholder style={styles.productPrice} />
  </View>
);

export default RenderShimmerProductItem;
