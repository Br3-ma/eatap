import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StoreSearchHeader = ({ totalStores, onFilterPress }) => (
    <View style={styles.header}>
        <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Discover Stores</Text>
            <Text style={styles.headerSubtitle}>
                {totalStores} store{totalStores !== 1 ? 's' : ''}
            </Text>
        </View>
        <TouchableOpacity
            style={styles.filterButton}
            onPress={onFilterPress}
        >
            <MaterialIcons name="filter-list" size={24} color="#666" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'column',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#777',
    },
    filterButton: {
        padding: 8,
    }
});

export default React.memo(StoreSearchHeader);



// const renderHeader = () => (
//     <View style={styles.header}>
//         <View style={styles.headerContent}>
//             <Text style={styles.headerTitle}>Discover Stores</Text>
//             <Text style={styles.headerSubtitle}>
//                 {totalStores} store{totalStores !== 1 ? 's' : ''} available
//             </Text>
//         </View>
//         <TouchableOpacity
//             style={styles.filterButton}
//             onPress={() => Alert.alert('Filters', 'Filter options coming soon!')}
//         >
//             <MaterialIcons name="filter-list" size={24} color="#666" />
//         </TouchableOpacity>
//     </View>
// );