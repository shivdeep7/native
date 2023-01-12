import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import CustomStatusBar from "../components/StatusBar";
import React, { useEffect, useMemo, useState } from "react";

const Login = ({ navigation }) => {
  const OtpCodeLength = 4;
  const [Otp, setOtp] = useState([]);
  const refs = useMemo(
    () => Array.from({ length: OtpCodeLength }).map(() => React.createRef()),
    []
  );

  useEffect(() => {
    refs[0].current.focus();
  }, [refs]);

  const onChange = async (index, e) => {
    const value = e.nativeEvent.key;

    if (value === "Backspace" && index != 0) {
      // Remove the current t
      refs[index - 1].current.focus();
      let newOtpValues = Otp;
      newOtpValues[index - 1] = "";
      newOtpValues[index] = "";
      await setOtp([...newOtpValues]);
      return null;
    }

    const number = parseInt(value);
    if (value != "Backspace") {
      index != [refs.length - 1] ? refs[index + 1].current.focus() : null;
      // Add number to array
      let newOtpValues = Otp;
      newOtpValues[index] = number;
      await setOtp([...newOtpValues]);

      // Focus on the next array
      return null;
    }
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar color="#fff" />
        <Text className="font-[PoppinsLight] text-3xl mt-10">
          OTP message {"\n"}Send on phone
        </Text>
        <View className="flex-row mt-5">
          {Array.from({ length: OtpCodeLength }).map((i, index) => {
            return (
              <TextInput
                keyboardType="number-pad"
                value={Otp?.[index]?.toString()}
                maxLength={1}
                autoCorrect={false}
                onKeyPress={(e) => onChange(index, e)}
                key={index}
                ref={refs[index]}
                className="rounded-xl px-3 w-14 text-center bg-slate-100 focus:bg-white focus:border-dark focus:border-2 p-5 mr-3  border-dark placeholder:text-md"
              />
            );
          })}
        </View>
        <TouchableOpacity className="py-2 rounded-full mt-3 bg-zinc-100 w-100 w-56">
          <Text
            className="text-black text-center font-[PoppinsMedium]"
            onPress={() => navigation.navigate("RegisterName")}
          >
            I didn't received the code
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className="pb-20 w-100"
        style={{ padding: 20, backgroundColor: "#fff" }}
      >
        <TouchableOpacity className="float-right p-4 drop-shadow-xl rounded-full mt-3 bg-black w-20 ">
          <Text
            className="text-white text-center text-md font-[PoppinsMedium]"
            onPress={() => navigation.navigate("RegisterName")}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
