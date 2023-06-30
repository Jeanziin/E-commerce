import React from "react";
import Rotas from "./Routes/Routes";
import { UserProvider } from "./components/UseContext/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
      <Rotas/>
      </UserProvider>
    </div>
  );
}

export default App;
