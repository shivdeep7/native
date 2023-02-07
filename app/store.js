import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transactions/transactionSlice";

const reducer = {
  auth: authReducer,
  user: userReducer,
  transaction: transactionReducer,
};

export const store = configureStore({ reducer });
