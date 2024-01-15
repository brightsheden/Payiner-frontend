import React, { useEffect, useId, useState } from 'react';
import { Input, Button } from 'react-daisyui';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, fetchUserList, updateUser } from '../../state/Actions/UserActions';
import { useNavigate, useParams } from 'react-router-dom';
import { resetUserAdminState } from '../../state/Slices/UserSlice';
import MobileHeader from '../../Components/MobileHeader';

const UserEditPage = () => {
    const userstate = useSelector((state)=>state.userAdmin)
    const {isRequest:usersRequest,isSuccess:usersSuccess,errorMessage:usersError,userDetails:user} = userstate
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    isAdmin: true,
    password: '',
    confirmPassword: '',
  });

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [shouldResetState, setShouldResetState] = useState(false);
 

  const {userId} = useParams()

 

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(usersSuccess && shouldResetState){
        
        navigate('/admin/users')
        dispatch( resetUserAdminState())
    }else{    if (!user?.name || user?._id !== Number(userId)) {
        dispatch(fetchUserDetails(userId))
    } else {
        setName(user?.name)
        setEmail(user?.email)
        setIsAdmin(user?.isAdmin)
    }
  }

    
  
  },[dispatch,userId,user,navigate,usersSuccess,shouldResetState])

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    dispatch(updateUser({userId,name,email,isAdmin}))  .then(() => Promise.all([dispatch(fetchUserList()), setShouldResetState(true)]))
   
  };

  return (
    <div className="container mt-[60px] mx-auto p-4">
      <MobileHeader page={'Edit User'}/>
      <h1 className="hidden md:block  text-3xl font-semibold mb-4">Edit User</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
          <Input
            id="username"
            value={name}
            onChange={(e) => setName( e.target.value)}
            className="mt-1 p-2 w-full rounded border border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            className="mt-1 p-2 w-full rounded border border-gray-300"
          />
        </div>

        {/* Is Admin Checkbox */}
        <div className="mb-4">
            <label className='block text-sm font-medium text-gray-600'>isAdmin</label>
          <input
            id="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin( e.target.checked)}
            label="Is Admin"
          />
        </div>

     

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UserEditPage;
