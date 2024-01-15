import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listVerifications } from '../../state/Actions/AdminActions';
//import { fetchVerificationStats, fetchVerificationProofs, reviewVerificationProof } from '../../state/Actions/AdminActions';

const AdminVerificationPage = () => {
  const dispatch = useDispatch();

  const verifystate = useSelector((state)=> state.accountVerification)
  const {isRequest, isSuccess,errorMessage, verifications} = verifystate


  useEffect(() => {
    dispatch(listVerifications())
   
  }, [dispatch]);

  const handleReviewClick = (proofId) => {
    // Dispatch the action to review the verification proof
    //dispatch(reviewVerificationProof(proofId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Account Verification</h2>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 p-4 rounded-md text-white">
          <p className="text-sm">Total Proofs Submitted</p>
          <p className="text-2xl font-bold">100</p>
        </div>
        <div className="bg-green-500 p-4 rounded-md text-white">
          <p className="text-sm">Total Verified Proofs</p>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="bg-red-500 p-4 rounded-md text-white">
          <p className="text-sm">Total Unverified Proofs</p>
          <p className="text-2xl font-bold">70</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Is Verified</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody> 

            {verifications.map((proof, index)=>(
                 <tr key={proof._id}>
                 <td className="border p-2">{index + 1}</td>
                 <td className="border p-2">{proof.profile_name}</td>
                 <td className={`border p-2 ${proof.is_verified ? 'text-green-500' : 'text-red-500'}`}>
                   {proof.isVerified ? 'Verified' : 'Unverified'}
                 </td>
                 <td className="border p-2">
                   <button
                     onClick={() => handleReviewClick(proof.id)}
                     className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                   >
                     Review
                   </button>
                 </td>
               </tr>

            ))}
     
             
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerificationPage;
