import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CreateAdScreen = () => {
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    // Request permission for push notifications (if not already granted)
    const requestNotificationPermission = async () => {
      try {
        await messaging().requestPermission();
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();

    // Get the current device token
    const getDeviceToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('Device Token:', token);

        // Set the device token in state for later use
        setDeviceToken(token);

        // Get the UID of the current user (replace this with your authentication logic)
        const currentUserUID = auth().currentUser.uid;

        // Store the device token in Firestore along with the UID
        await firestore().collection('usertoken').doc(currentUserUID).set({
          token: token,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

        console.log('Device Token stored in Firestore for UID:', currentUserUID);
      } catch (error) {
        console.error('Error getting or storing device token:', error);
      }
    };

    getDeviceToken();
  }, []);

  const sendTokenToAPI = async () => {
    console.log("in api")
    try {
      if (deviceToken) {
        // Send the device token to your API
        const response = await fetch('https://testamaan.onrender.com/send-noti', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tokens: [deviceToken],
  }),
});

const responseText = await response.text();
console.log('Raw response from the server:', responseText);


        const responseData = await response.json();
        console.log('API response:', responseData);
      } else {
        console.error('Device token not available.');
      }
    } catch (error) {
      console.error('Error sending device token to API:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Getting Device Token...</Text>
      <Button title="Send Device Token to API" onPress={sendTokenToAPI} />
    </View>
  );
};

export default CreateAdScreen;
