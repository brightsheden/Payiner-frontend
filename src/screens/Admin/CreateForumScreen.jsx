import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { FileInput } from 'flowbite-react';
import { resetCreateTaskState } from '../../state/Slices/TaskSlice';
import MobileHeader from '../../Components/MobileHeader';
import { createForum } from '../../state/Actions/CommunityActions';
import { resetCreateGroupState } from '../../state/Slices/CommunitySlice';


const ForumCreatePage = () => {
  
 
  const userInfostate = useSelector((state)=>state.user)
  const {userInfo} = userInfostate

  const creategroupstate = useSelector((state)=>state.createGroup)
  const {isSuccess,isRequest,erorrMessage,data} = creategroupstate
  const [formData, setFormData] = useState({
        name:"",
        image:null,
        imagePreview:null,
     
        description:"",


  });

  const [is_locked, setIsLocked] = useState(false)





  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createForum({
      name:formData.name,
      image:formData.image,
      description:formData.description,
      is_locked:is_locked,
   
    }))
    
  };

  useEffect(()=>{

    if(!userInfo?.isAdmin){

      navigate('/')
    }
    if(data && isSuccess){
      navigate('/admin/forums')
      dispatch(resetCreateGroupState())
    }
    

  },[data,isSuccess,dispatch,navigate,userInfo])

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

  return (
    <div className=" min-h-screen flex items-center justify-center p-4 md:p-8">
      <MobileHeader page={'Create Task'}/>
      
      <div className=" p-8 rounded-md  w-full md:w-96">
        <h2 className="hidden md:block text-2xl font-semibold mb-4">Create Group/Forum</h2>
        <form onSubmit={handleFormSubmit}>

        <div className="flex flex-col mb-4">
            <div className=" overflow-hidden  h-full w-full flex-shrink-0">
           
                     {formData.imagePreview ? (
                        <div className='flex justify-center'>
                             <img src={formData.imagePreview} alt="Profile Preview" className="w-40 h-40 object-cover" />

                        </div>
               
              ) : (
                // Placeholder image or default image
                <div className='flex justify-center my-5 '>
                         <img  src="https://via.placeholder.com/150" alt="task" className="w-40 h-40 rounded-full object-cover" />
                </div>
               
              )}
            </div>
           
            <FileInput
              type="file"
              id="taskimage"
              name="image"
              
              accept="image/*"
              onChange={handleChange}
              className=""
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Forum name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
       
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Lock:</label>
            <input
              type="checkbox"
              id="is_locked"
              name="name"
              checked={is_locked}
              onChange={(e)=>setIsLocked(e.target.checked)}
              className="input border-2 border-black"
            />
          </div>
          <button
            type="submit"
            className="btn w-full btn-primary"
          >
            Create Forum
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForumCreatePage;
