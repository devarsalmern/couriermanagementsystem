import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import SingleChat from "./SingleChat";
// import ScrollToBottom from 'react-scroll-to-bottom';
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = useContext(UserContext);

  return (
    <div>
      
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
      
    </div>
  )
}

export default ChatBox