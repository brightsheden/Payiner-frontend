import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../state/Actions/AuthActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerC from "../../Components/Loading";
import AlertComponent from "../../Components/Alert";


const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [referal, setReferal] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message,setMessage] = useState('')

 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state)=>state.register)
  const {isSuccess,isRequest,userInfo, errorMessage} = user

  const onSubmitHandler = (e)=>{
    e.preventDefault()
    if(password !== password2){

      setMessage('password does not match')
    }else{
      dispatch(register({name,email,referal,password}))


    }
    
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/profile')
      
    }


  },[isSuccess,userInfo,navigate])



  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

        <div>
          {isRequest && (<SpinnerC/>)}
          {errorMessage && (<AlertComponent variant={'failure'} message={errorMessage}/>) }
          {message && (<AlertComponent variant='failure' message={message} />)}
          
        </div>
        
        {/* Register Form */}
        <form onSubmit={onSubmitHandler}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input type="text" id="username" name="username" className="mt-1 p-2 w-full rounded-full border border-gray-300"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full rounded-full border border-gray-300"
            
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          {/* Referral Field */}
          <div className="mb-4">
            <label htmlFor="referral" className="block text-sm font-medium text-gray-600">Referral</label>
            <input type="text" id="referral" name="referral" className="mt-1 p-2 w-full rounded-full border border-gray-300"
                value={referal}
                onChange={(e)=>setReferal(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="mt-1 p-2 w-full rounded-full border border-gray-300"
            
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full rounded-full border border-gray-300"
            
            value={password2}
            onChange={(e)=>setPassword2(e.target.value)}/>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
