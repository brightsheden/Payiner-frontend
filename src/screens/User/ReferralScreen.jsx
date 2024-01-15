import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReferals } from "../../state/Actions/UserActions";
import BottomNavigation from "../../Components/Tabs";
import { Alert } from "react-daisyui";
import { Spinner } from "flowbite-react";

const ReferralPage = () => {
  // Dummy data for referrals
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(myReferals())


  },[dispatch])

  const referalstate = useSelector((state)=> state.myreferrals)
  const {referrals, isRequest,isSuccess} = referalstate

 
  return (
    <div className="bg-white-500 min-h-screen p-4 md:p-8">
      {/* Fixed Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-blue-500 p-4 flex items-center justify-between">
        <button onClick={() => window.history.back()} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="text-white">Logout</button>
      </div>

      <div className="md:hidden mt-16"> {/* Adjust margin top to accommodate fixed header */}
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">

          {/* Referrals List */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Referrals</h2>
            <ul>
              {isRequest && (
                <div className="text-center">
                     <Spinner/>
                </div>
             )}
              {referrals?.length == 0 && (<Alert>No referrals yet</Alert>)}
              {isSuccess && (<>
                {referrals.map(referral => (
                <li key={referral._id} className="border-b border-gray-300 py-4 flex items-center">
                  <img src={referral.image} alt={referral.name} className="rounded-full h-12 w-12 object-cover mr-4" />
                  <div>
                    <p className="text-blue-600 mb-1">{referral.name}</p>
                    <p className="text-gray-600 mb-1">{referral.email}</p>
                    <p className="text-gray-500">{referral.createdAt.slice(0,10)}</p>
                  </div>
                </li>
              ))}
              </>
              )}
              {referrals.map(referral => (
                <li key={referral._id} className="border-b border-gray-300 py-4 flex items-center">
                  <img src={referral.image} alt={referral.name} className="rounded-full h-12 w-12 object-cover mr-4" />
                  <div>
                    <p className="text-blue-600 mb-1">{referral.name}</p>
                    <p className="text-gray-600 mb-1">{referral.email}</p>
                    <p className="text-gray-500">{referral.createdAt.slice(0,10)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <BottomNavigation/>
    </div>
  );
};

export default ReferralPage;
