import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import * as Linking from "expo-linking";

import { REACT_APP_PROJECT_ID as PROJECT_ID } from "@env";
import analytics from "@react-native-firebase/analytics";

// Get the state
import {
  reset,
  updatePushStatus,
  updatePushNotificationToken,
} from "../features/user/userSlice";

export const useNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle the nofication response
  const handleNoticationResopnse = async (response) => {
    const data = response.notification.request.content.data;

    if (data?.url) {
      // Log that user tried to open the notification
      analytics().logEvent("notification_opened", {
        url: data.url,
      });

      Linking.openURL(data.url);
      return;
    }
  };

  // Register for the push notification
  const registerForPushNofitication = async () => {
    if (!user) {
      return;
    }

    // Check if we are using a physial device
    if (Device.isDevice) {
      // Get the existing permission
      const { status: existingStatus } = Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // The permissions does not exists
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: PROJECT_ID,
        })
      ).data;

      // Save the user notification
      dispatch(updatePushStatus(true)) &&
        dispatch(updatePushNotificationToken(token));
    } else {
      alert("Need a physical device for notifications");
    }
  };

  return {
    registerForPushNofitication,
    handleNoticationResopnse,
  };
};
