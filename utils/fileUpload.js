import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const pickImage = async () => {
  try {
    // Request permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access media library was denied');
      }
    }

    // Pick the image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      // Create form data for the selected image
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      return {
        uri: localUri,
        name: filename,
        type,
      };
    }
    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    throw error;
  }
};

export const validateFile = (file) => {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not supported. Please upload JPG, PNG, or GIF');
  }

  return true;
}; 