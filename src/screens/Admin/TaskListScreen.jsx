// AdminTaskListPage.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, tasklist } from '../../state/Actions/TaskActions';
import { Link } from 'react-router-dom';
import MobileHeader from '../../Components/MobileHeader';

const AdminTaskListPage = () => {
  // Dummy data for tasks



  const taskstate = useSelector((state)=>state.tasklist)
  const {isSuccess,isRequest,errorMessage,tasks} = taskstate

  const deletetaskstate = useSelector((state)=>state.deletetask)
  const {isSuccess:deleteSuccess, isRequest:deleteRequest,errorMessage:deleteError} = deletetaskstate
  const totalTasks = tasks.length;

  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(tasklist())

  },[dispatch,deleteSuccess])

  const deleteHandler = (id)=>{
    dispatch(deleteTask(id))
  }


  return (
    <div className="container mx-auto p-4">

      <MobileHeader page={'Tasks'}/>
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Admin Task List</h1>

      {/* Total Tasks */}
      
      <div className="flex flex-col my-8 md:flex-row stats shadow">
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Total Task</div>
                <div className="stat-value">{totalTasks}</div>

            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Completed Task</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Uncompleted Task</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

   
  </div>
      {/* Task Table */}
      <div className='flex justify-between items-center my-5'> 
        <h2 className='text-2xl leading-normal'>Tasks</h2>
        <Link to='/createtask/'>
        <button className='btn btn-primary'>Create Task</button>
        </Link>
        
    </div>
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Amount Per User</th>
            <th className="py-2 px-4 border">Number of Users</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{task._id}</td>
              <td className="py-2 px-4 border">{task.name}</td>
              <td className="py-2 px-4 border">&#8358; {task.amountPerUser}</td>
              <td className="py-2 px-4 border">{task.numberOfUsers}</td>
              <td className="py-2 px-4 border">
                <button className="btn ext-blue-500 hover:underline mr-2"><Link to={`/task-edit/${task._id}`}>Edit</Link></button>
                <button onClick={()=>deleteHandler(task._id)} className="btn btn-error text-white hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTaskListPage;
