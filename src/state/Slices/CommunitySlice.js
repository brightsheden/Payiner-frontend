import { createSlice } from "@reduxjs/toolkit";
import { createForum, deleteGroup, forumMessages, forumdetails, forumlist, groupMembers, updateForum } from "../Actions/CommunityActions";


export const listGroupSlice = createSlice({
    name: "register",
    initialState:{
      groups:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetLisGrouptState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.groups = null
      
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(forumlist.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(forumlist.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.groups = state.data
        })
        .addCase(forumlist.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const groupDetailsSlice = createSlice({
    name: "groupDetails",
    initialState:{
      group:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetGroupDetailState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.group = null
      
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(forumdetails.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(forumdetails.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.group = state.data
        })
        .addCase(forumdetails.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });
  
  

  export const groupMessagesSlice = createSlice({
    name: "groupDetails",
    initialState:{
      messages:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetGroupMessageState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.messages = null
      
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(forumMessages.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(forumMessages.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.messages = state.data
        })
        .addCase(forumMessages.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });
  
  
  export const groupMembersice = createSlice({
    name: "groupMembers",
    initialState:{
      members:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetGroupMemberState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.members = null
      
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(groupMembers.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(groupMembers.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.members = state.data
        })
        .addCase(groupMembers.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const updateGroupSlice = createSlice({
    name: "updateGroupMembers",
    initialState:{
  
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetUpdateGroupState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
  
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(updateForum.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(updateForum.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
    
        })
        .addCase(updateForum.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const createGroupSlice = createSlice({
    name: "createGroupMembers",
    initialState:{
  
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetCreateGroupState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
  
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(createForum.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(createForum.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
    
        })
        .addCase(createForum.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const deleteGroupSlice = createSlice({
    name: "deleteGroupMembers",
    initialState:{
  
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetDeleteGroupState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
  
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(deleteGroup.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(deleteGroup.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
    
        })
        .addCase(deleteGroup.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });
  
  
  
  

export const listGroupReducer = listGroupSlice.reducer
export const {resetLisGrouptState} =  listGroupSlice.actions

export const groupDetailsReducer = groupDetailsSlice.reducer
export const {resetGroupDetailState} = groupDetailsSlice.actions

export const groupMessagesReducer = groupMessagesSlice.reducer
export const {resetGroupMessageState} = groupMessagesSlice.actions

export const groupMemberReducer = groupMembersice.reducer
export const {resetGroupMemberState} = groupMembersice.actions

export const updateGroupReducer = updateGroupSlice.reducer
export const {resetUpdateGroupState} = updateGroupSlice.actions

export const createGroupReducer = createGroupSlice.reducer
export const {resetCreateGroupState} = createGroupSlice.actions

export const deleteGroupReducer = deleteGroupSlice.reducer
export const {resetDeleteGroupState} = deleteGroupSlice.actions