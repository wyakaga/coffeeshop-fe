import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUser } from "../../utils/https/user";

const initialState = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
  isChanged: false,
};

export const getUserThunk = createAsyncThunk(
  "user/get",
  async ({ id, token, controller }) => {
    try {
      const response = await getUser(id, token, controller);
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        data: {},
        isChanged: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
          isChanged: false,
        };
      })
      .addCase(getUserThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
          isChanged: true,
        };
      })
      .addCase(getUserThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.error.message,
          isChanged: false,
        };
      });
  },
});

export const userAction = {
  ...userSlice.actions,
  getUserThunk,
};

export default userSlice.reducer;
