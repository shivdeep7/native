import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import CustomStatusBar from "../components/StatusBar";
import { IconChevronLeft, IconChevronRight } from "tabler-icons-react-native";

const RegisterEmail = () => {
  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar />
        <View className="mt-5">
          <Text className="font-[PoppinsMedium] text-xl">Email address</Text>
          <Text className="font-[PoppinsLight] text-xl">
            Best email to reach you?
          </Text>
        </View>
        <TextInput
          onPress={() => this.textInput.current.focus()}
          className="p-5 bg-zinc-100 rounded-lg mt-3 focus:border-2 focus:border-dark  border-dark placeholder:text-xl"
          placeholder="Email Address"
        />
      </View>
      <View
        className="justify-between pb-10 w-100 flex-row"
        style={{ padding: 20, backgroundColor: "#fff" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterName")}
          className="p-4 drop-shadow-xl rounded-full mt-3 bg-slate-100"
        >
          <IconChevronLeft color="#000" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterName")}
          className="flex-row justify-center items-center rounded-full bg-black w-32"
        >
          <Text className="text-white text-lg font-[PoppinsBold]">Next</Text>
          <IconChevronRight color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterEmail;
