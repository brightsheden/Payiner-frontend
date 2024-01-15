import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
//import localforage from "localforage";



export const profile = createAsyncThunk('user/profile', async (arg,{getState, rejectWithValue}) => {
    const state = getState();
    console.log(state.user.userInfo.token)
  
    try {
        
       

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/user/profile/',
          
            config
        );   
        localStorage.setItem('userProfile', JSON.stringify(data));
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const userbalance = createAsyncThunk('user/balance', async (arg,{getState, rejectWithValue}) => {
    const state = getState();
  
    try {
        
       

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/user/balance/',
          
            config
        );
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editoprofile = createAsyncThunk('user/editprofile', async ({image,username,email,phone},{getState, rejectWithValue}) => {
    const state = getState();
  
    try {
        
       

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.put(
            '/api/user/editProfile/',
            {"image":image,"username":username,"email":email,"phone":phone},
          
            config
        );
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const withdraw = createAsyncThunk('user/withdraw', async ({amount,accountName,bankName,accountNumber},{getState, rejectWithValue}) => {
    const state = getState();
  
  
    try {
        
       

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/user/Withdraw/',
            {"amount":amount,"account_name":accountName,"bank_name":bankName,"account_number":accountNumber},
            config
        );
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const mywithdrawal = createAsyncThunk('user/mywithdrawal', async (arg,{getState, rejectWithValue}) => {
    const state = getState();
    console.log(state.user)
  
  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/user/MyWithdrawals/',config
        );
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const myearnings = createAsyncThunk('user/myearninghistory', async (arg,{getState}) => {
    const state = getState();
    console.log(state.user)
  
  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/user/MyEarningHistory/',config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const accointVerification = createAsyncThunk('user/verifyaccount', async ({formData},{getState, rejectWithValue}) => {
  const state = getState();

  console.log(formData, 'action')


  try {
      
     
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.post(
          `/api/user/verifyaccount/`,
          {"facebook":formData.facebook, "instagram":formData.instagram,"telegram":formData.telegram, "youtube":formData.youtube,
          "whatsapp":formData.whatsapp
        },
          config
      );
  
      return data;

  } catch (error) {
      return rejectWithValue(error.message)
  }
});


export const myCheckings = createAsyncThunk('user/mycheckings', async (arg,{getState, rejectWithValue}) => {
  const state = getState();




  try {
      
     
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.get(
          `/api/user/daily-checkins/`, config
      );
  
      return data;

  } catch (error) {
      return rejectWithValue(error.message);
  }
});


export const Allcheckins = createAsyncThunk('admin/checkins', async (arg,{getState}) => {
  const state = getState();




  try {
      
     
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.get(
          `/api/user/allcheckins/`, config
      );
  
      return data;

  } catch (error) {
      return error.message;
  }
});


export const completeCheckings = createAsyncThunk('user/completecheckings', async (arg,{getState}) => {
  const state = getState();
  try {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.post(
          `/api/user/complete-daily-checkin/`,null, config
      );
  
      return data;

  } catch (error) {
      return error.message;
  }
});

export const myReferals = createAsyncThunk('user/myreferals', async (arg,{getState}) => {
  const state = getState();
  try {
      
     
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.get(
          `/api/user/myreferals/`, config
      );
  
      return data;

  } catch (error) {
      return error.message;
  }
});


export const myProofs = createAsyncThunk('user/myproofs', async (arg,{getState}) => {
  const state = getState();
  try {
      
     
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${state.user.userInfo.token}`
          }
      }

      const { data } = await axios.get(
          `/api/user/mytaskproof/`, config
      );
  
      return data;

  } catch (error) {
      return error.message;
  }
});




//admin actions
// Fetch User List
export const fetchUserList = createAsyncThunk('user/fetchUserList', async (_, { getState }) => {
  const state = getState();

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/admin/users/', config);
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

// Fetch User Details
export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async (userId, { getState }) => {
  const state = getState();

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/user/${userId}/ `, config);
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

// Delete User
export const deleteUser = createAsyncThunk('user/deleteUser', async (userId, { getState }) => {
  const state = getState();

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/admin/delete/${userId}/`, config);
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

// Update User
export const updateUser = createAsyncThunk('user/updateUser', async ({ userId,name,email,isAdmin }, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
    
      const { data } = await axios.put(`/api/admin/edit-user/${userId}/`, {
        "name":name,"email":email,"isAdmin":isAdmin
      }, config);
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  });




  // Action to list profiles
  export const listProfiles = createAsyncThunk('profile/list', async (_, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/admin/profiles/', config);
      return data;
    } catch (error) {
      return error.message;
    }
  });
  
  // Action to get a profile detail
  export const getProfileDetail = createAsyncThunk('profile/detail', async (profileId, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/profile/${profileId}/`, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });
  
  // Action to edit a profile
  export const editProfile = createAsyncThunk('profile/edit', async ({userId,name,email,phone,is_premium}, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
   
      const { data } = await axios.put(`/api/admin/edit-profile/${userId}/`,{ "username": name,"email":email,"phone":phone,"is_premium":is_premium
    }, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });
  
  // Action to delete a profile
  export const deleteProfile = createAsyncThunk('profile/delete', async (profileId, { getState }) => {
    const state = getState();
  
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/admin/profile/delete/${profileId}/`, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });
  
//payment success
  export const IsPaid = createAsyncThunk('profile/paymenmt', async (arg,{ getState }) => {
    const state = getState();
    console.log(state.user.userInfo.token)
    
  
    try {
      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${state.user.userInfo.token}`
        }
    }
  
      const { data } = await axios.put(`/api/user/paymentsuccess/`,null, config);
      return data;
    } catch (error) {
      return error.message;
    }
  });
  



 


  







