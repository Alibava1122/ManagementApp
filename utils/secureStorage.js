import EncryptedStorage from 'react-native-encrypted-storage';

export const secureStore = {
  async setItem(key, value) {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing secure data:', error);
    }
  },

  async getItem(key) {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving secure data:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing secure data:', error);
    }
  },
}; 