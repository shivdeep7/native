import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

// Get the state
import {
  reset,
  updatePushStatus,
  updatePushNotificationToken,
} from "../features/user/userSlice";

export const useNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const registerForPushNofitication = async () => {
    if (!user) {
      console.log("killed");
      return;
    }

    // Check if we are using a physial device
    if (Device.isDevice) {
      // Get the existing permission
      const { status: existingStatus } = Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log(finalStatus);

      // The permissions does not exists
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Notifications ",
          "Open settings to allow app notification permisssion",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openURL("app-settings:"),
            },
          ]
        );
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        dispatch(updatePushStatus(true)) &&
          dispatch(updatePushNotificationToken(token));
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      // Save the user notification
      dispatch(updatePushStatus(true)) &&
        dispatch(updatePushNotificationToken(token));
    } else {
      alert("Need a physical device for notifications");
    }
  };

  return {
    registerForPushNofitication,
  };
};
