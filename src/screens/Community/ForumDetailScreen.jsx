import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEllipsisV, FaSearch, FaUserPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { forumdetails, groupMembers } from '../../state/Actions/CommunityActions'
import { useParams } from 'react-router-dom'
import EditGroupModal from '../../Components/EditGroupModal'
import axios from 'axios'
import BottomNavigation from '../../Components/Tabs'

function ForumDetailScreen() {
    const {forumId} = useParams()

    const [data, setData] = useState([])
    const groupdetailstate = useSelector((state)=> state.groupDetails)
  const {isRequest, isSuccess, group} =groupdetailstate


  const memberstate = useSelector((state)=> state.members)
  const {isRequest:memberRequest, isSuccess:successRequest, members} =memberstate
    const [openModal, setOpenModal] = useState(false)


    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(forumdetails(forumId))
      
            
        
      },[dispatch,forumId])

    useEffect(()=>{
        if(isSuccess){
            dispatch(groupMembers(group._id))
            console.log(group._id)

        }


    },[dispatch,isSuccess, group])

    
 
    
    
  return (
    <>
    <div className='flex items-center p-2 mt-2 justify-between'>
        <button onClick={()=>window.history.back()}>
        <FaArrowLeft/>

        </button>
        
        <button onClick={() => setOpenModal(true)}>
        <FaEllipsisV/>
        </button>
     

    </div>

    <div>
        <div className='text-center'>
            <div className='flex justify-center'>
            <img className='h-20 w-20 rounded-full' src={group.image} alt=''/>

            </div>
       
        <div>
            <h2 className='font-bold'> {group?.name}</h2>
            <span className='text-gray-500'>Group . {group?.members?.length} members</span>
            <span className='block'>{group?.timestamp?.slice(0,10)}</span>
        </div>

        </div>

        <div className='flex items-center shadow-md border-md  gap-4 container mx-auto p-2 justify-center'>
           
            <div className='text-blue-500'>
            < FaUserPlus  className='text-xl' />
            <span className='text-sm font-semibold'>Add</span>

            </div>

            <div className='text-blue-500 text-center'>
            <FaSearch/>
            <span className='text-sm font-semibold'>Search</span>

            </div>
         

        </div>


        <div className='p-2 bg-white shadow-md mt-2'>
           {group.decription}
        </div>

        <div className='mt-2 shadow-md border-b p-2'>
            <h5 className='text-sm'>
             {group.members?.length} participants
            </h5>

            {members.map((member)=>(
                <div className='mt-4 w-full space-y-4' key={member._id}>
                     <div className='flex items-center gap-2 w-full border-b'>
                    <img className='w-10 h-10 rounded-full' src={member.image} alt={member.name} />
                    <div className='w-full'>
                        <div className='flex items-center justify-between w-full'>
                        <h2 className='space-0 p-0 m-0'>{member.name}</h2>
  
                        </div>
                       
                        <span className='text-sm text-gay-500'>{member.email}</span>
                    </div>
                </div>

                </div>

            ))}

          
        </div>

        <EditGroupModal group={group} openModal={openModal} setOpenModal={setOpenModal} />

       
      
        
        
    </div>        

        <BottomNavigation/>
    </>
  )
}

export default ForumDetailScreen