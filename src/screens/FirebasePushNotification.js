import React, { useEffect } from 'react';
import { Alert, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const FirebasePushNotification = (props) => {
    
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        messaging()
            .subscribeToTopic('weather')
            .then(() => console.log('Subscribed to topic!'));

        () => {
            messaging()
                .unsubscribeFromTopic('weather')
                .then(() => console.log('Unsubscribed fom the topic!'));
        }
    }, [])

    return(
        <Text style={{color : 'black'}}>This is Notification Channel</Text>
    )
}




export default FirebasePushNotification;