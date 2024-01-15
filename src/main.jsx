import ReactDOM from 'react-dom/client'

import React from 'react'

import LoginScreen from './screens/Auth/LoginScreen'
import {
  createBrowserRouter,
  RouterProvider,BrowserRouter
} from "react-router-dom";
import { Provider } from 'react-redux';
import "./index.css";
import RegisterPage from './screens/Auth/RegisterScreen';
import ForgotPasswordPage from './screens/Auth/ForgetPasswordScreen';
import ConfirmEmailPage from './screens/Auth/ConfirmEmailScreen';
import NewPasswordPage from './screens/Auth/NewPasswordScreen';
import ProfilePage from './screens/User/ProfileScreen';
import ProfileEditPage from './screens/User/EditProfileScreen';
import TransactionsPage from './screens/User/EarningHistory';
import ReferralPage from './screens/User/ReferralScreen';
import WithdrawalHistoryPage from './screens/User/WithdrawScreen';
import WithdrawPage from './screens/User/ApplyWithdrawalScreen';
import DepositPage from './screens/User/DepositPage';
import TasksListPage from './screens/Tasks/TasksScreen';
import TaskDetailsPage from './screens/Tasks/TaskDetailsScreen';
import TaskEditPage from './screens/Tasks/TaskEditScreen';
import TaskCreatePage from './screens/Tasks/TaskCreateScreen';

import store from '../store.js';

import AdminTaskListPage from './screens/Admin/TaskListScreen';
import AdminUsersListPage from './screens/Admin/ProfileListScreen';
import AdminWithdrawalHistoryPage from './screens/Admin/WithdrawalHistory';
import AdminProfileListPage from './screens/Admin/ProfileListScreen';
import UsersListScreen from './screens/Admin/UsersListScreen';
import UserEditPage from './screens/Admin/UserEditScreen';
import AdminProfileEditPage from './screens/Admin/ProfileEditScreen';
import WithdrawalApproveScreen from './screens/Admin/WithdrawalApproveScreen';
import EditTaskProofPage from './screens/Tasks/EditTaskProofScreen';
import MoreScreen from './screens/User/MoreScreen';
import VerifyAccountScreen from './screens/User/VerifyAccountScreen';
import PaymentReceiptPage from './screens/User/PaymentReceipt';
import AdminVerificationPage from './screens/Admin/verificationProofScreen';
import AccountVerificationReviewPage from './screens/Admin/VerificationReviewPage';
import DailyCheckinsPage from './screens/User/DailyCheckingScreen';
import ForumListScreen from './screens/Community/ForumListScreen';
import ForumScreen from './screens/Community/NewForumScreen';
import ForumDetailScreen from './screens/Community/ForumDetailScreen';
import AdminForumPage from './screens/Admin/AdminForumScreen';
import ForumCreatePage from './screens/Admin/CreateForumScreen';
import DailyCheckingScreen from './screens/User/NewDailyChecking';
import AdminCheckinScreen from './screens/Admin/AdminCheckinScreen';
import ChangePassword from './screens/Auth/ChangePassword';
import BottomNavigation from './Components/Tabs';
import App from './App';


{/*const router = createBrowserRouter([
  {
    path: "/",
    element:<LoginScreen/> ,
  },

  {
    path: "register",
    element:<RegisterPage/> ,
  },

  {
    path: "forgetpassword",
    element:<ForgotPasswordPage/> ,
  },

  {
    path: "confirmemail",
    element:<ConfirmEmailPage/> ,
  },

  {
    path: "newpassword",
    element:<NewPasswordPage/> ,
  },

  {
    path: "profile",
    element:<ProfilePage/> ,
  },

  {
    path: "editprofile",
    element:<ProfileEditPage/> ,
  },

  {
    path: "transactions-history",
    element:<TransactionsPage/> ,
  },

  {
    path: "referals",
    element:<ReferralPage/> ,
  },

  {
    path: "withdrawalhistory",
    element:<WithdrawalHistoryPage/> ,
  },

  {
    path: "applyforwithdrawal",
    element:<WithdrawPage/> ,
  },

  {
    path: "deposit",
    element:<DepositPage/> ,
  },

  {
    path: "tasks",
    element:<TasksListPage/> ,
  },

  {
    path: "task-details/:taskId",
    element:<TaskDetailsPage/> ,
  },

  {
    path: "task-edit/:taskId",
    element:<TaskEditPage/> ,
  },

  {
    path: "createtask",
    element:<TaskCreatePage/> ,
  },

  {
    path: "admin/tasks",
    element:<AdminTaskListPage/> ,
  },

  {
    path: "/admin/users",
    element:<UsersListScreen/>
  },

  {
    path: "/admin/user_edit/:userId",
    element:<UserEditPage/>
  },

  {
    path: "/admin/editprofile/:userId",
    element:<AdminProfileEditPage/>
  },



  {
    path: "admin/profiles",
    element:<AdminProfileListPage/> ,
  },


  {
    path: "admin/withdrawals",
    element:<AdminWithdrawalHistoryPage/> ,
  },

  {
    path: "admin/withdrawal/:withdrawalId",
    element:<WithdrawalApproveScreen/> ,
  },

  {
    path: "edittaskproof/:proofId",
    element:<EditTaskProofPage/> ,
  },

  {
    path: "/setting",
    element:<MoreScreen/> ,
  },
  
  {
    path: "/verifyaccount",
    element:<VerifyAccountScreen/> ,
  },

  {
    path: "/paymentreceipt",
    element:<PaymentReceiptPage/> ,
  },

  {
    path: "/admin/verifications",
    element:<AdminVerificationPage/> ,
  },

  {
    path: "/admin/verifications/:verificationId",
    element:<AccountVerificationReviewPage/> ,
  },

  {
    path: "/user/dailychecking",
    element:<DailyCheckinsPage/> ,
  },


  {
    path: "/forums",
    element:<ForumListScreen/> 
  },

  {
    path: "/forums/:forumId",
    element:<ForumScreen/> 
  },

  {
    path: "/forumdetail/:forumId",
    element:<ForumDetailScreen/> 
  },

  {
    path: "/admin/forums",
    element:<AdminForumPage/> ,
  },


  {
    path: "/admin/creategroup",
    element:<ForumCreatePage/> ,
  },

  {
    path: "/checkin",
    element:<DailyCheckingScreen/> ,
  },

  {
    path: "/admin/checkin",
    element:<AdminCheckinScreen/> ,
  },

  {
    path: "/changepassword",
    element:<ChangePassword/> ,
  },


  
  
  
  
  
  
]);
*/}


 



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   
      <App/>
       
    
    </Provider>
  </React.StrictMode>,

);


{/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <BottomNavigation/>
    </Provider>
  </React.StrictMode>,
  
);*/}





