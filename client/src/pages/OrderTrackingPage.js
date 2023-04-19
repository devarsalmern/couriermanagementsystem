import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import '../styles/OrderTrackingPage.css';
import { TextField,Button } from "@mui/material";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from "react-geocode";
//import 'bootstrap/dist/css/bootstrap.min.css';

import { toast } from "react-toastify";
import { orderstatus } from "../api/user";
import moment from 'moment';

export class OrderTracking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courier: '',
            status: '',
            eod: '',
            statusnum: 0,
            text:'',
            lat:0,
            lng:0,
            location:'',
            trackingID:''
        };
    
        this.getLatLong = this.getLatLong.bind(this);
        this.handleOrderStatus = this.handleOrderStatus.bind(this);
      }

      async getLatLong() {
 
            // Get latitude & longitude of driver location.
            Geocode.setApiKey("AIzaSyBK61mHqdfm2HgxbgsU18biOCS3EcHzi3k");
            Geocode.setLanguage("en");
            Geocode.setRegion("pk");
            Geocode.setLocationType("ROOFTOP");
            var response = await Geocode.fromAddress(this.state.location);
            var { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({lat:lat, lng:lng}); 
      };

    async handleOrderStatus ()  {
        this.setState({statusnum:0,text:0});
		console.log(TrackingID);
        var TrackingID = this.state.trackingID;
		var res = await orderstatus({TrackingID});
        console.log(res);
			if (res.error) toast.error(res.error);
			else {
                console.log(res.Carrier, res.OrderStatus);
				toast.success(res.message);
			}
        this.setState({courier:res.Carrier, status: res.OrderStatus, location: res.Location});
        console.log(this.state.location);
        if(!this.state.location){
            this.setState({text:1});
        }
        let statusArray = ["order placed", "driver assigned", "order picked up", "in transit", "out for delivery", "order delivered"];
        for (let i = 0; i < statusArray.length; i++){
            if (statusArray[i]===res.OrderStatus){
                this.setState({statusnum: i+1, eod:moment().add(6-i, 'days').format('MMMM Do YYYY')});
                break;
            }
        }
        this.getLatLong();
	};

    render(){
    return (
        <div className= "mt-5 mx-5">     
            {/* <div class="container padding-bottom-3x mb-1"> */}
                <div className="container p-3">
                <TextField             
                    sx={{mt:1}}
					size="small"
					// variant="standard"
					className="form-control"
					label="Enter Tracking Number"
					value={this.state.trackingID}
					onChange={(e) => this.setState({trackingID: e.target.value})}
                />
                
                <Button
                    sx={{mt:1}}
					variant="contained"
                    className="form-control"
					disabled={!this.state.trackingID}
					onClick={this.handleOrderStatus}
				>
					Track my order
				</Button>
                </div>

                <div class="card mb-3 mt-5">
                    <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Tracking Order No - </span>
                        <span class="text-medium"> 
                            {this.state.trackingID}
                        </span>
                    </div>
                    <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                        <div class="w-100 text-center py-1 px-2"><span class="text-medium">Shipped Via:</span> {this.state.courier}</div>
                        <div class="w-100 text-center py-1 px-2"><span class="text-medium">Status:</span> {this.state.status}</div>
                        <div class="w-100 text-center py-1 px-2"><span class="text-medium">Expected Date:</span> {this.state.eod}</div>
                    </div>
                    
                    <div class="card-body">
                        <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                            <div class={`${(this.state.statusnum>=1)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-cart"></i></div>
                                </div>
                                
                                <h4 class="step-title">Order Placed</h4>
                            </div>
                            
                            <div class={`${(this.state.statusnum>=2)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-user"></i></div>
                                </div>

                                <h4 class="step-title">Driver Assigned</h4>
                            </div>
                            
                            <div class={`${(this.state.statusnum>=3)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-drawer"></i></div>
                                </div>
                    
                                <h4 class="step-title">Order Picked Up</h4>
                            </div>
                            
                            <div class={`${(this.state.statusnum>=4)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-car"></i></div>
                                </div>
                                
                                <h4 class="step-title">In Transit</h4>
                            </div>
                            
                            <div class={`${(this.state.statusnum>=5)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-mail"></i></div>
                                </div>
                                
                                <h4 class="step-title">Out for Delivery</h4>
                            </div>

                            <div class={`${(this.state.statusnum>=6)? "step completed" : "step"}`}>
                                <div class="step-icon-wrap">
                                    <div class="step-icon"><i class="pe-7s-home"></i></div>
                                </div>
                                
                                <h4 class="step-title">Order Delivered</h4>
                            </div>
                        </div>
                    </div>
                </div>
                    <div style={{align:"center", visibility: `${(!this.state.location)? "hidden" : "visible"}`}}>
                    <div className='google-map' >
                    <h5 style={{color: '#80ffff',display: 'inline-block'}}>Current location of parcel is at : </h5> + { }
                    <h5 style={{color: 'White',display: 'inline-block'}}>{this.state.location}</h5> 
                        <Map  
                            key={this.state.lat && this.state.lng}
                            google={this.props.google}
                            zoom={12}
                            style={{
                                width: '40%',
                                height: '40%',
                            }}
                            initialCenter={{ lat: (this.state.lat), lng: (this.state.lng)}}
                            >
                        <Marker 
                            position={{ lat: this.state.lat, lng: this.state.lng}} 
                            />
                        </Map>
                    </div>
                    </div>
                    <div style={{align:"center", visibility: `${(this.state.text===1)? "visible" : "hidden"}`}}>
                    <h5 style={{color: 'white',display: 'inline-block'}}>Driver hasn't updated the location yet!</h5>
                    </div>
                
                
                {/* <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                    <div class="custom-control custom-checkbox mr-3">
                        <input class="custom-control-input" type="checkbox" id="notify_me" checked="" />
                        <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                    </div>
                    
                    <div class="text-left text-sm-right"><a class="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</a></div>
                </div> */}
            {/* </div> */}
        </div>
    );
}
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBK61mHqdfm2HgxbgsU18biOCS3EcHzi3k"
    })(OrderTracking);