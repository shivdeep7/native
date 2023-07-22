import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({
  label,
  sublable,
  placeholder,
  value,
  onChangeText,
  name,
  error,
  color,
  ...props
}) => {
  return (
    <View className="mt-5">
      <Text className="text-slate-500 font-[PoppinsSemiBold] text-lg">
        {label}
      </Text>
      {sublable && (
        <Text className="text-slate-500 font-[PoppinsMedium] text-sm mb-1">
          {sublable}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        onChangeText={(value) => {
          onChangeText(name, value);
        }}
        style={{ fontFamily: "PoppinsSemiBold" }}
        placeholderTextColor="#516174"
        value={value}
        name={name}
        className={`rounded-xl mt-2 bg-zinc-900 text-white font-[PoppinsRegular] p-5 border-b-2 border-zinc-800 placeholder:text-md placeholder:font-[PoppinsSemiBold] text-md ${
          color == "white" && "bg-zinc-200  border-0 text-black"
        } ${error && "text-red-500 bg-red-100 border-red-500 border-b-4"}`}
        {...props}
      />
      {error && (
        <Text className="text-red-300 mt-3 font-[PoppinsMedium]">{error}</Text>
      )}
    </View>
  );
};

export default Input;
