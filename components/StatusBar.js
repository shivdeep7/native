import { View, Text, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

const CustomStatusBar = ({ color = "#fff", style = "dark-content" }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ height: insets.top, backgroundColor: color }}>
      <StatusBar barStyle={style} />
    </View>
  );
};

export default CustomStatusBar;
