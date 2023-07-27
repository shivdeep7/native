import {
  View,
  Text,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

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
        <View className="flex-1 mt-10 justify-start items-start">
          <View className="flex-row items-end">
            <Text
              className="text-white text-2xl pt-1 "
              style={{ fontFamily: "PoppinsSemiBold" }}
            >
              hello, {name.split(" ")[0]} 👋
            </Text>
          </View>
          <Text
            className="text-zinc-500 text-lg"
            style={{ fontFamily: "PoppinsMedium" }}
          >
            explore the app here
          </Text>
        </View>

        <View className="mt-5 border bg-zinc-900 rounded-lg p-6 justify-start items-start mb-5">
          <Text className="text-white text-xl font-[PoppinsSemiBold]">
            Welcome to crew
          </Text>
          <Text className="text-white text-md font-[PoppinsMedium] mt-2">
            We help Canadians find {"\n"}local jobs
          </Text>
        </View>
        <View className="border bg-violet-800 rounded-lg p-6  items-center mb-5">
          <Text className="text-white text-xl font-[PoppinsSemiBold]">
            Crew Jobs
          </Text>
          <Text className="text-white text-md text-center mb-5 font-[PoppinsMedium]">
            Search local jobs based on {"\n"} your location in minutes
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Jobs")}
            className="bg-black py-3  mt-5 px-5 rounded-full  flex-1 shadow-md m-[auto]"
          >
            <Text className="text-white text-center font-[PoppinsMedium]">
              View Jobs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dash;
