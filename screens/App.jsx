import { View, Text, StatusBar, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Widthraw from "./Widthraw";
import Dash from "./Dash";
import Settings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import * as transaction from "../features/transactions/transactionSlice";

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(transaction.getAllTransactions());

    //   return () => dispatch(transaction.reset());
  }, []);

  return (
    <View className="flex-1 bg-black" style={{ backgroundColor: "#111" }}>
      <SafeAreaView className="flex-1">
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              color: "#fff",
              fontSize: 18,
              fontFamily: "PoppinsSemiBold",
              textTransform: "none",
            },
            tabBarItemStyle: {
              width: 100,
            },
            tabBarContentContainerStyle: {
              justifyContent: "center",
            },
            tabBarIndicatorStyle: {
              width: 100,
              left: Dimensions.get("window").width / 3 - 95,
              backgroundColor: "#fff",
              height: 4,
              borderRadius: 20,
            },

            tabBarStyle: {
              backgroundColor: "#111",
              marginHorizontal: 10,
              height: 53,
            },
          }}
        >
          <Tab.Screen name="Wallet" component={Dash} />
          <Tab.Screen name="Send" component={Widthraw} />
          <Tab.Screen name="Profile" component={Settings} />
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
};

export default App;
