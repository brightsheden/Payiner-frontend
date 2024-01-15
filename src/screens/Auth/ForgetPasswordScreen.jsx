import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetpassword } from "../../state/Actions/AuthActions";
import SpinnerC from '../../Components/Loading'
import AlertComponent from '../../Components/Alert'

const ForgotPasswordPage = () => {
    // Redux state variables
    const forgetpasswordData = useSelector((state) => state?.forgetpassword.forgetpasswordData);
    const loading = useSelector((state) => state?.forgetpassword.loading);
    const error = useSelector((state) => state?.forgetpassword.error);
    const success = useSelector((state) => state?.forgetpassword.success);
  
    // Local component state for form input
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    // Effect to dispatch the confirmemail action when confirmationCode changes
    useEffect(() => {
     
  
      if(forgetpasswordData){
        navigate('/newpassword')
  
      }
    }, [forgetpasswordData,success, navigate]);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
     
      dispatch(forgetpassword({ email: email }));
      
     
    };
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
        {loading && (<SpinnerC/>)}
        {error && (<AlertComponent/>)}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forgot Password</h2>
        
        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full rounded border border-gray-300"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">Submit</button>
        </form>

        {/* Additional Content */}
        <div className="mt-4 text-sm text-gray-600">
         
          <p>Verify your email to proceed with the password reset process.</p>
        </div>
        
        {/* Loading and Error Messages */}
        {loading && <p className="mt-4 text-sm text-gray-600">Confirming email...</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {forgetpasswordData && (
          <p className="mt-4 text-sm text-green-500">Email confirmed successfully! {/* You can display additional confirmation details here */}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
