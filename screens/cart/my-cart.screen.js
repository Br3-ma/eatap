import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

const backgroundImage = require('../../assets/a.jpg');

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems).map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 1
          }));
          consolidateItems(parsedItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const consolidateItems = (items) => {
    const consolidated = items.reduce((acc, item) => {
      const existing = acc.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setCartItems(consolidated);
  };

  const handleShowContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
        setModalVisible(true);
      }
    }
  };

  const selectContact = async (contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      await AsyncStorage.setItem('collector', contact.phoneNumbers[0].number);
      setModalVisible(false);  // Assume closing modal after selection
      navigation.navigate('Payment');  // Navigate to Payment or next step
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = 0.05 * totalPrice;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="angle-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>K{item.price.toFixed(2)}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(index)}>
                  <FontAwesome name="minus-circle" size={24} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(index)}>
                  <FontAwesome name="plus-circle" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                  <FontAwesome name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          ListEmptyComponent={<Text style={styles.emptyCart}>Your cart is empty</Text>}
        />
        <View style={styles.bottomToolbar}>
          <Text style={styles.total}>Total: K{totalPrice.toFixed(2)}</Text>
          <Text style={styles.serviceFee}>Service Fee: K{serviceFee.toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleShowContacts}>
            <Text style={styles.buyNowText}>Select Contact</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select a Contact</Text>
              <FlatList
                data={contacts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.contactItem} onPress={() => selectContact(item)}>
                    <Text style={styles.contactName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 23,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft:20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: 'white',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10,
  },
  emptyCart: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    color: 'white',
  },
  serviceFee: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  buyNowButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
  },
  buyNowText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  contactItem: {
    padding: 10,
    marginVertical: 8,
  },
  contactName: {
    fontSize: 16,
    color: 'black',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;
