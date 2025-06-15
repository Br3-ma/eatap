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
                <Text style={styles.sectionHint}>Add high-quality images to showcase your product</Text>
                <Button
                    mode="contained"
                    onPress={() => pickMedia('images')}
                    style={styles.addButton}
                    labelStyle={styles.buttonLabel}
                    icon="image-multiple"
                    buttonColor="#FF6B35"
                    textColor="#FFFFFF"
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
                                iconColor="#FF6B35"
                                style={styles.removeMediaButton}
                                onPress={() => removeMedia('images', index)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.mediaSection}>
                <Text style={styles.sectionTitle}>Product Videos</Text>
                <Text style={styles.sectionHint}>Upload videos to demonstrate your product in action</Text>
                <Button
                    mode="contained"
                    onPress={() => pickMedia('videos')}
                    style={styles.addButton}
                    labelStyle={styles.buttonLabel}
                    icon="video"
                    buttonColor="#FF6B35"
                    textColor="#FFFFFF"
                >
                    Add Videos
                </Button>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaContainer}>
                    {form.videos.map((video, index) => (
                        <View key={index} style={styles.mediaItem}>
                            <View style={styles.videoPreview}>
                                <MaterialCommunityIcons name="video" size={40} color="#FF6B35" />
                                <Text style={styles.videoText}>Video {index + 1}</Text>
                            </View>
                            <IconButton
                                icon="close-circle"
                                size={24}
                                iconColor="#FF6B35"
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
        backgroundColor: '#FF8C42',
        minHeight: '100%',
        paddingVertical: 20,
    },
    mediaSection: {
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    sectionHint: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 16,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    addButton: {
        marginBottom: 20,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    mediaContainer: {
        marginTop: 10,
        paddingLeft: 5,
    },
    mediaItem: {
        marginRight: 15,
        position: 'relative',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    mediaPreview: {
        width: 130,
        height: 130,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    videoPreview: {
        width: 130,
        height: 130,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    videoText: {
        marginTop: 8,
        color: '#FF6B35',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    removeMediaButton: {
        position: 'absolute',
        top: -12,
        right: -12,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
});

export default Step3Media;