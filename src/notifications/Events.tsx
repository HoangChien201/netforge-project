import { Notification, NotificationBackgroundFetchResult, NotificationCompletion, Notifications, Registered, RegistrationError } from "react-native-notifications";



export const registerRemoteNotificationsEvent = () => {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({ alert: true, sound: true, badge: true });
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
    });
    Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion: (response: NotificationCompletion) => void) => {
        console.log("Notification Received - Background", JSON.stringify(notification.payload));

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: true });
    });

    Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log("Notification Received--");
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        console.log("Notification Received -");
        console.error(event);
    });
}

export const postLocalNotification=(notification:Notification)=>{
    Notifications.postLocalNotification(notification);
}