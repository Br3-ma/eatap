import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const PublicStoreHeader = ({ store, navigation }) => {
    return (
        <Animatable.View animation="fadeIn" style={styles.header}>
            <Image source={{ uri: store.image }} style={styles.coverImage} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeName}>{store.name}</Text>
                        <View style={styles.storeMetrics}>
                            <View style={styles.metric}>
                                <FontAwesome5 name="star" size={16} color="#FFD700" />
                                <Text style={styles.metricText}>{store.rating}</Text>
                            </View>
                            <View style={styles.metric}>
                                <Ionicons name="location" size={16} color="#fff" />
                                <Text style={styles.metricText}>{store.distance}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    header: { height: '30%' },
    coverImage: { width: '100%', height: '100%' },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70%',
        padding: 20,
    },
    headerContent: { flex: 1, justifyContent: 'space-between' },
    backButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)', // Lighter background for contrast
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Adding shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    storeInfo: { gap: 8 },
    storeName: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
    storeMetrics: { flexDirection: 'row', gap: 15 },
    metric: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    metricText: { color: '#fff', fontSize: 14 },
});

export default PublicStoreHeader;