import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import localforage from "localforage";


export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    console.log(email,password)
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        

        const { data } = await axios.post(
            '/api/auth/login/',
            { 'username': email, 'password': password },
            config
        );



     
        
        localStorage.setItem('userInfo', JSON.stringify(data));
        //localforage.setItem('userInfo', JSON.stringify(data))
        
    
        return data;

        

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk('auth/register', async ({ name,email,referal, password }, { rejectWithValue }) => {

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
              
            }
        }
        

        const { data } = await axios.post(
            '/api/auth/registernew/',
            { 'name': name,'email':email, 'referal':referal, 'password': password },
            config
        );



     
        
        localStorage.setItem('userInfo', JSON.stringify(data));
        //localforage.setItem('userInfo', JSON.stringify(data))
        
    
        return data;

        

    } catch (error) {
        return rejectWithValue(error.message);
    }
});




export const confirmemail = createAsyncThunk('auth/confirmemail', async ({ passcode },{getState,dispatch}) => {
   const state = getState()
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }
        

        const { data } = await axios.post(
            '/api/auth/confirmemailpasscode/',
            { 'passcode': passcode },
            config
        );

    
        return data;

        

    } catch (error) {
    
        dispatch({
            type: 'auth/confirmemail/rejected',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
});

export const forgetpassword = createAsyncThunk('auth/forgetpassword', async ({ email},{dispatch}) => {
  
     try {
        const config = {
            headers: {
                'Content-type': 'application/json',
              
            }
        }
         
 
         const { data } = await axios.post(
             '/api/auth/forgot-password/',
             { 'email': email },
             config
         );
 
     
         return data;
 
         
 
     } catch (error) {
     
         dispatch({
             type: 'auth/forgetpassword/rejected',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message,
         })
     }
 });
 
 


 export const changePassword = createAsyncThunk('auth/changepassword', async ({old_password,new_password },{getState,dispatch}) => {
    const state = getState();
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
              
            }
        }
        

        const { data } = await axios.post(
            '/api/auth/change-password/',
            { old_password,new_password },
            config
        );



     
        
        localStorage.setItem('userInfo', JSON.stringify(data));
        //localforage.setItem('userInfo', JSON.stringify(data))
        
    
        return data;

        

    } catch (error) {
        dispatch({
            type: 'auth/changepassword/rejected',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
});