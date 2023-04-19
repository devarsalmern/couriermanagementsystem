import React, { useContext, useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import logo from "../Assets/logo.svg";
import enroute from "../Assets/Enroute.png";


// functions
import { logout } from "../api/user";

const Header = () => {
	const history = useNavigate();
	const { userhome,setuserhome } = useContext(UserContext);
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	


	const handleLogout = (e) => {
		e.preventDefault();

		logout()
			.then((res) => {
				toast.success(res.message);
				// set user to null
				setUser(null);
				setUsertype(null);
				// redirect the user to login
				history("/login");
			})
			.catch((err) => console.error(err));
	};
	return (
		<nav className="navbar navbar-custom navbar-expand-lg navbar-dark ">
			<img src={enroute} alt="logo" width="50" height="50"/>

			<Link className="navbar-brand" to="/">
				CMS - Delivering Happiness
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>


			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ms-auto">
					{!user ? (
						<>	
							<li className="nav-item">
								<Link className="nav-link" to="/ordertracking">
									Track order
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/order">
									Place order
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signup">
									Sign Up
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						</>
					) : (
						<>
						<li className="nav-item">
								<Link className="nav-link" to="/map">
									Map
								</Link>
							</li>
						<li className="nav-item">
								<Link className="nav-link" to="/ordertracking">
									Track order
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/order">
									Place order
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/chats">
									Chat
								</Link>
						</li>
						<li className="nav-item">
								<Link className="nav-link" to={userhome}>
									{user}'s home
								</Link>
						</li>
						<li className="nav-item">
							<span
								className="nav-link"
								style={{ cursor: "pointer" }}
								onClick={handleLogout}
							>
								Logout
							</span>
						</li>
						</>
					)}
				</ul>
			</div>


		</nav>
	);
};

export default Header;