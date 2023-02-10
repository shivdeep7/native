import axios from "axios";

const GET_TRANSACTIONS = "transactions/list";
const GET_TRANSACTION = "transactions";

const getSingleTransction = async (transferId) => {
  const response = await axios.get(`${GET_TRANSACTION}/${transferId}`);
  return response.data.data;
};

const getAllTransactions = async () => {
  const response = await axios.get(GET_TRANSACTIONS);
  return response.data.data;
};

export default {
  getAllTransactions,
  getSingleTransction,
};
