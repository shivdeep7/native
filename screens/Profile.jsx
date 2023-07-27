import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import Title from "../components/Title";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";

const data = [
  {
    id: 1,
    title: "Account Settings",
    link: "ProfileSettings",
    icon: "account-circle",
    color: "white",
    onPress: (navigation) => {
      navigation.navigate("ProfileSettings");
    },
  },
  {
    id: 2,
    title: "Have a question?",
    link: "ProfileSettings",
    icon: "question-answer",
    color: "white",
    onPress: () => {
      Linking.openURL("mailto:me@shiv.ca");
    },
  },
  {
    id: 3,
    title: "Call us",
    link: "tel:6478036455",
    icon: "call",
    color: "white",
    onPress: () => {
      Linking.openURL("tel:6478036455");
    },
  },
];
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        className="flex-row justify-start items-center mt-1 p-4 border-b-2 border-zinc-800"
        onPress={() => item.onPress(navigation)}
      >
        <MaterialIcons name={item.icon} size={24} color={item.color} />
        <Text
          className={` font-[PoppinsRegular] text-md ml-3`}
          style={{ color: item.color }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "#000" }}
    >
      <View className="flex-1 p-5">
        <Title title="Profile" size="3xl" marginTop={1} marginBottom={1} />
        <View className="flex-row bg-zinc-800 p-5 mt-3 items-center rounded-lg">
          <View className="rounded-full p-3 bg-zinc-600 mr-3">
            <MaterialIcons name="person" size={30} color="white" />
          </View>
          <View>
            <Text className="text-white font-[PoppinsSemiBold] text-lg">
              {user?.name}
            </Text>
            <Text className="text-white font-[PoppinsMedium] text-md">
              {user?.email}
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            className="mt-5"
            data={data}
            renderItem={(item) => renderItems(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="flex-1 justify-end ">
          <Button
            text="Logout"
            backgroundColor="bg-zinc-800"
            textColor="red"
            borderColor="bg-zinc-900"
            onPress={() => handleLogout()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
