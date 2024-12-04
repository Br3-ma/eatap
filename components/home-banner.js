import React from 'react';
import { View,StyleSheet, Text, Image, Dimensions,TouchableOpacity } from 'react-native';

const HeroBanner = ({ image, title, buttonText }) => (
  <View style={styles.heroSlide}>
    <Image source={image} style={styles.heroBannerImage} />
    <View style={styles.overlay}>
      <Text style={styles.heroBannerText}>{title}</Text>
      <TouchableOpacity style={styles.heroBannerButton}>
        <Text style={styles.heroBannerButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  heroSlide: {
      width: width,
      height: 200,
      marginRight: 10,
      marginVertical:3,
      borderRadius: 10,
  },
  heroBannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      borderRadius: 10,
  },
  overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent black background
      padding: 20,
  },
  heroBannerText: {
      color: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  heroBannerButton: {
      backgroundColor: '#bc2900',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 8,
  },
  heroBannerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});
export default HeroBanner;
