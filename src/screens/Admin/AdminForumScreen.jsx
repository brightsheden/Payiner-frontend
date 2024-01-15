// AdmingroupsListPage.jsxport { Stats } from 'daisyui';

import { useEffect } from "react";
import { Stats } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, listProfiles } from "../../state/Actions/UserActions";
import { Link } from "react-router-dom";
import MobileHeader from "../../Components/MobileHeader";
import { deleteGroup, forumlist } from "../../state/Actions/CommunityActions";

const AdminForumPage = () => {
 

  const listgroupstate = useSelector((state)=> state.listGroup)
  const  {isRequest, isSuccess,errorMessage, groups} = listgroupstate

  const deleteGroupState = useSelector((state)=> state.deleteGroup)
  const {isRequest:deleteRequest, isSuccess:deleteSuccess, errorMessage:deleteError} = deleteGroupState

  const totalGroups = groups?.length;
  

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(forumlist())

  },[dispatch,deleteSuccess])


  const handleDelete = (id)=>{
    dispatch(deleteGroup(id))

  }


  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={'Admin Forums'} />
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Admin groups List</h1>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
       
        <Stats className="bg-base-200 shadow">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Total groups</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{totalGroups}</Stats.Stat.Item>
       
      </Stats.Stat>
    </Stats>

   
      



      </div>

      <div className="my-5">
        <Link to='/admin/creategroup'>
        <button className="btn btn-primary">Create New Forum</button>
        </Link>
        
      </div>

      {/* groups Table */}
      <div className="flex justify-center">
      <table className=" bg-white overflow-scroll border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">members</th>
            <th className="py-2 px-4 border">Is Locked</th>
        
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{group._id}</td>
              <td className="py-2 px-4 border">{group.name}</td>
              <td className="py-2 px-4 border">{group.members.length}</td>
              <td className="py-2 px-4 border">{group.is_locked ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border">
                
                <Link to={`/forums/${group._id}/`}><button className="btn btn-primary text-white hover:underline mr-2">View</button></Link>

                <button onClick={()=>handleDelete(group._id)} className="btn btn-error text-white hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    
    </div>
  );
};

export default AdminForumPage;
