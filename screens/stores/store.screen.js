import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/my-store-header';
import PerformanceCard from '../../components/my-store-performance';
import QuickActions from '../../components/my-store-actions';
import MenuGrid from '../../components/my-store-menu';
import RecentActivity from '../../components/my-store-activity';
import MyStoreDetails from '../../components/my-store-details';

const MyStore = ({ navigation, route }) => {
    const [storeDetails, setStoreDetails] = useState(null);

    useEffect(() => {
        const loadStoreDetails = async () => {
            try {
                // First check if we have store details in route params
                if (route.params?.storeDetails) {
                    setStoreDetails(route.params.storeDetails);
                    return;
                }

                // If not, try to get from AsyncStorage
                const jsonValue = await AsyncStorage.getItem('storeDetails');
                if (jsonValue) {
                    const data = JSON.parse(jsonValue);
                    if (data.status === 'success' && data.data) {
                        setStoreDetails(data.data);
                    }
                }
            } catch (e) {
                console.error('Error reading store details:', e);
            }
        };

        loadStoreDetails();
    }, [route.params]);

    const [quickActions] = useState([
        { name: 'Add\nProduct', icon: 'plus-circle', color: '#059669', onPress: () => navigation.navigate('AddProduct', { store_id: storeDetails?.id }), type: 'Feather' },
        { name: 'Quick\nSale', icon: 'cash-fast', color: '#2563eb', onPress: () => navigation.navigate('QuickSale'), type: 'MaterialCommunityIcons' },
        { name: 'Inventory', icon: 'warehouse', color: '#7c3aed', onPress: () => navigation.navigate('Stock'), type: 'FontAwesome5' }
    ]);

    const menuItems = [
        { name: 'Products', icon: 'box', color: '#059669', onPress: () => navigation.navigate('Products'), stats: '52 Items' },
        { name: 'Stock', icon: 'warehouse', color: '#ea580c', onPress: () => navigation.navigate('Stock'), stats: '73% In Stock' },
        { name: 'Accounts', icon: 'money-bill', color: '#0d9488', onPress: () => navigation.navigate('Accounts'), stats: '$24,560' },
        { name: 'Marketing', icon: 'bullhorn', color: '#7c3aed', onPress: () => navigation.navigate('Marketing'), stats: '3 Campaigns' }
    ];

    const renderIcon = (item) => {
        switch (item.type) {
            case 'Feather':
                return <Feather name={item.icon} size={24} color="#fff" />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />;
            default:
                return <FontAwesome5 name={item.icon} size={24} color="#fff" />;
        }
    };

    if (!storeDetails) {
        return null; // Or a loading screen
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header storeDetails={storeDetails} navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <PerformanceCard storeDetails={storeDetails} />
                <QuickActions quickActions={quickActions} renderIcon={renderIcon} />
                <MyStoreDetails storeDetails={storeDetails} />
                <MenuGrid menuItems={menuItems} />
                <RecentActivity storeDetails={storeDetails} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 20,
    },
});

export default MyStore;