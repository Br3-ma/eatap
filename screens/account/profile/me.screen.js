import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const MeScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/profile/avatar.png')} style={styles.profilePicture} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileBio}>Web Developer | UI/UX Designer</Text>
      </View>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => alert('Change Password')} style={styles.linkItem}>
          <MaterialCommunityIcons name="lock" style={styles.linkIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Edit Profile')} style={styles.linkItem}>
          <MaterialCommunityIcons name="account-edit-outline" size={24} style={styles.linkIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Upload Profile')} style={styles.linkItem}>
          {/* <Icon name="cloud-upload-alt"  /> */}
          <AntDesign name="picture" style={styles.linkIcon} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <DetailItem label="Location" value="New York, USA" />
        <DetailItem label="Email" value="john.doe@example.com" />
        <DetailItem label="Website" value="www.example.com" onPress={() => alert('Visit website')} />
      </View>

      {/* <TouchableOpacity style={styles.editButton} onPress={() => alert('Edit Profile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const DetailItem = ({ label, value, onPress }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    {onPress ? (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.detailValue, styles.link]}>{value}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.detailValue}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#d0db34',
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6d8246',
  },
  profileBio: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  details: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#2c3e50',
  },
  detailValue: {
    color: '#555',
  },
  link: {
    color: '#8fc826',
    textDecorationLine: 'underline',
  },
  editButton: {
    backgroundColor: '#8fc826',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //   Links
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  linkItem: {
    flex: 1,
    padding: 10,
    backgroundColor: '#8fc826',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  linkIcon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 5,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MeScreen;
