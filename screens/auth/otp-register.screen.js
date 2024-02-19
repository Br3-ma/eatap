import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const RegisterByOTPScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleRegister = () => {
    // Perform registration logic based on the current step
    if (step === 1) {
      // For Step 1 (Phone Number), move to Step 2
      handleNext();
    } else if (step === 2) {
      // For Step 2 (OTP), move to Step 3 or perform additional validation
      // In this example, move to Step 3 directly
      handleNext();
    } else if (step === 3) {
      // For Step 3 (Name), perform final registration logic
      // Redirect to the next screen upon successful registration

      // For simplicity, let's assume registration is successful
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Step 1: Enter Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Step 2: Enter OTP</Text>

          <TextInput
            style={styles.input}
            placeholder="OTP"
            onChangeText={(text) => setOtp(text)}
            keyboardType="numeric"
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Step 3: Enter Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.button}>
            <ChevronLeftIcon />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          {step < 3 ? <ChevronRightIcon /> : <Text>Register</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white', // Add a background color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007AFF', // Add a background color for buttons
    padding: 10,
    borderRadius: 8,
  },
});

export default RegisterByOTPScreen;
