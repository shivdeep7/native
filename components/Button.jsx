import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { IconArrowNarrowRight } from "tabler-icons-react-native";
import { styled } from "nativewind";
const Button = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  disabled = false,
  loading,
  onPress = () => {},
  arrow = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      disabled={disabled}
      className="mt-5"
      {...props}
    >
      <View
        className={`flex-row justify-center items-center p-3 rounded-xl ${backgroundColor} ${
          loading && "opacity-25"
        } ${disabled && "bg-zinc-900"}`}
        style={{
          marginLeft: -2,
          marginTop: -2,
        }}
      >
        <Text
          className={`font-[PoppinsMedium] text-lg ${
            disabled && "text-zinc-600"
          }`}
        >
          {text}
        </Text>
        {loading && <ActivityIndicator />}
        {arrow && <IconArrowNarrowRight size={28} color={textColor} />}
      </View>
    </TouchableOpacity>
  );
};

export default styled(Button);
