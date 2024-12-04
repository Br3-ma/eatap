import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SharedElement } from 'react-navigation-shared-element';

const CartItem = ({ item, index, handleQuantityChange, scrollY }) => {
  return (
    <Animated.View 
      style={[styles.cartItem, {
        transform: [{
          scale: scrollY.interpolate({
            inputRange: [-50, 0, 100 * index, 100 * (index + 1)],
            outputRange: [0.98, 1, 1, 0.96]
          })
        }]
      }]}
    >
      <SharedElement id={`item.${item.id}.image`}>
        <View style={styles.imageContainer}>
          <BlurView intensity={20} style={styles.imageBlur}>
            <MaterialCommunityIcons name="food" size={24} color="#4CAF50" />
          </BlurView>
        </View>
      </SharedElement>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>K{item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(index, -1)}
          >
            <MaterialCommunityIcons name="minus" size={20} color="#4CAF50" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(index, 1)}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleQuantityChange(index, -item.quantity)}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
});

export default CartItem;
