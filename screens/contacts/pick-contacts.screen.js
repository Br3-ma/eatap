import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

// const backgroundImage = require('../../assets/a.jpg');
const backgroundImage = '';

const PickContactScreen = ({ navigation }) => { 
    const handleNext = async () => {
        navigation.navigate('Main');
    }

    return (
    <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay}>
            <Text style={styles.title}>Pick a Person</Text>
            <Text style={styles.subtitle}>Select a person you are sending to.</Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                Continue to Pay
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
    backgroundColor: 'rgba(0, 0, 0, 0)', // Greenish dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'green',
  },
  subtitle:{
    fontSize: 14,
    marginBottom: 20,
    color: 'green',
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

export default PickContactScreen;
