import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const backgroundImage = require('../../assets/img/otp.jpg');

const RegisterByOTPScreen = ({ navigation }) => { // Pass the navigation prop
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');

  const handleNext = async () => {
    switch (step) {
      case 1:
          // POST request to backend endpoint to submit phone number
          try {
            // const response = await axios.post('http://localhost:8000/api/signup/request-otp', {
            //   phoneNumber: phoneNumber,
            // });
            setStep(step + 1);
          } catch (error) {
            console.error(error); 
          }
        break;
      case 2:
          // POST request to backend endpoint to submit OTP
          try {
            // const response = await axios.post('http://localhost:8000/api/signup/verify-otp', {
            //   otp: otp,
            // });
            setStep(step + 1);
          } catch (error) {
            console.error(error); 
          }
        break;
      case 3:
          // POST request to backend endpoint to submit fullname
          try {
            // const response = await axios.post('http://localhost:8000/api/signup/user-info', {
            //   fullname: name,
            // });
            //Goto Overview
            navigation.navigate('Overview');
          } catch (error) {
            console.error(error); 
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
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>We are automatically detecting a SMS send to your mobile number ********7755</Text>
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
            <Text style={styles.title}>Enter Your Name</Text>
            <Text style={styles.subtitle}>Provide a number you go by or a nickname</Text>
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

export default RegisterByOTPScreen;
