import { FaArrowLeft, FaEllipsisV} from "react-icons/fa"
import ChatBubble from "../../Components/ChatBubble"
import ChatInput from "../../Components/ChatInput"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane }  from "react-icons/fa"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { forumMessages, forumdetails } from "../../state/Actions/CommunityActions"
import Pusher from "pusher-js" // import Pusher
import axios from "axios"
import {resetGroupMessageState} from '../../state/Slices/CommunitySlice'
import { Alert } from "flowbite-react"


function ForumScreen() {
  const dispatch = useDispatch()
  const {forumId} = useParams()
  const userprofile = useSelector((state) => state.profile);
  const { userProfile } = userprofile;
  const [shouldResetState, setShouldResetState] = useState(false);
  

  const [data, setData] = useState([])

  const groupdetailstate = useSelector((state)=> state.groupDetails)
  const {isRequest, isSuccess, group} =groupdetailstate

  const messagestate = useSelector((state)=>state.messages)
  const {isRequst:messageRequest,isSuccess:messageSuccess, messages:groupMessages} = messagestate
  
  const userstate = useSelector((state)=>state.user)
  const {userInfo}=userstate

  const [messages, setMessages] = useState([])

  const [content, setContent] = useState('')
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null); // New state variable for the file URL

  const authToken = useSelector((state)=> state.user.userInfo.token)

 
   const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);

      if (file) {
        formData.append('file', file);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      };

      await axios.post(`/api/forum/groups/${forumId}/send_message/`, formData, config);
      setContent('');
      setFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile)); // Create a URL for the selected file
  };

  useEffect(() => {
    // create a Pusher instance
    const pusher = new Pusher("4768f700bad9dd388eba", { cluster: "mt1" })
    // subscribe to a channel
    const channel = pusher.subscribe("forum_" + forumId)
    // bind to an event
    channel.bind("new_message", (data) => {
      // handle new message
      handleNewMessage(data)
      console.log(data, "handlesend")
    })

    console.log('Pusher connection established');

    return () => {
        // unsubscribe from the channel
        pusher.unsubscribe("forum_" + forumId)
        console.log('Pusher connection closed');
    };
  }, [forumId]);

  const handleNewMessage = (data) => {
    console.log('Received new message:', data.message);
    setMessages((prevMessages) => [...prevMessages, data.message]);
  };

 
  
  

  useEffect(()=>{
    dispatch(forumdetails(forumId))     
  },[dispatch,forumId])

  useEffect(() => {
    if (isSuccess && data !== group) {
      setData(group);
    }
  }, [isSuccess, group, data, setData]);
  
  useEffect(() => {
    
      setMessages(groupMessages);
      if(messageSuccess && shouldResetState){
        dispatch(resetGroupMessageState())
      }
    
  }, [groupMessages,dispatch,shouldResetState,messageSuccess]);
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(forumMessages(group._id));
    }
  }, [isSuccess, group, dispatch]);

  useEffect(() => {
    console.log('ForumScreen re-rendered');
 
  }, [messages]);

  const navigate = useNavigate()

  return (
    <>
   <div className="fixed top-0 left-0 right-0 bg-blue-200 p-2 flex items-center justify-between z-10 ">
    <div onClick={()=>navigate(-1)} className="flex items-center gap-1">
      <FaArrowLeft />
      <div className="">
        <img
          className="w-10 h-10 rounded-full"
          src={data.image}
          alt="image"
        />
      </div>
    </div>
    <Link to={`/forumdetail/${data._id}`}>
    <div>
      <h2 className="font-semibold m-0 p-0">{data.name}</h2>
      <span className="text-sm text-gray-500">{data.decription}</span>
    </div>
    </Link>
   
    <div>
      <FaEllipsisV />
    </div>
  </div>


    <div>
      
    {/* messages*/}


   
<ChatBubble messages={messages} messageReques={messageRequest} messageSuccess={messageSuccess}/>
        
        


   
  


        {/* chat input */}
        {!data.is_locked && (
           <div className="fixed bottom-0 left-0 right-0 bg-white p-4 space-y-2 border-t border-gray-300">
           {/* Add these tags to preview the selected file */}
           <div className="flex justfiy-center">
           {file && file.type.startsWith('image/') && <img src={fileUrl} alt="Preview" className="h-40 w-auto object-cover" />}
           {file && file.type.startsWith('video/') && <video src={fileUrl} controls className="h-40 w-auto object-cover" />}
           {file && file.type.startsWith('audio/') && <audio src={fileUrl} controls className="h-40 w-auto" />}
           {file && (file?.type === 'application/pdf' || file.type === 'application/msword') && (
                 <div className="w-full  h-12 rounded border border-gray-300 p-1">
                   {file.name}
                 </div>
               )}
     
     
           </div>
     
           <div className="flex  items-center">
           <input
             type="text"
             placeholder="Type a message..."
             value={content}
             onChange={(e) => setContent(e.target.value)}
             className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
           />
     
           <label htmlFor="fileInput" className="cursor-pointer">
             <FaPaperclip className="text-gray-500 hover:text-blue-500" />
             <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
           </label>
     
           <button className="ml-2">
             <FaSmile className="text-gray-500 hover:text-blue-500" />
           </button>
     
           <button
             onClick={handleSendMessage}
             disabled={!content.trim()}
             className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
               !content.trim() ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
             }`}
           >
             <FaPaperPlane />
           </button>
     
           </div>
         
         
         </div>
        ) }
     
    {data.is_locked && userInfo.isAdmin ? (
         <div className="fixed bottom-0 left-0 right-0 bg-white p-4 space-y-2 border-t border-gray-300">
         {/* Add these tags to preview the selected file */}
         <div className="flex justfiy-center">
         {file && file.type.startsWith('image/') && <img src={fileUrl} alt="Preview" className="h-40 w-auto object-cover" />}
         {file && file.type.startsWith('video/') && <video src={fileUrl} controls className="h-40 w-auto object-cover" />}
         {file && file.type.startsWith('audio/') && <audio src={fileUrl} controls className="h-40 w-auto" />}
         {file && (file?.type === 'application/pdf' || file.type === 'application/msword') && (
               <div className="w-full  h-12 rounded border border-gray-300 p-1">
                 {file.name}
               </div>
             )}
   
   
         </div>
   
         <div className="flex  items-center">
         <input
           type="text"
           placeholder="Type a message..."
           value={content}
           onChange={(e) => setContent(e.target.value)}
           className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
         />
   
         <label htmlFor="fileInput" className="cursor-pointer">
           <FaPaperclip className="text-gray-500 hover:text-blue-500" />
           <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
         </label>
   
         <button className="ml-2">
           <FaSmile className="text-gray-500 hover:text-blue-500" />
         </button>
   
         <button
           onClick={handleSendMessage}
           disabled={!content.trim()}
           className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
             !content.trim() ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
           }`}
         >
           <FaPaperPlane />
         </button>
   
         </div>
       
       
       </div>
   
    ) : ( <Alert color='info' >Only admin can send messages</Alert>) }
     

    </div>

    
    
    </>
  )
}

export default ForumScreen
