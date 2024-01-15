import { FaArrowLeft, FaRecycle, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function MobileHeader({page,logoutHandler}) {

  const navigate = useNavigate()

  const handleGoBack = () => {
    // Use the navigate function to go back to the previous page
    navigate(-1);
  };

  const refreshPage = () => {
    window.location.reload();
  }
  
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-blue-500 text-white p-2 mb-5 shadow">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={handleGoBack} className="cursor-pointer  shadow-none">
              <FaArrowLeft className="text-white" />

          </button>
         
        </div>
        <div className="text-base font-semibold">{page}</div>
        <div>
          <button onClick={refreshPage} className="p-1 text-sm  rounded-md shadow-md  text-white"><FaSync/></button>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
