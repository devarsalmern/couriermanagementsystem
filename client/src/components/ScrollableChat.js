import { borderRadius } from '@mui/system';
import React ,{useState, useContext} from 'react'
// import ScrollableFeed from 'react-scrollable-feed'
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import List from '@mui/material/List';
import { makeStyles } from '@material-ui/core/styles';
import { isSameSender,isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { UserContext } from "../UserContext";



const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  });



const ScrollableChat = ({messages}) => {
    const classes = useStyles();
    const { user, currentUserId } = useContext(UserContext);
    // this is how we get message from promise
    // messages.then((a) => {
    //     messag.push(a);
    //     console.log(a)
    //     })

  return (
    <div>
        
            {messages && messages.map((m,i) => (
                <div key = {m._id}>
                    {/* {console.log("m:::::",m)} */}
                    <span style={{backgroundColor: `${
                        m.sender._id === currentUserId ? "#B9F5D0" : "#BEE3F8"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, currentUserId),
                    marginTop:10,//isSameUser(messages, m, i, currentUserId)? 3:100,
                    borderRadius: "13px",
                    padding: "3px 15px",
                    maxWidth: "75%",  
                    
                
                    }}>                   
                        {m.content}
                    </span>
                    
                </div>
            ))}
        
        
    </div>
  )
}

export default ScrollableChat