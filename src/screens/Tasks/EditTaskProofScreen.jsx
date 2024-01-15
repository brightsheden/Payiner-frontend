import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editproof, proofdetail } from '../../state/Actions/TaskActions';
import { useNavigate, useParams } from 'react-router-dom';
import MobileHeader from '../../Components/MobileHeader';
import axios from 'axios';
import BottomNavigation from '../../Components/Tabs';
import { Alert } from 'react-daisyui';


const EditTaskProofPage = () => {
    const { proofId } = useParams();

    const [image,setImage] = useState("")
    const [imageUrl,setImageUrl] = useState("")
    const [description,setDescription] = useState("")
    const [is_approve,setIsApporve] = useState("")

  

  const proofdatailstate = useSelector((state) => state.proofdetail);
  const { isSuccess, isRequest, errorMessage, proofdetail: proof } = proofdatailstate;


  const editproofstate = useSelector((state)=>state.editproof)
  const {isSuccess:editSuccess, isRequest:editRequest, errorMessage:editError} = editproofstate

  const userstate = useSelector((state)=> state.user)
  const {userInfo} = userstate
  const [uploading, setUploading] = useState('')

  const [formData, setFormData] = useState({
    image:proof?.image,
    imageUrl:proof?.image


  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file separately for preview
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [e.target.name]: file,
        imageUrl: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const dispatch = useDispatch();

  const onSubmit = (e) => {
    
    e.preventDefault()
    
   
    dispatch(editproof({proofId,description,is_approve}))
  };

 
  

  useEffect(() => {
    dispatch(proofdetail(proofId));
  }, [dispatch, proofId]);

  useEffect(() => {
    // Prefill the form with proof details when they are available
    if (proof) {
        setImage(proof.image)
        setImageUrl(proof.image)
        setDescription(proof.description)
        setIsApporve(proof.is_approve)
     
    }
  }, [proof]);

  const navigate = useNavigate()

  useEffect(()=>{
    if(editSuccess){
      navigate('/tasks')
    }
  },[navigate,editSuccess])


  const uploadFileHandler = async  (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    setImageUrl(URL.createObjectURL(file));
    formData.append('image',file)
    formData.append('proofId', proofId)
    console.log("file is uploading")
    setUploading(true)

    try {
        const config = {
            "content-type" : "multipart/form/data"
        }
        const {data} =await axios.put("/api/task/taskproofphoto/", formData,config)
        setUploading(false)
        setImage(data)
    } catch (error) {
        setUploading(false)
        
    }

}



  return (
    <div className="container mx-auto mt-[48px] p-4">
      <MobileHeader page={'Edit Proof'}/>

      <form onSubmit={onSubmit}>
        {/* Image Field */}

        <div className=" overflow-hidden bg-blue-500  w-full flex-shrink-0">
              {/* You can replace the image URL with the actual profile image */}
                     {/* Display the image preview */}
                     {imageUrl ? (
                <img src={imageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                // Placeholder image or default image
                <img src={image} alt="Profile" className="w-full h-40 object-cover" />
              )}
            </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600 link">
            Change Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            
            className="mt-1 p-2 w-full rounded hidden"
    
          />
     
        </div>

        

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="mt-1 p-2 w-full rounded border border-gray-300"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          ></textarea>
        </div>

        {userInfo.isAdmin && (
              
        <div className="mb-4">
        <input type="checkbox" id="isApprove" name="isApprove" className="mr-2" checked={is_approve}
        
        onChange={(e)=>setIsApporve(e.target.checked)}/>
        <label htmlFor="isApprove" className="text-sm text-gray-600">
          Approve Task
        </label>
      </div>

          
        )}

        {editSuccess && <Alert className='bg-green-500'>Task edited successful</Alert>}

  
        {/* Submit Button */}
        {proof.is_approve && userInfo.isAdmin ? (<button
          type="submit"
          disabled
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 mb-[69px] "
        >
          Save Changes
        </button>):
        (<button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 "
        >
          Save Changes
        </button>)}
        
      </form>

      <BottomNavigation/>
    </div>
  );
};

export default EditTaskProofPage;
