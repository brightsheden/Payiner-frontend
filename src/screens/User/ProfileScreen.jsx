import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { myProofs, profile, userbalance } from "../../state/Actions/UserActions";

import BottomNavigation from "../../Components/Tabs";

import MobileHeader from "../../Components/MobileHeader";
import { resetUserState } from "../../state/Slices/AuthSlices";
import { resetProfileState } from "../../state/Slices/UserSlice";
import { FaArrowCircleDown, FaCheckCircle, FaGift, FaMoneyBill, FaWallet } from "react-icons/fa";
import { Alert } from "react-daisyui";
import{ Spinner} from 'flowbite-react'





const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const profiledata = useSelector((state) => state.profile);
  const { isSuccess, isRequest, errorMessage, userProfile } = profiledata;

  const balancedata = useSelector((state) => state.balance);
  const {data } = balancedata;

  const myProofdata = useSelector((state) => state.myproof);
  const { isSucces: ProofSuccess, isRequest: ProofRequest, errorMessage: ProofError, proofs} = myProofdata;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const logoutHandler = () => {
    dispatch(resetUserState());
    dispatch(resetProfileState())
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      dispatch(profile());
      dispatch(userbalance());
      dispatch(myProofs())
    }
  }, [userInfo, navigate, dispatch]);

    


    

  return (
    <div className="bg-blue-300  md:mt-0 mt-[45px]">
  <MobileHeader page={'Profile'} logoutHandler={logoutHandler} />
  <div className="p-4 md:p-8">
    {/* Profile Card */}
    {isRequest && (
    <div className="text-center">
      <Spinner/>
      <span>Loading..</span>
      </div>)}
    {isSuccess && (
          <div className="bg-white w-full p-4 md:p-8 rounded-lg shadow-md mb-4">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="rounded-full overflow-hidden bg-blue-500 h-16 w-16 flex-shrink-0 mb-4 md:mb-0 md:mr-4">
              <img
                src={userProfile?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-lg font-semibold">{userProfile?.name}</h2>
              <p className="text-sm text-gray-600">{userProfile?.email}</p>
              <p className="text-sm text-gray-600">
                referral code: {userProfile?.referal_code}
              </p>
            </div>
            {/* Premium Badge */}
            <div className="flex flex-col mt-4 md:mt-0">
              {userProfile?.is_premium ? (
                <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md text-xs">
                  Premium
                </span>
              ) : (
                <span className="ml-2 px-2 py-1 bg-gray-500 text-white rounded-md text-xs">
                  freemium
                </span>
              )}
              {/* Edit Link */}
              <Link  to="/editprofile" className="ml-auto link text-blue-600">
                Edit
              </Link>
            </div>
          </div>
        </div>
    )}
  

    {/* Earning Details Card */}
   
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">

      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-2 md:mb-0">
          Earning Details
        </h2>
        <Link
          to="/transactions-history"
          className="text-blue-600 text-sm md:ml-2 link"
        >
          View Transactions History
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wallet */}
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Wallet</p>
            <p className="text-lg font-bold text-blue-600">&#8358;{data?.wallet}</p>
          </div>
        <FaWallet className="text-blue-500 text-2xl"/>
        </div>

        {/* Bonus */}
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Bonus</p>
            <p className="text-lg font-bold text-blue-600">&#8358;{data?.bonus}</p>
          </div>
            <FaGift className="text-blue-500 text-2xl"/>
        </div>

        {/* Total Balance */}
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Total Balance</p>
            <p className="text-lg font-bold text-blue-600">&#8358;{data?.total_balance}</p>
          </div>
          <FaMoneyBill className="text-2xl text-blue-500 "/>
        </div>

        {/* Withdraw */}
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Withdraw</p>
            <p className="text-lg font-bold text-blue-600">&#8358;{data?.withdraw}</p>
          </div>
         <FaArrowCircleDown className="text-2xl text-blue-500"/>
        </div>
      </div>
    </div>

    {/* Task Table Section */}
    <div className="hidden md:block bg-white p-4 my-8 md:p-8 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Task Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Task ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Approved</th>
          </tr>
        </thead>
        <tbody>
          {proofs?.map((proof) => (
            <tr key={proof._id}>
              <td className="p-2 border">{proof._id}</td>
              <td className="p-2 border">{proof.task.name}</td>
              <td className="p-2 border">{proof.task.amountPerUser}</td>
              <td className="p-2 border">
                {proof.is_approved ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="block md:hidden bg-white mt-5 p-5 rounded-md shadow-md">
      <div className="text-center my-4 font-xl font-medium">Task Performed</div>
      {proofs.length == 0 && (
        <Alert>You have'nt perform any task yet</Alert>
      )}
      
      {proofs.map((proof)=>(

<div  key={proof._id} className="p-4 hover:bg-blue-500 items-center bg-blue-200 text-black mb-2 text-base rounded-md shadow-md flex justify-between ">

 <span>{proof.task.name}</span> <span>{proof.task.amountPerUser}</span> <span>{proof.is_approved ? (<FaCheckCircle className="text-green-500"/>): (<FaCheckCircle className="text-gray-500"/>)}</span>
</div>
      ))}
      
    </div>
  </div>

  <BottomNavigation/>
</div>

  );
};

export default ProfilePage;
