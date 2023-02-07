import { View, Text } from "react-native";
import React from "react";
import CustomStatusBar from "../components/StatusBar";
import BackButton from "../components/BackButton";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";

const data = {
  title: "Cross Merge Salary",
  state: "Accepted",
  amount: "$1200",
  Icon: Entypo,
};

const Transfer = ({ route }) => {
  const teal = "0, 211, 182";
  const red = "215, 86, 206";
  const color = data.state != "Deposited" ? teal : red;
  const backgroundColor =
    data.state != "Deposited" ? "bg-teal-200/[.2]" : "bg-pink-200/[.1]";

  return (
    <View style={{ backgroundColor: "#111" }} className="flex-1 justify-start">
      <LinearGradient
        colors={[`rgba(${color}, 0.3)`, `rgba(${color}, 0.1)`, "transparent"]}
      >
        <BackButton style={{ top: 40 }} />
        <View className="items-center">
          <View
            className={`flex-row  justify-center items-center rounded-2xl p-5 ${backgroundColor}`}
          >
            <Entypo name="credit" size={32} color={`rgb(${color})`} />
          </View>
          <View className="items-center mt-3">
            <Text className="text-white text-lg font-[PoppinsSemiBold]">
              {data.title}
            </Text>
            <Text
              style={{ color: `rgb(${color})` }}
              className="text-lg font-[PoppinsMedium]"
            >
              {data.state}
            </Text>
          </View>
        </View>
        <View className="p-5 mt-10">
          <View className="p-5 ">
            <Text className="text-white text-md font-[PoppinsMedium] mb-1">
              Amount Spend
            </Text>
            <Text className="text-white text-lg font-[PoppinsSemiBold]">
              {data.amount}
            </Text>
          </View>
          <View className="p-5 ">
            <Text className="text-white text-md font-[PoppinsMedium] mb-1">
              Date of transfer
            </Text>
            <Text className="text-white text-lg font-[PoppinsSemiBold]">
              12th June 2020
            </Text>
          </View>
          <View className="p-5 ">
            <Text className="text-white text-md font-[PoppinsMedium] mb-1">
              Transfer Type
            </Text>
            <Text className="text-white text-lg font-[PoppinsSemiBold]">
              E-transfer
            </Text>
          </View>
          <Button
            text="New transfer"
            textColor="#000"
            backgroundColor="bg-white"
            borderColor="bg-gray-400"
            arrow
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Transfer;
