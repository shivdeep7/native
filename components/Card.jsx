import { View, Text, ImageBackground } from "react-native";
import React from "react";

const Card = ({
  title,
  subtitle,
  footerTitle,
  buttonText,
  backgroundColor,
  backgroundImage = null,
  buttonColor,
}) => {
  const Tag = backgroundImage ? ImageBackground : View;

  return (
    <Tag
      className="rounded-md bg-zinc-800 mt-5 h-48 p-4"
      source={backgroundImage && backgroundImage}
      imageStyle={{ borderRadius: 8 }}
    >
      <View className="flex-1">
        <Text className="text-white font-[PoppinsMedium] text-lg">{title}</Text>
        <Text className="text-white font-[PoppinsSemiBold] text-lg">
          {subtitle}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-white font-[PoppinsMedium] text-lg">
          {footerTitle}
        </Text>
        {buttonText && (
          <View className="flex-row bg-teal-300 rounded-full w-24 justify-center p-2 shadow-purple-900]">
            <Text className="text-teal-900 font-[PoppinsSemiBold] text-xs">
              {buttonText}
            </Text>
          </View>
        )}
      </View>
    </Tag>
  );
};

export default Card;
