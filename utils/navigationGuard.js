import { getAuthToken } from './api';

export const navigationGuard = async (navigation) => {
  const token = await getAuthToken();
  if (!token) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    return false;
  }
  return true;
}; 