import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Title from "../components/Title";
import CustomeStatusBar from "../components/StatusBar";
import { Entypo } from "@expo/vector-icons";
import List from "../components/List";
import BackButton from "../components/BackButton";
import coinImage from "../assets/img/coin.png";
import { useSelector } from "react-redux";
import TransferList from "../components/TransferList";

const Transfers = () => {
  const { transactions } = useSelector((auth) => auth.transaction);

  return (
    <ScrollView
      style={{ backgroundColor: "#111", padding: 20 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomeStatusBar style="light-content" color="#111" />
      <View className="flex-1 ">
        <BackButton bgColor="bg-zinc-800" />

        {transactions.length != 0 ? (
          <View>
            <Title title="Transfers" size="3xl" marginBottom={0} />
            <Text className="text-zinc-400 text-sm font-[PoppinsMedium] ">
              All of your trander history
            </Text>

            <View className="mt-3">
              <TransferList data={transactions} />
            </View>
          </View>
        ) : (
          <View className="flex-1 p-2 justify-center items-center mb-20">
            <Image source={coinImage} style={{ width: 120, height: 120 }} />
            <Text className="text-white text-xl font-[PoppinsSemiBold] my-2 text-center">
              You don't have any transactions
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Transfers;
