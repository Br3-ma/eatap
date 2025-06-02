// SideMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SideMenu = ({ navigation, closeMenu }) => {
  return (
    <SafeAreaView style={styles.menuContainer}>
      <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
        <MaterialCommunityIcons name="close" size={30} color="#FF6B6B" />
      </TouchableOpacity>
      
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyStore')}>
          <MaterialCommunityIcons name="store" size={24} color="#FF6B6B" />
          <Text style={styles.menuText}>My Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons name="cog" size={24} color="#FF6B6B" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
          <MaterialCommunityIcons name="bell" size={24} color="#FF6B6B" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Security')}>
          <MaterialCommunityIcons name="shield-lock" size={24} color="#FF6B6B" />
          <Text style={styles.menuText}>Security</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default SideMenu;
