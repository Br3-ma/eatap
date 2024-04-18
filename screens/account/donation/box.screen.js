import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const BoxScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.boxContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
             <View key={index} style={styles.box}>
             <View style={styles.boxHeader}>
               <MaterialCommunityIcons name="package-variant" style={styles.boxIcon} />
               <Text style={styles.boxHeaderText}>Donation No.{index + 1}</Text>
               
               {/* Timestamp with prefix icon */}
               <View style={styles.timestampContainer}>
                 <MaterialCommunityIcons name="clock" style={styles.timestampIcon} />
                 <Text style={styles.detailValue}>10 mins ago</Text>
               </View>
             </View>
             <View style={styles.boxDetails}>
               <Text style={styles.detailLabel}>Status:</Text>
               <Text style={styles.detailValue}>Not Collected</Text>
             </View>
             <View style={styles.boxDetails}>
               <Text style={styles.detailLabel}>Locations:</Text>
               <Text style={styles.detailValue}>Shoprite, Pick n Pay, A & K Dealers</Text>
             </View>
             <View style={styles.boxDetails}>
               <Text style={styles.detailLabel}>Contents:</Text>
               <Text style={styles.detailValue}>Food, Groceries, and Electronics</Text>
             </View>

             {/* Add centered space-between items */}
             <View style={styles.centeredItemsContainer}>
               <View style={styles.centeredItem}>
                 <Text style={styles.centeredItemLabel}>Code:</Text>
                 <Text style={styles.centeredItemValue}>3820472</Text>
               </View>
               <View style={styles.centeredItem}>
                 <Text style={styles.centeredItemLabel}>Donor:</Text>
                 <Text style={styles.centeredItemValue}>Bremah Nyeleti</Text>
               </View>
               <View style={styles.centeredItem}>
                 <Text style={styles.centeredItemLabel}>Expiration:</Text>
                 <Text style={styles.centeredItemValue}>12/31/2026</Text>
               </View>
             </View>
           </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '100%',
    backgroundColor: '#8fc826',
    marginVertical: 10,
    borderRadius: 8,
    padding: 15,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  boxIcon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  boxHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    color: '#fff',
    marginRight: 5,
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#fff',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  centeredItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  centeredItem: {
    alignItems: 'center',
  },
  centeredItemLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredItemValue: {
    color: '#fff',
  },
});

export default BoxScreen;
