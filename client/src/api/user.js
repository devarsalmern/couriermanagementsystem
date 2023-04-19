
export const register = async ({userType, username, email, password } = {}) => {
	const user = {userType, username, email, password };

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		return await res.json();
	} catch (err) {
		throw new Error(`Cannot register at this time. ${err}`);
	}
};


export const login = async ({userType, email, password, otp } = {}) => {
	const user = {userType, email, password, otp };

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await res.json();
	} catch (err) {
		throw new Error(`Cannot login at this time. ${err}`);
	}
};

export const logout = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
			method: "GET",
			credentials: "include",
		});
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const getUser = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
			method: "GET",
			credentials: "include",
		});
		return await res.json();
	} catch (err) {
		throw new Error("Please login to continue");
	}
};

export const resetpassword = async ({userType,email} = {}) => {
	const user = {userType,email};

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/resetpassword`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		return await res.json();
	} catch (err) {
		throw new Error(`Cannot reset password at this time. ${err}`);
	}
};

export const newpassword = async ({password,token_rs} = {}) => {
	const user = {password,token_rs};

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/newpassword`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		return await res.json();
	} catch (err) {
		throw new Error(`Cannot reset password at this time. ${err}`);
	}
};

export const OrderDetails = async ({TrackingID,Address_f,Address_t,Cost,Carrier,Size,Weight,PriorityStatus,PaymentStatus,Customer} = {}) => {
	console.log(PriorityStatus,TrackingID);
	const Order = {TrackingID,Address_f,Address_t,Cost,Carrier,Size,Weight,PriorityStatus,PaymentStatus,Customer};

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Order),
		});
		return await res.json();
	} catch (err) {
		throw new Error(`Cannot updated order details. ${err}`);
	}
};

export const orderemail = async ({Customer,Cost,TrackingID} = {}) => {
	const email = Customer;
	const Order = {email,Cost,TrackingID};

	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/orderemail`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Order),
		});
		return await res.json();
	} catch (err) {
		throw new Error(`Cannot updated order details. ${err}`);
	}
};

export const readusers = async ({ page, perPage, userType } = {}) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/users?page=${page}&perPage=${perPage}&userType=${userType}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return await res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

export const readorders = async ({ page, perPage, userType } = {}) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/orders?page=${page}&perPage=${perPage}&userType=${userType}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return await res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

export const readuserorders = async ({ page, perPage, userType, email } = {}) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/userorders?page=${page}&perPage=${perPage}&userType=${userType}&email=${email}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return await res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

export const orderupdate = async ({TrackingID_u, Driver_u, OrderStatus_u, Location_u} = {}) => {
	const Order = {TrackingID_u, Driver_u, OrderStatus_u, Location_u};
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/orderupdate`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Order),
		});
		return await res.json();
	} catch (err) {
		throw new Error(`Cannot updated order details. ${err}`);
	}
};

export const orderstatus = async ({TrackingID} = {}) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/orderstatus?TrackingID=${TrackingID}`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
	);	
		return await res.json();
		} catch (error) {
			throw new Error(error.message);
}
};

export const adduseraccess = async ({addemail, adduserType} = {}) => {
	const userType = adduserType;
	const email = addemail;
	const Useraccess = {userType, email};
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/adduseraccess`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Useraccess),
		});
		return await res.json();
	} catch (err) {
		throw new Error(`Cannot updated useraccess details. ${err}`);
	}
};


export const allusers = async ({search} = {}) => {
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/alluser?search=${search}`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};

export const listofChats = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};



export const accChat = async ({userId} = {}) => {
	// console.log("userId:", userId)
	const userid = {userId}
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userid),
		});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};


export const createGroup = async ({groupChatName, selectedUsers} = {}) => {
	
	const name = groupChatName
    const users = JSON.stringify(selectedUsers.map((u) => u._id))
	
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/group`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			
			body: JSON.stringify({users, name}),
			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};

export const groupRename = async ({selectedChat, groupChatName} = {}) => {
	

	const chatId = selectedChat._id
    const chatName = groupChatName
	
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/rename`, {
			method: "PUT",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			
			
			body: JSON.stringify({chatId, chatName}),


			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};



export const groupAdd = async ({selectedChat,user1} = {}) => {
	


	const chatId = selectedChat._id
    const userId = user1._id
	
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/groupadd`, {
			method: "PUT",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			
			
			body: JSON.stringify({chatId, userId}),


			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};



export const groupRemove = async ({selectedChat,user1} = {}) => {
	


	const chatId = selectedChat._id
    const userId = user1._id
	
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/groupremove`, {
			method: "PUT",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			
			
			body: JSON.stringify({chatId, userId}),


			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};


export const sendMessageAPI = async ({newMessage,selectedChat} = {}) => {
	
	console.log("content::", newMessage)
	const content = newMessage
    const chatId = selectedChat._id
	
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			
			
			body: JSON.stringify({content, chatId}),


			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};



export const fetchMessage = async ({selectedChat} = {}) => {
	

	
    const chatId = selectedChat._id
	console.log("chatId in fetch messageAPI:",chatId)
	
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/message/${chatId}`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			//params: chatId
			
			
			//body: JSON.stringify({content, chatId}),


			});
		return await (res.json());
	} catch (err) {
		throw new Error("Some error!!");
	}
};