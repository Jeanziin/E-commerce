import React, { useRef, useState, useEffect, useContext } from "react";
import { Input } from "@mui/material";
import { FaTelegramPlane } from "react-icons/fa";
import NavBar from "../Navbar2/Navbar2";
import Footer from "../Footer/Footer";
import api from "../../Services/Api";
import { useParams } from "react-router-dom";
import { UserContext } from "../UseContext/UserContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Chat.css";


export default function ChatNotExample({ id, sender, receiver }) {
  const [userData, setUserData] = useContext(UserContext);
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [productInfos, setProductInfos] = useState([]);
  const [User, setUser] = useState([]);
  const [menssage, setMenssage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatID, setChatId] = useState("");
  const [chatMenssages, setChatMenssages] = useState([]);
  const [bookSala, setBookSala] = useState("");
  const [dependencies, setDependencies] = useState(0);


  const fetchData = async () => {
    try {
      const Products = await api.get(`/product/this/${id}`);
      const { data } = Products;
      setProductInfos(data);
      const chat = await api.get(`/conversations/users/${sender}/${receiver}`);
      const { data: chatData } = chat;
      const idSala = chatData[0]._id;
      setUser(chatData);
      setChatId(idSala);
      const sala = chatData[0].idProduct;
      setBookSala(sala);
    } catch (error) {
      console.log("Erro ao carregar informações");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, receiver, sender]);

  const menssagesUsers = async () => {
    try {
      const MenssagesProds = await api.get(
        `/conversations/find/${id}/${sender}/${receiver}`
      );
      const { data } = MenssagesProds;
      setChatMenssages(data);
      // Role o scroll para o final

      // Chama a função novamente após um intervalo de tempo (por exemplo, 1 segundo)
      setTimeout(menssagesUsers, 100); // Ajuste o intervalo conforme necessário
    } catch (error) {
      console.log("Erro ao carregar mensagens");
    }
  };

  useEffect(() => {
    menssagesUsers();
  }, []);

  async function initiateChat(e) {
    e.preventDefault();
    fetchData();
    if (bookSala === id) {
      try {
        const response = await api.post(`/conversations/${chatID}`, {
          userId: userData._id,
          content: menssage,
        });

        setDependencies(dependencies + 1);

        const updatedChat = response.data;
        // Faça algo com o chat atualizado, se necessário

        // Limpe o estado ou faça outras operações necessárias
        setMenssage("");
      } catch (error) {
        console.error("Erro ao adicionar mensagem ao chat:", error);
        // Lide com o erro, se necessário
      }
    } else {
      try {
        const chat = await api.post(`/conversations/`, {
          sender,
          receiverId: receiver,
          idProduct: id,
          messages: [{ userId: sender, content: menssage }],
        });
        const { data } = chat;
        setUser(data);
      } catch (err) {
        console.log("Erro ao carregar informações");
      }
    }
  }

  return (
    <div>
      <div className="divChat">
        <Container className="chat-container">
          <div className="chat-messages">
            {chatMenssages.messages
              ? chatMenssages.messages.map((message) => (
                  <div
                    key={message._id}
                    className={`message ${
                      message.userId === userData._id ? "sent" : "received"
                    }`}
                  >
                    <div
                      className={`message-content ${
                        message.userId === userData._id ? "sent" : "received"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              : null}
            <div ref={bottomRef} />
          </div>
          <Form className="chat-input">
            <Form.Control
              type="text"
              placeholder="Digite sua mensagem..."
              value={menssage}
              onChange={(e) => setMenssage(e.target.value)}
            />
            <Button variant="primary" type="submit" onClick={initiateChat}>
              Enviar
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}
