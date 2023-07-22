import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bankAccountService from "./bankAccountService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Add information to the bank account
export const addBankAccount = createAsyncThunk(
  "bankAccount/addBankAccount",
  async (data, thunkAPI) => {
    try {
      return await bankAccountService.addBankAccount(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.error || error.response.data.message)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    reset: () => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBankAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBankAccount.rejected, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addBankAccount.fulfilled, (state) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.isError = false;
      });
  },
});

export const { reset } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;
