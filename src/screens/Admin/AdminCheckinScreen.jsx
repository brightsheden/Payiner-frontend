// AdmingroupsListPage.jsxport { Stats } from 'daisyui';

import { useEffect } from "react";
import { Stats } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { Allcheckins, deleteProfile, listProfiles } from "../../state/Actions/UserActions";
import { Link } from "react-router-dom";
import MobileHeader from "../../Components/MobileHeader";
import { deleteGroup, forumlist } from "../../state/Actions/CommunityActions";
import { FaCheckCircle } from "react-icons/fa";

const AdminCheckinScreen = () => {
 

  


  const checkingstate = useSelector((state)=>state.dailyChecking)
  const {checkings, isRequest, isSuccess, errorMessage, successComplete} = checkingstate

  const dispatch  = useDispatch()

  useEffect(()=>{
    dispatch(Allcheckins())
    
    

  },[dispatch])

 const totalcheckin = checkings?.length
 
  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={'Admin Forums'} />
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Admin Checkins List</h1>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
       
        <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Total Checkins</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalcheckin}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>

   
      



      </div>

      <div className="my-5">
        <Link to='/admin/creategroup'>
        <button className="btn btn-primary">Create New Forum</button>
        </Link>
        
      </div>

     {/* Table Section */}
     <div>
        <p className="text-lg font-semibold mb-2">Check-in History</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S/N</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {checkings?.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.profile_name}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.total_checkings}</td>
                <td className="border p-2">{item.is_completed ? (<FaCheckCircle className='text-green-500'/>):(< FaCheckCircle className='text-gray-500'/>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default AdminCheckinScreen;
