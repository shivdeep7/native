import { View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ bgColor = "", color = "#fff", style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", ...style }}
      onPress={() => navigation.goBack()}
    >
      <View
        className={`flex-row p-4 rounded-full justify-center items-center mb-4 ${bgColor}`}
      >
        <MaterialIcons name="arrow-back" size={24} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
