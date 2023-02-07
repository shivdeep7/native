import axios from "axios";

const UPDATE_PUSH_STATUS = "user/updatePushNotificationStatus";
const UPDATE_PUSH_TOKEN = "user/updatePushNotificationToken";
const GET_USER_BALANCE = "user/balance";

const getUserCurrentBalance = async () => {
  const response = await axios.get(GET_USER_BALANCE);
  return response.data.data;
};

const updatePushNotificationToken = async (token) => {
  const response = await axios.patch(UPDATE_PUSH_TOKEN, {
    pushNotificationToken: token,
  });

  return response.data;
};

const updatePushNotificationStatusSettings = async (status) => {
  const response = await axios.patch(UPDATE_PUSH_STATUS, {
    pushNotificationStatus: status,
  });

  return response.data;
};

export default {
  getUserCurrentBalance,
  updatePushNotificationStatusSettings,
  updatePushNotificationToken,
};
