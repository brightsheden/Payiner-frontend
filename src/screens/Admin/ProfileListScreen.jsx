// AdminUsersListPage.jsxport { Stats } from 'daisyui';

import { useEffect } from "react";
import { Stats } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, listProfiles } from "../../state/Actions/UserActions";
import { Link } from "react-router-dom";
import MobileHeader from "../../Components/MobileHeader";

const AdminProfileListPage = () => {
  const profilestate = useSelector((state)=>state.profileAdmin)
  const {isSuccess,isRequest,erorrMessage,profiles:users,deleteSuccess } = profilestate


 

  const totalUsers = users?.length;
  const totalPremiumUsers = users?.filter(user => user.is_premium).length;
  const totalVerifiedUsers = users?.filter(user => user.is_active).length;

  //const totalCheckings = users?.reduce((total,profile)=>total + profile.total_checkings,0)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(listProfiles())

  },[dispatch,deleteSuccess])


  const handleDelete = (id)=>{
    dispatch(deleteProfile(id))

  }


  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={'Profiles'} />
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Admin Users List</h1>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
       
        <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Total Users</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalUsers}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>
      
   
      

      <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Premium User</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalPremiumUsers}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>

    <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Active Users</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalVerifiedUsers}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>


      </div>

      {/* Users Table */}
      <table className=" bg-white overflow-scroll border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Is Paid</th>
            <th className="py-2 px-4 border">Is Premium</th>
            <th className="py-2 px-4 border">Is Active</th>
           
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Passcode</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{user._id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.is_paid ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border">{user.is_premium ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border">{user.is_active ? 'Yes' : 'No'}</td>

              <td className="py-2 px-4 border"><img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" /></td>
              <td className="py-2 px-4 border">{user.phone}</td>
              <td className="py-2 px-4 border">{user.passcode}</td>
              <td className="py-2 px-4 border">
                
                <Link to={`/admin/editprofile/${user._id}/`}><button className="btn btn-primary text-white hover:underline mr-2">Edit</button></Link>

                <button onClick={()=>handleDelete(user._id)} className="btn btn-error text-white hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProfileListPage;
