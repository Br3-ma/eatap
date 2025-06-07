import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Step3Media = ({ form, pickMedia, removeMedia }) => {
    return (
        <Animatable.View animation="fadeInRight" style={styles.step}>
            <View style={styles.mediaSection}>
                <Text style={styles.sectionTitle}>Product Images</Text>
                <Button
                    mode="contained"
                    onPress={() => pickMedia('images')}
                    style={styles.input}
                    icon="image-multiple"
                >
                    Add Images
                </Button>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaContainer}>
                    {form.images.map((image, index) => (
                        <View key={index} style={styles.mediaItem}>
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.mediaPreview}
                                resizeMode="cover"
                            />
                            <IconButton
                                icon="close-circle"
                                size={24}
                                style={styles.removeMediaButton}
                                onPress={() => removeMedia('images', index)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.mediaSection}>
                <Text style={styles.sectionTitle}>Product Videos</Text>
                <Button
                    mode="contained"
                    onPress={() => pickMedia('videos')}
                    style={styles.input}
                    icon="video"
                >
                    Add Videos
                </Button>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaContainer}>
                    {form.videos.map((video, index) => (
                        <View key={index} style={styles.mediaItem}>
                            <View style={styles.videoPreview}>
                                <MaterialCommunityIcons name="video" size={40} color="#666" />
                                <Text style={styles.videoText}>Video {index + 1}</Text>
                            </View>
                            <IconButton
                                icon="close-circle"
                                size={24}
                                style={styles.removeMediaButton}
                                onPress={() => removeMedia('videos', index)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    step: {
        marginBottom: 20,
    },
    mediaSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 10,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    mediaContainer: {
        marginTop: 10,
    },
    mediaItem: {
        marginRight: 10,
        position: 'relative',
    },
    mediaPreview: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    videoPreview: {
        width: 120,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoText: {
        marginTop: 5,
        color: '#666',
    },
    removeMediaButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
});

export default Step3Media; 