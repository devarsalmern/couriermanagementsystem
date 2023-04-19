import React, { useState, useContext } from "react";

import { UserContext } from "../../UserContext";
import ChatLoading from "../ChatLoading"
import UserListItem from "../UserAvatar/userListItem";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@material-ui/core/Grid';

import Button from '@mui/material/Button';
import axios from 'axios'

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@material-ui/core/styles';

import { allusers, accChat } from "../../api/user";

const useStyles = makeStyles((theme) => ({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'center',
    width: '100%',
    fontFamily: 'Helvetica',
    backgroundColor: '#D1E3F6'
  }
}));

const SideDrawer = () => {
    const { user, setSelectedChat, chats, setChats } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const classes = useStyles();
    const [state, setState] = React.useState({left: false,});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

      // Sidebar
    const list = (anchor) => (
    <Box
        sx={{ 
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
          
        }}
        role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
          <div className={classes.text}>
            <b>Search Users</b>
          </div>
          
          <TextField id="outlined-basic"
              label="Enter User Name"
              variant="filled" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}/>

            <Button onClick={handleSearch}>Go</Button>
        </List>

        <div>
        
        {loading ? (
            // Fetching chat so loading animation
              <ChatLoading />
            ) : (
                // else, list all the users found on side bar
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)} // if clicked on user, create chat.
                />
              ))
            
            )}

        </div>
        
        <Divider />
        
    </Box>
    );

    // to handle search in sidebar for other users
    const handleSearch = async () => {
        if(!search){
            console.log("Nothing to search!!!!")
            setSearchResult([]);
        }
        else{
        // get all users.
        try {
            setLoading(true)
            
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`  
                }
            }

            const data  = await allusers({search})//axios.get(`${process.env.REACT_APP_API_URL}/alluser?search=${search}`, config);
            
            
            setLoading(false);
            setSearchResult(data);


        } catch (error) {
            console.log(error);
            console.log("Above error is from chats.find")
        }
    }
    }



    const accessChat = async (userId) => {

        //console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      //console.log("To get userID");
      const data  = await accChat({userId})//axios.post(`/api/chat`, { userId }, config);
      console.log(data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);



    } catch (error) {
      console.log(error)
    }

    }








  return (
    <>
      <Box
        sx={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor: "white",
          width:"100%",
          p:"5px 10px 5px 10px",
          borderWidth:"5px",
        }}>
          <div>
          {['Search User'].map((anchor) => (
              <React.Fragment key={anchor}>
               <Tooltip title="Search Users to Chat" hasArrow placement="bottom-end">
                 <Button variant="ghost" onClick={toggleDrawer(anchor, true)}>
                   <SearchIcon /> {anchor}
                  </Button>
                </Tooltip>
              <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
              </React.Fragment>
          ))}
          </div>
      </Box>
    </>
  )
}

export default SideDrawer