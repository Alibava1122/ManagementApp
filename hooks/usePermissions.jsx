// import {PERMISSIONS, request} from 'react-native-permissions';

// const usePermissions = () => {
//   const Camera = async () => {
//     try {
//       const result = await request(PERMISSIONS.ANDROID.CAMERA);

//       switch (result) {
//         case 'granted':
//           return true;
//         case 'denied':
//           return false;
//         default:
//           return 'blocked';
//       }
//     } catch (error) {
//       log.info('Error requesting camera permission');
//       return false;
//     }
//   };

//   const Storage = async () => {
//     try {
//       const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

//       switch (result) {
//         case 'granted':
//           return true;
//         case 'denied':
//           return false;
//         default:
//           return result;
//       }
//     } catch (error) {
//       log.info('Error requesting storage permission');
//       return false;
//     }
//   };

//   return {Camera, Storage};
// };

// export default usePermissions;