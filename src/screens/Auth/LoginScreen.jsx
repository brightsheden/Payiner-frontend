
import { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../state/Actions/AuthActions';
import AlertComponent from '../../Components/Alert';
import SpinnerC from '../../Components/Loading'


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const userData = useSelector((state) => state.user);
  const {isSuccess,isRequest, userInfo,data,errorMessage} = userData
  const history = useNavigate()
  const dispatch = useDispatch()
 
  useEffect(() => {
    if (userInfo) {
      // eslint-disable-next-line react/prop-types
      history('/profile')
    }
  }, [history,userInfo])

  console.log(data)




  const onSubmitHandler = (e)=>{
    e.preventDefault()
    dispatch(login({email,password}))
    

  } 

  return (
    <div className=" ">
      <div className='block md:hidden bg-blue-100 mb-5 p-8 text-center'>
        <h1 className='font-semibold text-2xl'>Welcome back</h1>
        <span>Login to continue</span>
      </div>

      {errorMessage && (<AlertComponent variant='failure' message={errorMessage}/>)}
      
   
      <div className='md:min-h-screen flex items-center justify-center'>
        
      <div className="bg-white p-2  md:p-8 rounded-lg shadow-md w-full md:w-96">
 
    
        
        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2  rounded-full w-full rounded border border-gray-300"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="mt-1 p-2 w-full rounded-full border border-gray-300"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div className='flex justify-end py-3 text-blue-500'>
            <Link to='/forgetpassword'>
                forget password
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">Login</button>
        </form>
      </div>

      </div>
     
    </div>
  );
};

export default LoginPage;
