import axios from "axios";

const GET_TRANSACTIONS = "transactions/list";
const GET_TRANSACTION = "transactions";
const POST_ETRANSFER = "transactions/etransfer";

const initateEtransfer = async (data) => {
  const response = await axios.post(POST_ETRANSFER, data);
  if (response.data) {
    return response.data.data;
  }
};

const getSingleTransction = async (transferId) => {
  const response = await axios.get(`${GET_TRANSACTION}/${transferId}`);
  if (response.data) {
    return response.data.data;
  }
};

const getAllTransactions = async () => {
  const response = await axios.get(GET_TRANSACTIONS);
  return response.data.data;
};

export default {
  getAllTransactions,
  getSingleTransction,
  initateEtransfer,
};
