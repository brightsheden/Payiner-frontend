import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmemail } from '../../state/Actions/AuthActions'; // Adjust the import path
import { useNavigate } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const dispatch = useDispatch();

  // Redux state variables
  const confirmationData = useSelector((state) => state?.confirmemail.confirmationData);
  const loading = useSelector((state) => state?.confirmemail.loading);
  const error = useSelector((state) => state?.confirmemail.error);
  const success = useSelector((state) => state?.confirmemail.success);

  // Local component state for form input
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate()

  // Effect to dispatch the confirmemail action when confirmationCode changes
  useEffect(() => {
   

    if(success){
      navigate('/profile')

    }
  }, [confirmationCode,success, dispatch,navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmationCode.length === 6) {
      dispatch(confirmemail({ passcode: confirmationCode }));
    }
   
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Confirm Email</h2>

        {/* Confirm Email Form */}
        <form onSubmit={handleSubmit}>
          {/* Confirmation Code Field */}
          <div className="mb-4">
            <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-600">Confirmation Code</label>
            <input
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
          >
            Submit
          </button>
        </form>

        {/* Additional Content */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Enter the 6-digit code sent to your email to confirm your account.</p>
        </div>

        {/* Loading and Error Messages */}
        {loading && <p className="mt-4 text-sm text-gray-600">Confirming email...</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {confirmationData && (
          <p className="mt-4 text-sm text-green-500">Email confirmed successfully! {/* You can display additional confirmation details here */}</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
