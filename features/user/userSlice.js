import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  messsage: "",
  credit: {},
};

// Action to fetch current user balance
export const getUserCurrentBalance = createAsyncThunk(
  "user/getUserCurrentBalance",
  async (_, thunkAPI) => {
    try {
      return await userService.getUserCurrentBalance();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.errors ||
        error.message ||
        error.toString();

      thunkAPI.rejectWithValue(message);
    }
  }
);

// Action to add push notification token
export const updatePushNotificationToken = createAsyncThunk(
  "user/updatePushNotificationToken",
  async (token, thunkAPI) => {
    try {
      return await userService.updatePushNotificationToken(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.respnse.data.errors ||
        error.message ||
        error.toString();

      thunkAPI.rejectWithValue(message);
    }
  }
);

// Action to update the push notification status
export const updatePushStatus = createAsyncThunk(
  "user/updatePushStatus",
  async (status, thunkAPI) => {
    try {
      return await userService.updatePushNotificationStatusSettings(status);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.reponse.data.errors ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePushStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePushStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePushStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePushNotificationToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePushNotificationToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePushNotificationToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserCurrentBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCurrentBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.credit = action.payload;
      })
      .addCase(getUserCurrentBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
