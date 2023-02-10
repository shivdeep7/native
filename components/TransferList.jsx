import React from "react";
import { FlatList } from "react-native";
import List from "./List";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const TransferList = ({ data }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <FlatList
      className="flex-1"
      data={data}
      renderItem={({ item }) => {
        const status = item.to._id == user._id ? "Deposited" : "Withdrawn";
        const color = status == "Deposited" ? "#00D3B6" : "#D756CE";
        const backgroundColor =
          status == "Deposited" ? "bg-teal-400/[.1]" : "bg-pink-400/[.1]";
        return (
          <List
            title={item?.from.name}
            state={status}
            indicator={`$${item.amount.toString()}`}
            Icon={Entypo}
            transferId={item._id}
            color={color}
            backgroundColor={backgroundColor}
          />
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
};

export default TransferList;
