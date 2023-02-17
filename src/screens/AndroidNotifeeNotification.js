import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidBadgeIconType, AndroidCategory, AndroidColor, AndroidImportance, AndroidVisibility, TriggerType } from '@notifee/react-native';

const AndroidNotifeeNotification = props => {

        // Request permissions (required for iOS)
        // await notifee.requestPermission()

        async function onCreateTriggerNotification() {
            const date = new Date(Date.now());
            date.setHours(15);
            date.setMinutes(30);

            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
              });
        
            // Create a time-based trigger
            const trigger = {
              type: TriggerType.TIMESTAMP,
              timestamp:  Date.now() + 1000, // fire at 11:10am (10 minutes before meeting)
            };
        
            // Create a trigger notification
            await notifee.createTriggerNotification(
              {
                title: 'Meeting with Gina',
                body: 'Today at 11:00pm',
                android: {
                  channelId: channelId,
                },
              },
              trigger,
            );
          


    }

    return (
        <>
            <View>
                <Button title="Display Notification" onPress={() => { onCreateTriggerNotification() }} />
            </View>
        </>
    )
}

export default AndroidNotifeeNotification;