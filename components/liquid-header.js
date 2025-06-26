import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width: screenWidth } = Dimensions.get('window');

const LiquidHeader = ({
    title = '🍽️ Chat',
    onRightPress,
    rightIcon = 'magnify',
    showBlur = true,
    gradientColors = ['rgba(255, 179, 0, 0.95)', 'rgba(255, 140, 0, 0.9)']
}) => {
    const titleAnimation = useRef(new Animated.Value(0)).current;
    const iconAnimation = useRef(new Animated.Value(0)).current;
    const pulseAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Title slide in animation
        Animated.spring(titleAnimation, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Icon bounce animation
        Animated.sequence([
            Animated.delay(200),
            Animated.spring(iconAnimation, {
                toValue: 1,
                tension: 100,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        // Pulse animation for visual appeal
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => {
            pulse.stop();
        };
    }, []);

    const pulseScale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            >
                {showBlur && (
                    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
                )}

                {/* Floating particles for liquid effect */}
                <Animated.View
                    style={[
                        styles.floatingParticle,
                        styles.particle1,
                        {
                            transform: [{ scale: pulseScale }],
                            opacity: pulseAnimation,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.floatingParticle,
                        styles.particle2,
                        {
                            transform: [{ scale: pulseScale }],
                            opacity: pulseAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 0],
                            }),
                        },
                    ]}
                />

                {/* Title with slide animation */}
                <Animated.View
                    style={[
                        styles.titleContainer,
                        {
                            transform: [
                                {
                                    translateX: titleAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0],
                                    }),
                                },
                                { scale: titleAnimation },
                            ],
                            opacity: titleAnimation,
                        },
                    ]}
                >
                    <Text style={styles.title}>{title}</Text>
                </Animated.View>

                {/* Right icon with bounce animation */}
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            transform: [
                                { scale: iconAnimation },
                                {
                                    rotate: iconAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['-10deg', '0deg'],
                                    })
                                },
                            ],
                            opacity: iconAnimation,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onRightPress}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.3)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconGradient}
                        >
                            <MaterialCommunityIcons
                                name={rightIcon}
                                size={24}
                                color="#FF8C00"
                                style={styles.icon}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                {/* Bottom border with liquid effect */}
                <View style={styles.bottomBorder}>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.borderGradient}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 100 : 80,
        width: '100%',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    gradientBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
        position: 'relative',
    },
    floatingParticle: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    particle1: {
        top: '30%',
        left: '15%',
    },
    particle2: {
        top: '60%',
        right: '20%',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 0.5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    bottomBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
    },
    borderGradient: {
        flex: 1,
    },
});

export default LiquidHeader; 