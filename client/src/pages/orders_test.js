import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';

import PlacesAutocomplete,{
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

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


const Order = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	//var check = undefined;

    //places autofill
    const[address_f,setAddress_f] = useState("");

	// form states
	const [ProdSize, setProdSize] = useState("");
	
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        console.log(results);
        const ll = await getLatLng(results[0]);
        console.log(ll);
        setAddress_f(value);
    }

	let navigate = useNavigate();
	return !user ? (
		<Grow in>
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
        <PlacesAutocomplete
        value={address_f}
        onChange={setAddress_f}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
          key = {suggestions.description}
          >
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
					label="Street_f"
					value={address_f}
					//onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
            
			</div>

		</Grow>
	) : (
		<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Street_f"
					value={address_f}
					//onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
	);
};

export default Order;