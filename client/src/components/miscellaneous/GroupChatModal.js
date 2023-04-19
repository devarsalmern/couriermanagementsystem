import React, {useState, useContext,useEffect } from 'react';
import { UserContext } from "../../UserContext";
import axios from "axios";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';


import { allusers, accChat } from "../../api/user";
import UserListItem from "../UserAvatar/userListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
import {createGroup} from "../../api/user";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const GroupChatModal = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats ,setChats } = useContext(UserContext);


    const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     
      const data  = await allusers({search})

      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error)
    }

    };



    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            console.log("Please fill all the fields")
            return;
          }
      
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            // const { data } = await axios.post(
            //   `http://localhost:8080/group`,
            //   {
            //     name: groupChatName,
            //     users: JSON.stringify(selectedUsers.map((u) => u._id)),
            //   },
            //   config
            // );

             //const { data } = await axios.get(`/api/user?search=${search}`, config);
            //   name: groupChatName,
            //   users: JSON.stringify(selectedUsers.map((u) => u._id)),

            const data = await createGroup({groupChatName, selectedUsers})

            setChats([data, ...chats]);
            
              console.log("Ney group created")

          } catch (error) {
            
              console.log("Failed to create group chat")
          }
    };
    const handleDelete = (delUser) => {
        //console.log("selectedUsers::",selectedUsers)
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
        //console.log(selectedUsers)
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            console.log("User already added")
            return;
          }
      
          setSelectedUsers([...selectedUsers, userToAdd]);
          //console.log(selectedUsers)
    };
    
    

    return(
        <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button variant="contained" onClick={handleOpen}>New Group<AddIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField 
            id="outlined-basic" 
            label="Chat Name"
            variant="outlined" 
            onChange={(e) => setGroupChatName(e.target.value)}/>
            
            <TextField 
            id="outlined-basic" 
            label="Add User"
            variant="outlined" 
            onChange={(e) => handleSearch(e.target.value)}/>

            {/* {Selected Users} */}
            {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}



            {/* render searched users */}
            {loading ? (
              // <ChatLoading />
              <div><CircularProgress /></div>
            ) : (
              searchResult?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  
                  />
                ))
            )}


            <Button onClick={handleSubmit}>Create Group</Button>

        </Box>


        </Box>
      </Modal>
    </div>

    )

}





export default GroupChatModal;