// AdminWithdrawalHistoryPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWithdrawals } from "../../state/Actions/AdminActions";

import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import MobileHeader from "../../Components/MobileHeader";

const AdminWithdrawalHistoryPage = () => {

  const withdrawalstate = useSelector((state)=>state.listwithdrawal)
  const {isSuccess,isRequest,errorMessage,withdrawals} = withdrawalstate
  // Dummy data for withdrawal history


  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(listWithdrawals())

  },[dispatch])

  return (
    <div className="container mt-[55px] mx-auto p-4">
      <MobileHeader page={'Withdrawal History'} />
      {/* Page Title */}
      <h1 className="hidden md:block text-3xl font-semibold mb-4">Admin Withdrawal History</h1>

      {/* Withdrawal History Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Account Number</th>
            <th className="py-2 px-4 border">Account Name</th>
            <th className="py-2 px-4 border">Bank Name</th>
            <th className="py-2 px-4 border">Created At</th>
            <th className="py-2 px-4 border">Approve</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map(entry => (
            <tr key={entry._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{entry._id}</td>
              <td className="py-2 px-4 border">{entry.amount}</td>
              <td className="py-2 px-4 border">{entry.account_number}</td>
              <td className="py-2 px-4 border">{entry.account_name}</td>
              <td className="py-2 px-4 border">{entry.bank_name}</td>
              <td className="py-2 px-4 border">{entry.createdAt.slice(0,10)}</td>
              <td className="py-2 px-4 border">{entry.status? (<FaCheckCircle className="text-green-500"/>) : (<p>Not Paid</p>)}</td>
              <td className="py-2 px-4 border"><button><Link to={`/admin/withdrawal/${entry._id}`}>View </Link> </button></td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWithdrawalHistoryPage;
