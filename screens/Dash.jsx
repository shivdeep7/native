import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import card from "../assets/img/card.png";
import { Entypo, Ionicons } from "@expo/vector-icons";
import List from "../components/List";
import Card from "../components/Card";
import Title from "../components/Title";

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

const Dash = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log("refresh");
  };

  return (
    <ScrollView style={{ backgroundColor: "#111" }}>
      <View
        className="flex-1 bg-black p-5 pb-0 mb-0"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar barStyle="light-content" />
        <Card
          title="Lifetime Balance"
          subtitle="$2300"
          footerTitle="Credit History"
          buttonText="widthraw"
        />

        <Card
          title="Lifetime Balance"
          subtitle="$2300"
          footerTitle="Shivdeep Singh"
          buttonText="widthraw"
          backgroundImage={card}
        />

        <Title title="Transfers" />
        <FlatList
          className="flex-1 mb-10"
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

export default Dash;
