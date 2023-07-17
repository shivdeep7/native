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
  footer = false,
  ...props
}) => {
  const Tag = backgroundImage ? ImageBackground : View;

  return (
    <Tag
      className="rounded-md bg-zinc-800 mt-5 h-48 p-4"
      source={backgroundImage && backgroundImage}
      imageStyle={{ borderRadius: 8 }}
      {...props}
    >
      <View className="flex-1">
        <Text className="text-white font-[PoppinsSemiBold] text-3xl mt-2">
          {subtitle}
        </Text>
        <Text className="text-white font-[PoppinsRegular] text-md">
          {title}
        </Text>
      </View>
      {footer && (
        <View className="flex-row justify-between items-center">
          {footerTitle && (
            <Text className="text-white font-[PoppinsMedium] text-lg">
              {footerTitle}
            </Text>
          )}
          {buttonText && (
            <View className="flex-row bg-teal-300 rounded-full w-24 justify-center p-2 shadow-purple-900]">
              <Text className="text-teal-900 font-[PoppinsSemiBold] text-xs">
                {buttonText}
              </Text>
            </View>
          )}
        </View>
      )}
    </Tag>
  );
};

export default Card;
