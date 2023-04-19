import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserContext } from "./UserContext";

import { toast, ToastContainer } from "react-toastify";
import {GoogleApiWrapper} from 'google-maps-react';
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Newpass from "./pages/Newpassword";
import CustomerHome from "./pages/usertype/Customer/CustomerHome";
import DriverHome from "./pages/usertype/Driver/DriverHome";
import ManagerHome from "./pages/usertype/Manager/ManagerHome";
import Order from "./pages/Order";
import OrderTracking from "./pages/OrderTrackingPage";
import Mapview from "./pages/map";
import ChatPage from "./pages/ChatPage";


// functions
import { getUser } from "./api/user";

const App = () => {
	const [user, setUser] = useState(null);
	const [useremail, setUseremail] = useState(null);
	const [usertype, setUsertype] = useState(null);
	const [userhome,setuserhome] = useState("");
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [currentUserEmail, setCurrentUserEmail] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = getUser()
			.then((res) => {
				if(res.error){
					toast(res.error);
				}
				else {
					setUser(res.username);
					setUseremail(res.email);
					setUsertype(res.userType);
					if(res.userType === "10"){
						setuserhome("/Customer");
					} else if(res.userType === "20"){
						setuserhome("/Driver");
					} else if(res.userType === "30"){
						setuserhome("/Manager");
					}
					// setUser(res.username);
					// setUsertype(res.userType);
					setCurrentUserId(res._id);
					setCurrentUserEmail(res.email);
					setCurrentUser(res);
				}
			})
			.catch((err) => toast(err));

		return () => unsubscribe;
	}, []);

	return (
		<div>
			<Router>
				<UserContext.Provider value={{ user, setUser,usertype, setUsertype,userhome,setuserhome,useremail, setUseremail,selectedChat, setSelectedChat, chats, setChats, currentUserId, setCurrentUserId, currentUserEmail, currentUser, setCurrentUser}}>
				
					<ToastContainer />
					<Header />
					<Routes>
						<Route exact path="/" element = {<Home/>} />
						<Route exact path="/signup" element = {<Signup/>} />
						<Route exact path="/login" element = {<Login/>} />
						<Route exact path="/resetpassword" element = {<Reset/>} />
						<Route exact path="/newpassword/:token_rs" element = {<Newpass/>} />
						<Route exact path="/Customer" element = {<CustomerHome/>} />
						<Route exact path="/Driver" element = {<DriverHome/>} />
						<Route exact path="/Manager" element = {<ManagerHome/>} />
						<Route exact path="/order" element = {<Order/>} />
						<Route exact path="/ordertracking" element = {<OrderTracking/>} />
						<Route exact path="/map" element = {<Mapview/>} />
						<Route exact path="/chats" element = {<ChatPage/>} />
          			</Routes>
				
				</UserContext.Provider>
			</Router>
		</div>
	);
};

export default App;