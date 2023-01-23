import axios from "axios";
import { AsyncStorage } from "react-native";
import { REACT_APP_BASE_URL as BASE_URL } from "@env";

axios.defaults.baseURL = "http://192.168.2.44:4000/";
axios.defaults.timeout = 10000000;

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
