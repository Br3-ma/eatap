import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../../assets/img/otp.jpg');

const RegisterByOTPScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');

  const handleNext = async () => {
    switch (step) {
      case 1:
          try {
            await axios.post('http://localhost/eat-app-server/api/signup/request-otp', { phoneNumber });
            setStep(step + 1);
          } catch (error) {
            console.error('Request OTP Error:', error);
          }
        break;
      case 2:
          try {
            await axios.post('http://localhost/eat-app-server/api/signup/verify-otp', { otp });
            setStep(step + 1);
          } catch (error) {
            console.error('Verify OTP Error:', error);
          }
        break;
      case 3:
          try {
            const response = await axios.post('http://localhost/eat-app-server/api/signup/user-info', {
              fullname: name,
              phoneNumber,
            });
            // Save the user info to AsyncStorage
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
            navigation.navigate('Overview');
          } catch (error) {
            console.error('Save User Info Error:', error);
          }
        break;
      default:
        break;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.title}>Enter Your Mobile Number</Text>
            <Text style={styles.subtitle}>We will send you a confirmation code</Text>
            <TextInput
              style={styles.input}
              placeholder="097 -- -- ---"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>Check your SMS messages</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOTP}
              keyboardType="number-pad"
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.title}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        {renderStepContent()}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.button} onPress={() => setStep(step - 1)}>
              <FontAwesome name="angle-left" size={24} color="green" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <FontAwesome name={step >= 3 ? "check" : "angle-right"} size={24} color="green" />
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 51, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
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
  },
});

export default RegisterByOTPScreen;
