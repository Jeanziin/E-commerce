import React, {useEffect, useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../UseContext/UserContext'

export default function Join({setChatVisibility, setSocket, src}) {
  const [userData, setUserData] = useContext(UserContext);
console.log(userData)

  const usernameRef = useRef()
  
  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3333')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }
  useEffect(() => {
    handleSubmit();
  }, [userData]);

  return (
    <div className={style['join-container']}>
      <h2>Chat em tempo real</h2>
      <Input inputRef={usernameRef} placeholder='Nome de usuário' value={userData.name}/>
      <Button sx={{mt:2}} onClick={()=>handleSubmit()} variant="contained">Entrar</Button>
    </div>
  )
}