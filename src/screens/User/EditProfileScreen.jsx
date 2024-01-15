import { useDispatch, useSelector } from "react-redux";
import { editoprofile, profile } from "../../state/Actions/UserActions";
import { useEffect, useState } from "react";
import MobileHeader from "../../Components/MobileHeader";
import { useNavigate } from "react-router-dom";
import { resetEditProfileState } from "../../state/Slices/UserSlice";
import axios from "axios";
import BottomNavigation from "../../Components/Tabs";


const ProfileEditPage = () => {
  const editprofilestate = useSelector((state)=>state.editProfile)
  const {isRequest,isSuccess,errorMessage} = editprofilestate;
  const profiledata = useSelector((state)=>state.profile)
  const {userProfile} = profiledata
  const [uploading,setUploading]= useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [image,setImage] = useState()
  

  const [formData, setFormData] = useState({
    username: userProfile.name,
    email:userProfile.email,
    number: userProfile.phone,

    imagePreview: userProfile.image, 

  });

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file separately for preview
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [e.target.name]: file,
        imagePreview: URL.createObjectURL(file),
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
    // Perform form validation here if needed
    dispatch(
      editoprofile({
        image: formData.image,
        username: formData.username,
        email: formData.email,
        phone: formData.number,
     
     
      })
    );
  };

  const uploadFileHandler = async  (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    setImageUrl(URL.createObjectURL(file));
    formData.append('image',file)
    formData.append('userId', userProfile._id)
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



  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(profile())
    if(isSuccess){
      navigate('/')
      dispatch(resetEditProfileState())

    }

  },[dispatch,navigate,isSuccess])



  return (
    <div className="mt-[55px] md:mt-0 min-h-screen p-4 md:p-8">

              {/* Mobile Navigation Header */}
      <MobileHeader page={'Edit Profile'}/>

      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
        {/* Profile Image Section */}
        <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden bg-blue-500 h-16 w-16 flex-shrink-0">
              {/* You can replace the image URL with the actual profile image */}
                     {/* Display the image preview */}
                     {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                // Placeholder image or default image
                <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
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

        {/* Edit Profile Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Edit Profile Details</h2>
     
            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input type="text" id="username" name="username" className="mt-1 p-2 w-full rounded border border-gray-300"
              
              value={formData.username}
              onChange={handleChange}/>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 w-full rounded border border-gray-300"
               value={formData.email}
               onChange={handleChange} />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
              <input type="text" id="phoneNumber" name="phoneNumber" className="mt-1 p-2 w-full rounded border border-gray-300" 
               value={formData.number}
               onChange={handleChange} 
              />
            </div>

                {/* Rounded Submit Button */}
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">
              Save Changes
            </button>
         
        </div>
        </form>

       
         {/* Loading and Error Messages */}
      {isRequest && <p className="mt-4 text-sm text-gray-600">Updating profile...</p>}
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
      {isSuccess && (
        <p className="mt-4 text-sm text-green-500">
          Profile updated successfully! {/* You can display additional confirmation details here */}
        </p>
      )}
      </div>

      <BottomNavigation/>
    </div>
  );
};

export default ProfileEditPage;
