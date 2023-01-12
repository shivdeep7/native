import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import CustomStatusBar from "../components/StatusBar";
import React from "react";
import CanadaFlag from "../assets/img/canada-flag.png";
import WorkBee from "../assets/img/Workbee.png";

const Login = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <CustomStatusBar color="#fff" />
      <Text className="font-[PoppinsLight] text-3xl mt-10">
        Get started {"\n"}to apply
      </Text>
      <View className="flex-row mt-5">
        <View className="flex-row  rounded-xl bg-slate-100 p-4 border-1 border-gray-300 mr-2">
          <Image source={CanadaFlag} style={{ width: 26, height: 20 }} />
          <Text className="ml-2 font-[PoppinsMedium]">+91</Text>
        </View>
        <TextInput
          keyboardType="number-pad"
          className="rounded-xl bg-slate-100 p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 border-1 border-gray-300 flex-1 placeholder:text-md text-md"
          placeholder="Your phone number"
        />
      </View>
      <TouchableOpacity className="p-4 drop-shadow-xl rounded-xl mt-3 bg-black">
        <Text
          className="text-white text-center text-md font-[PoppinsMedium]"
          onPress={() => navigation.navigate("otp")}
        >
          Send Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
