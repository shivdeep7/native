import { View, Text } from "react-native";
import React from "react";

const List = ({ title, state, indicator, Icon, color, backgroundColor }) => {
  return (
    <View className="flex-row bg-zinc-800 p-3 rounded-lg justify-between items-center mb-3">
      <View className="flex-row">
        <View
          className={`flex-row  justify-center items-center rounded-2xl  mr-3 p-3 ${backgroundColor}`}
        >
          <Icon name="credit" size={24} color={color} />
        </View>
        <View className="justify-center">
          <Text className="text-white font-[PoppinsMedium] text-md">
            {title}
          </Text>
          <Text
            className={`text-white font-[PoppinsMedium] text-sm`}
            style={{ color }}
          >
            {state}
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-white font-[PoppinsMedium] text-md">
          {indicator}
        </Text>
      </View>
    </View>
  );
};

export default List;
