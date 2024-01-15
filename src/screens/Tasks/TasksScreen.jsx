
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tasklist } from '../../state/Actions/TaskActions';
import MobileHeader from '../../Components/MobileHeader';
import BottomNavigation from '../../Components/Tabs';
import { Spinner } from 'flowbite-react';
import { Alert } from 'react-daisyui';

const TasksListPage = () => {
  const taskstate = useSelector((state)=>state.tasklist)
  const {isSuccess,isRequest,errorMessage,tasks} = taskstate
  

  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(tasklist())

  },[dispatch])

  return (
    <div className=" min-h-screen mt-[48px]  md:p-8">
      <MobileHeader page={'Tasks'}/>
      {/* Tasks List */}

      <div className="bg-blue-400">
  <div className="container mx-auto px-4 py-16 md:py-32">
    <div className="flex flex-wrap justify-center items-center -mx-4">
      <div className="w-full lg:w-1/2 px-4">
        <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight mb-4">Micro Jobs, Mega Impact!</h1>
        <p className="text-white text-lg md:text-xl mb-8">Your Skills, Your Schedule, Your Success.</p>
        <a href="/tasks" className="hidden md:block bg-white text-blue-500 py-2 px-6 rounded-full font-bold hover:bg-blue-500 hover:text-white transition duration-300">Get Started</a>
      </div>
      <div className="w-full lg:w-1/2 px-4">
        <img src="https://img.freepik.com/free-photo/social-integrated-person-workspace_23-2149405421.jpg?w=740&t=st=1704043965~exp=1704044565~hmac=f00c2eedea7732ce05ccd46e54b8b46e7bd1ff39efba6703b951f668e95c65b8" className="rounded-lg shadow-lg hidden md:block" />
      </div>
    </div>
  </div>
</div>




    <div>
      {isRequest && ( <div className='text-center text-8xl'><Spinner className=''/></div> )}
      {errorMessage && (<Alert className='bg-red-500'>{errorMessage}</Alert>)}
    </div>

    {isSuccess && (
       <div className="grid gap-4 p-4 md:grid-cols-2">
        {tasks?.length == 0 && <Alert  >No task yet</Alert>}
       {tasks?.map(task => (
         <Link to={`/task-details/${task._id}`} key={task._id}>
           <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
             <img src={task.image} alt={task.name} className="w-full h-32 object-cover rounded-md mb-4" />
             <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
             <p className="text-gray-600 mb-4">{task.description.substring(0, 80)}...</p>
             <p className="text-gray-600 mb-2">Amount per User: ${task.amountPerUser}</p>
             <p className="text-gray-600 mb-2">Number of Users: {task.numberOfUsers}</p>
           </div>
         </Link>
       ))}
     </div>
    )}

     
      <BottomNavigation/>
    </div>
  );
};

export default TasksListPage;
