import { createSlice } from "@reduxjs/toolkit";
import { createTask, createproof, deleteTask, editTask, editproof, proofdetail, taskdetail, taskdetails, tasklist } from "../Actions/TaskActions";

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState : {
        tasks: [],
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(tasklist.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(tasklist.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.tasks = action.payload;
        })
        .addCase(tasklist.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });


  export const taskDetailSlice = createSlice({
    name: 'taskDetail',
    initialState : {
        taskdetail: [],
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(taskdetails.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(taskdetails.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.taskdetail = action.payload;
        })
        .addCase(taskdetails.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });



  export const createTaskProofSlice = createSlice({
    name: 'taskproof',
    initialState : {
    
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(createproof.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(createproof.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(createproof.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });


  export const createTaskSlice = createSlice({
    name: 'create_task',
    initialState : {
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
      resetCreateTaskState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
      
  
   
      },
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(createTask.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(createTask.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });



  export const editTaskSlice = createSlice({
    name: 'edit_task',
    initialState : {
    
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {

      resetEditTaskState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
      
  
   
      },
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(editTask.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(editTask.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(editTask.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });


  export const deleteTaskSlice = createSlice({
    name: 'delete_task',
    initialState : {
    
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteTask.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });


//task details slice with no proof
  export const taskDetailWithNoProofSlice = createSlice({
    name: 'taskDetailwithnoproof',
    initialState : {
        taskdetail: [],
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(taskdetail.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(taskdetail.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.taskdetail = action.payload;
          state.data = action.payload;
        })
        .addCase(taskdetail.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });


  export const ProofDetailsSlice = createSlice({
    name: 'proofdetails',
    initialState : {
        proofdetail: [],
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(proofdetail.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(proofdetail.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.proofdetail = action.payload;
          state.data = action.payload;
        })
        .addCase(proofdetail.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });



  export const EditProofDetailsSlice = createSlice({
    name: 'editproof',
    initialState : {
        proofdetail: [],
        isRequest: false,
        isSuccess: false,
        errorMessage: '',
      },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(editproof.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(editproof.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          //state.editproof = action.payload;
          state.data = action.payload;
        })
        .addCase(editproof.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });

  export  const  taskListReducer = taskListSlice.reducer
  export const taskDetailReducer = taskDetailSlice.reducer
  export const createProofReducer = createTaskProofSlice.reducer
  export const createTaskReducer = createTaskSlice.reducer
  export const editTaskReducer = editTaskSlice.reducer
  export const deleteTaskReducer = deleteTaskSlice.reducer
  export const taskDetailWithNoReducer = taskDetailWithNoProofSlice.reducer
  export const {resetCreateTaskState} = createTaskSlice.actions
  export const {resetEditTaskState} = editTaskSlice.actions
  export const ProofDetailsReducer = ProofDetailsSlice.reducer
  export const EditProofDetailsReducer = EditProofDetailsSlice.reducer