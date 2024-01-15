import { createSlice } from "@reduxjs/toolkit";

import localforage from "localforage";
import { Allcheckins, IsPaid, accointVerification, 
  completeCheckings, 
  deleteProfile, deleteUser, editProfile, 
  editoprofile, fetchUserDetails, fetchUserList, getProfileDetail, 
  listProfiles, myCheckings, myProofs, myReferals, myearnings, mywithdrawal, profile,updateUser,userbalance, withdraw } from "../Actions/UserActions.js";
import { approveVerification, getVerification, listVerifications } from "../Actions/AdminActions.js";


const userProfileFromStorage =localforage.getItem('userProfile') ?
    JSON.parse(localStorage.getItem("userProfile")) : null



export const profileSlice = createSlice({
    name: "profile",
    initialState:{
      userProfile:  userProfileFromStorage,
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetProfileState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.userProfile =[]
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userProfile');
  
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(profile.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(profile.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.userProfile = state.data
        })
        .addCase(profile.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const balanceSlice = createSlice({
    name: "balance",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetUserbalanceState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
      
  
   
      },
    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(userbalance.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(userbalance.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(userbalance.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const editMyProfileSlice = createSlice({
    name: "editprofile",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetEditProfileState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.data = null;
        
      },

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(editoprofile.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(editoprofile.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(editoprofile.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });
  


  export const withdrawSlice = createSlice({
    name: "withdraw",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(withdraw.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(withdraw.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(withdraw.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const myWithdrawalSlice = createSlice({
    name: "mywithdrawals",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(mywithdrawal.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(mywithdrawal.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(mywithdrawal.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });

  export const myEaringHistorySlice = createSlice({
    name: "myearninghistory",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(myearnings.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(myearnings.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(myearnings.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });
  


  export const accountVerificationSlice = createSlice({
    name: "accountverification",
    initialState:{

      verifications: [],
      verification:[],

      isRequest: false,
      isSuccess: false,
      successFetch:false,
      errorMessage: "",
  
    },
    reducers: {
      resetAccountVerificationState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.successFetch = false;
        state.errorMessage = "";
        state.data = null;
        state.verifications =null
      },

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(accointVerification.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(accointVerification.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
        
      
        })

        .addCase(accointVerification.rejected, (state, action) => {
          state.isRequest = false;
          state.successFetch = false;
          state.errorMessage = action.payload;
        })

      
        
        .addCase(listVerifications.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(listVerifications.fulfilled, (state, action) => {
          state.isRequest = false;
          state.successFetch = true;
          state.data = action.payload;
          state.verifications =action.payload
        
      
        })
          .addCase(listVerifications.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })


        .addCase(getVerification.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(getVerification.fulfilled, (state, action) => {
          state.isRequest = false;
          state.successFetch = true;
          state.data = action.payload;
          state.verification =action.payload
        
      
        })
          .addCase(getVerification.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })


        .addCase(approveVerification.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(approveVerification.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
    
        
      
        })
          .addCase(approveVerification.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
      
      
      
      

        
  
    },
  });


  export const paymentSuccessSlice = createSlice({
    name: "payment",
    initialState:{

      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetPaymentState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
      },

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(IsPaid.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(IsPaid.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
      
        })
        .addCase(IsPaid.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });



  export const userSlice = createSlice({
    name: 'user',
    initialState: {
      userList: [],
      userDetails: null,
      isRequest: false,
      isSuccess: false,
      errorMessage: '',
      deleteSuccess: false
    },
    reducers: {
      resetUserAdminState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = '';
        state.userList = [];
        state.userDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserList.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(fetchUserList.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.userList = action.payload;
        })
        .addCase(fetchUserList.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        })
        .addCase(fetchUserDetails.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.userDetails = action.payload;
        })
        .addCase(fetchUserDetails.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        })
        .addCase(deleteUser.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(deleteUser.fulfilled, (state,action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.deleteSuccess=true;
          state.data = action.payload;
          // Update the state accordingly based on your requirements
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        })

        .addCase(updateUser.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(updateUser.fulfilled, (state) => {
          state.isRequest = false;
          state.isSuccess = true;
          // Update the state accordingly based on your requirements
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.error.message;
        });
    },
  });
  


  export const profileAdminSlice = createSlice({
    name: 'profile',
    initialState: {
      profiles: [],
      selectedProfile: null,
      isRequest: false,
      isSuccess: false,
      deleteSuccess:false,
      errorMessage: '',
    },
    reducers: {
      resetProfileAdminState: (state) => {
        state.profiles = [];
        state.selectedProfile = null;
        state.isRequest = false;
        state.isSuccess = false;
        state.deleteSuccess = false;
        state.errorMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(listProfiles.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(listProfiles.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.profiles = action.payload;
        })
        .addCase(listProfiles.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        .addCase(getProfileDetail.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(getProfileDetail.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.selectedProfile = action.payload;
        })
        .addCase(getProfileDetail.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        .addCase(editProfile.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(editProfile.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          // Update the edited profile in the list
          const updatedProfiles = state.profiles.map(profile =>
            profile.id === action.payload.id ? action.payload : profile
          );
          state.profiles = updatedProfiles;
        })
        .addCase(editProfile.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        .addCase(deleteProfile.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(deleteProfile.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.deleteSuccess = true;
          // Remove the deleted profile from the list
          state.profiles = state.profiles.filter(profile => profile.id !== action.payload.id);
        })
        .addCase(deleteProfile.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        });
    },
  });


  export const DailyCheckingSlice = createSlice({
    name: 'daily checking',
    initialState: {
      mycheckings: [],
      checkings: [],
      isRequest: false,
      isSuccess: false,
      successComplete:false,
      deleteSuccess:false,
      errorMessage: '',
    },
    reducers: {
      resetDailyCheckInState: (state) => {
        state.checkings = [];
        state.mycheckings=[]
        state.isRequest = false;
        state.isSuccess = false;
   
        state.errorMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(myCheckings.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(myCheckings.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.mycheckings = action.payload;
        })
        .addCase(myCheckings.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })

        .addCase(completeCheckings.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(completeCheckings.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.successComplete=true
      
        })
        .addCase(completeCheckings.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.successComplete =false;
          state.errorMessage = action.payload;
        })

        .addCase(Allcheckins.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(Allcheckins.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.checkings = action.payload
          
      
        })
        .addCase(Allcheckins.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
        
          state.errorMessage = action.payload;
        })
    },
  });
  



  export const myReferalSlice = createSlice({
    name: "myrferals",
    initialState:{

      referrals:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetMyReferalState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.referrals = []
      },

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(myReferals.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(myReferals.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.referrals = action.payload;
      
        })
        .addCase(myReferals.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });


  export const myProofSlice  = createSlice({
    name: "myproofs",
    initialState:{

      proofs:[],
      isRequest: false,
      isSuccess: false,
      errorMessage: "",
  
    },
    reducers: {
      resetProofState: (state) => {
        state.isRequest = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.data = null;
        state.proofs = []
      },

    },
  
    
    extraReducers: (builder) => {
      builder
        .addCase(myProofs.pending, (state) => {
          state.isRequest = true;
        })
        .addCase(myProofs.fulfilled, (state, action) => {
          state.isRequest = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.proofs = action.payload;
      
        })
        .addCase(myProofs.rejected, (state, action) => {
          state.isRequest = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
        })
        
  
    },
  });





  // Export actions and reducer
export const { resetProfileAdminState } = profileAdminSlice.actions;
export const profileAdminReducer=profileAdminSlice.reducer;
  

  
export default userSlice.reducer;

export const profileReducer = profileSlice.reducer
export const balanceRducer = balanceSlice.reducer
export const editeProfileRducer = editMyProfileSlice.reducer
export const {resetEditProfileState} = editMyProfileSlice.actions
export const withdrawRducer = withdrawSlice.reducer
export const myWithdrawRducer = myWithdrawalSlice.reducer
export const myEarniningHistoryRducer = myEaringHistorySlice.reducer
export const { resetUserAdminState } = userSlice.actions;

export const accountVerificationReducer = accountVerificationSlice.reducer
export const {resetAccountVerificationState} = accountVerificationSlice.actions

export const adminUserReducer = userSlice.reducer;
export const {resetProfileState} = profileSlice.actions

export const paymentSuccessReducer = paymentSuccessSlice.reducer
export const {resetPaymentState} = paymentSuccessSlice.actions

export const DailyCheckingReducer = DailyCheckingSlice.reducer
export const {resetDailyCheckInState} = DailyCheckingSlice.actions

export const myReferalReducer = myReferalSlice.reducer
export const {resetMyReferalState} = myReferalSlice.reducer

export const myProofReducer = myProofSlice.reducer
export const {resetProofState} = myProofSlice.actions