import axios from "axios";
import { AsyncStorage } from "react-native";

const VERIFY_OTP = "auth/login/phone/";
const EDIT_PROFILE = "auth/user/";
const SERVER = "auth/otp/";

const verifyOtp = async (data) => {
  const response = await axios.post(VERIFY_OTP, data);
  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data.data;
  }
};

const requestCode = async (phone) => {
  console.log("sending request");

  const response = await axios.post(SERVER, { phone });
  console.log("res");

  if (response.data) {
    return response.data;
  }
};
const updateUserProfile = async (data) => {
  const response = await axios.put(EDIT_PROFILE, data);
  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data.data;
  }
};

const authService = {
  verifyOtp,
  updateUserProfile,
  requestCode,
};
export default authService;
