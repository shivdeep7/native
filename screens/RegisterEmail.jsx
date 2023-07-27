import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomStatusBar from "../components/StatusBar";
import { IconChevronLeft, IconChevronRight } from "tabler-icons-react-native";
import { updateProfile, reset } from "../features/auth/authSlice";
import { useError } from "../hooks/useError";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "../hooks/useNotifications";

const RegisterEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [errors, setErrors] = useError("auth");
  const [email, setEmail] = useState("");
  const { isSuccess, user } = useSelector((state) => state.auth);
  const { registerForPushNofitication } = useNotifications();

  useEffect(() => {
    registerForPushNofitication();

    // Add the focus
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess && user && !user.name) {
      navigation.replace("RegisterName");
    }

    if (isSuccess && user && user.email) {
      navigation.replace("home");
    }

    return () => dispatch(reset());
  }, [isSuccess, user]);

  const handleOnSubmit = () => {
    dispatch(updateProfile({ email }));
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar />
        <View style={{ width: "90%" }}>
          <Text className="font-[PoppinsSemiBold] text-3xl mt-10">
            Email Address
          </Text>
          <Text className="font-[PoppinsMedium] text-md mt-2">
            Best email to reach you
          </Text>
        </View>
        <TextInput
          ref={inputRef}
          className={`
            p-4 bg-zinc-100 rounded-xl mt-3 focus:border-2 focus:border-dark  border-dark placeholder:text-md
            ${errors && "bg-red-100 border-red-400 text-red-400"}

            `}
          placeholder="Email Address"
          onChangeText={(value) => setEmail(value)}
        />
        {errors && errors.email && (
          <View className="mt-2">
            <Text className="text-lg text-red-400 font-[PoppinsMedium]">
              {errors.email}
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

export default RegisterEmail;
