
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import useParams from react-router-dom to get the task ID
import { createproof, taskdetails } from '../../state/Actions/TaskActions';
import { FileInput, Label, Spinner, Textarea } from 'flowbite-react';
import {FaCheckCircle} from 'react-icons/fa'
import MobileHeader from '../../Components/MobileHeader';
import BottomNavigation from '../../Components/Tabs';
import { Alert } from 'react-daisyui';


const TaskDetailsPage = () => {

  const taskdetailsstate = useSelector((state)=>state.taskdetail)
  const {isSuccess,isRequest,errorMessage,taskdetail} = taskdetailsstate


  const userInfo = useSelector((state)=>state.user.userInfo)
  
  const createproofstate = useSelector((state)=>state.createproof)
  const {isSuccess:proofSuccess, isRequest:proofRequest,errorMessage:proofError,data} = createproofstate

  const { taskId } = useParams();
  const dispatch = useDispatch()
  const {task_details,task_proofs} =taskdetail
  //const [image,setImage] = useState()
  //const [description,setDescription] = useState('')
  const task = taskId

  const [formData, setFormData] = useState({
    image:null,
    imagePreview:null,
    task:task,
    description:"",


});

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo){
      navigate('/')
    }
    dispatch(taskdetails(taskId))
    if(data){
      dispatch(taskdetails(taskId))

    }
 

  },[dispatch,taskId,data])

  const handlesumbit = (e) => {
    e.preventDefault();
    dispatch(createproof({
      image: formData.image,
      task: formData.task,
      description: formData.description // corrected here
    }));
  }

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
    <div className="bg-gray-100 min-h-screen p-4 mt-[48px] md:p-8">
      <MobileHeader page={task_details?.name} />
      {/* Task Details Card */}
      {isRequest && (<Spinner/>)}
        {errorMessage && (<Alert>{errorMessage}</Alert>)}
        {isSuccess && (<>
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md mb-8">
       
       <img src={task_details?.image} alt={task_details?.name} className="w-full h-64 object-cover rounded-md mb-4" />
       <h2 className="text-2xl font-semibold mb-2">{task_details?.name}</h2>
       <p className="text-gray-600 mb-4">{task_details?.description}</p>
       <p className="text-gray-600 mb-2">Amount per User: ${task_details?.amountPerUser}</p>
       <p className="text-gray-600 mb-2">Number of Users: {task_details?.numberOfUsers}/ {task_proofs.length}</p>
       <p className="text-gray-600 mb-2 flex items-center gap-2"><span>Completed:</span> {task_details?.is_completed && (<FaCheckCircle  className='text-green-500'/>)}</p>
     </div>

        </>)}
   
      {/* Task Submissions Card */}
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
        <div className='flex items-center justify-between my-2'>
        <h2 className="text-lg font-semibold mb-4">Task Proofs</h2>
      

        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {task_proofs?.map(submission => (
            <div key={submission.id} className="mb-4 p-4 bg-gray-50 rounded-md flex items-center shadow-md">
              <img src={submission.image} alt={submission.profile_name} className="w-10 h-10 object-cover rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{submission.profile_name}</h3>
                <p className="text-gray-600">{submission.createdAt.slice(0,10)}</p>
                <p className="text-gray-600 mb-2">{submission.description}</p>
                <p className={`text-sm font-semibold ${!submission.is_approve ? 'text-red-500' : 'text-green-500'}`}>
                  {submission.is_approve ? 'Approved' : 'Not Approved'}
                </p>

                    
                      <Link to={`/edittaskproof/${submission._id}/`} className='btn bg-blue-500  mt-2 text-white' >
                        Edit
                      </Link>
                   
                  




               
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {task_details?.is_completed && (<p className='bg-red-500 text-white p-4 rounded border text-base, you cant perform task font-bold'>Task Completed</p>)}
  {!task_details?.is_completed && (
     <div className='mt-5 mb-20 bg-white shadow-md rounded-md p-2'>
              <div>
                <h2 className='text-xl my-2 font-semibold '>Submit Proof</h2>
              </div>
          <form onSubmit={handlesumbit} className='flex flex-col gap-4'>
            
            <div>
            <FileInput
              type="file"
              id="taskimage"
              name="image"
              
              accept="image/*"
              onChange={handleChange}
              className=""
            />
            </div>
          <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="description" />
        </div>
                <Textarea id="description" name="description" placeholder="start typing" 
                  value={formData.description}
                  onChange={handleChange}
        />
      </div>
     
    <div>
      <button className='btn w-full bg-primary text-white'>Submit</button>
    </div>
          </form>
        </div>
  ) }


  <BottomNavigation/>
     
    </div>
  );
};

export default TaskDetailsPage;
