import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio } from '@mui/material';

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
import { OrderDetails, orderemail } from "../api/user";


const Order = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	const { useremail, setUseremail } = useContext(UserContext);
	//var check = undefined;

	// form states

	const [Email_f, setEmail_f] = useState(useremail);
    const [Address_f, setAddress_f] = useState("");
	const [Street_f, setStreet_f] = useState("");
    const [Apt_f, setApt_f] = useState("");
	const [Pickup_f, setPickup_f] = useState("");
	const [Cod_f, setCod_f] = useState("")
    const [City_f, setCity_f] = useState("");
    const [State_f, setState_f] = useState("");
    const [Zip_f, setZip_f] = useState("");
    const [Address_t, setAddress_t] = useState("");
    const [Street_t, setStreet_t] = useState("");
    const [Apt_t, setApt_t] = useState("");
    const [City_t, setCity_t] = useState("");
    const [State_t, setState_t] = useState("");
    const [Zip_t, setZip_t] = useState("");
    const [Size, setSize] = useState("");
    const [Weight, setWeight] = useState("");
    const [Fedex, setFedex] = useState("");
    const [Ups, setUps] = useState("");
    const [Usps, setUsps] = useState("");
    const [Carrier, setCarrier] = useState("");
	const [CarrierSug, setCarrierSug] = useState("");
    const [Cost, setCost] = useState("");
    const [Userselection, setUserselection] = useState("You haven't selected any carrier yet");
    const [Priority, setPriority] = useState("");
    const [PriorityStatus, setPriorityStatus] = useState("");
	const [TrackingID, setTrackingID] = useState("");
	const [Paynow, setPaynow] = useState("");
	// Paypal
	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const [orderID, setOrderID] = useState(false);
	
	if(user){
		var email_show = 'hidden';
	} else {
		var email_show = 'visible';
	}
    
	// 'You have slected '&{Carrier}&', which costs '&{Cost}
    //Functions
    function make_visible(div)
        {
            var divbox = document.getElementById(div);
            divbox.style.visibility = 'visible';

        }

	const handleQuotations = async (e) => {
    make_visible('Quotations');
	var distance = Math.abs(Zip_f-Zip_t)/1000;
	var Fed_cost = parseInt(distance*Priority*(distance%9));
	var Ups_cost = parseInt(distance*Priority*(distance%11));
	var Usps_cost = parseInt(distance*Priority*(distance%13));
	if(Fed_cost === Math.min(Fed_cost,Ups_cost,Usps_cost)){
		var carrie_coice = 'FedEx';
		var Fed_cost1 = Fed_cost;
		var Ups_cost1 = parseInt(Math.min(Fed_cost*1.27,Ups_cost));
		var Usps_cost1 = parseInt(Math.min(Fed_cost*1.5,Usps_cost));
	} else if(Ups_cost === Math.min(Fed_cost,Ups_cost,Usps_cost)){
		var carrie_coice = 'Ups';
		var Fed_cost1 = parseInt(Math.min(Ups_cost*1.5,Fed_cost));
		var Ups_cost1 = Ups_cost;
		var Usps_cost1 = parseInt(Math.min(Ups_cost*1.27,Usps_cost));
	} else{
		var carrie_coice = 'Usps';
		var Fed_cost1 = parseInt(Math.min(Usps_cost*1.27,Fed_cost));
		var Ups_cost1 = parseInt(Math.min(Usps_cost*1.5,Ups_cost));
		var Usps_cost1 = Usps_cost;
	}
	setUserselection("You haven't selected any carrier yet");
	setPaynow("");
	setCarrierSug(carrie_coice);
    setFedex(Fed_cost1);
    setUps(Ups_cost1);
    setUsps(Usps_cost1);
    setAddress_f(Street_f.concat(", ",Apt_f,", ",Pickup_f," , ",Cod_f," , ",City_f,", ",State_f,", ",Zip_f));
    setAddress_t(Street_t.concat(", ",Apt_t,", ",City_t,", ",State_t,", ",Zip_t));
    if (Priority > 1){
        setPriorityStatus("Priority");
    }
    else{
        setPriorityStatus("Normal");
    }
    //console.log(Fedex,Ups,Usps,Carrier,Cost,Priority);
	};
    // useEffect(() => {
    //     setCarrier("FedEx");
    //     setCost(Fedex);
    // }, []);

    
    const handleFedex = async (e) => {
		make_visible('Paynow');
        setCarrier("FedEx");
        setCost(Fedex);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'FedEx'," ",PriorityStatus," which costs ",Fedex));
        //console.log(Address_f,Address_t);
        };

    const handleUps = async (e) => {
		make_visible('Paynow');
        setCarrier("Ups");
        setCost(Ups);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'Ups'," ",PriorityStatus," which costs ",Ups));
        // setUserselection("You have selected Ups");
        };
    const handleUsps = async (e) => {
		make_visible('Paynow');
        setCarrier("Usps");
        setCost(Usps);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'Usps'," ",PriorityStatus," which costs ",Usps));
        // setUserselection("You have selected Usps");
        };

    const handlePayment = async (e) => {
		make_visible('Paypal');
		setShow(true);
        var tId = Math.random();
        tId = tId * 100000000;
        tId = parseInt(tId);
		setTrackingID(tId);
		// console.log(TrackingID,Address_f,Address_t,Cost,Carrier,Size,Weight,PriorityStatus);
        // const res = await OrderDetails({TrackingID,Address_f,Address_t,Cost,Carrier,Size,Weight,PrioritySatus});

        // console.log(Userselection,Address_f,Address_t,Cost,Carrier);
        };

		const paymentupdate = async (e) => {
			// console.log('This is Traking ID in paymentupdate',TrackingID);
			// e.preventDefault();
			var PaymentStatus = 'Paid';
			var Customer = useremail || Email_f;
			// console.log(`email is ${Customer}`);
			const res = await OrderDetails({TrackingID,Address_f,Address_t,Cost,Carrier,Size,Weight,PriorityStatus,PaymentStatus,Customer});
			const res2 = await orderemail({Customer,Cost,TrackingID});
			};

	// Paypal

		// creates a paypal order
		const createOrder = (data, actions) => {
		// console.log('This is Traking ID',TrackingID);
		return actions.order.create({purchase_units: [{description: "CMS Shipping Option",
		amount: {currency_code: "USD", value: Cost,},},],
		// not needed if a shipping address is actually needed
		application_context: {shipping_preference: "NO_SHIPPING",},})
		.then((orderID) => {setOrderID(orderID);return orderID;});};

		// check Approval
		const onApprove = (data, actions) => {return actions.order.capture().then(function (details) {
		const { payer } = details;
		// console.log(payer); // added new
		setSuccess(true);
		// console.log(Cost);
		paymentupdate();
		toast.success("Order has been successfully placed. Please check email for details");
			// console.log(usertype);
			if(usertype === 10){
				history("/Customer");	
			}
			else if(usertype === 20){
				history("/Driver");
			}
			else if(usertype === 30){
				history("/Manager");
			}
			else {
				history(`/`);
			}
		});
		};
		//capture likely error
		const onError = (data, actions) => {
		setErrorMessage("An Error occured with your payment ");
		toast.error("An Error occured with your payment. PLease try again!");
		history.replace("/order");};

	let navigate = useNavigate();
	return (
        
        <div className="wrapper">
        <div className="one">
        {/* <Grow in> */}
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h6">
					From Address
				</label>
			</div>
			<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Street"
					value={Street_f}
					onChange={(e) => setStreet_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Apt No."
					value={Apt_f}
					onChange={(e) => setApt_f(e.target.value)}
				/>
			</div>
			<div className="form-group">
    			<FormControlLabel
       				value={setPickup_f}
    				control={<Radio />}
        			label="Pickup"
        			//checked={paymentMethod === 'cod'}
        			onChange={(e) => setPickup_f(e.target.value)}
    			/>
				</div>
			<div className="form-group">
    			<FormControlLabel
       				value={setCod_f}
    				control={<Radio />}
        			label="Cash on Delivery"
        			//checked={paymentMethod === 'cod'}
        			onChange={(e) => setCod_f(e.target.value)}
    			/>
				</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="City"
					value={City_f}
					onChange={(e) => setCity_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="State"
					value={State_f}
					onChange={(e) => setState_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					// className="form-control"
					label="Zip Code"
					value={Zip_f}
					onChange={(e) => setZip_f(e.target.value)}
				/>
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					style={{visibility: email_show}}
					// className="form-control"
					label="Email"
					// value={Email_f}
					onChange={(e) => setEmail_f(e.target.value)}
				/>
			</div>
            </div>
            {/* </Grow> */}
            </div>

            <div className="two">
            {/* <Grow in> */}
		    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h6">
					To Address
				</label>
			</div>
			<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Street"
					value={Street_t}
					onChange={(e) => setStreet_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Apt No."
					value={Apt_t}
					onChange={(e) => setApt_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="City"
					value={City_t}
					onChange={(e) => setCity_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="State"
					value={State_t}
					onChange={(e) => setState_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Zip Code"
					value={Zip_t}
					onChange={(e) => setZip_t(e.target.value)}
				/>
			</div>

            </div>
            {/* </Grow> */}
            </div>
            {/* <Grow in> */}
            <div className="three">
            <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h6">
					Delivery Product Details
				</label>
			</div>

            <div>
			<FormControl variant="standard" sx={{ mb: 1}} fullWidth>
				<InputLabel id="demo-simple-select-label">Size</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={Size}
					label="Size"
					type="text"
					onChange={(e) => setSize(e.target.value)}
				>
					<MenuItem value={'Small'}>Small</MenuItem>
					<MenuItem value={'Medium'}>Medium</MenuItem>
					<MenuItem value={'Large'}>Large</MenuItem>
				</Select>
			</FormControl>
			</div>

            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Weight (in lbs)"
					value={Weight}
					onChange={(e) => setWeight(e.target.value)}
				/>
			</div>
            <div>
			<FormControl variant="standard" sx={{ mb: 1}} fullWidth>
				<InputLabel id="demo-simple-select-label">Priority</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={Priority}
					label="Size"
					type="text"
					onChange={(e) => setPriority(e.target.value)}
				>
					<MenuItem value={1}>Normal</MenuItem>
					<MenuItem value={1.5}>Priority</MenuItem>
				</Select>
			</FormControl>
			</div>
            <div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!Street_f || !City_f || !State_f || !Zip_f
							|| !Street_t || !City_t || !State_t || !Zip_t
							|| !Size || !Weight || !Priority || (!user && !Email_f )}
					onClick={handleQuotations}
				>
					Get Quotations
				</Button>
			</div>
            {/* </Grow> */}
            </div>
            </div>
            
            <div id= 'Quotations' style={{visibility: 'hidden'}} className="four">
            {/* <Grow in> */}
		    <div className="container2 mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h6">
                    Quotations
				</label>
			</div>
            <div className="wrapper2">
            <div className="one1">
			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    FedEx {PriorityStatus}
				</label>
			</div>
            </div>
            <div className="two1">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    {Fedex}
				</label>
			</div>
            </div>
            <div className="three1">
            <div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={false}
					onClick={handleFedex}
				>
					select
				</Button>
			</div>
            </div>
            </div>


            <div className="wrapper2">
            <div className="one1">
			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    Usps {PriorityStatus}
				</label>
			</div>
            </div>
            <div className="two1">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    {Usps}
				</label>
			</div>
            </div>
            <div className="three1">
            <div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={false}
					onClick={handleUsps}
				>
					select
				</Button>
			</div>
            </div>
            </div>
            <div className="wrapper2">
            <div className="one1">
			<div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    Ups {PriorityStatus}
				</label>
			</div>
            </div>
            <div className="two1">
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    {Ups}
				</label>
			</div>
            </div>
            <div className="three1">
            <div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={false}
					onClick={handleUps}
				>
					select
				</Button>
			</div>
            </div>
            </div>
            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    We suggest to go with {CarrierSug}
				</label>
			</div>

            <div className="text-center mb-2 alert ">
				<label htmlFor="" className="h8">
                    {Userselection}
				</label>
			</div>

            <div id='Paynow' style={{visibility: 'hidden'}} className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!Paynow}
					onClick={handlePayment}
				>
					Pay now!
				</Button>
			</div>

			<div id='Paypal' style={{visibility: 'hidden'}}>
			<PayPalScriptProvider
				options={{
				"client-id":"AQ3EgOA2pgKKdWZKvAvnKN9ZdLeh7hWTdfrZ30gs4z7a36HlSwt1lbsWbh1pY3zTveOJPRXIJ8sKelu3",
				}}
				>
				<div>
				{show ? (
				<PayPalButtons
				style={{ layout: "vertical" }}
				createOrder={createOrder}
				onApprove={onApprove}
				/>
				) : null}
				</div>
				</PayPalScriptProvider>
			</div>

            </div>
            {/* </Grow> */}
            </div>
            
		
        </div>
    )
};

export default Order;