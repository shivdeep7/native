import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CustomStatusBar from "../components/StatusBar";
import React, { useEffect, useState } from "react";
import CanadaFlag from "../assets/img/canada-flag.png";
import { useDispatch, useSelector } from "react-redux";
import { requestCode, reset } from "../features/auth/authSlice";
import { useError } from "../hooks/useError";
import { IconArrowNarrowRight } from "tabler-icons-react-native";
import { REACT_APP_NAME as APP_NAME } from "@env";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errors, setError] = useError("auth");
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("Otp", { phoneNumber });
    }
    return () => dispatch(reset());
  }, [isSuccess, navigation]);

  const handleOnSubmit = () => {
    dispatch(requestCode(phoneNumber));
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}
      keyboardShouldPersistTaps="handled"
    >
      <CustomStatusBar color="#fff" />
      <View style={{ width: "90%" }}>
        <Text className="font-[PoppinsSemiBold] text-3xl mt-10">
          Welcome to {APP_NAME}
        </Text>
        <Text className="font-[PoppinsMedium] text-md mt-2">
          A verification code will be sent to this number to access the app
        </Text>
      </View>
      <View className="flex-row mt-6">
        <View className="flex-row  rounded-sm bg-zinc-100 p-4 border-1 border-gray-300 mr-2">
          <Image source={CanadaFlag} style={{ width: 26, height: 20 }} />
          <Text className="ml-2 font-[PoppinsMedium]">+1</Text>
        </View>

        <TextInput
          keyboardType="number-pad"
          onChangeText={(phone) => setPhoneNumber(phone)}
          className={`rounded-sm p-4 font-[PoppinsMedium] focus:border-2 focus:border-dark  flex-1  text-md ${
            errors
              ? "bg-red-100 text-red-400 placeholder:text-red-400 border-2 border-red-300"
              : "bg-zinc-100 text-black"
          }`}
          placeholder="Your phone number"
        />
      </View>
      {errors && (
        <View className="mt-3">
          <Text className="text-red-400 text-md font-[PoppinsMedium]">
            {typeof errors == "string" && errors}
          </Text>
        </View>
      )}
      <TouchableOpacity
        className={`flex-row justify-center items-center p-3 rounded-xs mt-4 ${
          isLoading ? "bg-zinc-100" : "bg-black"
        }`}
        onPress={() => handleOnSubmit()}
        disabled={isLoading}
      >
        <Text
          className={`text-center text-md font-[PoppinsMedium] mr-2 ${
            isLoading ? "text-zinc-400" : "text-white"
          }`}
        >
          Send Code
        </Text>
        <IconArrowNarrowRight size={28} color="#fff" />
        {isLoading && (
          <ActivityIndicator
            animating={true}
            className={`${isLoading ? "text-zinc-400" : "text-white"}`}
            size="small"
          />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
