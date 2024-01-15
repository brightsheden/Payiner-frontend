import React, { useEffect } from 'react';
import MobileHeader from '../../Components/MobileHeader';
import { Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import { Alert, Stats } from 'react-daisyui';
import { useDispatch, useSelector } from 'react-redux';
import { completeCheckings, myCheckings } from '../../state/Actions/UserActions';
import { FaCheckCircle } from 'react-icons/fa';
import { resetDailyCheckInState } from '../../state/Slices/UserSlice';
import BottomNavigation from '../../Components/Tabs';

const DailyCheckingScreen = () => {
  // Dummy data for the table

  const checkingstate = useSelector((state)=>state.dailyChecking)
  const {mycheckings, isRequest, isSuccess, errorMessage, successComplete} = checkingstate

  const dispatch  = useDispatch()

  useEffect(()=>{
    dispatch(myCheckings())
    if(successComplete){
        dispatch(resetDailyCheckInState())
    }
    

  },[dispatch,successComplete])

  const handleCheckIn = ()=>{
    dispatch(completeCheckings())
    

  }



  return (
    <>
    <MobileHeader page={'Daily Checkin'}/>
     <div className="container mt-[60px] md:mt-0 mx-auto p-4">
      {/* Instruction Card */}
      <div className="bg-gray-100 p-4 mb-4 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-2">Daily Checking Instructions</p>
        <p>Click the button below for your daily checking.</p>
      </div>

      {successComplete && (  <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
        <Toast.Toggle />
      </Toast>)}

      {errorMessage && (<Alert className='text-white bg-red-500'>{errorMessage}</Alert>)}

      {/* Check-in Button */}
      <div className="flex justify-center mb-4">
        <button onClick={handleCheckIn} className="bg-blue-500 text-white py-4 px-8 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Check-in
        </button>
      </div>


    

      {/* Stats Section */}
      <div className="flex gap-4 mb-4">
       
       <Stats className="bg-base-200 shadow">
     <Stats.Stat>
       <Stats.Stat.Item variant="title">Total Checkin</Stats.Stat.Item>
       <Stats.Stat.Item variant="value">{mycheckings.length}</Stats.Stat.Item>
      
     </Stats.Stat>
   </Stats>

  
     


     </div>

      {/* Table Section */}
      <div>
        <p className="text-lg font-semibold mb-2">Check-in History</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S/N</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {mycheckings?.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.is_completed ? (<FaCheckCircle className='text-green-500'/>):(< FaCheckCircle className='text-gray-500'/>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <BottomNavigation/>
    </>
   
  );
};

export default DailyCheckingScreen;
