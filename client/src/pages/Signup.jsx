import {React, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';

// design
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	StandardInput,
	FormControl,
	InputLabel,
	Button,
	FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from '@mui/material/MenuItem';
import Grow from '@mui/material/Grow';

import Input from '@mui/material/Input';


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// functions
import { register } from "../api/user";

const Signup = () => {
	const history = useNavigate();
	const { user } = useContext(UserContext);

	// form states
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("");

	// password validation
	let hasSixChar = password.length >= 6;
	let hasLowerChar = /(.*[a-z].*)/.test(password);
	let hasUpperChar = /(.*[A-Z].*)/.test(password);
	let hasNumber = /(.*[0-9].*)/.test(password);
	let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			toast.success("Submit clicked: " + email + " " + username + " " + userType);
			//let navigate = useNavigate();
			//navigate("../login", { replace: true });

			const res = await register({userType, username, email, password });
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				// redirect the user to login

				history("/login");
				
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return !user ? (
		<Grow in>
		<div className="container mt-5 mb-5  col-10 col-sm-8 col-md-6 col-lg-3">
      
		

			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h2">
					Sign Up
				</label>
			</div>

			
			<div>
			<FormControl variant="standard" sx={{ m: 1, width: '20ch' }} fullWidth>
				<InputLabel id="demo-simple-select-label" >Type of User</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={userType}
					label="Type of User"
					onChange={(e) => setUserType(e.target.value)}
				>
					<MenuItem value={10}>Customer</MenuItem>
					<MenuItem value={20}>Driver</MenuItem>
					<MenuItem value={30}>Manager</MenuItem>
				</Select>
			</FormControl>


			<TextField
					sx={{ mt: 1, ml: 1 }}
					variant="standard"
					className="form-control"
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			
			
			
			<div className="form-group">
				<TextField
					sx={{ m: 1 }}
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
					sx={{ m: 1 }}
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
							<InputAdornment position="end">
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


				{password && (
					<div className="ml-1" style={{ columns: 2 }}>
						<div>
							{hasSixChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							)}
						</div>
						<div>
							{hasLowerChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							)}
						</div>
						<div>
							{hasUpperChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							)}
						</div>
						<div>
							{hasNumber ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							)}
						</div>
						<div>
							{hasSpecialChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="form-group">
				<TextField
					sx={{ m: 1 }}
					size="small"
					type="password"
					variant="standard"
					className="form-control"
					label="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{password && confirmPassword && (
					<FormHelperText className="ml-1 mt-1">
						{password === confirmPassword ? (
							<span className="text-success">
								Password does match
							</span>
						) : (
							<span className="text-danger">
								Password does not match
							</span>
						)}
					</FormHelperText>
				)}
			</div>

			<div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={
						!username ||
						!email ||
						!password ||
						!confirmPassword ||
						password !== confirmPassword ||
						!hasSixChar ||
						!hasLowerChar ||
						!hasUpperChar ||
						!hasNumber ||
						!hasSpecialChar||
						!userType
					}
					onClick={handleRegister}
				>
					Submit
				</Button>
			</div>
			
		</div>
		</Grow>
	) : (
		<Navigate to="/" />
	);
};

export default Signup;