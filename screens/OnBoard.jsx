import { View, Text, ImageBackground, StatusBar, Image } from "react-native";
import React from "react";
import spaceship from "../assets/img/spaceship.gif";
import onboard from "../assets/img/onboard2.png";

import Button from "../components/Button";
import { REACT_APP_NAME as APP_NAME } from "@env";

const OnBoard = ({ navigation }) => {
  return (
    <View className="flex-1 bg-black justify-end p-3">
      <View className="flex-1 items-center justify-start mt-20">
        <Image source={onboard} className="flex-1 " resizeMode="contain" />
        <View className="flex-1 justify-start ">
          <Text className="text-white text-4xl font-[PoppinsSemiBold]">
            Welcome to
          </Text>
          <Text className="color-white mt-2 text-4xl font-[PoppinsSemiBold] ">
            {APP_NAME} App
          </Text>
          <Text className="text-white mt-5 text-lg font-[PoppinsMedium] mt-2 ">
            Find your next job in minutes without leaving your home
          </Text>
          <View className="">
            <Button
              backgroundColor="bg-white"
              textColor="black"
              borderColor="bg-gray-400"
              text="Get started"
              className=""
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoard;
