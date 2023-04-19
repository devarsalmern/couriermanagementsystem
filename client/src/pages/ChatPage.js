import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from "../UserContext";

import Box from '@mui/material/Box';
import SideDrawer from "../components/miscellaneous/SideDrawer"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '90vw',
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      width: '15%',
      borderRight: '2px solid #e0e0e0',
      backgroundColor: '#4B297'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});




const ChatPage = () => {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  // console.log("user::")
  // console.log(user)
  return (
    //d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"
    <div className="container mt-1 py-4 w-100 col-10 col-sm-8">
    <div>   
      {user && <SideDrawer />}
      <Box >

      <Grid container component={Paper} className={classes.chatSection}>
      <Grid className={classes.borderRight500}>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        </Grid>
        
        
        {user && ( <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> )}
      </Grid>
      </Box>
    </div>
    </div>
  )
}

export default ChatPage