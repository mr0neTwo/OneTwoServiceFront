import React, { useState } from "react";
import Main from './components/Main'


import Login from './components/Login'


function App() {


  const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('user')))

  if (true && !currentUser) {
    return (<Login setCurrentUser = {setCurrentUser}/>)
  }
  return (<Main/>)
  
}

export default App;
