import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const forumlist = createAsyncThunk('forum/list', async (arg,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/forum/groups/',config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});

export const forumdetails = createAsyncThunk('forum/details', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/forum/groups/${id}`, config
        );
    
        return data;

    } catch (error) {
        return error.message
    }
});


export const groupMembers = createAsyncThunk('forum/members', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/forum/groups/${id}/members`, config
        );
    
        return data;

    } catch (error) {
        return error.message
    }
});





export const forumMessages = createAsyncThunk('forum/messages', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/forum/groups/${id}//messages/`,config
        );
    
        return data;

    } catch (error) {
        return error.message
    }
});



export const updateForum = createAsyncThunk('forum/update', async ({forumId, name,description,is_lock},{getState}) => {
    const state = getState();
   
    try {
        
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/forum/groups/update/${forumId}/`,
            {"name":name,"description":description, "is_lock":is_lock},
            config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const createForum = createAsyncThunk('forum/create', async ({name,image,description, is_locked},{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/forum/groups/creategroup`,
            {"name":name,"image":image, "description":description, "is_locked":is_locked},
            config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const deleteGroup = createAsyncThunk('forum/delete', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/forum/groups/${id}/delete`,config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});
