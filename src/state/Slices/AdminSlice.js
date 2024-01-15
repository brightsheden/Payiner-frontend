import { createSlice } from "@reduxjs/toolkit";
import { getWithdrawal, listWithdrawals } from "../Actions/AdminActions";


// Slice
const listWithdrawalsSlice = createSlice({
    name: 'listWithdrawals',
    initialState: {
      withdrawals: [],
      withdrawal :[],
      isRequest: false,
      isSuccess: false,
      errorMessage: '',
    },
    reducers: {
      resetListWithdrawalsState: (state) => {
        state.withdrawals = [];
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(listWithdrawals.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(listWithdrawals.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.withdrawals = action.payload;
        })
        .addCase(listWithdrawals.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })

        .addCase(getWithdrawal.pending, (state) => {
            state.isRequest = true;
          })
          .addCase(getWithdrawal.fulfilled, (state, action) => {
            state.isRequest = false;
            state.isSuccess = true;
            state.withdrawal = action.payload;
          })
          .addCase(getWithdrawal.rejected, (state, action) => {
            state.isRequest = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
          });
    },
  });
  
  export const { resetListWithdrawalsState } = listWithdrawalsSlice.actions;
  export const listWithdrawalsReducer = listWithdrawalsSlice.reducer
  