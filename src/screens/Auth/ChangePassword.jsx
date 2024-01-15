import { useEffect, useState } from 'react'
import MobileHeader from '../../Components/MobileHeader'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../state/Actions/AuthActions'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const [old_password,setOldPassword] = useState('')
    const [new_password,setNewPassword] = useState('')
    const [new_password2 ,setNewPassword2] = useState('')
    const [message, setMessage] = useState('')

    const changepasswordstate  = useSelector((state)=>state.changepassword)
    const {loading, success, error} = changepasswordstate

    const dispatch = useDispatch()
    const handleSumbmit = (e)=>{
        e.preventDefault()

        if(new_password != new_password2){
            setMessage('password does not match')
        }else{
            dispatch(changePassword({old_password,new_password}))
        }
       
    
    }

    const navigate = useNavigate()

    useEffect(()=>{
        if(success){
            navigate('/')

        }
    },[success, navigate])


  return (
    <div className='mt-[60px]'>
        <MobileHeader page={'Change Password '} />


         {/* Change Password Section */}
         <div className='container mx-auto p-4'>
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleSumbmit}>
            {/* Current Password Field */}
            {loading && (<p className='p-4 bg-blue-200 rounded-md border'>Loading..</p>)}
            {success && (<p className='p-4 bg-green-200 rounded-md border'>Paasword Changed Successful</p>)}
            {error && (<p className='p-4 bg-red-200 rounded-md border'>{error}</p>)}
            {message && (<p className='p-4 bg-red-200 rounded-md border'>{message}</p>)}
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" className="mt-1 p-2 w-full rounded border border-gray-300" 
               value={old_password} onChange={(e)=>setOldPassword(e.target.value)}
              />
            </div>

            {/* New Password Field */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
              <input type="password" id="newPassword" name="newPassword" className="mt-1 p-2 w-full rounded border border-gray-300"
               value={new_password} onChange={(e)=>setNewPassword(e.target.value)}
              />
            </div>

            {/* Confirm New Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
              <input type="password" id="confirmNewPassword" name="confirmNewPassword" className="mt-1 p-2 w-full rounded border border-gray-300"
               value={new_password2} onChange={(e)=>setNewPassword2(e.target.value)} />
            </div>

                {/* Rounded Submit Button */}
                <button type="submit" className="btn w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">
              Save Changes
            </button>
          </form>
        </div>
    </div>
  )
}

export default ChangePassword