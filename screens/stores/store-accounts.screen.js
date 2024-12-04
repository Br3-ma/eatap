import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const StoreAccounts = ({ navigation }) => {
    const [orders, setOrders] = useState([
        { id: 1, date: '2024-12-01', product: 'Classic T-Shirt', amount: 24.99, status: 'Completed' },
        { id: 2, date: '2024-11-28', product: 'Denim Jeans', amount: 59.99, status: 'Pending' },
        { id: 3, date: '2024-11-25', product: 'Leather Jacket', amount: 129.99, status: 'Shipped' },
        { id: 4, date: '2024-11-20', product: 'Sneakers', amount: 89.99, status: 'Completed' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const filteredOrders = orders.filter(order =>
        order.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailModalVisible(true);
    };

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity style={styles.orderItem} onPress={() => openOrderDetails(item)}>
            <View style={styles.orderItemContent}>
                <Text style={styles.orderDate}>{item.date}</Text>
                <Text style={styles.orderProduct}>{item.product}</Text>
                <Text style={[styles.orderAmount, item.status === 'Completed' ? styles.completed : item.status === 'Pending' ? styles.pending : styles.shipped]}>
                    ${item.amount.toFixed(2)}
                </Text>
                <Text style={[styles.orderStatus]}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const OrderDetailsModal = () => {
        if (!selectedOrder) return null;

        return (
            <Modal animationType="slide" transparent={true} visible={isDetailModalVisible} onRequestClose={() => setIsDetailModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <Animatable.View animation="fadeInUp" style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Order Details</Text>
                            <TouchableOpacity onPress={() => setIsDetailModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#1f2937" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text>Date: {selectedOrder.date}</Text>
                            <Text>Product: {selectedOrder.product}</Text>
                            <Text>Amount: ${selectedOrder.amount.toFixed(2)}</Text>
                            <Text>Status: {selectedOrder.status}</Text>
                        </View>
                        <TouchableOpacity style={styles.modalActionButton} onPress={() => alert('Edit Order')}>
                            <Text style={styles.modalActionButtonText}>Edit Order</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Store Orders</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="filter-outline" size={20} color="#1f2937" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#64748b" />
                <TextInput
                    placeholder="Search orders..."
                    placeholderTextColor="#64748b"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.quickActionButton}>
                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Orders List */}
            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Order Details Modal */}
            <OrderDetailsModal />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    headerButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginVertical: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    searchInput: {
        flexGrow: 1,
        height: 50,
        fontSize: 16,
        color:'#1f2937',
    },
    orderItem:{
       backgroundColor:'#fff',
       borderRadius :10,
       marginBottom :12,
       shadowColor:'#000',
       shadowOffset:{width :0,height :2},
       shadowOpacity :0.05,
       shadowRadius :3,
       elevation :2,
   },
   orderItemContent:{
       padding :12,
   },
   orderDate:{
       fontSize :14,
       color :'#64748b',
   },
   orderProduct:{
       fontSize :15,
       fontWeight :'600',
       color :'#1f2937',
   },
   orderAmount:{
       fontSize :15,
       fontWeight :'600',
   },
   completed:{
       color:'#059669'
   },
   pending:{
       color:'#f97316'
   },
   shipped:{
       color:'#3b82f6'
   },
   orderStatus:{
       fontSize :14,
       marginTop :4
   },
   modalOverlay:{
      flex :1,
      backgroundColor :'rgba(0,0,0,0.5)',
      justifyContent :'flex-end'
   },
   modalContainer:{
      backgroundColor:'#fff',
      borderTopLeftRadius :20,
      borderTopRightRadius :20,
      padding :20
   },
   modalHeader:{
      flexDirection :'row',
      justifyContent:'space-between',
      alignItems:'center'
   },
   modalTitle:{
      fontSize :18,
      fontWeight :'700'
   },
   modalContent:{
      marginBottom :20
   },
   modalActionButton:{
      backgroundColor:'#3b82f6',
      borderRadius :10,
      paddingVertical :12
   },
   modalActionButtonText:{
      color:'#fff',
      textAlign:'center'
   }
});

export default StoreAccounts;