import React, { useState, useContext,useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';


import ChatLoading from "./ChatLoading"
import { listofChats } from "../api/user";
import {getSender} from "../config/ChatLogics"
import GroupChatModal from "./miscellaneous/GroupChatModal"



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100vw',
    height: '100vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '73vh',
    
    overflowY: 'auto'
  }
});

const MyChats = ({fetchAgain}) => {
  const classes = useStyles();
  const [loggedUser, setLoggedUser] = useState();
  const { user,selectedChat, setSelectedChat, chats, setChats, usertype } = useContext(UserContext);


  // fetch all the chats
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = await listofChats() //axios.get("/chat", config);
      //console.log(data)
      setChats(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  

  return (
    <>
    <Grid>
          <Grid item xs={12} >
              <Typography variant="h5" className="header-message">Chat</Typography>
          </Grid>
    </Grid>

    {
      usertype !== "30"?(<></>)
      
      :
      
      (<GroupChatModal>
      
        <Button >
          New Group<AddIcon />
        </Button>
    </GroupChatModal>)
    
    }  
    <div className={classes.messageArea}>
 
      
      
        {chats?(
          <div>
            
            
            {chats.map((chat) =>(
              
              <List>
                
              <Button fullWidth 
                variant="text"
                
                //color={selectedChat !== 'undefined' ? selectedChat === chat ? "#38B2AC" : "#E8E8E8" :""}
                // color={selectedChat === chat ? "white" : "black"} Causes Uncaught TypeError right now
                onClick={() => setSelectedChat(chat)  }   
                key={chat._id}
              >   
                <ListItem>
                  {!chat.isGroupChat
                    ? //chat.users[1].email
                    getSender(user, chat.users)
                    : chat.chatName}
                </ListItem>
              </Button>
              </List>
              
            ))}
            
          </div>
          
        ):(
        <ChatLoading />
        )
        }
        
        
    </div>
    </>
  )
}

export default MyChats