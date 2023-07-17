import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobsService from "./jobsService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  jobs: [],
  job: {},
  isError: false,
  message: "",
};

export const applyJob = createAsyncThunk(
  "jobs/apply",
  async (job, thunkAPI) => {
    try {
      return await jobsService.applyForAJob(job);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.errors || error.response.data.message)) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleJob = createAsyncThunk(
  "jobs/singleJob",
  async (id, thunkAPI) => {
    try {
      return await jobsService.singleJob(id);
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

export const getJobs = createAsyncThunk("jobs/getJobs", async (_, thunkAPI) => {
  try {
    return await jobsService.jobsList();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.errors ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        isLoading: false,
        isSuccess: false,
        isError: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(singleJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.job = action.payload;
      })
      .addCase(singleJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobsSlice.actions;
export default jobsSlice.reducer;
