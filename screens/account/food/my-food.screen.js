import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const MyFoodScreen = () => {
  return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.boxContainer}>
          {Array.from({ length: 10 }).map((_, index) => (

             <View key={index} style={styles.box}>
                <View style={styles.boxDetails}>
                    <Text style={styles.detailValue}>You have received Food, Groceries, and Electronics from 0772147755. 
                    Visit the stores to pick up your parcel. Expiration date of picking up is 12/31/2026. Transaction No. 3820472</Text>
                </View>

                <View style={styles.boxHeader}>
                    {/* <MaterialCommunityIcons name="package-variant" style={styles.boxIcon} /> */}
                    <Text style={styles.boxHeaderText}>Transaction.{index + 1}</Text>
                    <View style={styles.timestampContainer}>
                        <MaterialCommunityIcons name="clock" style={styles.timestampIcon} />
                        <Text style={styles.detailValue2}>{index + 1}0 mins ago</Text>
                    </View>
                </View>
           </View>

          ))}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '100%',
    backgroundColor: 'white',
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
    color: '#000',
    fontSize: 20,
    marginRight: 10,
  },
  boxHeaderText: {
    color: 'gray',
    fontSize: 16,
  },
  boxDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    color: '#000',
    marginRight: 5,
    fontWeight: 'bold',
  },
  detailValue: {
    color: 'green',
  },
  detailValue2: {
    color: 'gray',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampIcon: {
    color: 'gray',
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
    color: '#000',
    fontWeight: 'bold',
  },
  centeredItemValue: {
    color: '#000',
  },
});

export default MyFoodScreen;
