import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const rootReducer = { auth: authReducer };

export const store = configureStore({ reducer: rootReducer });
