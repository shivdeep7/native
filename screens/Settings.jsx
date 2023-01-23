import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import CustomStatusBar from "../components/StatusBar";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <ScrollView className="flex-1 bg-black">
      <CustomStatusBar style="light-content" color="#000" />
      <TouchableOpacity
        className="border-2 bg-gray-800 p-3 justify-center items-center"
        onPress={() => handleLogout()}
      >
        <Text className="text-red-500 font-[PoppinsMedium] text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;
