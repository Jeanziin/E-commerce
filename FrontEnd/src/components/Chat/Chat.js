import React, { useRef, useState, useEffect, useContext } from 'react';
import { Input } from '@mui/material';
import { FaTelegramPlane } from 'react-icons/fa';
import './Chat.css';
import NavBar from '../Navbar2/Navbar2';
import Footer from '../Footer/Footer';
import api from '../../Services/Api';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UseContext/UserContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar2 from '../Navbar2/Navbar2';

export default function Chat() {
  const [userData, setUserData] = useContext(UserContext);
  const { id } = useParams();
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [productInfos, setProductInfos] = useState([]);
  const [User, setUser] = useState([]);
  const [menssage, setMenssage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(userData._id);
  const [receverId, setReceiverId] = useState('');
  const [chatID, setChatId] = useState('');
  const [chatMenssages, setChatMenssages] = useState([]);
  const [bookSala, setBookSala] = useState('');
  const [dependencies, setDependencies] = useState(0);

  const receiverID = productInfos.user;
  console.log(chatMenssages.messages);

  const fetchData = async () => {
    try {
      const Products = await api.get(`/product/this/${id}`);
      const { data } = Products;
      setProductInfos(data);
      const chat = await api.get(`/conversations/users/${userData._id}/${receiverID}`);
      const { data: chatData } = chat;
      const idSala = chatData[0]._id;
      setUser(chatData);
      setChatId(idSala);
      const sala = chatData[0].idProduct;
      setBookSala(sala);
      console.log(chatID);
    } catch (error) {
      console.log('Erro ao carregar informações');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, receiverID, userData._id]);

  console.log(bookSala);
  const menssagesUsers = async () => {
    try {
      const MenssagesProds = await api.get(`/conversations/find/${id}/${userData._id}/${receiverID}`);
      const { data } = MenssagesProds;
      setChatMenssages(data);
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    } catch (error) {
      console.log('Erro ao carregar mensagens');
    }
  };
  
  useEffect(() => {
    menssagesUsers();
  
    const interval = setInterval(() => {
      menssagesUsers();
    }, 100); // Define o intervalo de tempo em milissegundos (por exemplo, 5000ms = 5 segundos)
  
    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    };
  }, [receiverID, dependencies]);
  

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
        setMenssage('');
      } catch (error) {
        console.error('Erro ao adicionar mensagem ao chat:', error);
        // Lide com o erro, se necessário
      }
    } else {
      try {
        const chat = await api.post(`/conversations/`, {
          senderId,
          receiverId: productInfos.user,
          idProduct: id,
          messages: [{ userId: senderId, content: menssage }],
        });
        const { data } = chat;
        setUser(data);
        setMenssage('');
      } catch (err) {
        console.log('Erro ao carregar informações');
      }
    }
  }

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  }, [chatMenssages]);

  return (
    <div>
      <Navbar2/>
      <div className='divChat'>
      <Container className='chat-container'>
        <div className='chat-messages' ref={bottomRef}>
          {chatMenssages.messages ? (
            chatMenssages.messages.map((message) => (
              <div
                key={message._id}
                className={`message ${message.userId === userData._id ? 'sent' : 'received'}`}
              >
                <div
                  className={`message-content ${
                    message.userId === userData._id ? 'sent' : 'received'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <div className='chat-messages mt-5'>
              <h4 className=''>Inicie uma Conversa</h4>
            </div>
          )}
        </div>
        <Form className='chat-input'>
          <Form.Control
            type='text'
            placeholder='Digite sua mensagem...'
            value={menssage}
            onChange={(e) => setMenssage(e.target.value)}
          />
          <Button variant='primary' type='submit' onClick={initiateChat}>
            Enviar
          </Button>
        </Form>
      </Container>
      </div>
      <Footer/>
    </div>
  );
}
