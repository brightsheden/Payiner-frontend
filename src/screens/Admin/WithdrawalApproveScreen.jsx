import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editWithdrawal, getWithdrawal, listWithdrawals } from '../../state/Actions/AdminActions'
import { resetListWithdrawalsState } from '../../state/Slices/AdminSlice'
import MobileHeader from '../../Components/MobileHeader'

function WithdrawalApproveScreen() {
    const [account_name,setAccountName] = useState('')
    const [account_number,setAccountNumber] = useState('')
    const [bank_name,setBankName]= useState('')
    const [status,setStatus] = useState(false)
    const [amount,setAmount] = useState('')

    const {withdrawalId} = useParams()
    const withdrawalstate = useSelector((state)=> state.listwithdrawal)
    const {isSuccess,isRequest,errorMessage,withdrawal} = withdrawalstate
    const [shouldResetState, setShouldResetState] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        
       
        if(isSuccess && shouldResetState){
           
            dispatch(resetListWithdrawalsState())
            navigate('/admin/withdrawals')
   

        }
        if(!withdrawal.account_name || withdrawal._id != Number(withdrawalId)){
            dispatch(getWithdrawal(withdrawalId))
        }else{
            setAccountName(withdrawal?.account_name)
            setAccountNumber(withdrawal?.account_number)
            setBankName(withdrawal?.bank_name)
            setStatus(withdrawal?.status)
            setAmount(withdrawal?.amount)
        }

    },[dispatch,withdrawalId,withdrawal,navigate,isSuccess,shouldResetState])

  

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(editWithdrawal({withdrawalId,status})).then(() => Promise.all([dispatch(listWithdrawals()), setShouldResetState(true)]))
    }
    
  return (
    <div className="container mx-auto p-4">
      <MobileHeader page={'Approve withdrawal'}/>
    <h1 className="text-3xl font-semibold mb-4">Withdrawal Edit</h1>

    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Number */}
        <div>
          <label htmlFor="account_number" className="block text-sm font-medium text-gray-600">
            Account Number
          </label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            value={account_number}
            className="mt-1 p-2 w-full rounded border border-gray-300"
            disabled
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={account_name}
            className="mt-1 p-2 w-full rounded border border-gray-300"
            disabled
          />
        </div>

        {/* Bank Name */}
        <div>
          <label htmlFor="bank_name" className="block text-sm font-medium text-gray-600">
            Bank Name
          </label>
          <input
            type="text"
            id="bank_name"
            name="bank_name"
            value={bank_name}
            className="mt-1 p-2 w-full rounded border border-gray-300"
            disabled
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            className="mt-1 p-2 w-full rounded border border-gray-300"
            disabled
          />
        </div>

        {/* Is Approve */}
        <div className="col-span-2 my-4">
          <label className="block text-sm font-medium text-gray-600">Is Paid</label>
          <input
            id="isApprove"
            type='checkbox'
            className='text-xl'
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            label="Approve"
           
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
        disabled={!status}
      >
        Save Changes
      </button>
    </form>
  </div>
  )
}

export default WithdrawalApproveScreen