import  { useEffect, useState } from 'react';
import { Input, Button } from 'react-daisyui';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, fetchUserDetails, fetchUserList, getProfileDetail, updateUser } from '../../state/Actions/UserActions';
import { useNavigate, useParams } from 'react-router-dom';
import { resetProfileAdminState, resetUserAdminState } from '../../state/Slices/UserSlice';
import MobileHeader from '../../Components/MobileHeader';
import axios from 'axios';
import { Spinner } from 'flowbite-react';

const AdminProfileEditPage = () => {
    const userstate = useSelector((state)=>state.profileAdmin)
    const {isRequest:usersRequest,isSuccess:usersSuccess,errorMessage:usersError,selectedProfile:user} = userstate

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [image,setImage] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [is_premium,setIsPremium] = useState(false)
  const [is_active,setIsActive] = useState(false)
  const [phone,setPhone] = useState('')
  const [passcode,setPasscode] = useState('')
  const [shouldResetState, setShouldResetState] = useState(false);
 
  const [isUploaading,setUploading] = useState('')
  const {userId} = useParams()

 

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(usersSuccess && shouldResetState){
        
        navigate('/admin/profiles')
        dispatch( resetProfileAdminState())
    }else{    if (!user?.name || user?._id !== Number(userId)) {
        dispatch(getProfileDetail(userId))
    } else {
        setImage(user?.image)
        setImageUrl(user?.image)
        setName(user?.name)
        setEmail(user?.email)
        setIsPremium(user?.is_premium)
        setIsActive(user?.is_active)
        setPhone(user?.phone)
        setPasscode(user?.passcode)
    }
  }

    
  
  },[dispatch,userId,user,navigate,usersSuccess,shouldResetState])

  const [formData, setFormData] = useState({
    image:null,
    imageUrl:""


  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file separately for preview
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [e.target.name]: file,
        imageUrl: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    dispatch(editProfile({userId,name,email,phone,is_premium}))  .then(() => Promise.all([dispatch(fetchUserList()), setShouldResetState(true)]))
   
  };

  
  const uploadFileHandler = async  (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    setImageUrl(URL.createObjectURL(file));
    formData.append('image',file)
    formData.append('userId', userId)
    console.log("file is uploading")
    setUploading(true)

    try {
        const config = {
            "content-type" : "multipart/form/data"
        }
        const {data} =await axios.put("/api/admin/uploadprofilephoto/", formData,config)
        setUploading(false)
        setImage(data)
    } catch (error) {
        setUploading(false)
        
    }

}


  

  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={user?.name} />
      <h1 className="hidden md:block  text-3xl font-semibold mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-md  mx-auto mt-[55px]">
        {/*image*/}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
          <div className="flex items-center">

          {isUploaading && ( 
            <div className='block text-center'>
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          )}
            <div className="rounded-full overflow-hidden bg-blue-500 h-16 w-16 flex-shrink-0">
              {/* You can replace the image URL with the actual profile image */}
                     {/* Display the image preview */}
                     
                     {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                // Placeholder image or default image
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
            <label htmlFor="profileImage" className="ml-4 cursor-pointer text-blue-600">Change Image</label>
            <input
            
              type="file"
              id="profileImage"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
            </div>
        </div>



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

        <div className='flex justify-between'>
            {/* Is Premium Checkbox */}
        <div className="mb-4">
            <label className='block text-sm font-medium text-gray-600'>Premium</label>
          <input
            id="isPremium"
            type="checkbox"
            checked={is_premium}
            onChange={(e) => setIsPremium( e.target.checked)}
            label="Is Premium"
          />
        </div>

           {/* Is Premium Checkbox */}
           <div className="mb-4">
            <label className='block text-sm font-medium text-gray-600'>Active</label>
          <input
            disabled
            id="isActive"
            type="checkbox"
            checked={is_active}
            onChange={(e) => setIsActive( e.target.checked)}
            label="Is Premium"
          />
        </div>

        </div>

         {/* phone */}
         <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">phone</label>
          <Input
            id="phone"
            type='tel'
            value={phone}
            onChange={(e) => setPhone( e.target.value)}
            className="mt-1 p-2 w-full rounded border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="passcode" className="block text-sm font-medium text-gray-600">passcode</label>
          <Input
            id="passcode"
            type='number'
            value={passcode}
            onChange={(e) => setPasscode( e.target.value)}
            className="mt-1 p-2 w-full rounded border border-gray-300"
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

export default AdminProfileEditPage;
