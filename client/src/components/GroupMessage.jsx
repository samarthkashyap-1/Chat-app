import React, { useRef, useEffect , useState} from "react";
import moment from "moment";
import profile from "../assets/profile.png";

const GroupMessage = ({ message, currentUser }) => {
  const isCurrentUser = message.sender === currentUser.id;
  const messageRef = useRef(null);
  const [senders , setSenders] = useState([]);

  useEffect(() => {
    // Scroll to the last message when the component is rendered
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex flex-col gap-2 ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      <div className="flex gap-2">
        {/* Display sender avatar */}
        <div className="w-10 h-10 bg-gray-500 rounded-full">
          <img src={profile} alt="" />
        </div>
        <div
          className={`bg-gray-300 py-2 px-3 rounded-lg ${
            isCurrentUser ? "bg-blue-300" : "bg-gray-300"
          }`}
        >
          {message?.messageType === "file" ? (
            <div>
              <p className="font-bold">{message.filename}</p>
              <a
                href={`http://localhost:5000/${message.filePath}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                Download
              </a>
            </div>
          ) : (
            // Render text message for other message types
            <div>
              <p className="">{message.message}</p>
              {message.filepath && (
                <a
                  href={`http://localhost:3000/file/${message.filepath}`}
                  download={message.filename}
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  Download
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Display message timestamp */}
      <p className="text-xs text-gray-500">
        {moment(message.createdAt).calendar()}
      </p>
    </div>
  );
};

export default GroupMessage;
