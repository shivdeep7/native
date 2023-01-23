import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { IconArrowNarrowRight } from "tabler-icons-react-native";
import Title from "../components/Title";
import TextInput from "../components/Input";

const Widthraw = () => {
  return (
    <ScrollView className="flex-1 p-5" style={{ backgroundColor: "#111" }}>
      <Title title="Pay" size="4xl" marginTop={1} marginBottom={3} />
      <View>
        <TextInput label="Email" placeholder="Email Address" />
        <TouchableOpacity className="flex-row bg-emerald-500 p-3 rounded-md justify-center items-center mt-5">
          <Text className="text-white font-[PoppinsSemiBold] text-md">
            Widthraw
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Widthraw;
