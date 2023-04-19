import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';




const UserBadgeItem = ({ user, handleFunction, admin }) => {
    

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={user.username} variant="outlined" onDelete={handleFunction} />
    </Stack>
  );
};

export default UserBadgeItem;