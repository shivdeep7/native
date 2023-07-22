import axios from "axios";

const addBankAccount = async (data) => {
  const response = await axios.post("/user/updateBankInformation", data);
  if (response.data) {
    return response.data;
  }
};

export default { addBankAccount };
