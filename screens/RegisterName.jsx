import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomStatusBar from "../components/StatusBar";
import { IconChevronLeft, IconChevronRight } from "tabler-icons-react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateProfile } from "../features/auth/authSlice";
import { useError } from "../hooks/useError";

const RegisterName = ({ navigation }) => {
  const [name, setName] = useState("");
  const [errors, setError] = useError("auth");
  const { isSuccess, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user already have the email
    if (isSuccess && user && !user.email) {
      navigation.replace("RegisterEmail");
    }

    if (isSuccess && user && user.email) {
      navigation.replace("home");
    }

    return () => dispatch(reset());
  }, [isSuccess, navigation]);

  const handleOnSubmit = () => {
    dispatch(updateProfile({ name }));
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar />
        <View style={{ width: "90%" }}>
          <Text className="font-[PoppinsSemiBold] text-3xl mt-10">
            Hey there 👋
          </Text>
          <Text className="font-[PoppinsMedium] text-md mt-2">
            What's your full name?
          </Text>
        </View>

        <TextInput
          onChangeText={(value) => setName(value)}
          className={`p-5 bg-zinc-100 rounded-sm mt-3 focus:border-2 focus:border-dark  border-dark placeholder:text-xl text-xl ${
            errors && "bg-red-100 text-red-500 border-2 border-red-300"
          }`}
          placeholder="Enter your name here"
        />
        {errors && errors.name && (
          <View className="mt-2">
            <Text className="text-lg text-red-400 font-[PoppinsMedium]">
              {errors.name}
            </Text>
          </View>
        )}
      </View>

      <View
        className="justify-between pb-10 w-100 flex-row"
        style={{ padding: 20, backgroundColor: "#fff" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="p-4 drop-shadow-xl rounded-full mt-3 bg-slate-100"
        >
          <IconChevronLeft color="#000" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnSubmit()}
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
