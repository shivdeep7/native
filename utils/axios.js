import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BASE_URL as BASE_URL } from "@env";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  async function (config) {
    const storage = await AsyncStorage.getItem("user");
    const user = JSON.parse(storage);
    // Add the header
    config.headers.Authorization = user ? `Bearer ${user.token}` : "";
    return config;
  },
  function (error) {
    // Reject with error
    return Promise.reject(error);
  }
);
