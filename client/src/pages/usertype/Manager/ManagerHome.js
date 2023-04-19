import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Snackbar,
	Table,
	TableCell,
	tableCellClasses,
	TableHead,
	TableRow,
	TableBody,
	TableContainer,
	Paper,
	TablePagination,
	FormControl,
	InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { UserContext } from "../../../UserContext";
import { readusers, readorders, orderupdate, adduseraccess } from "../../../api/user";
//import icon from '.../public/logo512.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const ManagerHome = () => {
	const { usertype } = useContext(UserContext);
	const history = useNavigate();

	const [users, setUsers] = useState([]);
	const [count, setCount] = useState(0);
	const [readuser, setReaduser] = useState("10");
	const [showtable, setShowtable] = useState("1");
	const [refresh, setRefresh] = useState("");

	// pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [addDriver,setaddDriver] = useState("");
	const [addManager,setaddManager] = useState("");
	const [TrackingID_u,setTrackingID_u] = useState("");
	const [Driver_u,setDriver_u] = useState("");
	const [OrderStatus_u,setOrderStatus_u] = useState("");
	const [Location_u,setLocation_u] = useState("");
	const [buttoncolor,setButtoncolor] = useState("Customers");

	const fetchUsers = async () => {
		try {
			const { users, count, error } = await readusers({
				page: page + 1,
				perPage: rowsPerPage,
				userType: readuser
			});
			if (error) {
				setSnackbarOpen(true);
				setSnackbarMessage(error);
				return;
			}
			// set users
			setUsers(users);
			setCount(count);
			// set snackbar
			setSnackbarOpen(true);
			setSnackbarMessage(`${users?.length} user(s) fetched`);
			// console.log(readuser);
		} catch (error) {
			setSnackbarOpen(true);
			setSnackbarMessage(error.message);
		}
	};

	const fetchOrders = async () => {
		try {
			const { users, count, error } = await readorders({
				page: page + 1,
				perPage: rowsPerPage
			});
			if (error) {
				setSnackbarOpen(true);
				setSnackbarMessage(error);
				return;
			}
			// set users
			setUsers(users);
			setCount(count);
			// set snackbar
			setSnackbarOpen(true);
			setSnackbarMessage(`${users?.length} order(s) fetched`);
		} catch (error) {
			setSnackbarOpen(true);
			setSnackbarMessage(error.message);
		}
	};

	useEffect(() => {
		if(showtable == "4"){
			fetchOrders();
		}
		else{
			fetchUsers();
		}
		
	}, [page, rowsPerPage,showtable,refresh]);

	const handleReadUsers = async (e) => {
		// e.preventDefault();
		await fetchUsers();
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handleCusView= async () => {
		setReaduser("10");
		setShowtable("1");
		setButtoncolor('Customers');
	};

	const handleDriverView= async () => {
		setReaduser("20");
		setShowtable("2");
		setButtoncolor('Drivers');
	};

	const handleManagerView= async () => {
		setReaduser("30");
		setShowtable("3");
		setButtoncolor('Managers');
	};

	const handleOrdersView= async () => {
		setReaduser("20");
		setShowtable("4");
		setButtoncolor('Orders');
	};
	
	const handleAddDriver= async (e) => {
		const adduserType = '20';
		const addemail = addDriver;
		const res = await adduseraccess({addemail, adduserType});
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
			}
	};

	const handleAddManager= async (e) => {
		const adduserType = '30';
		const addemail = addManager;
		const res = await adduseraccess({addemail, adduserType});
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
			}
	};

	const handleOrderUpdate= async (e) => {
		const res = await orderupdate({TrackingID_u, Driver_u, OrderStatus_u, Location_u});
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
			}
			setRefresh(Math.random());
	};

	if(usertype == 30){
	return (
			<div className="bg-light vh-100">
					<div className="pt-1 px-5">
						<Button sx={{mx:5}} style={{visibility: 'hidden'}} variant="contained" size="medium"></Button>
						<Button sx={{mx:5}} style={{visibility: 'hidden'}} variant="contained" size="medium"></Button>
						
						<Button sx={{mx:5}} variant="contained" size="medium" color= {`${(buttoncolor=='Customers')? "success" : "primary"}`} onClick={handleCusView}>
							View Customers Data
						</Button>
						<Button sx={{mx:5}} variant="contained" size="medium" color= {`${(buttoncolor=='Drivers')? "success" : "primary"}`} onClick={handleDriverView}>
							View Drivers Data
						</Button>
						<Button sx={{mx:5}} variant="contained" size="medium" color= {`${(buttoncolor=='Managers')? "success" : "primary"}`} onClick={handleManagerView}>
							View Managers Data
						</Button>
						<Button sx={{mx:5}} variant="contained" size="medium" color= {`${(buttoncolor=='Orders')? "success" : "primary"}`} onClick={handleOrdersView}>
							View Orders Data
						</Button>
					</div>
					<div className="container mt-5 py-4 w-100 col-10 col-sm-8">
						{(showtable=="1") ? (
							<div>
							{/* <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={(value) => {
                                    setSearch(value);
                                    setPage(0);
                                }}
                            />
							</div> */}
							<Paper elevation={2}>
								<TableContainer sx={{ maxHeight: 350 }}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell><b>Index</b></StyledTableCell>
												<StyledTableCell><b>User Type</b></StyledTableCell>
												<StyledTableCell><b>User Name</b></StyledTableCell>
												<StyledTableCell><b>Email</b></StyledTableCell>	
											</TableRow>
										</TableHead>
										<TableBody>
											{users.map(
												({userType,username,email},index) => (
													<TableRow key={username} hover>
														<TableCell>{index + 1}</TableCell>
														<TableCell>Customer</TableCell>
														<TableCell>{username}</TableCell>
														<TableCell>{email}</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									count={count}
									page={page}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[
										5, 10,
									]}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage={
										<div className="mt-3">Customers per page</div>
									}
									labelDisplayedRows={({ from, to, count }) => (
										<div className="mt-3">
											{from}-{to} of{" "}
											{count !== -1
												? count
												: `more than ${to}`}
										</div>
									)}
								/>
							</Paper>
							</div>
						) :  ( (showtable=="2")? (
							<div>
							<Paper elevation={2}>
								<TableContainer sx={{ maxHeight: 350 }}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell><b>Index</b></StyledTableCell>
												<StyledTableCell><b>User Type</b></StyledTableCell>
												<StyledTableCell><b>User Name</b></StyledTableCell>
												<StyledTableCell><b>Email</b></StyledTableCell>	
											</TableRow>
										</TableHead>
										<TableBody>
										{users?.map(
												({userType,username,email},index) => (
													<TableRow key={username} hover>
														<TableCell>{index + 1}</TableCell>
														<TableCell>Driver</TableCell>
														<TableCell>{username}</TableCell>
														<TableCell>{email}</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									count={count}
									page={page}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[
										5, 10,
									]}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage={
										<div className="mt-3">Drivers per page</div>
									}
									labelDisplayedRows={({ from, to, count }) => (
										<div className="mt-3">
											{from}-{to} of{" "}
											{count !== -1
												? count
												: `more than ${to}`}
										</div>
									)}
								/>
							</Paper>
							<div className="container mt-5 pt-5 mb-5">
							<div className="text-center mb-2 alert ">
								<label htmlFor="" className="h6">
									Update Drivers Database
								</label>
							</div>
							<div className="form-group">
								<TextField
									sx={{mb:1}}
									size="small"
									variant="standard"
									className="form-control"
									label="Driver's Email"
									value={addDriver}
									onChange={(e) => setaddDriver(e.target.value)}
								/>
							</div>
							<Button sx={{mx:15}} variant="contained" size="medium" disabled= {!addDriver} onClick={handleAddDriver}>
							Add Driver
							</Button>
							</div>
							</div>
						) : ((showtable=="3")? (
							<div>
							<Paper elevation={2}>
								<TableContainer sx={{ maxHeight: 350 }}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell><b>Index</b></StyledTableCell>
												<StyledTableCell><b>User Type</b></StyledTableCell>
												<StyledTableCell><b>User Name</b></StyledTableCell>
												<StyledTableCell><b>Email</b></StyledTableCell>	
											</TableRow>
										</TableHead>
										<TableBody>
										{users?.map(
												({userType,username,email},index) => (
													<TableRow key={username} hover>
														<TableCell>{index + 1}</TableCell>
														<TableCell>Manager</TableCell>
														<TableCell>{username}</TableCell>
														<TableCell>{email}</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									count={count}
									page={page}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[
										5, 10,
									]}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage={
										<div className="mt-3">Managers per page</div>
									}
									labelDisplayedRows={({ from, to, count }) => (
										<div className="mt-3">
											{from}-{to} of{" "}
											{count !== -1
												? count
												: `more than ${to}`}
										</div>
									)}
								/>
							</Paper>
							<div className="container mt-5 pt-5 mb-5">
							<div className="text-center mb-2 alert ">
								<label htmlFor="" className="h6">
									Update Managers Database
								</label>
							</div>
							<div className="form-group">
								<TextField
									sx={{mb:1}}
									size="small"
									variant="standard"
									className="form-control"
									label="Manager's Email"
									value={addManager}
									onChange={(e) => setaddManager(e.target.value)}
								/>
							</div>
							<Button sx={{mx:14}} variant="contained" size="medium" disabled= {!addManager} onClick={handleAddManager}>
							Add Manager
							</Button>
							</div>
							</div>
						) : (
							<div>
							<Paper elevation={2}>
								<TableContainer sx={{ maxHeight: 350 }}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell><b>Index</b></StyledTableCell>
												<StyledTableCell><b>Tracking ID</b></StyledTableCell>
												<StyledTableCell><b>Customer</b></StyledTableCell>
												<StyledTableCell><b>From Address</b></StyledTableCell>
												<StyledTableCell><b>To Address</b></StyledTableCell>
												<StyledTableCell><b>Driver</b></StyledTableCell>
												<StyledTableCell><b>Service</b></StyledTableCell>
												<StyledTableCell><b>Order Status</b></StyledTableCell>
												<StyledTableCell><b>Present location</b></StyledTableCell>		
											</TableRow>
										</TableHead>
										<TableBody>
										{users?.map(
												({TrackingID,Customer,Address_f,Service_f,Address_t,Driver,OrderStatus,Location},index) => (
													<TableRow key={TrackingID} hover>
														<TableCell>{index + 1}</TableCell>
														<TableCell>{TrackingID}</TableCell>
														<TableCell>{Customer}</TableCell>
														<TableCell>{Address_f}</TableCell>
														<TableCell>{Address_t}</TableCell>
														<TableCell>{Driver}</TableCell>
														<TableCell>{Service_f}</TableCell>
														<TableCell>{OrderStatus}</TableCell>
														<TableCell>{Location}</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									count={count}
									page={page}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[
										5, 10,
									]}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage={
										<div className="mt-3">Orders per page</div>
									}
									labelDisplayedRows={({ from, to, count }) => (
										<div className="mt-3">
											{from}-{to} of{" "}
											{count !== -1
												? count
												: `more than ${to}`}
										</div>
									)}
								/>
							</Paper>
							<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
							<div className="text-center mb-2 alert ">
								<label htmlFor="" className="h6">
									Update Order Details
								</label>
							</div>
							<div className="form-group">
								<TextField
									sx={{mb:1}}
									size="small"
									variant="standard"
									className="form-control"
									label="TrackingID"
									value={TrackingID_u}
									onChange={(e) => setTrackingID_u(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<TextField
									sx={{mb:1}}
									size="small"
									variant="standard"
									className="form-control"
									label="Add Driver"
									value={Driver_u}
									onChange={(e) => setDriver_u(e.target.value)}
								/>
							</div>
							<div className="form-group">
							<FormControl variant="standard" sx={{ mb: 1}} fullWidth>
								<InputLabel id="demo-simple-select-label">Order Status</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={OrderStatus_u}
									label="Order Status"
									type="text"
									onChange={(e) => setOrderStatus_u(e.target.value)}
								>	
									<MenuItem value = {undefined} >--Select--</MenuItem>
									<MenuItem value={'Order placed'}>Order placed</MenuItem>
									<MenuItem value={'Driver assigned'}>Driver assigned</MenuItem>
									<MenuItem value={'Order picked up'}>Order picked up</MenuItem>
									<MenuItem value={'In transit'}>In transit</MenuItem>
									<MenuItem value={'Out for delivery'}>Out for delivery</MenuItem>
									<MenuItem value={'Order delivered'}>Order delivered</MenuItem>
								</Select>
							</FormControl>
							</div>
							<div className="form-group">
								<TextField
									sx={{mb:1}}
									size="small"
									variant="standard"
									className="form-control"
									label="Location Update"
									value={Location_u}
									onChange={(e) => setLocation_u(e.target.value)}
								/>
							</div>
							<Button sx={{mx:14}} variant="contained" size="medium" disabled= {!TrackingID_u || (!OrderStatus_u && !Driver_u && !Location_u)} onClick={handleOrderUpdate}>
							Update order
							</Button>
							</div>
							</div>
						))
						)}
				
				<Snackbar
					open={snackbarOpen}
					onClose={() => setSnackbarOpen(false)}
					autoHideDuration={2000}
					message={snackbarMessage}
				/>
				</div>
		</div>
	);
}
else{
	return (
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-2 col-lg-10">
			<div className="text-center mb-5 alert">
				<label htmlFor="" className="h2">
					You don't have access to this page, please go back to home
				</label>
			</div>
		</div>
	);
}

return null;
};
//{user && <span className="text-success">{user}'s</span>}{" "}
export default ManagerHome;