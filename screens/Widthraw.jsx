import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useError } from "../hooks/useError";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  etransferRequest,
} from "../features/transactions/transactionSlice";

const Widthraw = ({ navigation }) => {
  const [formData, setFormData] = useState({});
  const { isSuccess, isLoading } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const route = useRoute();

  const [errors, setErrors] = useError("transaction");

  useFocusEffect(
    React.useCallback(() => {
      if (isSuccess) {
        setFormData({});
        navigation.navigate("Success");
      }

      return () => dispatch(reset());
    }, [isSuccess])
  );

  const onChangeText = (name, value) => {
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    // Reset the state before sending new request
    dispatch(etransferRequest(formData));
  };

  return (
    <ScrollView className="flex-1 p-5" style={{ backgroundColor: "#000" }}>
      <Title title="Pay" size="3xl" marginTop={1} marginBottom={1} />
      <View>
        <TextInput
          label="Email"
          placeholder="Email Address"
          onChangeText={onChangeText}
          name="to"
          value={formData.to}
          error={errors?.to}
        />
        <TextInput
          label="Amount"
          placeholder="Amount in CAD"
          onChangeText={onChangeText}
          name="amount"
          value={formData.amount}
          error={errors?.amount}
        />
        <TextInput
          label="Security Question"
          placeholder="Security Question"
          onChangeText={onChangeText}
          name="securityQuestion"
          value={formData.securityQuestion}
          error={errors?.securityQuestion}
        />
        <TextInput
          label="Answer"
          placeholder="Secret Answer"
          onChangeText={onChangeText}
          name="securityAnswer"
          value={formData.securityAnswer}
          error={errors?.securityAnswer}
        />

        <Button
          text="Widthraw"
          backgroundColor="bg-white"
          borderColor="bg-gray-400"
          arrow={true}
          loading={isLoading}
          onPress={() => handleSubmit()}
        />
      </View>
    </ScrollView>
  );
};

export default Widthraw;
