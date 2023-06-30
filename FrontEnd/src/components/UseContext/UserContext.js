import React, {createContext, useState} from "react";
export const UserContext = createContext()
export function UserProvider(props){
    const email = localStorage.getItem('email')
  const name = localStorage.getItem('name')
  const id = localStorage.getItem('id')
  const isLogged = localStorage.getItem('IsLogged')

  const [userData, setUserData] = useState({
    isLogged: isLogged,
    email: email,
    name: name,
    _id: id
        
    }
        
    )
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}