import { View, Text } from "react-native";
import React from "react";

const Title = ({ title, marginTop = 8, marginBottom = 5, size = "2xl" }) => {
  return (
    <View className="flex-1">
      <View className={`mt-${marginTop} mb-${marginBottom}`}>
        <Text className={`text-white text-${size} font-[PoppinsSemiBold]`}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Title;
