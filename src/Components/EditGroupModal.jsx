import { Button, Label, Modal, ToggleSwitch } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateForum } from '../state/Actions/CommunityActions'
import axios from 'axios'
import { resetUpdateGroupState } from '../state/Slices/CommunitySlice'

function EditGroupModal({group,openModal, setOpenModal}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [is_lock, setIsLock] = useState(false)
    const [forumId, setForumId] = useState('') 
    const [isUploading, setUploading] = useState('')
    const [image,setImage] = useState('')
    const [imageUrl,setImageUrl] = useState('')



    
   const updategroupstate = useSelector((state)=>state.updateGroup)
   const {isRequest, isSuccess, errorMessage} = updategroupstate

   const dispatch = useDispatch()
   useEffect(()=>{
    if(isSuccess){
        setOpenModal(false)
        dispatch(resetUpdateGroupState())
    }
   },[dispatch,setOpenModal,isSuccess])


   
    useEffect(()=>{
        if(group){
            setName(group?.name)
            setDescription(group.decription)
            setIsLock(group.is_locked)
            setForumId(group._id)
        }

    },[group])

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(updateForum({forumId,name,description,is_lock}))
        console.log(forumId)
    }

    const uploadFileHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        setImageUrl(URL.createObjectURL(file));
        formData.append('image',file)
        formData.append('forumId', forumId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.put("/api/forum/groups/upload/", formData,config)
            setUploading(false)
            setImage(data)
        } catch (error) {
            setUploading(false)
            
        }

    }


   
  return (
    <div>




      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Group</Modal.Header>
        <Modal.Body>
        <form className='flex gap-4 flex-col mt-5' onSubmit={handleSubmit}>
    <div className='text-center'>
        <div className='flex justify-center'>
            {imageUrl ? ( <img className='rounded-full w-40 h-40' src={imageUrl} />): (
                         <img className='rounded-full w-40 h-40' src={group?.image} />
            )}
       

        </div>
       
        <div>
        <label>Change Photto</label>
        <input className='' type='file'
          onChange={uploadFileHandler}
          />

        </div>
        


    </div>


    <div>
        <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" /></div>

    <div>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={3} type="text" placeholder="Type here" className=" input-bordered input-primary w-full max-w-xs" /></div>


        <div className='flex justify-between items-center p-2'>
            <label>Lock Group</label>
        <input type='checkbox' checked={is_lock}  onChange={(e)=>setIsLock(e.target.checked)} />

        </div>

        <div>
        <button className='btn w-full btn-primary'>Save Changes</button>

        </div>
   


  
   </form>
        </Modal.Body>
      
      </Modal>
    </div>
  )
}

export default EditGroupModal