import PushNotification from 'react-native-push-notification';

export const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
  });
};

export const setPriceAlert = (asset, targetPrice, type) => {
  PushNotification.localNotificationSchedule({
    title: 'Price Alert',
    message: `${asset.symbol || asset.name} has reached your ${type} price target of $${targetPrice}`,
    date: new Date(Date.now()),
    allowWhileIdle: true,
    repeatType: 'day',
  });
}; 