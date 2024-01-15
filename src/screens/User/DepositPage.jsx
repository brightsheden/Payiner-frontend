import { useState } from 'react';
import MobileHeader from '../../Components/MobileHeader'
import BottomNavigation from '../../Components/Tabs';
const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();

    // Validation (You can add more sophisticated validation logic as needed)
    if (!amount || isNaN(parseFloat(amount))) {
      setNotification('Please enter a valid amount.');
      return;
    }

    // Process deposit (You can add your deposit logic here)

    // Clear form field and notification
    setAmount('');
    setNotification(`Deposit of $${amount} successful!`);
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <MobileHeader page={'Deposit'}/>
      {/* Deposit Form */}
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full md:max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Deposit Funds</h2>

        {/* Notification */}
        {notification && (
          <div className="bg-yellow-200 p-2 rounded-md mb-4 text-center">
            {notification}
          </div>
        )}

        {/* Deposit Content */}
        <p className="mb-4 text-center">Enter the amount you want to deposit:</p>

        {/* Deposit Form */}
        <form onSubmit={handleDeposit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-green-500"
              placeholder="Enter the deposit amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 focus:outline-none"
          >
            Pay Now
          </button>
        </form>

        {/* Deposit Content */}
        <div className="mt-4 text-center text-gray-600">
          <p>Securely deposit funds to your account.</p>
          <p>We accept all major credit cards and payment methods.</p>
        </div>
      </div>
      <BottomNavigation/>
    </div>
  );
};

export default DepositPage;
