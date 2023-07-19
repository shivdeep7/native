import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { reset, updateProfile } from "../features/auth/authSlice";
import { useError } from "../hooks/useError";

const ProfileSettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    user,
    isLoading: loading,
    isSuccess,
  } = useSelector((state) => state.auth);
  const [errors, setErrors] = useError("auth");
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
  });

  const { email, name } = formData;

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  const onChangeText = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = () => {
    dispatch(updateProfile(formData));
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-black p-5"
    >
      <View>
        <BackButton bgColor="bg-zinc-700" style={{ marginBottom: 20 }} />
        <Title title="Edit Profile" size="3xl" />
        <Text className="text-zinc-400 font-[PoppinsMedium]">
          Edit your personal information
        </Text>
      </View>
      <View>
        <TextInput
          label="Name"
          placeholder="Your Name"
          value={name}
          name="name"
          error={errors?.name}
          onChangeText={onChangeText}
        />
        <TextInput
          label="Email"
          placeholder="Email Address"
          value={email}
          error={errors?.email}
          name="email"
          onChangeText={onChangeText}
        />
        <Button
          text="Update Profile"
          backgroundColor="bg-white"
          borderColor="bg-gray-400"
          loading={loading}
          onPress={() => handleOnSubmit()}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
