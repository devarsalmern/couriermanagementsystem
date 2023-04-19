import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from "react-geocode";
import { render } from '@testing-library/react';

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

import { UserContext } from "../UserContext";
import { orderstatus } from "../api/user";
//import icon from '.../public/logo512.png';


export class Mapview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          fromAddress: '',
          fromLat: 31.443363522283178,
          fromLng: 68.18371011147453,
    
          toAddress: '',
          toLat: 31.443363522283178,
          toLng: 68.18371011147453,
    
          distance:500,
    
          repeat:1,

          text:'',

          trackingID:''
        };
    
        this.getLatLong = this.getLatLong.bind(this);
        this.handleOrderStatus = this.handleOrderStatus.bind(this);
        //console.log(this.props);
      }
    
      getDistance(lat1, lon1, lat2, lon2) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
          return 0;
        }
        else {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = parseInt(dist * 60 * 1.1515);
          return dist;
        }
      }

      async handleOrderStatus () {
        var TrackingID = this.state.trackingID;
        this.setState({text: '0'});
		var res = await orderstatus({TrackingID});
			if (res.error) 
            {toast.error(res.error);
                return;
            }
			else {
                console.log(res.Carrier, res.OrderStatus);
				toast.success(res.message);
			}
            // 12928789
        console.log(res.Address_f,res.Address_f);
        this.setState({fromAddress :  res.Address_f, toAddress :  res.Address_t, text: '1'});
        this.getLatLong();
        //31.443363522283178, 68.18371011147453
	};
    
      async getLatLong() {
    
        if(this.state.repeat >0){
            // Get latitude & longitude from address.
            Geocode.setApiKey("AIzaSyBK61mHqdfm2HgxbgsU18biOCS3EcHzi3k");
            Geocode.setLanguage("en");
            Geocode.setRegion("pk");
            Geocode.setLocationType("ROOFTOP");
            
            console.log(this.state.fromAddress)
            var response = await Geocode.fromAddress(this.state.fromAddress);
            var { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({fromLat:lat, fromLng:lng})
    
              console.log(this.state.toAddress)
              response = await Geocode.fromAddress(this.state.toAddress);  
              lat  = response.results[0].geometry.location.lat;
              lng  = response.results[0].geometry.location.lng
              console.log(lat, lng);
              this.setState({toLat:lat, toLng:lng})
    
              // this.setState({distance: this.getDistance(this.state.fromLat, this.state.fromLng, this.state.toLat, this.state.toLng)});
              var distance = this.getDistance(this.state.fromLat, this.state.fromLng, this.state.toLat, this.state.toLng);
              console.log("From function distance");
              console.log(distance);
              this.setState({distance: distance});
              console.log("From state distance");
              console.log(this.state.distance);
              this.setState({repeat:this.state.repeat - 1})
              this.getLatLong();
        }    
      };

    render(){
	return (
            <div>
                <div className="container mt-3 py-2 pl-2 pr-2 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
                    <div className="form-group">
                        <TextField
                            sx={{mb:1}}
                            size="small"
                            variant="standard"
                            className="form-control"
                            label="TrackingID"
                            value={this.state.trackingID}
                            onChange={(e) => {this.setState({trackingID :  e.target.value})}}
                        />
                    </div>
                    <Button sx={{mx:14}} variant="contained" size="small" 
                    disabled= {!this.state.trackingID} onClick={this.handleOrderStatus}
                    >
                    View Locations
                    </Button>
                </div>
                {/* 12928789 */}
                <div style={{visibility: `${(this.state.text === '1')? "visible" : "hidden"}`}}>
                    <div >
                    <span style={{display: 'inline'}}>
                    <h5 style={{color: '#80ffff',display: 'inline-block'}}>From address:  </h5>
                    <h5 style={{color: 'white',display: 'inline-block'}}>{this.state.fromAddress}</h5>
                    </span>
                    <br/>
                    <span style={{display: 'inline'}}>
                    <h5 style={{color: '#80ffff',display: 'inline-block'}}>To address:</h5> 
                    <h5 style={{color: 'white',display: 'inline-block'}}>{this.state.toAddress}</h5>
                    </span>
                    <br/>
                    <span style={{display: 'inline'}}>
                    <h5 style={{color: '#80ffff',display: 'inline-block'}}>Distance:</h5>
                    <h5 style={{color: 'white',display: 'inline-block'}}>{this.state.distance} miles</h5>
                    </span>
                    <br/>
                </div>
            <div className='google-map'>
              <Map  
                  key={this.state.toLat && this.state.toLng}
                  google={this.props.google}
                  zoom={5}
                  style={{
                    width: '100%',
                    height: '60%',
                  }}
                  initialCenter={{ lat: (this.state.fromLat + this.state.toLat)/2, lng: (this.state.fromLng + this.state.toLng)/2}}
                >
              <Marker 
                  position={{ lat: this.state.fromLat, lng: this.state.fromLng}} 
                />

              <Marker 
                  position={{ lat: this.state.toLat, lng: this.state.toLng}} 
                />
              </Map>
              
            </div>
            </div>

            </div>
	);
    }
}

//{user && <span className="text-success">{user}'s</span>}{" "}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBK61mHqdfm2HgxbgsU18biOCS3EcHzi3k"
  })(Mapview);