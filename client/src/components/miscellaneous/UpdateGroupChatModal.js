import React, {useState, useContext} from 'react'
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { UserContext } from "../../UserContext";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import {allusers, groupRename, groupAdd, groupRemove} from "../../api/user"
import UserListItem from "../UserAvatar/userListItem"
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '50vh',
    
    overflowY: 'auto',
    
    
  },
  selected:{
    backgroundColor: '#e0e0e0'
  }
});

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

  
  const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const classes = useStyles();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);


    const {selectedChat, setSelectedChat, user} = useContext(UserContext);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          console.log("user already in group")
          return;
        }
        
        if (selectedChat.groupAdmin.email !== user) {
          console.log("Only admins can add users")
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        //   const { data } = await axios.put(
        //     `/api/chat/groupadd`,
        //     {
        //       chatId: selectedChat._id,
        //       userId: user1._id,
        //     },
        //     config
        //   );
    
          const data = await groupAdd({selectedChat,user1})
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
        setGroupChatName("");
      };




    const handleRemove = async (user1) => {
        console.log("user1::", user);
        console.log("groupAdmin::", selectedChat.groupAdmin.email);
        if (selectedChat.groupAdmin.email !== user ){//|| user1.email !== user) {
            console.log("only admins can remove someone")
            return;
          }
      
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            // const { data } = await axios.put(
            //   `/api/chat/groupremove`,
            //   {
            //     chatId: selectedChat._id,
            //     userId: user1._id,
            //   },
            //   config
            // );
            
            const data = await groupRemove({selectedChat,user1})

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
          } catch (error) {
            console.log(error)
            setLoading(false);
          }
          setGroupChatName("");

    }



    const handleRename = async () => {
            if (!groupChatName) return;

            try {
            setRenameLoading(true);
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            //   const { data } = await axios.put(
            //     `/api/chat/rename`,
            //     {
            //       chatId: selectedChat._id,
            //       chatName: groupChatName,
            //     },
            //     config
            //   );
                const data = await groupRename({selectedChat, groupChatName})


            console.log(data._id);
            // setSelectedChat("");
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
            } catch (error) {
            console.log(error)
            setRenameLoading(false);
            }
            setGroupChatName("");
    }





    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
        setSearchResult([])
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
        setLoading(false);
        }
        
    }



  return (
    <span>
      

      {/* Group settings popup */}
      <span>
          
          <Button onClick={handleOpen}><SettingsIcon /></Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedChat.chatName}
              </Typography>


              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
              </Typography>
              <Typography>
                  {selectedChat.users.map((u) => (
                      <UserBadgeItem
                      key={u._id}
                      user={u}
                      admin={selectedChat.groupAdmin}
                      handleFunction={() => handleRemove(u)}
                    />
                  ))}
              </Typography>


            {console.log("selectedChat.groupAdmin::",selectedChat.groupAdmin)}


            {selectedChat.groupAdmin.username === user?(<><TextField 
              id="outlined-basic" 
              label="Rename Group" 
              variant="outlined" 
              onChange={(e) => setGroupChatName(e.target.value)}
              />


              <Button 
              isLoading={renameLoading}
              onClick={handleRename}
              >
                  Update
              </Button>


              <TextField 
              id="outlined-basic" 
              label="Add user to Group" 
              variant="outlined" 
              onChange={(e) => handleSearch(e.target.value)}
              />


              <Box className={classes.messageArea}>
                  {loading ? (
                          <div><CircularProgress /></div>/////////////////
                      ) : (
                        
                        searchResult?.map((user) => (
                          
                          <UserListItem
                          

                          key={user._id}
                          user={user}
                          handleFunction={() => handleAddUser(user)}
                          />
                        
                      ))
                      
                      )}
                      
              </Box>
          

              </>
              ):
              
              
              (<></>)
              }
              
              


              

            




              
              
              </Box>

              
          </Modal>
      </span>


    </span>
  )
}

export default UpdateGroupChatModal