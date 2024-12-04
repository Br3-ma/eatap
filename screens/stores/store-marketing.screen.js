import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const StoreMarketing = ({ navigation }) => {
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Spring Sale', status: 'Active', budget: 5000 },
        { id: 2, name: 'Summer Campaign', status: 'Paused', budget: 3000 },
        { id: 3, name: 'Holiday Promotions', status: 'Active', budget: 7000 },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCampaignDetails = (campaign) => {
        setSelectedCampaign(campaign);
        setIsDetailModalVisible(true);
    };

    const renderCampaignItem = ({ item }) => (
        <TouchableOpacity style={styles.campaignItem} onPress={() => openCampaignDetails(item)}>
            <View style={styles.campaignItemContent}>
                <Text style={styles.campaignName}>{item.name}</Text>
                <Text style={[styles.campaignStatus, { color: item.status === 'Active' ? '#059669' : '#ef4444' }]}>{item.status}</Text>
                <Text style={styles.campaignBudget}>Budget: ${item.budget}</Text>
            </View>
        </TouchableOpacity>
    );

    const CampaignDetailsModal = () => {
        if (!selectedCampaign) return null;

        return (
            <Modal animationType="slide" transparent={true} visible={isDetailModalVisible} onRequestClose={() => setIsDetailModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <Animatable.View animation="fadeInUp" style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedCampaign.name}</Text>
                            <TouchableOpacity onPress={() => setIsDetailModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#1f2937" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text>Status: {selectedCampaign.status}</Text>
                            <Text>Budget: ${selectedCampaign.budget}</Text>
                        </View>
                        <TouchableOpacity style={styles.modalActionButton} onPress={() => alert('Edit Campaign')}>
                            <Text style={styles.modalActionButtonText}>Edit Campaign</Text>
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
                <Text style={styles.headerTitle}>Marketing Management</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="filter-outline" size={20} color="#1f2937" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#64748b" />
                <TextInput
                    placeholder="Search campaigns..."
                    placeholderTextColor="#64748b"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.quickActionButton}>
                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Campaign List */}
            <FlatList
                data={filteredCampaigns}
                renderItem={renderCampaignItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Campaign Details Modal */}
            <CampaignDetailsModal />
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
    campaignItem:{
       backgroundColor:'#fff',
       borderRadius :10,
       marginBottom :12,
       shadowColor:'#000',
       shadowOffset:{width :0,height :2},
       shadowOpacity :0.05,
       shadowRadius :3,
       elevation :2,
   },
   campaignItemContent:{
       padding :12,
   },
   campaignName:{
       fontSize :15,
       fontWeight :'600',
       color :'#1f2937',
   },
   campaignStatus:{
       fontSize :14,
       fontWeight :'600',
   },
   campaignBudget:{
       fontSize :14,
       color :'#64748b'
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

export default StoreMarketing;