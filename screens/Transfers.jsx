import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Title from "../components/Title";
import CustomeStatusBar from "../components/StatusBar";
import { Entypo } from "@expo/vector-icons";
import List from "../components/List";
import BackButton from "../components/BackButton";

const DATA = [
  {
    title: "Cross Merge Salary",
    state: "Deposited",
    amount: "$1200",
    Icon: Entypo,
  },
  {
    title: "E-Transfer - Widthrawal",
    state: "Pending",
    amount: "$800",
    Icon: Entypo,
  },
];

const Transfers = () => {
  return (
    <ScrollView style={{ backgroundColor: "#111", padding: 20 }}>
      <CustomeStatusBar style="light-content" color="#111" />
      <View className="flex-1">
        <BackButton bgColor="bg-zinc-800" />
        <Title title="Transfers" size="3xl" marginBottom={0} />
        <Text className="text-zinc-400 text-sm font-[PoppinsMedium] ">
          All of your trander history
        </Text>
        <FlatList
          className="flex-1 mt-5"
          data={DATA}
          renderItem={({ item }) => {
            const color = item.state == "Deposited" ? "#00D3B6" : "#D756CE";
            const backgroundColor =
              item.state == "Deposited"
                ? "bg-teal-400/[.1]"
                : "bg-pink-400/[.1]";
            return (
              <List
                title={item.title}
                state={item.state}
                indicator={item.amount}
                Icon={item.Icon}
                color={color}
                backgroundColor={backgroundColor}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

export default Transfers;
