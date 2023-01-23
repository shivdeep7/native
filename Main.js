import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setInitialUser } from "./features/auth/authSlice";

const Stack = createNativeStackNavigator();

// Import the screens
import Home from "./screens/Dash";
import App from "./screens/App";
import Login from "./screens/Login";
import Otp from "./screens/OTP";
import RegisterName from "./screens/RegisterName";
import RegisterEmail from "./screens/RegisterEmail";
import Settings from "./screens/Settings";

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setInitialUser());
  }, []);

  // Load the fonts
  const [Loaded] = useFonts({
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!Loaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ initialRouteName: "otp", headerShown: false }}
        >
          {user && user.name && user.email ? (
            <>
              <Stack.Screen name="app" component={App} />
              <Stack.Screen name="Settings" component={Settings} />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="otp" component={Otp} />
              <Stack.Screen name="RegisterName" component={RegisterName} />
              <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
