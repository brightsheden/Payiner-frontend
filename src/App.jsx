import { HashRouter, Routes, Route } from 'react-router-dom';
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

import LoginScreen from './screens/Auth/LoginScreen'

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
import AdminDashboardScreen from './screens/Admin/AdminDashboardScreen';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (

    <HashRouter>
          <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="confirmemail" element={<ConfirmEmailPage />} />
      <Route path="newpassword" element={<NewPasswordPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="editprofile" element={<ProfileEditPage />} />
      <Route path="transactions-history" element={<TransactionsPage />} />
      <Route path="referals" element={<ReferralPage />} />
      <Route path="withdrawalhistory" element={<WithdrawalHistoryPage />} />
      <Route path="applyforwithdrawal" element={<WithdrawPage />} />
      <Route path="deposit" element={<DepositPage />} />
      <Route path="tasks" element={<TasksListPage />} />
      <Route path="task-details/:taskId" element={<TaskDetailsPage />} />
      <Route path="task-edit/:taskId" element={<TaskEditPage />} />
      <Route path="createtask" element={<TaskCreatePage />} />
      <Route path="admin/tasks" element={<AdminTaskListPage />} />
      <Route path="/admin/users" element={<UsersListScreen />} />
      <Route path="/admin/user_edit/:userId" element={<UserEditPage />} />
      <Route path="/admin/editprofile/:userId" element={<AdminProfileEditPage />} />
      <Route path="admin/profiles" element={<AdminProfileListPage />} />
      <Route path="admin/withdrawals" element={<AdminWithdrawalHistoryPage />} />
      <Route path="admin/withdrawal/:withdrawalId" element={<WithdrawalApproveScreen />} />
      <Route path="edittaskproof/:proofId" element={<EditTaskProofPage />} />
      <Route path="/setting" element={<MoreScreen />} />
      <Route path="/verifyaccount" element={<VerifyAccountScreen />} />
      <Route path="/paymentreceipt" element={<PaymentReceiptPage />} />
      <Route path="/home" element={<HomeScreen />} />

      <Route path="/" element={<LoginScreen />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="confirmemail" element={<ConfirmEmailPage />} />
      <Route path="newpassword" element={<NewPasswordPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="editprofile" element={<ProfileEditPage />} />
      <Route path="transactions-history" element={<TransactionsPage />} />
      <Route path="referals" element={<ReferralPage />} />
      <Route path="withdrawalhistory" element={<WithdrawalHistoryPage />} />
      <Route path="applyforwithdrawal" element={<WithdrawPage />} />
      <Route path="deposit" element={<DepositPage />} />
      <Route path="tasks" element={<TasksListPage />} />
      <Route path="task-details/:taskId" element={<TaskDetailsPage />} />
      <Route path="task-edit/:taskId" element={<TaskEditPage />} />
      <Route path="createtask" element={<TaskCreatePage />} />
      <Route path="admin/tasks" element={<AdminTaskListPage />} />
      <Route path="/admin/users" element={<UsersListScreen />} />
      <Route path="/admin/user_edit/:userId" element={<UserEditPage />} />
      <Route path="/admin/editprofile/:userId" element={<AdminProfileEditPage />} />
      <Route path="admin/profiles" element={<AdminProfileListPage />} />
      <Route path="admin/withdrawals" element={<AdminWithdrawalHistoryPage />} />
      <Route path="admin/withdrawal/:withdrawalId" element={<WithdrawalApproveScreen />} />
      <Route path="edittaskproof/:proofId" element={<EditTaskProofPage />} />
      <Route path="/setting" element={<MoreScreen />} />
      <Route path="/verifyaccount" element={<VerifyAccountScreen />} />
      <Route path="/paymentreceipt" element={<PaymentReceiptPage />} />
      <Route path="/admin/verifications" element={<AdminVerificationPage />} />
      <Route path="/admin/verifications/:verificationId" element={<AccountVerificationReviewPage />} />
      <Route path="/user/dailychecking" element={<DailyCheckinsPage />} />
      <Route path="/forums" element={<ForumListScreen />} />
      <Route path="/forums/:forumId" element={<ForumScreen />} />
      <Route path="/forumdetail/:forumId" element={<ForumDetailScreen />} />
      <Route path="/admin/forums" element={<AdminForumPage />} />
      <Route path="/admin/creategroup" element={<ForumCreatePage />} />
      <Route path="/checkin" element={<DailyCheckingScreen />} />
      <Route path="/admin/checkin" element={<AdminCheckinScreen />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path= "/admindashboard/" element={<AdminDashboardScreen/>} />
    </Routes>
    </HashRouter>
  
  );
}

export default App