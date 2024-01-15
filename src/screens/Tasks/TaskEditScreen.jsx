import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editTask, taskdetail } from '../../state/Actions/TaskActions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, FileInput, Spinner } from 'flowbite-react';
import { resetEditTaskState } from '../../state/Slices/TaskSlice';
import MobileHeader from '../../Components/MobileHeader';
import axios from 'axios';


const TaskEditPage = () => {
  const {taskId} = useParams()
  const userInfostate = useSelector((state)=>state.user)
  const {userInfo} = userInfostate

  const edittaskstate = useSelector((state)=>state.edittask)
  const {isSuccess,isRequest,erorrMessage,data} = edittaskstate

  const taskstate = useSelector((state)=>state.task)
  const {isSuccess:taskSuccess, isRequest:taskRequest,erorrMessage:taskerror, taskdetail:task} = taskstate
  
  const [image,setImage] = useState('') 
  const [imageUrl, setImageUrl] = useState('')
  const [uploading,setUploading] = useState('')

  const [formData, setFormData] = useState({
        name:task.name,
        image:task?.image,
        imagePreview:task?.image,
        amountPerUser:task?.amountPerUser,
        numberOfUser:task?.numberOfUsers,
        description:task?.description,


  });

  useEffect(()=>{
    if(task){
      setFormData({
        name:task.name,
        image:task?.image,
        imagePreview:task?.image,
        amountPerUser:task?.amountPerUser,
        numberOfUser:task?.numberOfUsers,
        description:task?.description,

      })

      setImage(task.image)
      console.log(image)
      
    }

  },[task])







  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({
      taskId:taskId,
      name:formData.name,
 
      amountPerUser:formData.amountPerUser,
      numberOfUser:formData.numberOfUser,
      description:formData.description
    }))
    
  };
  
  useEffect(()=>{
    dispatch(taskdetail(taskId))
  

    if(!userInfo?.isAdmin){

      navigate('/')
    }
    if(data && isSuccess){
      navigate('/admin/tasks')
      dispatch(resetEditTaskState())
    }
    

  },[data,isSuccess,dispatch,navigate,userInfo,taskId])

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


  
  const uploadFileHandler = async  (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    setImageUrl(URL.createObjectURL(file));
    formData.append('image',file)
    formData.append('taskId', taskId)
    console.log("file is uploading")
    setUploading(true)

    try {
        const config = {
            "content-type" : "multipart/form/data"
        }
        const {data} =await axios.put("/api/task/taskphoto/", formData,config)
        setUploading(false)
        setImage(data)
    } catch (error) {
        setUploading(false)
        
    }

}


  return  (
 
    <div className=" min-h-screen  flex items-center justify-center p-4 md:p-8">
      <MobileHeader page={'Edit Task'} />
         {taskRequest? (<p>loading</p>):
    ( <div className="bg-white p-8 rounded-md shadow-md w-full md:w-96">
    <h2 className="hidden md:block text-2xl font-semibold mb-4">Edit Task</h2>
    <form onSubmit={handleFormSubmit}>
    <div className="flex flex-col mb-4">
        <div className=" overflow-hidden my-5  h-full w-full flex-shrink-0">

              {uploading && (<Spinner/>)} 

           
                 {imageUrl ? (
            <img src={imageUrl} alt="Profile Preview" className="w-40 h-40 object-cover" />
          ) : (
            // Placeholder image or default image
            <img src={image} alt="task" className="w-40 h-40 object-cover" />
          )}
        </div>
       
        <FileInput
          type="file"
          id="taskimage"
          name="image"
          
          accept="image/*"
          onChange={uploadFileHandler}
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
          value={formData.numberOfUser}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData?.description}
          onChange={handleChange}
          rows="4"
          className="textarea textarea-bordered w-full"
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn mb-8 w-full btn-primary"
      >
        Save Changes
      </button>
    </form>
  </div>)
  
  }
     
    </div>
  );
};

export default TaskEditPage;
