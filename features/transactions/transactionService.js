import axios from "axios";

const GET_TRANSACTIONS = "transactions/list";

const getAllTransactions = async () => {
  const response = await axios.get(GET_TRANSACTIONS);
  return response.data.data;
};

export default {
  getAllTransactions,
};
