

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action creator
export const listWithdrawals = createAsyncThunk('withdrawal/list', async (_, { getState }) => {
  const state = getState();

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/admin/withdrawals/', config);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const getWithdrawal = createAsyncThunk('withdrawal/details', async (withdrawalId, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/withdrawal/${withdrawalId}/`, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });

  export const editWithdrawal = createAsyncThunk('withdrawal/edit', async ({withdrawalId,status} ,{ getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/admin/WithdrawSuccessful/${withdrawalId}/`,{"withdrawal_status":status} ,
      config);
      return data;
    } catch (error) {
      return error.message;
    }
  });

  export const listVerifications = createAsyncThunk('verifications/list', async (_, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/admin/verifications/', config);
      return data;
    } catch (error) {
      return error.message;
    }
  });


  export const getVerification = createAsyncThunk('verification/details', async (verificationId, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/verification/${verificationId}/`, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });


  export const approveVerification = createAsyncThunk('verification/approve', async ({verificationId, is_verified}, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/admin/approveverification/${verificationId}`, {is_verified}, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });