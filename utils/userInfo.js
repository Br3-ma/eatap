import AsyncStorage from '@react-native-async-storage/async-storage';

// User storage keys
const USER_INFO_KEY = 'userInfo';
const USER_TOKEN_KEY = 'userToken';

/**
 * Save user information to device storage
 * @param {Object} userInfo - User information object
 * @returns {Promise<void>}
 */
export const saveUserInfo = async (userInfo) => {
    try {
        await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        console.log('User info saved successfully');
    } catch (error) {
        console.error('Error saving user info:', error);
        throw error;
    }
};

/**
 * Get user information from device storage
 * @returns {Promise<Object|null>} User information object or null if not found
 */
export const getUserInfo = async () => {
    try {
        const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};

/**
 * Save user authentication token
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const saveUserToken = async (token) => {
    try {
        await AsyncStorage.setItem(USER_TOKEN_KEY, token);
        console.log('User token saved successfully');
    } catch (error) {
        console.error('Error saving user token:', error);
        throw error;
    }
};

/**
 * Get user authentication token
 * @returns {Promise<string|null>} Authentication token or null if not found
 */
export const getUserToken = async () => {
    try {
        return await AsyncStorage.getItem(USER_TOKEN_KEY);
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} True if user is logged in
 */
export const isUserLoggedIn = async () => {
    try {
        const userInfo = await getUserInfo();
        const token = await getUserToken();
        return !!(userInfo && token);
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
};

/**
 * Clear all user data from storage
 * @returns {Promise<void>}
 */
export const clearUserData = async () => {
    try {
        await AsyncStorage.multiRemove([USER_INFO_KEY, USER_TOKEN_KEY]);
        console.log('User data cleared successfully');
    } catch (error) {
        console.error('Error clearing user data:', error);
        throw error;
    }
};

/**
 * Update specific user information
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<void>}
 */
export const updateUserInfo = async (updates) => {
    try {
        const currentUserInfo = await getUserInfo();
        if (currentUserInfo) {
            const updatedUserInfo = { ...currentUserInfo, ...updates };
            await saveUserInfo(updatedUserInfo);
            console.log('User info updated successfully');
        }
    } catch (error) {
        console.error('Error updating user info:', error);
        throw error;
    }
};

/**
 * Get user's phone number
 * @returns {Promise<string|null>} Phone number or null if not found
 */
export const getUserPhoneNumber = async () => {
    try {
        const userInfo = await getUserInfo();
        return userInfo?.phoneNumber || null;
    } catch (error) {
        console.error('Error getting user phone number:', error);
        return null;
    }
};

/**
 * Get user's full name
 * @returns {Promise<string|null>} Full name or null if not found
 */
export const getUserFullName = async () => {
    try {
        const userInfo = await getUserInfo();
        return userInfo?.fullname || userInfo?.name || null;
    } catch (error) {
        console.error('Error getting user full name:', error);
        return null;
    }
};

/**
 * Check if user is an existing user (vs new registration)
 * @returns {Promise<boolean>} True if user is existing
 */
export const isExistingUser = async () => {
    try {
        const userInfo = await getUserInfo();
        return userInfo?.isExistingUser || false;
    } catch (error) {
        console.error('Error checking if user is existing:', error);
        return false;
    }
}; 