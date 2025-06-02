import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StoreToolbar = ({ onAction }) => {
    return (
        <View style={styles.toolbar}>
            <TouchableOpacity
                style={styles.toolbarButtonPrimary}
                onPress={() => onAction('create')}
            >
                <MaterialIcons name="add-business" size={16} color="#fff" />
                <Text style={styles.toolbarButtonTextPrimary}>Create Store</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toolbarButton}
                onPress={() => onAction('favorites')}
            >
                <MaterialIcons name="favorite" size={16} color="#666" />
                <Text style={styles.toolbarButtonText}>Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toolbarButton}
                onPress={() => onAction('map')}
            >
                <MaterialIcons name="map" size={16} color="#666" />
                <Text style={styles.toolbarButtonText}>Map</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2
    },
    toolbarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 6
    },
    toolbarButtonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#007bff',
        borderRadius: 6
    },
    toolbarButtonText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#666'
    },
    toolbarButtonTextPrimary: {
        marginLeft: 6,
        fontSize: 12,
        color: '#fff'
    }
});

export default StoreToolbar;
