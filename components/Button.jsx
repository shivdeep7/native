import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IconArrowNarrowRight } from "tabler-icons-react-native";

const Button = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  onPress = () => {},
  arrow = false,
}) => {
  return (
    <TouchableOpacity className="mt-5" onPress={() => onPress()}>
      <View
        className={`rounded-xs ${borderColor}`}
        style={{ paddingBottom: 5, paddingRight: 5, left: 2 }}
      >
        <View
          className={`flex-row justify-center items-center p-3 rounded-xs ${backgroundColor}`}
          style={{
            marginLeft: -2,
            marginTop: -2,
          }}
        >
          <Text
            className="font-[PoppinsSemiBold] text-md"
            style={{ color: textColor }}
          >
            {text}
          </Text>
          {arrow && <IconArrowNarrowRight size={28} color={textColor} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
