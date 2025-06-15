import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => {
    try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (!storedUserInfo) {
            return null;
        }

        const parsedUserInfo = JSON.parse(storedUserInfo);
        const userId = parsedUserInfo.user.id || parsedUserInfo.user._id;

        return {
            userId,
            fullUserInfo: parsedUserInfo
        };
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}; 