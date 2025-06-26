import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, InteractionManager } from 'react-native';
import { getUserInfo } from './userInfo';

export const useAppState = () => {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const appState = useRef(AppState.currentState);
    const initializationTimeout = useRef(null);

    const initializeApp = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Set a timeout for initialization
            initializationTimeout.current = setTimeout(() => {
                if (!isReady) {
                    setError('Initialization timeout. Please try again.');
                    setIsLoading(false);
                }
            }, 10000); // 10 second timeout

            // Initialize user info
            const user = await getUserInfo();
            setUserInfo(user);

            // Wait for interactions to complete
            await InteractionManager.runAfterInteractions();

            // Clear timeout and set ready
            if (initializationTimeout.current) {
                clearTimeout(initializationTimeout.current);
            }

            setIsReady(true);
            setIsLoading(false);
        } catch (error) {
            console.error('App initialization error:', error);
            setError(error.message || 'Failed to initialize app');
            setIsLoading(false);

            if (initializationTimeout.current) {
                clearTimeout(initializationTimeout.current);
            }
        }
    }, [isReady]);

    const retryInitialization = useCallback(() => {
        setIsReady(false);
        setError(null);
        setIsLoading(true);
        initializeApp();
    }, [initializeApp]);

    const handleAppStateChange = useCallback((nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // App has come to foreground
            console.log('App has come to foreground');
        } else if (
            appState.current === 'active' &&
            nextAppState.match(/inactive|background/)
        ) {
            // App has gone to background
            console.log('App has gone to background');
        }

        appState.current = nextAppState;
    }, []);

    useEffect(() => {
        // Listen for app state changes
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // Initialize app
        initializeApp();

        return () => {
            subscription?.remove();
            if (initializationTimeout.current) {
                clearTimeout(initializationTimeout.current);
            }
        };
    }, [handleAppStateChange, initializeApp]);

    return {
        isReady,
        error,
        isLoading,
        userInfo,
        retryInitialization,
    };
};

export const useErrorHandler = () => {
    const [error, setError] = useState(null);

    const handleError = useCallback((error, context = '') => {
        const errorMessage = error?.message || error || 'An unexpected error occurred';
        const fullError = context ? `${context}: ${errorMessage}` : errorMessage;

        console.error('Error handled:', fullError);
        setError(fullError);

        // Auto-clear error after 5 seconds
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        error,
        handleError,
        clearError,
    };
};

export const usePerformanceOptimizer = () => {
    const [isOptimized, setIsOptimized] = useState(false);

    const optimizePerformance = useCallback(async () => {
        try {
            // Wait for all interactions to complete
            await InteractionManager.runAfterInteractions();

            // Additional performance optimizations can be added here
            // Such as preloading critical data, optimizing images, etc.

            setIsOptimized(true);
        } catch (error) {
            console.warn('Performance optimization failed:', error);
        }
    }, []);

    return {
        isOptimized,
        optimizePerformance,
    };
}; 