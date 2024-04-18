// SharedStyles.js
import { StyleSheet } from 'react-native';
import { tailwind } from 'native-wind';

export const sharedStyles = StyleSheet.create({
  container: tailwind('flex-1 justify-center items-center p-4 bg-white'),
  logo: tailwind('w-24 h-24 mb-4'),
  title: tailwind('text-2xl font-bold mb-4 text-gray-800'),
  input: tailwind('w-full h-10 border border-gray-300 rounded px-4 mb-4'),
  button: tailwind('bg-blue-500 rounded-full py-2 px-8'),
  buttonText: tailwind('text-white text-base font-bold'),
  forgotPassword: tailwind('mt-4'),
  forgotPasswordText: tailwind('text-blue-500 text-sm'),
});
