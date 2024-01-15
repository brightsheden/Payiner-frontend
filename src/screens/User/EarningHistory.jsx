import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myearnings } from "../../state/Actions/UserActions";
import MobileHeader from "../../Components/MobileHeader";
import BottomNavigation from "../../Components/Tabs";


const TransactionsPage = () => {
  const historystate = useSelector((state)=>state.earninghistory)
  const {isRequest,isSuccess,errorMessage,data} = historystate
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(myearnings())



  },[])


  return (
    <div className="bg-white min-h-screen mt-[55px] md:mt-0 p-4 md:p-8">
      <MobileHeader page='Earning History'/>
       {/* Mobile Navigation Header */}
   
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
       

        {/* Filter Form */}
        <form className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-600 mb-2">Filter:</label>
          <select id="filter" name="filter" className="p-2 w-full rounded border border-gray-300">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </form>

        {/* Transactions List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">EarningHistory</h2>
          <ul className="space-y-2">
            {data?.map(transaction => (
              <li key={transaction.id} className=" flex justify-between border-gray-300 py-2">
                <div>
                  <p className="font-semibold">{transaction.amount}</p>
                  <p>{transaction.type}</p>

                </div>
                <div>
                <p className="mb-1"> {transaction.createdAt.slice(0,10)}</p>
                </div>
                
             
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomNavigation/>
    </div>
  );
};

export default TransactionsPage;
