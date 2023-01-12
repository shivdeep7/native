import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

// Import the screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import Otp from "./screens/OTP";
import RegisterName from "./screens/RegisterName";
import RegisterEmail from "./screens/RegisterEmail";

const Main = () => {
  // Load the fonts
  const [Loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Black.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!Loaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ initialRouteName: "otp", headerShown: false }}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="otp" component={Otp} />
          <Stack.Screen name="RegisterName" component={RegisterName} />
          <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
