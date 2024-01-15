import { createSlice } from "@reduxjs/toolkit";
import { changePassword, confirmemail, forgetpassword, login, register} from "../Actions/AuthActions.js";



{/*const userInfoFromStorage =localforage.getItem('userInfo').then(function(value) {
  JSON.parse(value)

})*/}

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null



//const userInfoFromStorage = localforage.getItem("userInfo") ?
//    JSON.parse(localforage.getItem("userInfo")) : null




export const loginSlice = createSlice({
  name: "user",
  initialState : {
    userInfo:  userInfoFromStorage,
  
    isRequest: false,
    isSuccess: false,
    errorMessage: "",
  },
  
  reducers: {
    resetUserState: (state) => {
      state.isRequest = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      state.userInfo = null
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userProfile');
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.userInfo = state.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      

  },
});

export const registerSlice = createSlice({
  name: "register",
  initialState:{
    userInfo:  userInfoFromStorage,
    isRequest: false,
    isSuccess: false,
    errorMessage: "",

  },
  reducers: {
    resetUserRegistertate: (state) => {
      state.isRequest = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userProfile')

 
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.userInfo = state.data
      })
      .addCase(register.rejected, (state, action) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      

  },
});



const confirmEmailSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success:false,
    error: null,
    confirmationData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmemail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.confirmationData = null;
      })
      .addCase(confirmemail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.confirmationData = action.payload;
      })
      .addCase(confirmemail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error confirming email'; // You can customize the error message here
        state.confirmationData = null;
      });
  },
});

const forgetPasswordSlice = createSlice({
  name: 'forgetpassword',
  initialState: {
    loading: false,
    success:false,
    error: null,
    forgetpasswordData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgetpasswordData = null;
      })
      .addCase(forgetpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.forgetpasswordData = action.payload;
      })
      .addCase(forgetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error confirming email'; // You can customize the error message here
        state.forgetpasswordData = null;
      });
  },
});



const changePasswordSlice = createSlice({
  name: 'changepassword',
  initialState: {
    loading: false,
    success:false,
    error: null,
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
    
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error changing password'; // You can customize the error message here
     
      });
  },
});


export const changePasswordReducer = changePasswordSlice.reducer

export const forgetPasswordReducer= forgetPasswordSlice.reducer;
export const confirmEmailReducer= confirmEmailSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer
export const {resetUserState} = loginSlice.actions
export const {resetUserRegisterState} = registerSlice.actions