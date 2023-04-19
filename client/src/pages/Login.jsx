import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';

// design
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grow from '@mui/material/Grow';
import Input from '@mui/material/Input';


// functions
import { login } from "../api/user";


const Login = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	const { useremail, setUseremail } = useContext(UserContext);
	const { userhome, setuserhome } = useContext(UserContext);
	//var check = undefined;

	// form states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("");
	const [otp, setOTP] = useState("");
	const [otpSent, setotpSent] = useState(false);

	if ((userType) === 10){
		var url = '../Customer'
	};
	if ((userType) === 20){
		var url = '../Driver'
	};
	if ((userType) === 30){
		var url = '../Manager'
	};	
	const handleLogin = async (e) => {
		var check =1;
		e.preventDefault();
		console.log("Disable is set");
		console.log(check);
		
		try {
			const res = await login({userType, email, password, otp });
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				setotpSent(1);
				setUser(res.username);
				setUsertype(res.userType);
				setUseremail(res.email);
				if(res.userType == "10"){
					setuserhome("/Customer");
				} else if(res.userType == "20"){
					setuserhome("/Driver");
				} else if(res.userType == "30"){
					setuserhome("/Manager");
				}
								
			}
		} catch (err) {
			toast.error(err);
		}
	};

	let navigate = useNavigate();
	return !user ? (
		<Grow in>
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h2">
					Login
				</label>

			</div>

			<div>
			<FormControl variant="standard" sx={{ mb: 1}} fullWidth>
				<InputLabel id="demo-simple-select-label">Type of User</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={userType}
					label="Type of User"
					type="text"
					onChange={(e) => setUserType(e.target.value)}
				>
					<MenuItem value={10}>Customer</MenuItem>
					<MenuItem value={20}>Driver</MenuItem>
					<MenuItem value={30}>Manager</MenuItem>
				</Select>
			</FormControl>
			</div>

			<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<FormControl
					variant="standard"
					size="small"
					className="form-control"
				>
					<InputLabel>Password</InputLabel>
					<Input
						label="Password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment>
								<IconButton
									edge="end"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<VisibilityIcon />
									) : (
										<VisibilityOffIcon />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</div>
			
			<div className="text-end">
			<Link
			component="button"
			variant="body2"
			onClick={() => {
				navigate("/resetpassword");
			}}
			>
				Forgot Password?
				</Link>
			</div>


				<div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!email || !password}
					onClick={handleLogin}
				>
					Send OTP
				</Button>
			</div>

			{/* Text field to enter OTP */}
			{/* <fieldset id= "otpField" disabled> */}
			<div className="text-center mb-5 alert">
				{/* <label htmlFor="" className="h5">
					OTP to log into Enroute
				</label> */}

			<div className="form-group">
				<TextField
					size="small"
					variant="outlined"
					className="form-control"
					label="OTP"
					disabled = {!otpSent} 
					value={otp}
					onChange={(e) => setOTP(e.target.value)}
				/>
			</div>
			<div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!otp}
					onClick={handleLogin}
				>
					Submit
				</Button>
			</div>
			</div>
			{/* </fieldset> */}

			


		</div>
		</Grow>
	) : (
		<Navigate to={'../'}/>
	);
};

export default Login;