import { FaArrowLeft, FaEllipsisV} from "react-icons/fa"
import ChatBubble from "../../Components/ChatBubble"
import ChatInput from "../../Components/ChatInput"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { forumMessages, forumdetails } from "../../state/Actions/CommunityActions"
import WebSocketService from "../../WebsocketService"





function ForumScreen() {
  const dispatch = useDispatch()
  const {forumId} = useParams()

  const [data, setData] = useState([])

  const groupdetailstate = useSelector((state)=> state.groupDetails)
  const {isRequest, isSuccess, group} =groupdetailstate

  const messagestate = useSelector((state)=>state.messages)
  const {isRequst:messageRequest,isSuccess:messageSuccess, messages:groupMessages} = messagestate



  const [messages, setMessages] = useState([])
 

  const [webSocketService, setWebSocketService] = useState(null);

  useEffect(() => {
    const service = new WebSocketService(`group_chat_${forumId}`, handleNewMessage);
    setWebSocketService(service);
    

    console.log('WebSocket connection established');

    return () => {
        if (service) {
            service.disconnect();
            console.log('WebSocket connection closed');
        }
    };
  }, [forumId]);

  const mm = 'hello'

  const handleNewMessage = (data) => {
    console.log('Received new message:', data.message);
    setMessages((prevMessages) => [...prevMessages, mm.message]);
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
    if (messageSuccess && messages !== groupMessages) {
      setMessages(groupMessages);
    }
  }, [messageSuccess, groupMessages, messages, setMessages]);
  
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
    <div onClick={()=> navigate(-1)} className="flex items-center border-2 gap-1">
      <FaArrowLeft />
      <div className="">
        <img
          className="w-10 h-10 rounded-full"
          src={data.image}
          alt="image"
        />
      </div>
    </div>
    <div>
      <h2 className="font-semibold m-0 p-0">{data.name}</h2>
      <span className="text-sm text-gray-500">{data.decription}</span>
    </div>
    <div>
      <FaEllipsisV />
    </div>
  </div>


    <div>
      
<ChatBubble messages={messages} forumId={forumId} />


        <ChatInput forumId={forumId} />
    </div>

    
    
    </>
  )
}

export default ForumScreen