import React, { useState, useEffect } from "react";
import api from "../../../Services/Api";
import { useContext } from "react";
import { UserContext } from "../../UseContext/UserContext";
import Navbar2 from "../../Navbar2/Navbar2";
import Footer from "../../Footer/Footer";
import "./ChatNotify.css";
import ChatNot from "../../Chat/ChatNot";
import { RiEmotionSadLine } from "react-icons/ri";
import ChatNotExample from "../../Chat/ChatNotExample";
import LogoUserChat from "../../img/LogoUserChat.png"

const ChatNotify = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFormattedMessages = async () => {
      try {
        const response = await api.get(`conversations/users/${userData._id}`);
        const { data } = response;
        const formattedMessages = await Promise.all(
          data.map(async (message) => {
            const productResponse = await api.get(`/product/${message.idProduct}`);
            const { productName } = productResponse.data;
            let userId = "";

            if (message.sender._id === userData._id) {
              userId = message.receiver._id;
            } else {
              userId = message.sender._id;
            }

            const userResponse = await api.get(`/user/${userId}`);
            const { name } = userResponse.data;

            return { ...message, productName, userName: name };
          })
        );
        setMessages(formattedMessages);
        setLoading(false);
      } catch (error) {
        console.log("Não foi possível carregar suas mensagens", error);
        setLoading(false);
      }
    };

    fetchFormattedMessages();
  }, [userData]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function handleClick(message) {
    setSelectedMessage(message);
  }

  return (
    <>
      <Navbar2 />
      <div className="col-Chat container">
        <div className="wrapper">
          <div className="content">
            <div className="NotificationsChats">
              <div className="flex flex-col bg-gray-100 mt-5 screenNotify">
                <div className="flex-none bg-white shadow-md px-4 py-3 flex items-center justify-between border-b textNotify">
                  <h1 className="text-lg font-bold">Mensagens Para Você</h1>
                </div>

                <div className="flex-1 px-4 py-2 contentChats">
                  {loading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="col-not-anum">
                        <RiEmotionSadLine id="icon-not-anum" />
                        <p className="text-center">Carregando mensagens...</p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="col-not-anum ">
                        <RiEmotionSadLine id="icon-not-anum" />
                        <p className="text-center">Você não possui chats ainda</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className="mb-4 flex items-center justify-between cursor-pointer"
                        onClick={() => handleClick(message)}
                      >
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={LogoUserChat}
                            alt="Avatar"
                          />
                          <div className="ml-4">
                            <p className="text-lg font-medium text-gray-800">
                            {message.userName}
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                              {message.messages[0].content}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="responsiveDimensions">
                {selectedMessage ? (
                  <ChatNot
                    id={selectedMessage.idProduct}
                    sender={selectedMessage.sender._id}
                    receiver={selectedMessage.receiver._id}
                    key={selectedMessage._id}
                  />
                ) : (
                  <ChatNotExample />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatNotify;
