import { FaArrowCircleDown, FaArrowCircleUp, FaArrowLeft, FaArrowRight, FaArrowUp, FaCheckCircle, FaCog, FaIdBadge, FaInfoCircle, FaList, FaMoneyBill, FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";




function MoreScreen() {

  const profiledata = useSelector((state) => state.profile);
  const { isSucces, isRequest, errorMessage, userProfile } = profiledata;

  const navigate = useNavigate();
  
  return (
    <div className=" mb-20">
      {/* header */}
      <div className="flex justify-between p-4 bg-white fixed top-0 left-0 right-0 z-10  items-center shadow-md">
        <div onClick={() => navigate(-1)} className="flex gap-4 items-center">
          <FaArrowLeft/>
          <span>Settings</span>


        </div>
        <div>
          <button className="p-1 bg-red-500 text-sm text-white rounded-lg">Logout</button>
        </div>

      </div>

      <div className="mt-[60px] p-2 border">

        <div className="flex gap-4 items-center">
          <img className="rounded-full w-16 h-16" src={userProfile.image} alt={userProfile.name}/>

          <div className="flex flex-col ">
              <span className="text-sm text-gray-500">{userProfile.email}</span>
              <span className="text-base font-semibold">{userProfile.name}</span>
              <span className="text-sm text-gray-500">referal code: {userProfile.referal_code}</span>
              <Link to='/profile'><span className="text-sm link">view profile</span></Link>
              
          </div>
        </div>




      </div>

      <div>
        <ul>
          <Link to={'/transactions-history'}>
          <li className="flex justify-between p-2 items-center border-b ">

          <div className="flex gap-4 items-center">
          <FaList/> <span>My Earnings</span>

          </div>
          <div>
            <FaArrowRight/>
          </div>

          </li>
          </Link>
         

          <Link to={'/withdrawalhistory'}>

          <li className="flex justify-between p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaMoneyBill/> <span>My Withdrawals</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>
          </Link>
       

          <Link to={'/applyforwithdrawal'}>

          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaArrowCircleDown/> <span>Place Withdrawal</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>

          </Link>
           
          <Link to='/deposit'>
          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaArrowCircleUp/> <span>Deposit</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>

          </Link>
       
          <Link to='/editprofile'>

          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaUserAlt/> <span>Edit Profile</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>

          </Link>
         


          <Link to={'/verifyaccount'}>
          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaIdBadge/> <span>Verify account</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>
          </Link>
          
          <Link to={'/checkin'}>
          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaCheckCircle/> <span>Daily Checkin</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>
          </Link>
         

          
          
            <Link to={'/changepassword'}>
            <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaCog/> <span>Change password</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
           
            
          </li>
          </Link>

            
          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaInfoCircle/> <span>About</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>

          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaInfoCircle/> <span>Privacy</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>

          
          <li className="flex justify-between hover:bg-gray-200 p-2 items-center border-b ">
            <div className="flex gap-4 items-center">
            <FaSignOutAlt/> <span>Logout</span>

            </div>
            <div>
              <FaArrowRight className="text-sm"/>
            </div>
            
          </li>
        </ul>
      </div>


    </div>
  )
}

export default MoreScreen