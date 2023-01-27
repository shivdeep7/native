import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({ label, placeholder }) => {
  return (
    <View className="mt-5">
      <Text className="text-slate-500 font-[PoppinsSemiBold] mb-1 text-lg">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{ fontFamily: "PoppingSemiBold" }}
        placeholderTextColor="#516174"
        className="rounded-sm mt-1 bg-zinc-900 text-white font-[PoppinsSemiBold] p-5 border-b-2 border-zinc-800 placeholder:text-md placeholder:font-[PoppinsSemiBold] text-md"
      />
    </View>
  );
};

export default Input;
