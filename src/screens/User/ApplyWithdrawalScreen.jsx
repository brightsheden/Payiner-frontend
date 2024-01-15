import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdraw } from '../../state/Actions/UserActions';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../../Components/MobileHeader';
import BottomNavigation from '../../Components/Tabs';

const WithdrawPage = () => {

  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState('');

  const withdrawstate = useSelector((state)=>state.withdraw)
  const {isRequest,isSuccess,errorMessage,data} = withdrawstate
  const dispatch = useDispatch()
  const navigate =useNavigate()


  useEffect(()=>{
    if(data){
      navigate('/profile')
    }

  },[data,navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(withdraw({amount,accountName,bankName,accountNumber}))
    // Validation (You can add more sophisticated validation logic as needed)
    if (!accountName || !accountNumber || !bankName || !amount) {
      setNotification('Please enter all required details.');
      return;
    }



    // Process withdrawal (You can add your withdrawal logic here)

    // Clear form fields and notification
    setAccountName('');
    setAccountNumber('');
    setBankName('');
    setAmount('');
    setNotification('Withdrawal request submitted successfully!');
  };

  return (
    <div className="mt-[55px] md:mt-0  flex items-center justify-center">
       <MobileHeader page={'withdraw'}/>
      {/* Withdraw Form */}
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full md:max-w-md">
        <h2 className="hidden md:block text-lg font-semibold mb-4 text-center">Withdraw Funds</h2>

        {/* Notification */}
        {notification && (
          <div className="bg-yellow-200 p-2 rounded-md mb-4 text-center">
            {notification}
          </div>
        )}

        {isRequest && (<p>please wait</p>)}
        {isSuccess && (<p>Apply successful</p>)}

        {/* Withdraw Content */}
        <p className="mb-4 text-center">Enter your withdrawal details below:</p>

        {/* Withdraw Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter the withdrawal amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none"
          >
            Submit Withdrawal
          </button>
        </form>
      </div>
      <BottomNavigation/>
    </div>
  );
};

export default WithdrawPage;
