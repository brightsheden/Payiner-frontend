
import { useEffect } from 'react'
import MobileHeader from '../../Components/MobileHeader'
import { FaSearch } from 'react-icons/fa'
import { forumlist } from '../../state/Actions/CommunityActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from 'flowbite-react';
import BottomNavigation from '../../Components/Tabs'
import { Alert } from 'react-daisyui'
 

function ForumListScreen() {

    const dispatch = useDispatch()
    const listgroupstate = useSelector((state)=> state.listGroup)
    const  {isRequest, isSuccess,errorMessage, groups} = listgroupstate

    const userProfile = useSelector((state)=> state.profile.userProfile)
    useEffect(()=>{
        dispatch(forumlist())
    },[dispatch])

  


  return (
    <>
    <MobileHeader page='Forums' />

    {!userProfile.is_premium && (<Alert className='bg-red-500 mt-[50px] text-white font-medium'>Kindly upgrade your account to have access to forums/groups</Alert>)}
    
    {userProfile.is_premium === true  && (<div className='container mt-[70px] mx-auto'>
        <div>
            <form className='bg-white p-2 border-b'>
                <div className='flex gap-2 bg-gray-200 p-1 items-cnter rounded h-[56px] '>
                <input type="text" placeholder="Type here" className="input bg-gray-200 outline-none focus:outline-none focus-boder-none  hover:border-none w-full max-w-xs" />
                    <button className='p-1'><FaSearch className='text-base'/></button>
                    
                </div>
           
            </form>
        </div>

        {/* forums list */}
        <div>

            {isRequest && (
                <div className='text-center'><Spinner/></div>
            
            )}
         
            {groups.map((group)=>(
                <div key={group._id}>
                    <Link to={`/forums/${group._id}/`}>
                    <div className='flex mt-2 gap-4 border-b hover:bg-gray-200 p-2'>
                <div className=''><img className='rounded-full h-10 w-10 ' src={group.image} alt='image'/> </div>
                <div className=' flex w-full justify-between'>
                    <div>
                    <h2 className='font-medium'>{group.name}</h2>
                    <p className='text-sm'>{group.decription}</p>

                    </div>
                    <div>
                        <span>{group.timestamp.slice(0,10)}</span>

                    </div>
                   
                </div>
            </div>
                    </Link>
           
                </div>

            ))}
    

        </div>

        <BottomNavigation/>
    </div>)} 
    

    </>
  )
}

export default ForumListScreen