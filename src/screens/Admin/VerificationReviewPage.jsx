import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveVerification, getVerification } from '../../state/Actions/AdminActions';
import { useParams } from 'react-router-dom';
import { Checkbox } from 'react-daisyui';
import MobileHeader from '../../Components/MobileHeader';

const AccountVerificationReviewPage = () => {
  const { verificationId } = useParams();

  const verifystate = useSelector((state) => state.accountVerification);
  const { verification, isRequest, isSuccess, errorMessage } = verifystate;

  const dispatch = useDispatch();
  const [is_verified, setIsVerified] = useState(false)

  useEffect(() => {
    dispatch(getVerification(verificationId));
  }, [dispatch, verificationId]);

  useEffect(()=>{
    if(verification){
        setIsVerified(verification.is_verified)
    }
  },[setIsVerified,verification])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(approveVerification({verificationId,is_verified}))
  }

  return (
    <> 
    <MobileHeader page={'Review Account Verification'}/>

<div className="container mt-9 mx-auto p-4">
      <h2 className="hidden md:block text-2xl font-semibold mb-4">Account Verification Review</h2>

      {/* Facebook Image Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">Facebook Verification</p>
        <img
          src={verification.facebook}
          alt="Facebook Verification"
          className="w-full h-auto max-h-96 rounded-md shadow-md"
        />
      </div>

      {/* WhatsApp Image Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">WhatsApp Verification</p>
        <img
          src={verification.whatsapp}
          alt="WhatsApp Verification"
          className="w-full h-auto max-h-96 rounded-md shadow-md"
        />
      </div>

      {/* Instagram Image Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">Instagram Verification</p>
        <img
          src={verification.instagram}
          alt="Instagram Verification"
          className="w-full h-auto max-h-96 rounded-md shadow-md"
        />
      </div>

      {/* YouTube Image Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">YouTube Verification</p>
        <img
          src={verification.youtube}
          alt="YouTube Verification"
          className="w-full h-auto max-h-96 rounded-md shadow-md"
        />
      </div>

      {/* Telegram Image Section */}
      <div>
        <p className="text-lg font-semibold mb-2">Telegram Verification</p>
        <img
          src={verification.telegram}
          alt="Telegram Verification"
          className="w-full h-auto max-h-96 rounded-md shadow-md"
        />
      </div>

      <form className='my-8 space-y-2' onSubmit={handleSubmit}>
        <div className='text-center space-y-2'>
            <label className='block'>Click to verify user</label>
            <Checkbox
              type='checkbox' checked={is_verified} 
            
            onChange={(e)=>setIsVerified(e.target.checked)} />

        </div>
        <button className='btn bg-primary w-full text-white'>Submit</button>
      </form>
    </div>
    </>
   
  );
};

export default AccountVerificationReviewPage;
