import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask } from '../../state/Actions/TaskActions';
import { FileInput } from 'flowbite-react';
import { resetCreateTaskState } from '../../state/Slices/TaskSlice';
import MobileHeader from '../../Components/MobileHeader';


const TaskCreatePage = () => {
  
 
  const userInfostate = useSelector((state)=>state.user)
  const {userInfo} = userInfostate

  const createtaskstate = useSelector((state)=>state.createtask)
  const {isSuccess,isRequest,erorrMessage,data} = createtaskstate
  const [formData, setFormData] = useState({
        name:"",
        image:null,
        imagePreview:null,
        amountPerUser:"",
        numberOfUser:"",
        description:"",


  });





  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({
      name:formData.name,
      image:formData.image,
      amountPerUser:formData.amountPerUser,
      numberOfUser:formData.numberOfUser,
      description:formData.description
    }))
    
  };

  useEffect(()=>{

    if(!userInfo?.isAdmin){

      navigate('/')
    }
    if(data && isSuccess){
      navigate('/admin/tasks')
      dispatch(resetCreateTaskState())
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
        <h2 className="hidden md:block text-2xl font-semibold mb-4">Create Task</h2>
        <form onSubmit={handleFormSubmit}>

        <div className="flex flex-col mb-4">
            <div className=" overflow-hidden bg-blue-500 h-full w-full flex-shrink-0">
           
                     {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                // Placeholder image or default image
                <img src="https://via.placeholder.com/150" alt="task" className="w-full h-full object-cover" />
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
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Task Name:</label>
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
            <label htmlFor="amountPerUser" className="block text-gray-600 font-medium mb-2">Amount per User:</label>
            <input
              type="number"
              id="amountPerUser"
              name="amountPerUser"
              value={formData.amountPerUser}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numUsers" className="block text-gray-600 font-medium mb-2">Number of Users:</label>
            <input
              type="number"
              id="numUsers"
              name="numUsers"
              value={formData.numUsers}
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
          <button
            type="submit"
            className="btn w-full btn-primary"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskCreatePage;
