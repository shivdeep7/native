import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCurrentBalance, reset } from "../features/user/userSlice";
import card from "../assets/img/card.png";
import { Entypo } from "@expo/vector-icons";
import List from "../components/List";
import Card from "../components/Card";
import Title from "../components/Title";
import { useEffect } from "react";
import coinImage from "../assets/img/coin.png";
import TransferList from "../components/TransferList.jsx";

const Dash = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const { user } = useSelector((state) => state.auth);
  const { credit } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserCurrentBalance());
    return () => dispatch(reset());
  }, []);

  const onRefresh = () => {
    //console.log("refresh");
  };

  return (
    <ScrollView style={{ backgroundColor: "#111" }}>
      <StatusBar barStyle="light-content" />

      <View
        className="flex-1 bg-black p-5 pb-0 mb-0"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card
          title="Lifetime Earnings"
          subtitle={`$${credit?.lifeTimeEarnings}`}
          footerTitle="Credit History"
        />
        <Card
          title="Current Credit"
          subtitle={`$${credit?.balance}`}
          footerTitle="Shivdeep Singh"
          backgroundImage={card}
        />
        <View className="flex-row justify-between items-center">
          <Title title="Transfers" marginBottom={3} marginTop={5} />
          <Text
            className="text-white font-[PoppinsMedium]"
            onPress={() => navigation.navigate("transfers")}
          >
            See all
          </Text>
        </View>

        {transactions.length != 0 ? (
          <TransferList data={transactions} />
        ) : (
          <View className="bg-zinc-800 rounded-lg p-5 justify-center items-center mb-5">
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
