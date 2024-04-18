// RegisterByOTPScreen.js

import React, { useState } from 'react';
import RegisterByOTPScreenView from '../../screens/auth/otp-register.screen';
import axios from 'axios';

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

  const handleRegister = async () => {
    if (step === 1) {
      try {
        const response = await axios.post('localhost:8000/api/send-otp', {
          phone_number: phoneNumber,
        });

        console.log(response.data);
        handleNext();
      } catch (error) {
        console.error('API request failed:', error.message);
      }
    } else if (step === 2) {
      handleNext();
    } else if (step === 3) {
      navigation.navigate('Home');
    }
  };

  return (
    <RegisterByOTPScreenView
      step={step}
      phoneNumber={phoneNumber}
      otp={otp}
      name={name}
      setPhoneNumber={setPhoneNumber}
      setOtp={setOtp}
      setName={setName}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      handleRegister={handleRegister}
    />
  );
};

export default RegisterByOTPScreen;
