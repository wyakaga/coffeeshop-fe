import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHistory } from "../../utils/https/transaction";

const initialState = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
}

const getHistoryThunk = createAsyncThunk(
  "history/get",
  async ({ token, controller }, { rejectWithValue }) => {
    try {
      const result = await getHistory(token, controller);
      return result.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
)

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        data: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getHistoryThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getHistoryThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.error.message,
        };
      });
  },
});

export const historyAction = {
  ...historySlice.actions,
  getHistoryThunk,
}

export default historySlice.reducer;