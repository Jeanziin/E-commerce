import { useState } from 'react'
import Join from '../Join/Join'
import Chat from '../Chat/Chat'

function TelaIndex() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className="App">
    {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
      
    </div>
  )
}

export default TelaIndex