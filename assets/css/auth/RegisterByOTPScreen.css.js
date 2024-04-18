// RegisterByOTPScreenStyles.js

import { StyleSheet } from 'react-native';

const RegisterByOTPScreenStyles = StyleSheet.create({
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
    backgroundColor: '#bdc8d4', // Add a background color for buttons
    padding: 10,
    borderRadius: 8,
  },
});

export default RegisterByOTPScreenStyles;
