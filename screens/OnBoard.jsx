import { View, Text, ImageBackground, StatusBar } from "react-native";
import React from "react";
import spaceship from "../assets/img/spaceship.gif";
import Button from "../components/Button";

const OnBoard = ({ navigation }) => {
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={spaceship}
        className="flex1"
        style={{ height: 400 }}
      ></ImageBackground>
      <View className="flex-1 p-5 mt-10 ">
        <Text className="text-white text-4xl font-[PoppinsSemiBold]">
          Welcome to
        </Text>
        <Text className="color-white mt-2 text-4xl font-[PoppinsSemiBold] ">
          Crew App
        </Text>
        <Text className="text-white mt-2 text-lg font-[PoppinsRegular] mt-2 mb-10">
          Get started with building your {"\n"}credits with crew
        </Text>
        <View className="flex-1 justify-end pb-20">
          <Button
            backgroundColor="bg-white"
            textColor="black"
            borderColor="bg-gray-400"
            text="Get started"
            arrow={true}
            onPress={() => navigation.navigate("login")}
          />
          <Text className="color-white text-center mt-5 font-[PoppinsMedium]">
            Already with Crew?<Text className="color-blue-500"> Sign in</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnBoard;
