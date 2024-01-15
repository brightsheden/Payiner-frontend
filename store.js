import { configureStore } from '@reduxjs/toolkit';
import { changePasswordReducer, confirmEmailReducer, forgetPasswordReducer, loginReducer, registerReducer } from './src/state/Slices/AuthSlices'
import { DailyCheckingReducer, accountVerificationReducer, adminUserReducer, balanceRducer, editeProfileRducer, myEarniningHistoryRducer, myProofReducer, myReferalReducer, myWithdrawRducer, paymentSuccessReducer, profileAdminReducer, profileReducer, withdrawRducer } from './src/state/Slices/UserSlice';
import { EditProofDetailsReducer, ProofDetailsReducer, createProofReducer,  createTaskReducer,  deleteTaskReducer,  editTaskReducer,  taskDetailReducer, taskDetailWithNoReducer, taskListReducer } from './src/state/Slices/TaskSlice';
import { listWithdrawalsReducer } from './src/state/Slices/AdminSlice';
import { createGroupReducer, deleteGroupReducer, groupDetailsReducer, groupMemberReducer, groupMessagesReducer, listGroupReducer, updateGroupReducer } from './src/state/Slices/CommunitySlice';



const store = configureStore({
    reducer:{
        user:loginReducer,
        register:registerReducer,
        confirmemail: confirmEmailReducer,
        profile:profileReducer,
        balance:balanceRducer, 
        forgetpassword:forgetPasswordReducer,
        editProfile:editeProfileRducer,
        withdraw:withdrawRducer,
        myWithdrawal:myWithdrawRducer,
        earninghistory:myEarniningHistoryRducer,
        tasklist :taskListReducer,
        taskdetail :taskDetailReducer,
        createproof:createProofReducer,
        createtask:createTaskReducer,
        edittask:editTaskReducer,
        deletetask:deleteTaskReducer,
        task:taskDetailWithNoReducer,
        userAdmin: adminUserReducer,
        profileAdmin:profileAdminReducer,
        listwithdrawal:listWithdrawalsReducer,
        proofdetail : ProofDetailsReducer,
        editproof : EditProofDetailsReducer,
        accountVerification : accountVerificationReducer,
        payment:paymentSuccessReducer,
        listGroup:listGroupReducer,
        groupDetails : groupDetailsReducer,
        messages:groupMessagesReducer,
        members:groupMemberReducer,
        updateGroup:updateGroupReducer,
        createGroup:createGroupReducer,
        deleteGroup:deleteGroupReducer,
        dailyChecking: DailyCheckingReducer,
        changepassword:changePasswordReducer,
        myreferrals:myReferalReducer,
        myproof:myProofReducer,

        
      
    }
})

export default store