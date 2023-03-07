import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { sendNotifToken } from "./api";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    getToken();
  }
}

const getToken = async () => {
  const fcmToken = await AsyncStorage.getItem("fcmToken");

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log(error, "error raised in fcmToken");
    }
  }
  // sendNotifToken(fcmToken);
};

export const notificationListener = async () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage);
    Alert.alert(
      "Specie Detected!",
      JSON.stringify(remoteMessage.notification.title)
    );
  });
};
