import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import bankAccountReducer from "../features/bankAccount/bankAccountSlice";

const reducer = {
  auth: authReducer,
  user: userReducer,
  transaction: transactionReducer,
  jobs: jobsReducer,
  account: bankAccountReducer,
};

export const store = configureStore({ reducer });
