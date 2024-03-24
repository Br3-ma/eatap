import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const backgroundImage = require('../../assets/img/otp.jpg');

const RegisterByOTPScreen = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');

  const handleNext = async () => {
    switch (step) {
      case 1:
        // POST request to backend endpoint to submit phone number
        try {
          // const response = await axios.post('YOUR_LARAVEL_API_URL/api/submit-phone-number', {
          //   phoneNumber: phoneNumber,
          // });
          // console.log(response.data); 
           setStep(step + 1);
        } catch (error) {
          console.error(error); // Handle error
        }
        break;
      case 2:
        // POST request to backend endpoint to submit OTP
        try {
          // const response = await axios.post('YOUR_LARAVEL_API_URL/api/submit-otp', {
          //   otp: otp,
          // });
          // console.log(response.data); // Handle response
          setStep(step + 1);
        } catch (error) {
          console.error(error); // Handle error
        }
        break;
      case 3:
        // POST request to backend endpoint to submit full name
        try {
          // const response = await axios.post('YOUR_LARAVEL_API_URL/api/submit-full-name', {
          //   name: name,
          // });
          // console.log(response.data); // Handle response
          // Store response in SQLite storage
        } catch (error) {
          console.error(error); // Handle error
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
            <Text style={styles.title}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="097 -- -- ---"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.title}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="X X X X X"
              value={otp}
              onChangeText={setOTP}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.title}>What's your name?</Text>
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
              <FontAwesome name="angle-left" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <FontAwesome name={step >= 3 ? "check" : "angle-right"} size={24} color="white" />
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
    backgroundColor: 'rgba(0, 51, 0, 0.7)', // Greenish dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
  },
});

export default RegisterByOTPScreen;
