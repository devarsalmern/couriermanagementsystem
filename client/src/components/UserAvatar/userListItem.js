import React, { useState, useContext } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';

import { UserContext } from "../../UserContext";
import { List } from "@mui/material";

const userListItem = ({user ,handleFunction}) => {
    //const {user} = useContext(UserContext);

    return (
        <Button
          onClick={handleFunction}
          
        >
          <List>
            <div><b>Name:</b>{user.username}</div>
            <div>
              <b>Email: </b>
              {user.email}
            </div>
          </List>
        </Button>
      );
}

export default userListItem