import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({ label, placeholder }) => {
  return (
    <View>
      <Text className="text-slate-500 font-[PoppinsSemiBold] mt-2 text-lg">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{ fontFamily: "PoppingSemiBold" }}
        placeholderTextColor="#516174"
        className="rounded-md mt-1 bg-slate-800 text-white font-[PoppinsSemiBold] p-4 placeholder:text-md text-md "
      />
    </View>
  );
};

export default Input;
