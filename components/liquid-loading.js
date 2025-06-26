import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LiquidLoading = ({ message = 'Loading your delicious experience...' }) => {
    const pulseAnimation = useRef(new Animated.Value(0)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;
    const reverseRotateAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(0.8)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        );

        // Rotation animation
        const rotate = Animated.loop(
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );

        // Reverse rotation animation
        const reverseRotate = Animated.loop(
            Animated.timing(reverseRotateAnimation, {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true,
            })
        );

        // Scale animation
        const scale = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnimation, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 0.9,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        // Text fade in
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        pulse.start();
        rotate.start();
        reverseRotate.start();
        scale.start();

        return () => {
            pulse.stop();
            rotate.stop();
            reverseRotate.stop();
            scale.stop();
        };
    }, []);

    const spin = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const reverseSpin = reverseRotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    const pulseScale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFB300', '#FF8C00', '#FF6B35']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            >
                {/* Main loading circle */}
                <Animated.View
                    style={[
                        styles.loadingCircle,
                        {
                            transform: [
                                { scale: scaleAnimation },
                                { rotate: spin },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.3)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.circleGradient}
                    />
                </Animated.View>

                {/* Pulse rings */}
                <Animated.View
                    style={[
                        styles.pulseRing,
                        {
                            transform: [{ scale: pulseScale }],
                            opacity: pulseAnimation,
                        },
                    ]}
                />

                <Animated.View
                    style={[
                        styles.pulseRing,
                        {
                            transform: [{ scale: pulseScale }],
                            opacity: pulseAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 0],
                            }),
                        },
                    ]}
                />

                {/* Floating food icons */}
                <Animated.View
                    style={[
                        styles.floatingIcon,
                        styles.icon1,
                        {
                            transform: [
                                {
                                    translateY: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -20],
                                    })
                                },
                                { rotate: spin },
                            ],
                            opacity: pulseAnimation,
                        },
                    ]}
                >
                    <Text style={styles.iconText}>🍕</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingIcon,
                        styles.icon2,
                        {
                            transform: [
                                {
                                    translateY: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -15],
                                    })
                                },
                                { rotate: reverseSpin },
                            ],
                            opacity: pulseAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.7, 0],
                            }),
                        },
                    ]}
                >
                    <Text style={styles.iconText}>🍔</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingIcon,
                        styles.icon3,
                        {
                            transform: [
                                {
                                    translateY: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -25],
                                    })
                                },
                                { rotate: spin },
                            ],
                            opacity: pulseAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 0],
                            }),
                        },
                    ]}
                >
                    <Text style={styles.iconText}>🍜</Text>
                </Animated.View>

                {/* Loading text */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: textOpacity,
                            transform: [
                                {
                                    translateY: textOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.loadingText}>{message}</Text>
                    <View style={styles.dotsContainer}>
                        <Animated.View
                            style={[
                                styles.dot,
                                {
                                    opacity: pulseAnimation,
                                },
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                {
                                    opacity: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.5, 1],
                                    }),
                                },
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                {
                                    opacity: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.3, 1],
                                    }),
                                },
                            ]}
                        />
                    </View>
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    circleGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulseRing: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    floatingIcon: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    icon1: {
        top: '35%',
        left: '20%',
    },
    icon2: {
        top: '30%',
        right: '25%',
    },
    icon3: {
        bottom: '35%',
        left: '30%',
    },
    iconText: {
        fontSize: 20,
    },
    textContainer: {
        position: 'absolute',
        bottom: '25%',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
});

export default LiquidLoading; 