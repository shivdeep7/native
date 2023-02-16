import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import ProfileSettings from "./ProfileSettings";

const Stack = createNativeStackNavigator();

const ProfileHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileHome" component={Profile} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
};

export default ProfileHome;
