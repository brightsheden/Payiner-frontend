import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const tasklist = createAsyncThunk('task/list', async (arg,{getState, rejectWithValue}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/task/tasks/',config
        );
    
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const taskdetails = createAsyncThunk('task/details', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/task/details_with_proofs/${id}`,config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const createproof = createAsyncThunk('proof/create', async ({image,task,description},{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/task/submit_proof/`,
            {"image":image,"task":task, "description":description},
            config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const createTask = createAsyncThunk('task/create', async ({name,image,amountPerUser,numberOfuser,description},{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/task/create/`,
            {"name":name,"image":image,"amountPerUser":amountPerUser,"numberOfUsers":numberOfuser , "description":description},
            config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const editTask = createAsyncThunk('task/edittask', async ({taskId, name,amountPerUser,numberOfUsers,description},{getState}) => {
    const state = getState();
  
    try {
        
       

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/task/update/${taskId}/`,
            {"name":name,"amountPerUser":amountPerUser,"numberOfusers":numberOfUsers,"description":description},
          
            config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const deleteTask = createAsyncThunk('task/delete', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/task/delete/${id}`,config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


//task details without proof
export const taskdetail = createAsyncThunk('task/detail', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/task/${id}`,config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


//proof details
export const proofdetail = createAsyncThunk('proof/detail', async (id,{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/task/proof/${id}`,config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});


export const editproof = createAsyncThunk('proof/edit', async ({proofId, image,description,is_approve},{getState}) => {
    const state = getState();

  
    try {
        
       
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state.user.userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/task/update_proof/${proofId}/`,
            {"description":description, "is_approve":is_approve },config
        );
    
        return data;

    } catch (error) {
        return error.message;
    }
});

