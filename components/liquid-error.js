import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LiquidError = ({
    title = 'Oops! Something went wrong',
    message = 'We encountered an unexpected error. Please try again.',
    onRetry,
    retryText = 'Try Again'
}) => {
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const pulseAnimation = useRef(new Animated.Value(0)).current;
    const iconScale = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Shake animation
        const shake = Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]);

        // Pulse animation
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );

        // Icon scale animation
        Animated.spring(iconScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Text fade in
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        shake.start();
        pulse.start();

        return () => {
            shake.stop();
            pulse.stop();
        };
    }, []);

    const pulseScale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B6B', '#FF8E8E', '#FFB3B3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            >
                {/* Error icon with shake animation */}
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            transform: [
                                { translateX: shakeAnimation },
                                { scale: iconScale },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.3)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconGradient}
                    >
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={60}
                            color="#FF4757"
                            style={styles.errorIcon}
                        />
                    </LinearGradient>
                </Animated.View>

                {/* Pulse rings around icon */}
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

                {/* Floating error symbols */}
                <Animated.View
                    style={[
                        styles.floatingSymbol,
                        styles.symbol1,
                        {
                            transform: [
                                {
                                    translateY: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -15],
                                    })
                                },
                                {
                                    rotate: shakeAnimation.interpolate({
                                        inputRange: [-10, 10],
                                        outputRange: ['-5deg', '5deg'],
                                    })
                                },
                            ],
                            opacity: pulseAnimation,
                        },
                    ]}
                >
                    <Text style={styles.symbolText}>⚠️</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingSymbol,
                        styles.symbol2,
                        {
                            transform: [
                                {
                                    translateY: pulseAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -20],
                                    })
                                },
                                {
                                    rotate: shakeAnimation.interpolate({
                                        inputRange: [-10, 10],
                                        outputRange: ['5deg', '-5deg'],
                                    })
                                },
                            ],
                            opacity: pulseAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.7, 0],
                            }),
                        },
                    ]}
                >
                    <Text style={styles.symbolText}>❌</Text>
                </Animated.View>

                {/* Error text */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: textOpacity,
                            transform: [
                                {
                                    translateY: textOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.errorTitle}>{title}</Text>
                    <Text style={styles.errorMessage}>{message}</Text>
                </Animated.View>

                {/* Retry button */}
                <Animated.View
                    style={[
                        styles.buttonContainer,
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
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={onRetry}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#FF8C00', '#FF6B35']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.buttonGradient}
                        >
                            <MaterialCommunityIcons
                                name="refresh"
                                size={20}
                                color="#fff"
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>{retryText}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    iconGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIcon: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    pulseRing: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    floatingSymbol: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    symbol1: {
        top: '25%',
        left: '15%',
    },
    symbol2: {
        top: '20%',
        right: '20%',
    },
    symbolText: {
        fontSize: 24,
    },
    textContainer: {
        position: 'absolute',
        bottom: '35%',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    errorTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    errorMessage: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '20%',
        alignItems: 'center',
    },
    retryButton: {
        borderRadius: 30,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default LiquidError; 