import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomStatusBar from "../components/StatusBar";
import { IconChevronLeft, IconChevronRight } from "tabler-icons-react-native";
import { updateAccountVerified, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/TextInput";
import { useError } from "../hooks/useError";
import { addBankAccount } from "../features/bankAccount/bankAccountSlice";

const AccountInformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useError("account");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({});
  const { isError, user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.account);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAccountVerified(true));
    }

    // Take the user to fill name if not provided
    if (isSuccess && user && !user.name) {
      navigation.replace("RegisterName");
    }

    // Take user to home if everything in place
    if (isSuccess && user && !user.email) {
      navigation.replace("RegisterEmail");
    }

    if (isSuccess && user && user.email) {
      navigation.replace("home");
    }

    return () => reset();
  }, [isSuccess]);

  const handleOnSubmit = () => {
    dispatch(addBankAccount(formData));
  };

  const onChangeText = (name, value) => {
    return setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <CustomStatusBar />
        <View className="mt-5">
          <Text className="font-[PoppinsSemiBold] text-2xl">
            Account Information
          </Text>
          <Text className="font-[PoppinsLight] text-lg mt-1 pr-16 mb-5">
            Bank account where you want to receive the rent deposits
          </Text>
        </View>
        {console.log(errors)}
        <Input
          label="Account Number"
          placeholder="Account Number"
          value={FormData.accountNumber}
          onChangeText={onChangeText}
          name="accountNumber"
          color="white"
          error={errors && errors.accountNumber}
        />
        <Input
          label="Transit Number"
          placeholder="Transit Number"
          value={FormData.transitNumber}
          onChangeText={onChangeText}
          name="transitNumber"
          color="white"
          error={errors && errors.transitNumber}
        />
        <Input
          label="Institute number"
          placeholder="Institute Number"
          value={FormData.instituteNumber}
          onChangeText={onChangeText}
          name="instituteNumber"
          color="white"
          error={errors && errors.instituteNumber}
        />
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

export default AccountInformation;
