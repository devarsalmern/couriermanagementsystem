import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";

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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grow from '@mui/material/Grow';

// functions
import { resetpassword } from "../api/user";

const Reset = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);

	// form states
	const [email, setEmail] = useState("");
	const [userType, setUserType] = useState("");
	//const [password, setPassword] = useState("");
	//const [showPassword, setShowPassword] = useState(false);

	const handleReset = async (e) => {
		e.preventDefault();

		try {
			const res = await resetpassword({userType,email});
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				//setUser(res.username);
				// redirect the user to home
				history("/login");
			}
		} catch (err) {
			toast.error(err);
		}
	};

	return !user ? (

		<Grow in>
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
			<div className="text-center mb-5 alert alert-primary">
				<label htmlFor="" className="h2">
					Reset Password
				</label>
			</div>

			<div>
			<FormControl fullWidth>
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
					size="small"
					variant="standard"
					className="form-control"
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!email}
					onClick={handleReset}
				>
					Send reset link
				</Button>
			</div>
		</div>
		</Grow>
	) : (
		<Navigate to="/" />
	);
};

export default Reset;