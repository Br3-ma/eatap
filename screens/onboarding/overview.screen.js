import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const backgroundImage = require('../../assets/a.jpg');

const OverviewScreen = ({ navigation }) => { 
    const handleNext = async () => {
        navigation.navigate('ContactsPermissions');
    }

    return (
    <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay}>
            <Text style={styles.title}>Welcome to Eatapp</Text>
            <Text style={styles.subtitle}>Getting you ready to go.</Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <FontAwesome name="angle-right" size={24} color="green" />
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 51, 0, 0.7)', // Greenish dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'white',
  },
  subtitle:{
    fontSize: 14,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    color: '#000',
  },
});

export default OverviewScreen;
