import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import card from "../assets/img/card.png";
import Card from "../components/Card";
import Title from "../components/Title";
import { useFocusEffect } from "@react-navigation/native";
import coinImage from "../assets/img/coin.png";
import TransferList from "../components/TransferList.jsx";
import { useSelector, useDispatch } from "react-redux";
import * as transaction from "../features/transactions/transactionSlice";
import * as user from "../features/user/userSlice";

const Dash = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const {
    transactions,
    isLoading: transactionLoading,
    isSuccess,
  } = useSelector((state) => state.transaction);
  const { credit, isLoading: creditLoading } = useSelector(
    (state) => state.user
  );
  const {
    user: { name },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      dispatch(transaction.reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(transaction.getAllTransactions());
    dispatch(user.getUserCurrentBalance());

    return () => {
      dispatch(transaction.reset());
    };
  }, []);

  const onRefresh = () => {
    // On refresh fetch the new data
    dispatch(transaction.getAllTransactions());
    dispatch(user.getUserCurrentBalance());
  };

  if (transactionLoading || creditLoading) {
    return (
      <ScrollView
        style={{ backgroundColor: "#111" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="gray" />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />

      <View
        className="flex-1 bg-black p-5 pb-0 mb-0"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 mt-10 justify-center items-center">
          <View className="flex-row items-end">
            <Text className="text-zinc-500 text-3xl mb-2 pt-1 font-[PoppinsSemiBold]">
              $
            </Text>
            <Text className="text-white text-5xl pt-1 font-[PoppinsSemiBold]">
              234.00
            </Text>
          </View>
          <Text className="text-zinc-500 text-lg font-[PoppinsMedium] mt-[-8px]">
            Your total earnings
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Title title="Transfers" marginBottom={3} marginTop={5} />
          <Text
            className="text-white font-[PoppinsMedium]"
            onPress={() => navigation.navigate("Transfers")}
          >
            See all
          </Text>
        </View>

        {transactions.length != 0 ? (
          <TransferList data={transactions} />
        ) : (
          <View className="border border-zinc-700 rounded-xl p-8 justify-center items-center mb-5">
            <Image source={coinImage} style={{ width: 100, height: 100 }} />
            <Text className="text-white text-xl font-[PoppinsSemiBold] my-2 text-center">
              You don't have any transactions
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Dash;
