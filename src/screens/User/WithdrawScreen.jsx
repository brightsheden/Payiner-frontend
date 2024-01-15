import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mywithdrawal } from '../../state/Actions/UserActions';
import MobileHeader from '../../Components/MobileHeader';
import BottomNavigation from '../../Components/Tabs';
import { Alert } from 'react-daisyui';
import { Spinner } from 'flowbite-react';

const WithdrawalHistoryPage = () => {
  // Dummy data for withdrawal history

  


  const mywithdrawalstate = useSelector((state)=> state.myWithdrawal)
  const {isRequest,isSuccess,errorMessage, data} = mywithdrawalstate

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(mywithdrawal())

  },[dispatch])

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Fixed Navigation Header */}
    <MobileHeader page={'Withdrawal History'}/>
      <div className="bg-white mt-[50px] p-4 md:p-8 rounded-lg shadow-md">
        {/* Withdrawal History Section */}
        <div>
          <h2 className="hidden md:block text-lg font-semibold mb-4">Withdrawal History</h2>

          {/* List View on Mobile */}
          <div className="md:hidden">
            <ul>
              {data?.length == 0 && (
                <Alert>No withdraw record yet</Alert>
              )}

              {isRequest && (<div className='text-center'>
                <Spinner /> Loading...
              </div>)}

              {isSuccess && (<>
                
              {errorMessage && ( <Alert className='bg-red-500 text-white'>{errorMessage}</Alert>)}
              {currentItems?.map(withdrawal => (
                <li key={withdrawal._id} className="border-b border-gray-300 py-4">
                  <p className="font-semibold">Account Name: {withdrawal.account_name}</p>
                  <p>Account Number: {withdrawal.account_number}</p>
                  <p>Amount: {withdrawal.amount}</p>
                  <p>Bank: {withdrawal.bank_name}</p>
                  <p>Status: {withdrawal.status ? (<span>Approved</span>):(<span>Pending</span>)}</p>
                  <p>Timestamp: {withdrawal.createdAt.slice(0,10)}</p>
                </li>
              ))}

              </>)}

            </ul>
          </div>

          {/* Table View on Desktop and Larger Screens */}
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Account Name</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Account Number</th>
                  <th className="p-2 border">Bank</th>
                  <th className="p-2 border">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map(withdrawal => (
                  <tr key={withdrawal.id}>
                    <td className="p-2 border">{withdrawal.account_name}</td>
                    <td className="p-2 border">{withdrawal.amount}</td>
                    <td className="p-2 border">{withdrawal.account_number}</td>
                    <td className="p-2 border">{withdrawal.bank_name}</td>
                    <td className="p-2 border">{withdrawal.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>

      <BottomNavigation/>
    </div>
  );
};

export default WithdrawalHistoryPage;
