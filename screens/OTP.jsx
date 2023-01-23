import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import CustomStatusBar from "../components/StatusBar";
import React, { useEffect, useMemo, useState } from "react";
import CountDown from "../components/CountDown";
import { useFocusEffect } from "@react-navigation/native";

import { reset, verifyOTP } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "tabler-icons-react";
import { useError } from "../hooks/useError";

const Login = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { isSuccess, user } = useSelector((state) => state.auth);
  const [errors, setErrors] = useError("auth");
  const { phoneNumber } = route.params;
  const OtpCodeLength = 6;
  const [Otp, setOtp] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const refs = useMemo(
    () => Array.from({ length: OtpCodeLength }).map(() => React.createRef()),
    []
  );

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess && user && !user.name) {
      return navigation.replace("RegisterName");
    }

    if (isSuccess && user && !user.email) {
      return navigation.replace("RegisterEmail");
    }

    if (isSuccess) {
      navigation.replace("home");
    }
    return () => dispatch(reset);
  }, [isSuccess, navigation]);

  useEffect(() => {
    if (Otp.length >= OtpCodeLength) {
      handleOnSubmit();
    }
  }, [Otp]);

  const handleOnSubmit = () => {
    // Join the code
    const code = Otp.join("");
    dispatch(verifyOTP({ phone: phoneNumber, code }));
  };

  const onChange = async (index, e) => {
    const key = e.nativeEvent.key; // The current key pressed by user // Index: the current position of input
    const cursorPosition = Otp.length == 0 ? 0 : Otp.length;
    if (key === "Backspace" && index != 0) {
      // Add number to array
      let newArray = [...Otp];
      newArray.splice(cursorPosition - 1, 2);

      setOtp(newArray);
      refs[cursorPosition - 1].current.focus();
    }

    // Make sure not to execute the when the Otp is equal the the initial code length
    if (key != "Backspace" && Otp.length + 1 <= OtpCodeLength) {
      // Add number to array
      let newArray = [...Otp];
      newArray[cursorPosition] = key;
      setOtp(newArray);
      refs[index + 1].current.focus();
    }
  };

  return (
    <>
      <View style={{ flex: 1, padding: 30, backgroundColor: "#fff" }}>
        <CustomStatusBar color="#fff" />
        <Text className="font-[PoppinsSemiBold] text-3xl mt-10">
          Verify your {"\n"}mobile number
        </Text>
        <Text className="font-[PoppinsRegular] text-md">
          Enter the 6 digits code sent to your number
        </Text>
        <View className="flex-row mt-5">
          {Array.from({ length: OtpCodeLength }).map((i, index) => {
            return (
              <TextInput
                keyboardType="number-pad"
                value={Otp?.[index]?.toString() ?? ""}
                maxLength={1}
                autoCorrect={false}
                onKeyPress={(e) => onChange(index, e)}
                key={index}
                ref={refs[index]}
                className={` ${
                  errors
                    ? "bg-red-100 text-red-500 border-2 border-red-300"
                    : "bg-zinc-100 border-dark"
                } rounded-md p-4 w-12 text-center mr-3 focus:bg-white focus:border-black focus:border-2`}
              />
            );
          })}
        </View>
        {errors && (
          <View className="mt-3">
            <Text className="text-red-400 text-md font-[PoppinsMedium]">
              {typeof errors == "string" && errors}
            </Text>
          </View>
        )}
        <TouchableOpacity
          className="flex-row p-3 justify-center bg-zinc-100 rounded-full mt-3 w-56"
          disabled={disabled}
          onPress={() => navigation.navigate("login")}
        >
          <Text
            className={`text-black text-center ${
              disabled && "text-gray-400 mr-1"
            } `}
          >
            I didn't received the code
          </Text>
          {disabled && (
            <CountDown
              setStatus={setDisabled}
              color={disabled ? "text-gray-400" : "text-dark"}
            />
          )}
        </TouchableOpacity>
      </View>
      <View
        className="pb-20 w-100"
        style={{ padding: 20, backgroundColor: "#fff" }}
      >
        <TouchableOpacity
          className="float-right p-4 drop-shadow-xl rounded-full mt-3 bg-black w-20 "
          onPress={() => handleOnSubmit()}
        >
          <Text className="text-white text-center text-md font-[PoppinsMedium]">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
