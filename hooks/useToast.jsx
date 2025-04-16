import { Platform, ToastAndroid, Alert } from 'react-native';

const useToast = () => {
  const showToast = (message , isError = false) => {
    const toastMessage = message || (isError ? 'Operation Failed' : 'Operation Successful');

    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        toastMessage,
        isError ? ToastAndroid.LONG : ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      Alert.alert(toastMessage);
    }
  };

  return { showToast };
};

export default useToast;