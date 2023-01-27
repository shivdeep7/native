import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const Widthraw = ({ navigation }) => {
  return (
    <ScrollView className="flex-1 p-5" style={{ backgroundColor: "#000" }}>
      <Title title="Pay" size="3xl" marginTop={1} marginBottom={1} />
      <View>
        <TextInput label="Email" placeholder="Email Address" />
        <TextInput label="Amount" placeholder="Amount in CAD" />
        <TextInput label="Security Question" placeholder="Security Question" />
        <TextInput label="Answer" placeholder="Secret Answer" />

        <Button
          text="Widthraw"
          backgroundColor="bg-white"
          borderColor="bg-gray-400"
          arrow={true}
          onPress={() => navigation.navigate("success")}
        />
      </View>
    </ScrollView>
  );
};

export default Widthraw;
