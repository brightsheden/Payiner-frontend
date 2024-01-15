import axios from 'axios';
import { useState } from 'react';
import { FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane }  from "react-icons/fa"
import { useSelector } from 'react-redux';

const ChatInput = ({forumId}) => {
  const [message, setMessage] = useState('')
  const authToken = useSelector((state)=> state.user.userInfo.token)

 
  const handleSendMessage = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        };

        await axios.post(`/api/forum/groups/${forumId}/send_message/`, { "message": message }, config);
        setMessage('');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};


  return (
    <div className=" fixed bottom-0 left-0 right-0 bg-white  p-4 flex items-center border-t border-gray-300">

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
      />

      <label htmlFor="fileInput" className="cursor-pointer">
        <FaPaperclip className="text-gray-500 hover:text-blue-500" />
        <input type="file" id="fileInput" className="hidden" />
      </label>

      <button className="ml-2">
        <FaSmile className="text-gray-500 hover:text-blue-500" />
      </button>


      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
          !message.trim() ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
        }`}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default ChatInput;
