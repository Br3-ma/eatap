import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider, Button, Input } from '@reactsax/reactsax';

const Theme = ({ children }) => {
  const theme = {
    colors: {
      primary: '#007bff', // Example primary color
      background: '#ffffff', // Example background color
      text: '#333333', // Example text color
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Define your font families here
    },
    components: {
      // Define your custom components here
      Button, // Include Button component from React Sax
      Input,  // Include Input component from React Sax
    },
    styles: StyleSheet.create({
      // Define your global styles here
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
      },
      input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    }),
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
