import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  transactions: [],
  transaction: {},
};

// Action to create a new e transfer request
export const etransferRequest = createAsyncThunk(
  "transaction/etransferRequest",
  async (data, thunkAPI) => {
    try {
      return await transactionService.initateEtransfer(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Action to get a single transaction
export const getSingleTransaction = createAsyncThunk(
  "transaction/getSingleTransaction",
  async (transferId, thunkAPI) => {
    try {
      return await transactionService.getSingleTransction(transferId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.reponse.data.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Action to get the list of all transactions
export const getAllTransactions = createAsyncThunk(
  "transaction/getAllTransactions",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getAllTransactions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.errors ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transaction = action.payload;
      })
      .addCase(getSingleTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(etransferRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(etransferRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(etransferRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
