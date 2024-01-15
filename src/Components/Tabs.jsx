import { useNavigate } from 'react-router-dom';

import { FaTasks, FaUsers, FaUsersCog } from 'react-icons/fa';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="btm-nav text-blue-500 ">
      <button
        className="text-blue-500 hover:bg-blue-100"
        onClick={() => navigate('/profile')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span>Home</span>
      </button>

      <button
        className="text-blue-500 hover:bg-blue-100 active"
        onClick={() => navigate('/tasks')}
      >
        <FaTasks />
        <span>Tasks</span>
      </button>

      <button
        className="text-blue-500 hover:bg-blue-100"
        onClick={() => navigate('/forums')}
      >
        <FaUsers />
        <span>Groups</span>
      </button>

      <button
        className="text-blue-500 hover:bg-blue-100"
        onClick={() => navigate('/setting')}
      >
        <FaUsersCog />
        <span>Me</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
