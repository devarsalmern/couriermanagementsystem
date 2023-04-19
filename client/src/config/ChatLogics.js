export const getSender = (loggedUser, users) => {
    // console.log("loggedUser._id:",loggedUser)
    //console.log("users[0].email === loggedUser.email ? users[1].name : users[0].name::::::::",users[0].email === loggedUser.email ? users[1].username : users[0].username)
    //return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    return users[0].username === loggedUser ? users[1].username : users[0].username
  };


export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender.email !== m.sender.email ||
        messages[i + 1].sender.email === undefined) &&
      messages[i].sender.email !== userId
    );
  };
  

export const isLastMessage = (messages, i, userId) => {
  
    return (
      
      i === messages.length - 1 &&
      messages[messages.length - 1].sender.email !== userId &&
      messages[messages.length - 1].sender.email
    );
  };



export const isSameSenderMargin = (messages, m, i, userId) => {
    
    if (
      i <= messages.length - 1 &&
      messages[i].sender._id === m.sender._id &&
      messages[i].sender._id === userId
    )
      return "65%";
      
    else if (
      
      (i <= messages.length - 1 &&
        messages[i].sender._id !== m.sender._id &&
        messages[i].sender.email !== userId) ||
      (i === messages.length - 1 && messages[i].sender.email !== userId)
    )
      return "3%";
    else return "3%";
    //else return "auto";
    //return 400
  };


export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };