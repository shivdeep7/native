import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "./authService";

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await AsyncStorage.removeItem("user");
  return true;
});

// Set the inital user
export const setInitialUser = createAsyncThunk(
  "auth/setInitialUser",
  async () => {
    const value = await AsyncStorage.getItem("user");
    const user = JSON.parse(value);

    return user;
  }
);

// Update the user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUserProfile(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Request to verify OTP code
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyOtp(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message ||
        error.message ||
        errror.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Request the code for the phone
export const requestCode = createAsyncThunk(
  "auth/requestCode",
  async (phoneNumber, thunkAPI) => {
    try {
      return await authService.requestCode(phoneNumber);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  message: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialUser.fulfilled, (state, action) => {
        state.user = action.payload ? action.payload : null;
      })
      .addCase(requestCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestCode.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.isSuccess = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = [];
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
