import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import CustomStatusBar from "../components/StatusBar";
import { IconChevronLeft, IconChevronRight } from "tabler-icons-react-native";

const RegisterName = ({ navigation }) => {
  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar />
        <View className="mt-5">
          <Text className="font-[PoppinsMedium] text-xl">Hey there 👋</Text>
          <Text className="font-[PoppinsLight] text-xl">
            What should we call you?
          </Text>
        </View>
        <TextInput
          onPress={() => this.textInput.current.focus()}
          className="p-5 bg-zinc-100 rounded-lg mt-3 focus:border-2 focus:border-dark  border-dark placeholder:text-xl"
          placeholder="Enter your name here"
        />
      </View>
      <View
        className="justify-between pb-10 w-100 flex-row"
        style={{ padding: 20, backgroundColor: "#fff" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterEmail")}
          className="p-4 drop-shadow-xl rounded-full mt-3 bg-slate-100"
        >
          <IconChevronLeft color="#000" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterEmail")}
          className="flex-row justify-center items-center rounded-full bg-black w-32"
        >
          <Text className="text-white text-lg font-[PoppinsBold]">Next</Text>
          <IconChevronRight color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterName;
