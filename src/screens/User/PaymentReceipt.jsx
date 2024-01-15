import { useState } from 'react';
import MobileHeader from '../../Components/MobileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { IsPaid } from '../../state/Actions/UserActions';
import { Alert, Toast } from 'flowbite-react';
import { HiCheck} from 'react-icons/hi';
import BottomNavigation from '../../Components/Tabs';

function PaymentReceiptPage() {

    const profilestate = useSelector((state)=> state.profile)
    const {userProfile} = profilestate

    const paymentsuccessstate = useSelector((state)=>state.payment)
    const {isSuccess} = paymentsuccessstate


  const [amount, setAmount] = useState(5000);

  const config = {
    public_key: 'FLWPUBK-ef4f52d701abf90c2a052928a91e880e-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userProfile.email,
       phone_number: userProfile.phone,
      name: userProfile.name,
    },
    customizations: {
      title: 'Account Verification',
      description: 'Payment for Payiner account verification',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


  const dispatch = useDispatch()
  const paymentSuccessHandler = () => {
    
    dispatch(IsPaid())
    console.log('Payment processed for amount:', amount);
  };

  return (
    <>
    <MobileHeader page='Payment'/>
     <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-2  max-w-md">
        {isSuccess && ( <>
          <Alert className='bg-green-500 text-white' >Congratulation you have succesfully make payment,wait while we review your proof</Alert>
          
        <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Congratulation you have succesfully make payment,wait while we review your proof</div>
        <Toast.Toggle />
      </Toast>
        </>)}
        <h1 className="text-2xl font-semibold text-blue-500 mb-6">Payment Checkout</h1>



      
        <div className="space-y-4">
          <p className="text-gray-600 font-semibold font-base">
           Continue your Account Verification , by making the one-time payment
          </p>

          <div className='bg-gray-200 p-2'>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <div className="flex items-center gap-2 items-center">
              <span className="text-blue-500">$</span>
              <span className="text-xl font-semibold">{amount}</span>
            </div>
          </div>

          <div className='bg-gray-200 p-2'>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <p className="text-gray-700">One-time verification fee</p>
          </div>

          <button
           onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                 console.log(response);
                 paymentSuccessHandler()
                  closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }}
        
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Pay Now
          </button>
         
        </div>
      </div>
    </div>
    <BottomNavigation/>
    </>
   
  );
}

export default PaymentReceiptPage;
