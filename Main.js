import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setInitialUser } from "./features/auth/authSlice";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useNotifications } from "./hooks/useNotifications";
import * as Notifications from "expo-notifications";
import analytics from "@react-native-firebase/analytics";

// Setup the stack navigator
const Stack = createNativeStackNavigator();

// Disable splashscreen hide
SplashScreen.preventAutoHideAsync();

// Import the screens
import App from "./screens/App";
import Login from "./screens/Login";
import Otp from "./screens/OTP";
import RegisterName from "./screens/RegisterName";
import RegisterEmail from "./screens/RegisterEmail";
import Settings from "./screens/Profile";
import OnBoard from "./screens/OnBoard";
import Transfers from "./screens/Transfers";
import Transfer from "./screens/Transfer";
import JobDetails from "./screens/JobDetails";
import Success from "./screens/Success";
import AccountInformation from "./screens/AccountInformation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const linking = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Transfer: {
        path: "transfer/:transferId",
      },
      Transfers: "transfers",
      Success: "success",
      Job: {
        path: "job",
      },
    },
  },
};

const Main = () => {
  const dispatch = useDispatch();
  const { handleNoticationResopnse } = useNotifications();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.name && user.email) {
      // Add the user Id and properties
      analytics().setUserId(user._id);
      analytics().setUserProperties({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    // Wait for 2 seconds before hiding the splashscreen
    const delay = async (time) => {
      await new Promise((resolve) => setTimeout(resolve, time));
    };

    delay(2000);

    // Hide the spashscreen
    SplashScreen.hideAsync();

    dispatch(setInitialUser());

    Notifications.addNotificationReceivedListener(() => {
      // Action when the notification is received
      // return true;
    });

    // Add the resopnse listner
    const responseListner =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNoticationResopnse(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListner);
    };
  }, []);

  // Load the fonts
  const [Loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!Loaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            initialRouteName: "otp",
            headerShown: false,
          }}
        >
          {user && user.name && user.email ? (
            <>
              <Stack.Screen name="App" component={App} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Transfers" component={Transfers} />
              <Stack.Screen name="Transfer" component={Transfer} />
              <Stack.Screen name="Success" component={Success} />
              <Stack.Screen name="Job" component={JobDetails} />
            </>
          ) : (
            <>
              <Stack.Screen name="Boarding" component={OnBoard} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Otp" component={Otp} />
              <Stack.Screen name="RegisterName" component={RegisterName} />
              <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
              <Stack.Screen name="Account" component={AccountInformation} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
