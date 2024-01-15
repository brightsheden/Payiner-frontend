import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserList } from "../../state/Actions/UserActions";
import { Stats } from "react-daisyui";
import { Link } from "react-router-dom";
import MobileHeader from "../../Components/MobileHeader";

const AdminUsersListPage = () => {

    const userstate = useSelector((state)=>state.userAdmin)
    const {isRequest:usersRequest,isSuccess:usersSuccess,errorMessage:usersError,userList:users,deleteSuccess} = userstate


  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchUserList())
   

  },[dispatch,deleteSuccess])

  const HandleDelete = (userId)=>{
    dispatch(deleteUser(userId))
    
  }

  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.isAdmin).length;

  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={'Users List'} />
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Admin Users List</h1>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
    
      
      
      <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Total Users</Stats.Stat.Item>
        <Stats.Stat.Item variant="value"><p>{totalUsers}</p></Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>

      <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Admin</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalAdmins}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>
       
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Is Admin</th>
          
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.isAdmin ? 'Yes' : 'No'}</td>
            
      
              <td className="py-2 px-4 border">
                <Link  to={`/admin/user_edit/${user.id}`}>
                <button  className="btn btn-primary text-white hover:underline mr-2">Edit</button>

                </Link>
                
                <button onClick={()=>HandleDelete(user.id)} className="btn btn-error text-white hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersListPage;
