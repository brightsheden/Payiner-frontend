import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accointVerification } from '../../state/Actions/UserActions';
import MobileHeader from '../../Components/MobileHeader'
import { useNavigate } from 'react-router-dom';
import { resetAccountVerificationState } from '../../state/Slices/UserSlice';
import BottomNavigation from '../../Components/Tabs';
import { Alert } from 'react-daisyui';
function VerifyAccountScreen() {
  const [formData, setFormData] = useState({
    facebook: null,
    instagram: null,
    telegram: null,
    youtube: null,
    whatsapp: null,
  });

  const dispatch = useDispatch();

  const verifystate = useSelector((state)=> state.accountVerification)
  const {isRequest, isSuccess,errorMessage} = verifystate

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: file,
    }));
  };
const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate('/paymentreceipt')
      dispatch(resetAccountVerificationState())

    }
  },[isSuccess])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(accointVerification({ formData }));
    console.log(formData);
    setFormData({
      facebook: null,
      instagram: null,
      telegram: null,
      youtube: null,
      whatsapp: null,
    });
  };

  return (
    <>

    <MobileHeader page='Account Verification' />

<div className="container mx-auto p-8 bg-white rounded-md shadow-md">

    

     
     <h2 className="text-1xl font-bold mb-6">Account Verification</h2>
     <p className="mb-4">
       To complete your account verification, please follow these steps:
     </p>
   

     <ol className="list-decimal ml-6 mb-6">
       <li>Follow our social media pages:</li>
       <ul className="list-disc ml-6">
         <li>
           <a
             href="https://www.facebook.com/your-facebook-page"
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             Facebook
           </a>
         </li>
         <li>
           <a
             href="https://twitter.com/your-twitter-handle"
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             Twitter
           </a>
         </li>
         <li>
           <a
             href="https://www.instagram.com/your-instagram-handle"
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             Instagram
           </a>
         </li>
         {/* Add other social media platforms as needed */}
       </ul>
       <li className="mb-2">Submit proof of following by uploading screenshots or images.</li>
       <li className="mb-2">Provide your social media handles for verification.</li>
       <li>Pay the verification fee of <span>&#8358;</span> 5,000.</li>
     </ol>

       <form onSubmit={submitHandler} className="space-y-4 mb-8">
         <p className="text-gray-600 mb-4">
           Please upload the required documents for account verification. Supported file types: JPG, PNG, PDF.
         </p>

         {Object.keys(formData).map((field) => (
           <div key={field}>
             <label htmlFor={field} className="block text-sm font-medium text-gray-700">
               {field.charAt(0).toUpperCase() + field.slice(1)}
             </label>
             <div className="mt-1">
               <input
                 type="file"
                 required
                 id={field}
                 accept="image/jpeg, image/png, application/pdf"
                 onChange={(e) => handleFileChange(e, field)}
                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
               />
             </div>

             {formData[field] && (
               <div className="mt-2">
                 <img
                   src={URL.createObjectURL(formData[field])}
                   alt={`${field} preview`}
                   className="max-w-full h-auto"
                 />
               </div>
             )}
           </div>
         ))}

{errorMessage && (<Alert className='bg-red-500 text-white'>{errorMessage}</Alert>)}

         <button
           type="submit"
           className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
         >
          {isRequest && (<p>Loding...</p>)}
           Submit
         </button>
       </form>
       <BottomNavigation/>
     </div>
    </>
  
    
  );
}

export default VerifyAccountScreen;
