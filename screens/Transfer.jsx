import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  reset,
  getSingleTransaction,
} from "../features/transactions/transactionSlice";

const Transfer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.transaction);
  const [status, setStatus] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { transferId } = route.params;

  useEffect(() => {
    transferId && dispatch(getSingleTransaction(transferId));
    return () => dispatch(reset());
  }, [transferId]);

  useEffect(() => {
    if (transaction.to) {
      const newStatus =
        transaction?.from._id !== user._id ? "Deposited" : "Widthrawn";
      setStatus(newStatus);
    }
  }, [transaction]);

  const teal = "0, 211, 182";
  const red = "215, 86, 206";
  const color = status == "Deposited" ? teal : red;
  const backgroundColor =
    status == "Deposited" ? "bg-teal-200/[.2]" : "bg-pink-200/[.1]";

  return (
    <View style={{ backgroundColor: "#111" }} className="flex-1 justify-start">
      {transaction && (
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
                {transaction?.from?.name}
              </Text>
              <Text
                style={{ color: `rgb(${color})` }}
                className="text-lg font-[PoppinsMedium]"
              >
                {status}
              </Text>
            </View>
          </View>
          <View className="p-5 mt-10">
            <View className="p-5 ">
              <Text className="text-white text-md font-[PoppinsMedium] mb-1">
                Amount {status == "dopisted" ? "Received" : "Withdrawn"}
              </Text>
              <Text className="text-white text-lg font-[PoppinsSemiBold]">
                ${transaction.amount}
              </Text>
            </View>
            <View className="p-5 ">
              <Text className="text-white text-md font-[PoppinsMedium] mb-1">
                {status == "deposited" ? "Recevied on" : "Sent on"}
              </Text>
              <Text className="text-white text-lg font-[PoppinsSemiBold]">
                {moment(transaction.createdOn).format("MMMM Do YYYY, h:mm:ss")}
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
              onPress={() => navigation.navigate("Send")}
              arrow
            />
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default Transfer;
