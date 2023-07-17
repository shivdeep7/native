import { View, Text } from "react-native";
import React from "react";

const Title = ({
  title,
  marginTop = 1,
  marginBottom = 1,
  size = "xl",
  ...props
}) => {
  return (
    <View className={`mt-${marginTop} mb-${marginBottom}`} {...props}>
      <Text className={`text-white text-${size} font-[PoppinsSemiBold]`}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
