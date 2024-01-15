import { Spinner } from "flowbite-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ChatBubble = ({ messages,messageRequest,MessageSuccess }) => {
  const bottomRef = useRef();
  const userprofile = useSelector((state) => state.profile);
  const { userProfile } = userprofile;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          bottomRef.current.scrollIntoView();
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [messages]);

  return (
    <div className="mt-[70px] p-2 mb-[100px]">
      {messageRequest && (<Spinner className="text-center"></Spinner>) }
      {messages?.map((message, index) => (
        <div key={index}>
          <div
            className={`chat ${
              message.sender._id === userProfile._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message.sender.image}
                />
              </div>
            </div>
            <div className="chat-header space-x-2">
              {message.sender._id !== userProfile._id && (<span>{message.sender.name}</span>) }
              <time className="text-xs opacity-50">{message.timestamp.slice(12,16)}</time>
            </div>
            <div className="bg-blue-300 chat-bubble text-black">
              {message.content}
              {message.file && (
                <div>
                  {message.file.endsWith('.png') && (
                    <a href={message.file} download><img className="w-full h-40 object-cover" src={message.file} alt="Preview" /></a>
                  )}
                  {message.file.endsWith('.mp4') &&( 
                    <a href={message.file} download>  <video className="w-full h-40 object-cover" src={message.file} controls /></a>
                  
                )}
                  {message.file.endsWith('.mp3') && (
                    <a href={message.file} download><audio className="w-full h-40" src={message.file} controls /></a>
                  )}
                  {(message.file.endsWith('.pdf') || message.file.endsWith('.doc')) && (
                    <a href={message.file} download>
                      <p className="bg-gray-200 p-2 rounded-lg">{message.file.split('/').pop()}</p> 

                    </a>
                )}
                </div>
              )}
            </div>
          
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>
      ))}
   
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBubble;