import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const List = ({
  title,
  state,
  indicator,
  Icon,
  color,
  backgroundColor,
  transferId,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("transfer", { transferId })}
      className="flex-row bg-zinc-800 py-3 pr-5 pl-3 rounded-lg justify-between items-center mb-3"
    >
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
    </TouchableOpacity>
  );
};

export default List;
