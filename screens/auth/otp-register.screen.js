import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RegisterByOTPScreen = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');

  const handleNext = () => {
    setStep(step + 1);
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
            <Text style={styles.title}>Whats your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Full names"
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
    <View style={styles.container}>
      <View style={styles.steps}>
        {step >= 1 && (
          <Image source={require('../../assets/img/1.jpg')} style={styles.stepImage}/>
        )}
        {/* {step >= 2 && (
          <Image source={require('../../assets/img/1.jpg')} style={styles.stepImage}/>
        )}
        {step >= 3 && (
          <Image source={require('../../assets/img/1.jpg')} style={styles.stepImage}/>
        )} */}
      </View>

      
      {renderStepContent()}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{step >= 3 ? 'Finish' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  steps: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepImage: {
    width: 300,
    height: 300,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterByOTPScreen;
